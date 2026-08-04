type RoleDashboardProps = {
  title: string;
  description: string;
};

export default function RoleDashboard({
  title,
  description,
}: RoleDashboardProps) {
  return (
    <section className="flex flex-col gap-5 text-gray-950">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-[#007381] uppercase">
          AttoLearn Portal
        </p>
        <h2 className="mt-2 text-2xl font-bold text-gray-950">{title}</h2>
        <p className="mt-2 max-w-2xl text-base text-gray-600">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["Overview", "Activity", "Next Steps"].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">--</p>
            <p className="mt-2 text-sm text-slate-500">
              Workspace data will appear here.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
