import { useTranslation } from "react-i18next";
import aboutBanner from "../../assets/isons/images/hlr-about-banner_str.png";
import { ReactComponent as HlrLogo } from "../../assets/isons/logo_slogan.svg";

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-white">

      {/* HLR BANNER — FULL WIDTH */}
        <section className="relative w-full">
            <img
                src={aboutBanner}
                alt=""
                className="block w-full h-auto"
            />

        {/* LOGO + SLOGAN */}
        <div className="absolute inset-0 flex flex-col items-start justify-end px-8 pb-6">
          
            <h2 className=" text-center
          text-xl
          font-normal text-accent
          md:text-left
          md:text-3xl
          lg:text-4xl">

            {t("aboutPage.banner.title")}
            </h2>

        </div>
        </section>

      {/* THREE-COLUMN CONTENT */}
        <div className="flex flex-row w-full">

        {/* LEFT NAVIGATION */}
        <aside className="hidden md:block md:w-1/5 p-9">
            <nav
            className="
                sticky
                top-42
                pt-12
                flex
                flex-col
                gap-3
                text-base
            "
            >
            <a href="#about" className="hover:text-accent">
                {t("aboutPage.nav.about")}
            </a>

            <a href="#team" className="hover:text-accent">
                {t("aboutPage.nav.team")}
            </a>

            <a href="#contributors" className="hover:text-accent">
                {t("aboutPage.nav.contributors")}
            </a>

            <a href="#partners" className="hover:text-accent">
                {t("aboutPage.nav.partners")}
            </a>

            <a href="#contacts" className="hover:text-accent">
                {t("aboutPage.nav.contacts")}
            </a>
            </nav>
        </aside>


        {/* CENTER CONTENT */}
        <main className="w-full md:w-3/5 px-6 md:px-4 pb-16">

            <section
            id="about"
            className="scroll-mt-24 pt-10"
            >
            <div className="text-black">

                <p className="text-2xl md:text-3xl mb-7 leading-tight">
                <span className="font-semibold">
                    {t("aboutPage.description.introBefore")}
                </span>{" "}
                <span className="font-semibold">
                    {t("aboutPage.description.projectName")}
                </span>
                </p>

                <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p>
                    {t("aboutPage.description.paragraph1")}
                </p>

                <p>
                    {t("aboutPage.description.paragraph2")}
                </p>

                <p>
                    {t("aboutPage.description.paragraph3")}
                </p>
                </div>

            </div>
            </section>


            <section
            id="team"
            className="mt-10 scroll-mt-24 border-t border-black/30 pt-6"
            >
            {/* team */}
            </section>


            <section
            id="contributors"
            className="mt-10 scroll-mt-24 border-t border-black/30 pt-6"
            >
            {/* contributors */}
            </section>


            <section
            id="partners"
            className="mt-10 scroll-mt-24 border-t border-black/30 pt-6"
            >
            {/* partners */}
            </section>


            <section
            id="contacts"
            className="mt-10 scroll-mt-24 border-t border-black/30 pt-6"
            >
            {/* contacts */}
            </section>

        </main>


        {/* RIGHT EMPTY COLUMN */}
        <aside className="hidden md:block md:w-1/5 p-4">
        </aside>

        </div>
    </div>
  );
}