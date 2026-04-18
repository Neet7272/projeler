export function StatCard(props: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6">
      <p className="text-sm font-medium text-[var(--muted)]">{props.label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
        {props.value}
      </p>
      {props.hint ? (
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{props.hint}</p>
      ) : null}
    </div>
  );
}

