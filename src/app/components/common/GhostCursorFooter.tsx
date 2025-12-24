import { useEffect, useMemo, useRef, CSSProperties } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ShaderMaterial, WebGLRenderer, Vector2, Vector3, Color, OrthographicCamera, Scene, Mesh, PlaneGeometry } from 'three';
import './ghostcursor-footer.css';

interface GhostCursorProps {
  className?: string;
  style?: CSSProperties;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  brightness?: number;
  color?: string;
  mixBlendMode?: string;
  edgeIntensity?: number;
  maxDevicePixelRatio?: number;
  targetPixels?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
  zIndex?: number;
}

const GhostCursor: React.FC<GhostCursorProps> = ({
  className = '',
  style = {},
  trailLength = 50,
  inertia = 0.5,
  grainIntensity = 0.05,
  bloomStrength = 0.1,
  bloomRadius = 1.0,
  bloomThreshold = 0.025,
  brightness = 1,
  color = '#B19EEF',
  mixBlendMode = 'screen',
  edgeIntensity = 0,
  maxDevicePixelRatio = 0.5,
  targetPixels,
  fadeDelayMs,
  fadeDurationMs,
  zIndex = 10
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const filmPassRef = useRef<ShaderPass | null>(null);
  const isMounted = useRef<boolean>(false);

  const trailBufRef = useRef<Vector2[]>([]);
  const headRef = useRef<number>(0);

  const rafRef = useRef<number | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);
  const currentMouseRef = useRef<Vector2>(new Vector2(0.5, 0.5));
  const velocityRef = useRef<Vector2>(new Vector2(0, 0));
  const fadeOpacityRef = useRef<number>(1.0);
  const lastMoveTimeRef = useRef<number>(typeof performance !== 'undefined' ? performance.now() : Date.now());
  const pointerActiveRef = useRef<boolean>(false);
  const runningRef = useRef<boolean>(false);

  const isTouch = useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const pixelBudget = targetPixels ?? (isTouch ? 0.9e6 : 1.3e6);
  const fadeDelay = fadeDelayMs ?? (isTouch ? 500 : 1000);
  const fadeDuration = fadeDurationMs ?? (isTouch ? 1000 : 1500);

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718

    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    uniform float iEdgeIntensity;
    varying vec2  vUv;

    // Improved noise function
    float hash(vec3 p) { 
        p  = fract(p * vec3(.1031, .1030, .0973));
        p += dot(p, p.yxz+33.33);
        return fract((p.x + p.y)*p.z); 
    }

    // Gradient noise by iq
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        vec2 u = f*f*(3.0-2.0*f);
        
        float a = hash(vec3(i, 0.0));
        float b = hash(vec3(i + vec2(1.0, 0.0), 0.0));
        float c = hash(vec3(i + vec2(0.0, 1.0), 0.0));
        float d = hash(vec3(i + vec2(1.0, 1.0), 0.0));
        
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    // Fractional Brownian motion with more detail
    float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        
        for (int i = 0; i < 6; i++) {
            v += a * noise(p);
            p = rot * p * 2.0 + shift;
            a *= 0.5;
        }
        
        return v;
    }

    // Create a flowing, smoke-like pattern with improved edge handling
    vec4 createSmoke(vec2 uv, vec2 center, float intensity, float timeOffset) {
        // Time with offset for variation
        float t = iTime * 0.4 + timeOffset * 15.0;
        
        // Scale down UVs to keep pattern consistent at edges
        vec2 scaledUV = uv * 0.9;
        vec2 scaledCenter = center * 0.9;
        
        // Create flowing pattern with more turbulence
        vec2 q = vec2(
            fbm(scaledUV * 1.3 + vec2(t * 0.25, 0.0)),
            fbm(scaledUV * 1.3 + vec2(5.2, 1.3) + t * 0.25)
        );
        
        // Add more organic movement with different scales
        vec2 r = vec2(
            fbm(scaledUV * 0.8 + q * 1.5 + vec2(1.7, 9.2) + t * 0.12),
            fbm(scaledUV * 0.8 + q * 1.5 + vec2(8.3, 2.8) + t * 0.15)
        );
        
        // Vector from center to current point
        vec2 toCenter = uv - center;
        
        // Create distortion based on noise and time
        vec2 distortion = vec2(
            fbm(uv * 1.1 + r * 1.2 + t * 0.08) - 0.5,
            fbm(uv * 1.1 + r * 1.2 + vec2(3.4, 2.1) + t * 0.1) - 0.5
        ) * 0.08;
        
        // Create wispy smoke pattern with edge awareness
        float edgeFade = 1.0 - smoothstep(0.0, 0.1, max(abs(uv.x) - 0.95, abs(uv.y) - 0.95));
        float pattern = fbm(uv * 1.8 + r * 1.5 + distortion * 3.0) * edgeFade;
        
        // Distance from center with some noise-based warping
        float dist = length(toCenter + distortion * 0.3);
        
        // Create density falloff that's more organic
        float density = 1.0 - smoothstep(0.0, 0.6, dist);
        density = pow(density, 0.8);
        
        // Create alpha based on pattern and density
        float alpha = pow(pattern, 2.2) * density * intensity;
        
        // Add some subtle pulsing
        alpha *= 0.85 + 0.15 * sin(t * 0.4);
        
        // Edge-aware intensity
        float edgeFactor = 1.0 - smoothstep(0.8, 0.95, abs(uv.x));
        alpha *= edgeFactor;
        
        // Color with subtle variation
        vec3 baseColor = iBaseColor;
        vec3 highlight = mix(baseColor, vec3(1.0), 0.35);
        vec3 color = mix(baseColor, highlight, pattern * 0.8);
        
        return vec4(color * alpha, alpha);
    }

    void main() {
        // Normalized pixel coordinates (-1 to 1)
        vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * 
                 vec2(iResolution.x / iResolution.y, 1.0);
        vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

        vec3 color = vec3(0.0);
        float alpha = 0.0;

        // Main cursor smoke
        vec4 mainSmoke = createSmoke(uv, mouse, 1.0, 0.0);
        color += mainSmoke.rgb;
        alpha += mainSmoke.a;

        // Trail effect - create multiple layers of smoke
        for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
            float t = float(i) / float(MAX_TRAIL_LENGTH);
            
            // Skip if too small to be visible
            if (t > 0.9) continue;
            
            // Get position from history
            vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
            
            // Fade out the trail with a more gradual falloff
            float trailIntensity = pow(1.0 - t, 2.0) * 0.5;
            
            // Add some time offset for variation
            float timeOffset = float(i) * 0.05;
            
            // Create smoke at this trail position
            vec4 trailSmoke = createSmoke(uv, pm, trailIntensity, timeOffset);
            
            // Additive blending for smoke
            color += trailSmoke.rgb * trailSmoke.a;
            alpha += trailSmoke.a;
        }

        // Apply brightness and tone mapping
        color = 1.0 - exp(-color * iBrightness * 2.0);
        
        // Edge fade with smoother transition and aspect ratio correction
        vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
        float aspect = iResolution.x / iResolution.y;
        
        // More gradual edge fade, especially on the right side
        float edgeFadeX = smoothstep(0.0, 0.15, min(uv01.x, 1.0 - uv01.x));
        float edgeFadeY = smoothstep(0.0, 0.1, min(uv01.y, 1.0 - uv01.y));
        float edgeMask = edgeFadeX * edgeFadeY;
        
        // Extra fade for right edge
        float rightEdgeFade = smoothstep(0.9, 1.0, uv01.x);
        edgeMask *= (1.0 - rightEdgeFade * 0.7);
        
        // Final color with edge fade and opacity
        float finalAlpha = clamp(alpha * iOpacity * edgeMask, 0.0, 0.95);
        
        // Apply some color correction
        color = pow(color, vec3(1.0/2.2)); // Gamma correction
        
        // Output final color with premultiplied alpha for better blending
        gl_FragColor = vec4(color * finalAlpha, finalAlpha);
    }
  `;

  const FilmGrainShader: any = useMemo(() => {
    return {
      uniforms: {
        tDiffuse: { value: null },
        iTime: { value: 0 },
        intensity: { value: grainIntensity }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float iTime;
        uniform float intensity;
        varying vec2 vUv;

        float hash1(float n){ return fract(sin(n)*43758.5453); }

        void main(){
          vec4 color = texture2D(tDiffuse, vUv);
          float n = hash1(vUv.x*1000.0 + vUv.y*2000.0 + iTime) * 2.0 - 1.0;
          color.rgb += n * intensity * color.rgb;
          gl_FragColor = color;
        }
      `
    };
  }, [grainIntensity]);

  const UnpremultiplyPass = useMemo(
    () =>
      new ShaderPass({
        uniforms: { tDiffuse: { value: null } },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float a = max(c.a, 1e-5);
            vec3 straight = c.rgb / a;
            gl_FragColor = vec4(clamp(straight, 0.0, 1.0), c.a);
          }
        `
      }),
    []
  );

  function calculateScale(el: HTMLElement): number {
    const r = el.getBoundingClientRect();
    const base = 600;
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));
    return Math.max(0.5, Math.min(2.0, current / base));
  }

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    
    const parent = host.parentElement;
    if (!parent) return;
    if (!host || !parent) return;

    const prevParentPos = parent.style.position;
    if (!prevParentPos || prevParentPos === 'static') {
      parent.style.position = 'relative';
    }

    const renderer = new WebGLRenderer({
      antialias: !isTouch,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: isTouch ? 'low-power' : 'high-performance',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    renderer.domElement.style.pointerEvents = 'none';
    if (mixBlendMode) {
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);
    } else {
      renderer.domElement.style.removeProperty('mix-blend-mode');
    }

    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geom = new PlaneGeometry(2, 2);

    const maxTrail = Math.max(1, Math.floor(trailLength));
    trailBufRef.current = Array.from({ length: maxTrail }, () => new THREE.Vector2(0.5, 0.5));
    headRef.current = 0;

    const baseColor = new Color(color);

    const material = new ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: maxTrail },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBufRef.current.map(v => v.clone()) },
        iOpacity: { value: 1.0 },
        iScale: { value: 1.0 },
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
        iBrightness: { value: brightness },
        iEdgeIntensity: { value: edgeIntensity }
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    materialRef.current = material;

    const mesh = new Mesh(geom, material);
    scene.add(mesh);

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(new Vector2(1, 1), bloomStrength, bloomRadius, bloomThreshold);
    bloomPassRef.current = bloomPass;
    composer.addPass(bloomPass);

    const filmPass = new ShaderPass(FilmGrainShader);
    filmPassRef.current = filmPass;
    composer.addPass(filmPass);

    composer.addPass(UnpremultiplyPass);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(rect.width));
      const cssH = Math.max(1, Math.floor(rect.height));

      const currentDPR = Math.min(
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        maxDevicePixelRatio
      );
      const need = cssW * cssH * currentDPR * currentDPR;
      const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));
      const pixelRatio = currentDPR * scale;

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(cssW, cssH, false);

      composer.setPixelRatio?.(pixelRatio);
      composer.setSize(cssW, cssH);

      const wpx = Math.max(1, Math.floor(cssW * pixelRatio));
      const hpx = Math.max(1, Math.floor(cssH * pixelRatio));
      material.uniforms.iResolution.value.set(wpx, hpx, 1);
      material.uniformsNeedUpdate = true;
      material.uniforms.iScale.value = calculateScale(host);
      bloomPass.setSize(wpx, hpx);
    };

    resize();
    const ro = new ResizeObserver(resize);
    resizeObsRef.current = ro;
    ro.observe(parent);
    ro.observe(host);

    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const animate = () => {
      const now = performance.now();
      const t = (now - start) / 1000;

      const mat = materialRef.current;
      const comp = composerRef.current;
      
      // Add null checks for material and composer
      if (!mat || !comp) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }

      if (pointerActiveRef.current) {
        velocityRef.current.set(
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y
        );
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);
        fadeOpacityRef.current = 1.0;
      } else {
        velocityRef.current.multiplyScalar(inertia);
        if (velocityRef.current.lengthSq() > 1e-6) {
          mat.uniforms.iMouse.value.add(velocityRef.current);
        }
        const dt = now - lastMoveTimeRef.current;
        if (dt > fadeDelay) {
          const k = Math.min(1, (dt - fadeDelay) / fadeDuration);
          fadeOpacityRef.current = Math.max(0, 1 - k);
        }
      }

      const N = trailBufRef.current.length;
      headRef.current = (headRef.current + 1) % N;
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);
      const arr = mat.uniforms.iPrevMouse.value;
      for (let i = 0; i < N; i++) {
        const srcIdx = (headRef.current - i + N) % N;
        arr[i].copy(trailBufRef.current[srcIdx]);
      }

      mat.uniforms.iOpacity.value = fadeOpacityRef.current;
      mat.uniforms.iTime.value = t;

      if (filmPassRef.current?.uniforms?.iTime) {
        filmPassRef.current.uniforms.iTime.value = t;
      }

      comp.render();

      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const ensureLoop = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = THREE.MathUtils.clamp((e.clientX - rect.left) / Math.max(1, rect.width), 0, 1);
      const y = THREE.MathUtils.clamp(1 - (e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
      currentMouseRef.current.set(x, y);
      pointerActiveRef.current = true;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };
    const onPointerEnter = () => {
      pointerActiveRef.current = true;
      ensureLoop();
    };
    const onPointerLeave = () => {
      pointerActiveRef.current = false;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });

    ensureLoop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      rafRef.current = null;

      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerenter', onPointerEnter);
      parent.removeEventListener('pointerleave', onPointerLeave);
      resizeObsRef.current?.disconnect();

      scene.clear();
      geom.dispose();
      material.dispose();
      composer.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      if (!prevParentPos || prevParentPos === 'static') {
        parent.style.position = prevParentPos;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trailLength,
    inertia,
    grainIntensity,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    pixelBudget,
    fadeDelay,
    fadeDuration,
    isTouch,
    color,
    brightness,
    mixBlendMode,
    edgeIntensity
  ]);

  useEffect(() => {
    if (materialRef.current) {
      const c = new THREE.Color(color);
      materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);
    }
  }, [color]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iBrightness.value = brightness;
    }
  }, [brightness]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iEdgeIntensity.value = edgeIntensity;
    }
  }, [edgeIntensity]);

  useEffect(() => {
    if (filmPassRef.current?.uniforms?.intensity) {
      filmPassRef.current.uniforms.intensity.value = grainIntensity;
    }
  }, [grainIntensity]);

  useEffect(() => {
    const el = rendererRef.current?.domElement;
    if (!el) return;
    if (mixBlendMode) {
      el.style.mixBlendMode = String(mixBlendMode);
    } else {
      el.style.removeProperty('mix-blend-mode');
    }
  }, [mixBlendMode]);

  const mergedStyle: CSSProperties = useMemo(() => ({
    ...style,
    zIndex,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: 1,
    visibility: 'visible',
    transform: 'translateZ(0)' // Force hardware acceleration
  }), [zIndex, style]);

  return <div 
    ref={containerRef} 
    className={`ghost-cursor ${className}`.trim()} 
    style={mergedStyle} 
  />;
};

export default GhostCursor;
