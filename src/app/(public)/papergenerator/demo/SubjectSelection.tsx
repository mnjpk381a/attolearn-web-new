"use client";

import React from "react";

type Subject = {
  subjectID: number;
  subjectName: string;
};

type SubjectSelectionProps = {
  loading: boolean;
  selectedClass?: { className?: string | null } | null;

  subjects: Subject[];

  onSelectSubject: (subject: Subject) => void;

  LoaderComponent?: React.ReactNode;
  NoDataComponent?: React.ReactNode;
};

export default function SubjectSelection({
  loading,
  selectedClass,
  subjects,
  onSelectSubject,
  LoaderComponent,
  NoDataComponent,
}: SubjectSelectionProps) {
  return (
    <>
      {loading && (LoaderComponent ?? null)}

      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#007381] mb-6">
          Select Subject - {selectedClass?.className}
        </h1>
      </div>

      <div
        className={`grid grid-cols-1 ${
          subjects?.length === 0 ? "sm:grid-cols-1" : "sm:grid-cols-2"
        } gap-1`}
      >
        {subjects?.length === 0 && (NoDataComponent ?? null)}

        {subjects?.map((subject) => (
          <div
            key={subject.subjectID}
            className="flex flex-row justify-between items-center p-1 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow overflow-hidden"
          >
            <button
              onClick={() => onSelectSubject(subject)}
              className="flex-1 p-1 text-left text-lg rounded text-gray-900 hover:bg-[#007381] hover:text-white transition-colors cursor-pointer"
            >
              {subject.subjectName}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
