import { cn } from "@/lib/cn";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 text-sm text-slate-900",
        "placeholder:text-slate-500",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        props.className
      )}
    />
  );
}

