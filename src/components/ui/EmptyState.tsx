import { Button } from "@/components/ui/Button";

export function EmptyState(props: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-black/0 text-[var(--muted)]">
        ⌁
      </div>
      <p className="mt-5 text-sm font-semibold text-[var(--foreground)]">
        {props.title}
      </p>
      {props.description ? (
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {props.description}
        </p>
      ) : null}
      {props.actionLabel && props.onAction ? (
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" onClick={props.onAction}>
            {props.actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

