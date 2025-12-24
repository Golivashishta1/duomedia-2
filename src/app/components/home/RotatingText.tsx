'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import type { ElementType } from 'react';


interface TextElement {
  characters: string[];
  needsSpace: boolean;
}

interface RotatingTextProps<T extends ElementType = 'span'>
  extends Omit<HTMLMotionProps<T>, 'children'> {
  as?: T;
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words' | 'lines' | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  const {
    texts,
    rotationInterval = 2200,
    staggerDuration = 0.04,
    staggerFrom = 'last',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...motionProps
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = useCallback((text: string) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), s => s.segment);
    }
    return Array.from(text);
  }, []);

  const elements = useMemo<TextElement[]>(() => {
    const currentText = texts[currentTextIndex] ?? '';
    const words = currentText.split(' ');

    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1
    }));
  }, [texts, currentTextIndex, splitIntoCharacters]);

  const getStaggerDelay = useCallback(
    (index: number, total: number) => {
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'center') {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === 'random') {
        const rand = Math.floor(Math.random() * total);
        return Math.abs(rand - index) * staggerDuration;
      }
      if (typeof staggerFrom === 'number') {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return 0;
    },
    [staggerFrom, staggerDuration]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      setCurrentTextIndex(nextIndex);
      onNext?.(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, onNext]);

  useImperativeHandle(ref, () => ({
    next,
    previous: () =>
      setCurrentTextIndex(i => (i === 0 ? texts.length - 1 : i - 1)),
    jumpTo: index =>
      setCurrentTextIndex(Math.max(0, Math.min(index, texts.length - 1))),
    reset: () => setCurrentTextIndex(0)
  }));

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span
      className={cn('inline-flex overflow-hidden perspective-[800px]', mainClassName)}
      {...motionProps}
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>

      <AnimatePresence mode="wait">
        <motion.span key={currentTextIndex} className="inline-flex">
          {elements.map((word, wordIndex) => {
            const prevCount = elements
              .slice(0, wordIndex)
              .reduce((sum, w) => sum + w.characters.length, 0);
            const totalChars = elements.reduce((sum, w) => sum + w.characters.length, 0);

            return (
              <span key={wordIndex} className={cn('inline-flex overflow-hidden', splitLevelClassName)}>
                {word.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ y: '100%', opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: '-120%', opacity: 0, rotateX: 90 }}
                    transition={{
                      type: 'spring',
                      damping: 25,
                      stiffness: 300,
                      delay: getStaggerDelay(prevCount + charIndex, totalChars)
                    }}
                    className={cn('inline-block will-change-transform', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {word.needsSpace && <span>&nbsp;</span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
