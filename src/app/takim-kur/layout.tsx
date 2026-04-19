import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TakimKurLayout(props: {
  children: React.ReactNode;
}) {
  return props.children;
}
