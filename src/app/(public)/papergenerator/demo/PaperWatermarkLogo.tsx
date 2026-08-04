export function PaperWatermarkLogo() {
  return (
    <div className="paper-watermark absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div className="relative w-[75%] max-w-[420px] rotate-[-25deg] opacity-10">
        <img
          src="/images/Stats/AttoLearn_Logo.png"
          alt="AttoLearn"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
