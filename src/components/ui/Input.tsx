import { cn } from "@/lib/cn";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-[var(--hairline)] bg-black/0 px-4 text-sm text-[var(--foreground)]/90",
        "placeholder:text-[var(--muted)]",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        props.className
      )}
    />
  );
}

