"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";

type RouteId = "enterprise" | "public-sector" | "talent" | "careers";

const VALID_ROUTES: RouteId[] = ["enterprise", "public-sector", "talent", "careers"];

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  autoComplete?: string;
}

interface RouteDef {
  id: RouteId;
  label: string;
  description: string;
  destination: string;
  fields: FieldDef[];
}

const ROUTES: RouteDef[] = [
  {
    id: "enterprise",
    label: "Enterprise engagement",
    description: "A modernization program, an AI use case, a platform migration, or a system that needs to be rebuilt.",
    destination: "Routed to delivery leadership.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
      { name: "title", label: "Title", type: "text", autoComplete: "organization-title" },
      {
        name: "capability",
        label: "Capability of interest",
        type: "select",
        required: true,
        options: [
          "AI & data",
          "Applications & modernization",
          "Cloud & platform engineering",
          "Cybersecurity",
          "Not sure yet",
        ],
      },
      { name: "details", label: "What are you trying to build?", type: "textarea", required: true },
    ],
  },
  {
    id: "public-sector",
    label: "Public sector briefing",
    description: "A state or local agency evaluating modernization, data, security, or staffing support.",
    destination: "Routed to the public sector team.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
      { name: "agency", label: "Agency", type: "text", required: true, autoComplete: "organization" },
      { name: "title", label: "Title", type: "text", autoComplete: "organization-title" },
      {
        name: "procurement",
        label: "Procurement path",
        type: "select",
        required: true,
        options: [
          "DIR cooperative contract",
          "Competitive RFP / RFQ",
          "Sole source / emergency",
          "Not sure yet",
        ],
      },
      { name: "details", label: "What does the agency need?", type: "textarea", required: true },
    ],
  },
  {
    id: "talent",
    label: "Talent requirement",
    description: "An open role, a project pod, or embedded specialists you need to staff.",
    destination: "Routed to the technology talent team.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
      { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
      {
        name: "engagement",
        label: "Engagement model",
        type: "select",
        required: true,
        options: ["Embedded specialists", "Project pod", "Specialist recruiting", "Not sure yet"],
      },
      { name: "skills", label: "Skills or roles needed", type: "text", required: true },
      { name: "details", label: "Scope and timeline", type: "textarea" },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    description: "You're a candidate looking for your next role, not a company looking to hire.",
    destination: "Routed to recruiting.",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
      { name: "role", label: "Role or skill area", type: "text", required: true },
      { name: "linkedin", label: "LinkedIn or portfolio URL", type: "text" },
      { name: "details", label: "Anything else we should know?", type: "textarea" },
    ],
  },
];

function Field({ field, value, onChange, error }: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  const describedBy = error ? `${id}-error` : undefined;

  const labelEl = (
    <label htmlFor={id} className="block font-mono text-mono-sm uppercase tracking-[.06em] text-ink-muted mb-2">
      {field.label}
      {field.required && <span className="text-teal ml-1" aria-hidden="true">*</span>}
    </label>
  );

  const baseInputCls =
    "w-full bg-sunken border border-hairline rounded-control px-4 py-3 text-body-sm text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 transition-colors duration-fast ease-standard";

  return (
    <div>
      {labelEl}
      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          required={field.required}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={baseInputCls}
        />
      ) : field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={baseInputCls}
        >
          <option value="" disabled>
            Select one
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          required={field.required}
          autoComplete={field.autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={baseInputCls}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-caption text-teal mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("re");
  const initialRoute = VALID_ROUTES.includes(requested as RouteId) ? (requested as RouteId) : "enterprise";

  const [routeId, setRouteId] = useState<RouteId>(initialRoute);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const route = ROUTES.find((r) => r.id === routeId)!;

  function handleRouteChange(id: RouteId) {
    setRouteId(id);
    setValues({});
    setErrors({});
    setStatus("idle");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    for (const field of route.fields) {
      if (field.required && !values[field.name]?.trim()) {
        nextErrors[field.name] = `${field.label} is required.`;
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    // Form endpoint pending — see docs/CONTENT-REGISTER.md {{FORM-ENDPOINT-01}}
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="border-t-2 border-teal pt-8" role="status">
        <h2 className="font-display font-medium text-heading-2 text-ink mb-2">
          Message sent.
        </h2>
        <p className="text-body text-ink-2 max-w-[52ch]">
          {route.destination} We&rsquo;ll respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Reason for contact" className="grid grid-cols-4 gap-3 mb-12 max-[767px]:grid-cols-2">
        {ROUTES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => handleRouteChange(r.id)}
            aria-pressed={r.id === routeId}
            className={`text-left border rounded-card px-5 py-5 transition-all duration-base ease-standard ${
              r.id === routeId
                ? "border-teal bg-teal-tint"
                : "border-hairline bg-white hover:border-hairline-strong"
            }`}
          >
            <span className="font-display font-medium text-heading-4 text-ink block mb-1">
              {r.label}
            </span>
            <span className="text-caption text-ink-muted">{r.description}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="max-w-[640px]">
        <div className="grid grid-cols-2 gap-6 max-[599px]:grid-cols-1">
          {route.fields.map((field) => (
            <div key={field.name} className={field.type === "textarea" ? "col-span-2" : ""}>
              <Field
                field={field}
                value={values[field.name] ?? ""}
                onChange={(v) => setValues((s) => ({ ...s, [field.name]: v }))}
                error={errors[field.name]}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center h-[50px] px-[26px] rounded-control text-[15px] font-semibold bg-teal text-white shadow-e1 hover:shadow-e2 transition-shadow duration-fast ease-standard mt-10 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
