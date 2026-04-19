import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/cn";

type BaseProps = {
  className?: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

type ButtonAsButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps & {
  href: LinkProps["href"];
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function isLinkButtonProps(props: ButtonProps): props is ButtonAsLinkProps {
  return typeof (props as ButtonAsLinkProps).href !== "undefined";
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";

  const classes = cn(
    "inline-flex h-11 min-h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold",
    "transition-all duration-300 ease-out active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    variant === "primary" &&
      cn(
        "bg-[var(--primary)] text-[var(--primary-foreground)]",
        "shadow-[inset_0_1px_0_rgb(255,255,255,0.22),0_1px_0_rgb(15,23,42,0.06),0_4px_14px_rgb(8,145,178,0.28)]",
        "hover:brightness-[1.05] hover:shadow-[inset_0_1px_0_rgb(255,255,255,0.25),0_2px_0_rgb(15,23,42,0.05),0_8px_24px_rgb(8,145,178,0.35)]"
      ),
    variant === "secondary" &&
      cn(
        "border border-slate-200/80 bg-white/90 text-slate-800",
        "shadow-[0_4px_20px_rgb(15,23,42,0.03)]",
        "hover:border-sky-500/25 hover:bg-white hover:text-slate-900 hover:shadow-[0_8px_28px_rgb(15,23,42,0.05)]"
      ),
    props.className
  );

  if (isLinkButtonProps(props)) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
      >
        {props.children}
      </Link>
    );
  }

  const { children, ...rest } = props;
  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}
