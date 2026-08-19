import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10 xl:px-24 ${className}`}>
      {children}
    </div>
  );
}
