import { cn } from "@/lib/cn";
import { cardMatteInteractive } from "@/lib/uiClasses";

export function StatCard(props: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className={cn("p-6", cardMatteInteractive)}>
      <p className="text-sm font-medium text-slate-500">{props.label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {props.value}
      </p>
      {props.hint ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{props.hint}</p>
      ) : null}
    </div>
  );
}
