import { Button } from "@/components/ui/Button";

export function EmptyState(props: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-10 text-center shadow-[var(--shadow-matte)] backdrop-blur-sm transition-all duration-300 hover:border-sky-500/25 hover:shadow-[var(--shadow-matte-hover)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50 text-slate-500">
        ⌁
      </div>
      <p className="mt-5 text-sm font-semibold tracking-tight text-slate-900">
        {props.title}
      </p>
      {props.description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{props.description}</p>
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
