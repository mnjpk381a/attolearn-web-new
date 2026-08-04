import React from "react";

type WatermarkProps = {
  text?: string;
};

export function PaperWatermark({ text = "AttoLearn" }: WatermarkProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Center rotated watermark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   rotate-[-30deg] text-gray-300 font-extrabold tracking-widest
                   opacity-15 select-none"
        style={{
          fontSize: "64px",
          lineHeight: 1,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        {text}
      </div>

      {/* Optional repeated pattern (comment out if you only want center) */}
      <div
        className="absolute inset-0 opacity-[0.06] select-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -30deg,
            rgba(0,0,0,0.08) 0px,
            rgba(0,0,0,0.08) 1px,
            transparent 1px,
            transparent 160px
          )`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      />
    </div>
  );
}
