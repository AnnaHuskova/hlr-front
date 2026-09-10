import { memo } from "react";
import neboPoleLogo from "../../assets/isons/logo_hlr.svg";

const Footer = memo(() => {
  return (
    <footer className="hidden lg:flex h-[63px] items-center px-6">
      <img
        src={neboPoleLogo}
        alt="NeboPole.Labs"
        className="h-full w-auto"
      />
    </footer>
  );
});

export { Footer };