import { Suspense } from "react";

export default function LoginLayout(props: { children: React.ReactNode }) {
  return <Suspense>{props.children}</Suspense>;
}

