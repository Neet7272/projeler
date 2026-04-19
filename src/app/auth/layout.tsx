import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthRootLayout(props: {
  children: React.ReactNode;
}) {
  return props.children;
}
