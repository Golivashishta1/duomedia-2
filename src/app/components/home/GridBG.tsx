"use client";

// Subtle grid + vignette background like your screenshots
export default function GridBG() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "#0b0b0b",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 80px)," +
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 80px)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 300px at 50% 10%, rgba(180,255,80,0.10), transparent 60%), radial-gradient(600px 500px at 80% 30%, rgba(140,255,0,0.06), transparent 60%)",
        }}
      />
    </div>
  );
}