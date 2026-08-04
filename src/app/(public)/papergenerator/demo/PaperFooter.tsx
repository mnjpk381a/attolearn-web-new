"use client";

export default function PaperFooter() {
  const paperGeneratorUrl = "https://www.attolearn.com/papergenerator";

  return (
    <div
      className="mt-3 px-4 pb-4 text-center print:mt-1 print:px-1 print:pb-1 paper-footer"
      style={{
        pageBreakInside: "avoid",
        breakInside: "avoid",
        pageBreakBefore: "avoid",
        breakBefore: "avoid",
        orphans: 3,
        widows: 3,
      }}
    >
      <p className="text-[9px] text-gray-500 print:text-[6px]">
        This exam paper was generated using AttoLearn
      </p>
      <p className="text-[9px] text-gray-500 print:text-[6px] mt-0.5">
        <a
          href={paperGeneratorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#007381] underline"
        >
          Create exam papers in minutes: (https://attolearn.com/papergenerator)
        </a>
      </p>
    </div>
  );
}
