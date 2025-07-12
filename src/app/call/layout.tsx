import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full bg-slate-900 text-white">{children}</div>
  );
}
