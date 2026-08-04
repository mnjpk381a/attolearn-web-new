"use client";

import axios from "axios";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaEdit,
  FaList,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import type {
  AdminSetupColumn,
  AdminSetupConfig,
  AdminSetupDependency,
  AdminSetupField,
} from "@/components/admin/adminSetupConfigs";

type FieldValue = boolean | number | string;
type AdminRecord = Record<string, unknown>;
type FormState = Record<string, FieldValue>;
type LookupState = Record<string, AdminRecord[]>;

function extractRecords(payload: unknown): AdminRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(
      (item): item is AdminRecord => !!item && typeof item === "object",
    );
  }

  if (!payload || typeof payload !== "object") return [];

  const record = payload as AdminRecord;
  const candidates = [
    record.data,
    record.items,
    record.records,
    record.result,
    record.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.filter(
        (item): item is AdminRecord => !!item && typeof item === "object",
      );
    }
  }

  return [];
}

function asBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
}

function asText(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function formatDate(value: unknown) {
  const text = asText(value);
  return text ? text.slice(0, 10) : "";
}

function fieldDefault(field: AdminSetupField): FieldValue {
  if (field.defaultValue !== undefined) return field.defaultValue;
  if (field.type === "checkbox") return false;
  return "";
}

function createEmptyForm(fields: AdminSetupField[]): FormState {
  return fields.reduce<FormState>((state, field) => {
    state[field.key] = fieldDefault(field);
    return state;
  }, {});
}

function valueForForm(field: AdminSetupField, record: AdminRecord): FieldValue {
  const value = record[field.key];

  if (value === null || value === undefined) return fieldDefault(field);
  if (field.type === "checkbox") return asBoolean(value);
  if (field.type === "date") return formatDate(value);
  return String(value);
}

function buildPatchUrl(template: string, id: unknown) {
  return template.replace(/:\w+/, encodeURIComponent(String(id)));
}

function getLookupLabel(
  dependency: AdminSetupDependency,
  records: AdminRecord[],
  value: unknown,
) {
  const match = records.find(
    (record) => String(record[dependency.idField]) === String(value),
  );

  if (!match)
    return value === null || value === undefined || value === ""
      ? "-"
      : `#${value}`;

  return (
    asText(match[dependency.labelField]) ||
    asText(
      dependency.fallbackLabelField
        ? match[dependency.fallbackLabelField]
        : undefined,
    ) ||
    `#${value}`
  );
}

function getLookupDependency(
  config: AdminSetupConfig,
  key?: string,
): AdminSetupDependency | undefined {
  if (!key) return undefined;
  return config.dependencies?.find((dependency) => dependency.key === key);
}

function getRecordTitle(config: AdminSetupConfig, record: AdminRecord) {
  return (
    asText(record[config.titleField]) || `Record ${record[config.idField]}`
  );
}

function buildPayload(fields: AdminSetupField[], form: FormState) {
  return fields.reduce<Record<string, unknown>>((payload, field) => {
    const value = form[field.key];

    if (field.type === "checkbox") {
      payload[field.key] = Boolean(value);
      return payload;
    }

    if (field.type === "number" || field.type === "select") {
      if (value === "" || value === null || value === undefined) {
        if (!field.optional) payload[field.key] = 0;
        return payload;
      }

      payload[field.key] = Number(value);
      return payload;
    }

    const text = String(value ?? "").trim();
    if (text || !field.optional) {
      payload[field.key] = text;
    }

    return payload;
  }, {});
}

function renderCell(
  config: AdminSetupConfig,
  column: AdminSetupColumn,
  record: AdminRecord,
  lookups: LookupState,
) {
  const value = record[column.key];

  if (column.type === "status") {
    const isActive = asBoolean(value);

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
          isActive
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {isActive ? <FaCheck /> : <FaTimes />}
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  }

  if (column.type === "boolean") {
    return asBoolean(value) ? "Yes" : "No";
  }

  if (column.type === "date") {
    return formatDate(value) || "-";
  }

  if (column.type === "lookup") {
    const dependency = getLookupDependency(config, column.lookupKey);
    return dependency
      ? getLookupLabel(dependency, lookups[dependency.key] || [], value)
      : asText(value) || "-";
  }

  return asText(value) || "-";
}

export default function AdminSetupScreen({
  config,
}: {
  config: AdminSetupConfig;
}) {
  const sessionToken = useAuthStore((state) => state.sessionToken);
  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement | HTMLSelectElement | null>(
    null,
  );
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [lookups, setLookups] = useState<LookupState>({});
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState>(() =>
    createEmptyForm(config.fields),
  );
  const [editingId, setEditingId] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authHeaders = useMemo(
    () =>
      sessionToken
        ? {
            Authorization: `Bearer ${sessionToken}`,
            sessiontoken: sessionToken,
          }
        : undefined,
    [sessionToken],
  );

  useEffect(() => {
    setForm(createEmptyForm(config.fields));
    setEditingId(null);
    setQuery("");
  }, [config]);

  const dependencyByKey = useMemo(() => {
    return (config.dependencies || []).reduce<
      Record<string, AdminSetupDependency>
    >((state, dependency) => {
      state[dependency.key] = dependency;
      return state;
    }, {});
  }, [config.dependencies]);

  const filteredRecords = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return records;

    return records.filter((record) => {
      const lookupText = config.columns
        .map((column) => {
          if (column.type !== "lookup") return "";
          const dependency = getLookupDependency(config, column.lookupKey);
          return dependency
            ? getLookupLabel(
                dependency,
                lookups[dependency.key] || [],
                record[column.key],
              )
            : "";
        })
        .join(" ");

      return [lookupText, ...config.columns.map((column) => record[column.key])]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [config, lookups, query, records]);

  const activeCount = config.activeField
    ? records.filter((record) =>
        asBoolean(record[config.activeField as string]),
      ).length
    : null;
  const inactiveCount =
    typeof activeCount === "number" ? records.length - activeCount : null;
  const isEditing = editingId !== null && editingId !== undefined;

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [recordsResponse, ...dependencyResponses] = await Promise.all([
        axios.get(config.endpoint, { headers: authHeaders }),
        ...(config.dependencies || []).map((dependency) =>
          axios.get(dependency.endpoint, { headers: authHeaders }),
        ),
      ]);

      const nextLookups: LookupState = {};

      (config.dependencies || []).forEach((dependency, index) => {
        nextLookups[dependency.key] = extractRecords(
          dependencyResponses[index]?.data,
        );
      });

      setRecords(extractRecords(recordsResponse.data));
      setLookups(nextLookups);
    } catch {
      setError(`${config.navLabel} could not be loaded. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHeaders, config]);

  const updateForm = (key: string, value: FieldValue) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(createEmptyForm(config.fields));
  };

  const handleEdit = (record: AdminRecord) => {
    setEditingId(record[config.idField]);
    setForm(
      config.fields.reduce<FormState>((state, field) => {
        state[field.key] = valueForForm(field, record);
        return state;
      }, {}),
    );

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      firstFieldRef.current?.focus({ preventScroll: true });
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const field of config.fields) {
      const value = form[field.key];
      if (
        field.required &&
        (value === "" || value === null || value === undefined)
      ) {
        toast.error(`${field.label} is required.`);
        return;
      }
    }

    setIsSaving(true);

    try {
      const payload = buildPayload(config.fields, form);

      if (isEditing) {
        await axios.patch(
          buildPatchUrl(config.patchEndpoint, editingId),
          payload,
          {
            headers: authHeaders,
          },
        );
      } else {
        await axios.post(config.endpoint, payload, { headers: authHeaders });
      }

      toast.success(`${config.navLabel} ${isEditing ? "updated" : "created"}.`);
      resetForm();
      await loadData();
    } catch {
      toast.error(`${config.navLabel} could not be saved.`);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (record: AdminRecord) => {
    if (!config.activeField) return;

    const nextValue = !asBoolean(record[config.activeField]);

    try {
      await axios.patch(
        buildPatchUrl(config.patchEndpoint, record[config.idField]),
        { [config.activeField]: nextValue },
        { headers: authHeaders },
      );
      setRecords((current) =>
        current.map((item) =>
          item[config.idField] === record[config.idField]
            ? { ...item, [config.activeField as string]: nextValue }
            : item,
        ),
      );
      toast.success(nextValue ? "Record activated." : "Record deactivated.");
    } catch {
      toast.error("Status could not be changed.");
    }
  };

  const renderField = (field: AdminSetupField, index: number) => {
    const commonClasses =
      "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/15";

    if (field.type === "checkbox") {
      return (
        <label
          key={field.key}
          className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-3"
        >
          <span className="text-sm font-semibold text-slate-800">
            {field.label}
          </span>
          <input
            type="checkbox"
            checked={Boolean(form[field.key])}
            onChange={(event) => updateForm(field.key, event.target.checked)}
            className="h-5 w-5 accent-[#007381]"
          />
        </label>
      );
    }

    if (field.type === "select") {
      const dependency = field.optionsKey
        ? dependencyByKey[field.optionsKey]
        : undefined;
      const options = dependency ? lookups[dependency.key] || [] : [];

      return (
        <label key={field.key} className="block">
          <span className="text-sm font-semibold text-slate-700">
            {field.label}
          </span>
          <select
            ref={(element) => {
              if (index === 0) firstFieldRef.current = element;
            }}
            value={String(form[field.key] ?? "")}
            onChange={(event) => updateForm(field.key, event.target.value)}
            className={commonClasses}
            required={field.required}
          >
            <option value="">
              {field.optional ? "None" : `Select ${field.label.toLowerCase()}`}
            </option>
            {dependency &&
              options.map((option) => (
                <option
                  key={String(option[dependency.idField])}
                  value={String(option[dependency.idField])}
                >
                  {getLookupLabel(
                    dependency,
                    options,
                    option[dependency.idField],
                  )}
                </option>
              ))}
          </select>
        </label>
      );
    }

    if (field.type === "textarea") {
      return (
        <label key={field.key} className="block">
          <span className="text-sm font-semibold text-slate-700">
            {field.label}
          </span>
          <textarea
            value={String(form[field.key] ?? "")}
            onChange={(event) => updateForm(field.key, event.target.value)}
            className={`${commonClasses} min-h-24 resize-y`}
            placeholder={field.placeholder}
            required={field.required}
          />
        </label>
      );
    }

    return (
      <label key={field.key} className="block">
        <span className="text-sm font-semibold text-slate-700">
          {field.label}
        </span>
        <input
          ref={(element) => {
            if (index === 0) firstFieldRef.current = element;
          }}
          type={field.type === "number" ? "number" : field.type}
          value={String(form[field.key] ?? "")}
          onChange={(event) => updateForm(field.key, event.target.value)}
          className={commonClasses}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          required={field.required}
        />
      </label>
    );
  };

  return (
    <section className="flex min-w-0 flex-col gap-4 text-slate-950">
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#007381] uppercase">
              {config.eyebrow}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
              {config.title}
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-600">
              {config.description}
            </p>
          </div>

          <div
            className={`grid w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-center ${
              config.activeField
                ? "grid-cols-3 lg:max-w-md"
                : "grid-cols-2 lg:max-w-xs"
            }`}
          >
            <div className="px-2 py-3 sm:px-4">
              <p className="text-lg font-bold text-slate-950">
                {records.length}
              </p>
              <p className="text-xs font-semibold text-slate-500">Total</p>
            </div>
            {config.activeField && (
              <div className="border-x border-slate-200 px-2 py-3 sm:px-4">
                <p className="text-lg font-bold text-emerald-700">
                  {activeCount}
                </p>
                <p className="text-xs font-semibold text-slate-500">Active</p>
              </div>
            )}
            <div className="px-2 py-3 sm:px-4">
              <p className="text-lg font-bold text-slate-500">
                {config.activeField ? inactiveCount : filteredRecords.length}
              </p>
              <p className="text-xs font-semibold text-slate-500">
                {config.activeField ? "Inactive" : "Shown"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(20rem,24rem)_1fr]">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-3 shadow-sm outline-none sm:p-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#007381]/10 text-[#007381]">
              {isEditing ? <FaEdit /> : <FaPlus />}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-950">
                {isEditing
                  ? `Edit ${config.navLabel}`
                  : `Add ${config.navLabel}`}
              </h3>
              <p className="text-sm text-slate-500">
                {isEditing ? "Update the selected record." : "Create a record."}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {config.fields.map((field, index) => renderField(field, index))}
          </div>

          <div className="mt-5 flex flex-col gap-2 min-[360px]:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-[#007381] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005f6a] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSaving ? "Saving..." : isEditing ? "Update" : "Add"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 min-[360px]:flex-none"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <FaList />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-950">
                  {config.navLabel}
                </h3>
                <p className="text-sm text-slate-500">
                  {filteredRecords.length} shown
                </p>
              </div>
            </div>

            <label className="relative w-full sm:max-w-xs">
              <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white py-2.5 pr-3 pl-9 text-sm text-slate-950 outline-none transition focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/15"
                placeholder={`Search ${config.navLabel.toLowerCase()}`}
              />
            </label>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-sm font-medium text-slate-500">
              Loading {config.navLabel.toLowerCase()}...
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-red-600">{error}</p>
              <button
                type="button"
                onClick={loadData}
                className="mt-3 rounded-md bg-[#007381] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005f6a]"
              >
                Retry
              </button>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="p-8 text-center text-sm font-medium text-slate-500">
              No records found.
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-100 sm:hidden">
                {filteredRecords.map((record) => (
                  <div key={String(record[config.idField])} className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="break-words font-semibold text-slate-950">
                          {getRecordTitle(config, record)}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          ID {String(record[config.idField])}
                        </p>
                      </div>
                      {config.activeField && (
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                            asBoolean(record[config.activeField])
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {asBoolean(record[config.activeField]) ? (
                            <FaCheck />
                          ) : (
                            <FaTimes />
                          )}
                          {asBoolean(record[config.activeField])
                            ? "Active"
                            : "Inactive"}
                        </span>
                      )}
                    </div>

                    <dl className="mt-3 grid gap-2 text-sm">
                      {config.columns.slice(1, 5).map((column) => (
                        <div
                          key={column.key}
                          className="grid grid-cols-[6.5rem_1fr] gap-2"
                        >
                          <dt className="text-xs font-semibold text-slate-500">
                            {column.label}
                          </dt>
                          <dd className="min-w-0 break-words text-slate-800">
                            {renderCell(config, column, record, lookups)}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(record)}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:border-[#007381] hover:text-[#007381]"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      {config.activeField ? (
                        <button
                          type="button"
                          onClick={() => toggleActive(record)}
                          className={`inline-flex min-h-10 items-center justify-center rounded-md px-3 text-xs font-semibold transition ${
                            asBoolean(record[config.activeField])
                              ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          {asBoolean(record[config.activeField])
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto sm:block">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      {config.columns.map((column) => (
                        <th
                          key={column.key}
                          className="px-4 py-3 text-left text-xs font-bold tracking-wide text-slate-500 uppercase"
                        >
                          {column.label}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-right text-xs font-bold tracking-wide text-slate-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredRecords.map((record) => (
                      <tr
                        key={String(record[config.idField])}
                        className="hover:bg-slate-50"
                      >
                        {config.columns.map((column) => (
                          <td
                            key={column.key}
                            className="max-w-72 px-4 py-3 text-sm text-slate-700"
                          >
                            {column.key === config.titleField ? (
                              <div>
                                <p className="font-semibold text-slate-950">
                                  {renderCell(config, column, record, lookups)}
                                </p>
                                <p className="text-xs text-slate-500">
                                  ID {String(record[config.idField])}
                                </p>
                              </div>
                            ) : (
                              renderCell(config, column, record, lookups)
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(record)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-[#007381] hover:text-[#007381]"
                              title="Edit record"
                            >
                              <FaEdit />
                            </button>
                            {config.activeField && (
                              <button
                                type="button"
                                onClick={() => toggleActive(record)}
                                className={`inline-flex h-9 min-w-24 items-center justify-center rounded-md px-3 text-xs font-semibold transition ${
                                  asBoolean(record[config.activeField])
                                    ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                                }`}
                              >
                                {asBoolean(record[config.activeField])
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
