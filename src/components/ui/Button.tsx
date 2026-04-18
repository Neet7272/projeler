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
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-0",
    variant === "primary" &&
      "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
    variant === "secondary" &&
      "border border-[var(--hairline)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
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

