import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-sm ms:max-w-3xl">{children}</div>
    </div>
  );
};

export default Layout;
