import { SITE } from "./config";
import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

import Footer from "./components/Footer";
import Logo from "./components/Logo.svg";
import CopyPageButton from "./components/CopyPageButton";

function MainWrapper({ children }) {
  const config = useConfig();
  const { pathname } = useRouter();
  // pass both candidates; CopyPageButton tries primary then fallback
  const filePath = "pages" + pathname + ".mdx";
  const filePathFallback = "pages" + pathname + "/index.mdx";
  // https://github.com/org/repo/tree/branch → https://raw.githubusercontent.com/org/repo/branch
  const rawBase = (config?.docsRepositoryBase ?? "")
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/tree/", "/");

  return (
    <>
      <CopyPageButton filePath={filePath} filePathFallback={filePathFallback} repoBase={rawBase} />
      {children}
    </>
  );
}

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  logo: <Logo />,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  docsRepositoryBase: `${SITE.github}/docs/tree/main`,
  project: {
    link: SITE.github,
  },
  chat: {
    link: SITE.discord,
  },
  footer: {
    text: <Footer />,
  },
  navigation: {
    prev: false,
    next: false,
  },
  feedback: {
    useLink: () => SITE.github,
  },
  main: MainWrapper,
  head: null,
  useNextSeoProps() {
    const { frontMatter } = useConfig();
    return {
      additionalLinkTags: [
        {
          href: "/favicon-light.png",
          rel: "icon",
        },
      ],
      titleTemplate: "%s - OpenNext",
      description: frontMatter.description || "Open-source Next.js adapters",
      openGraph: {
        titleTemplate: "%s - OpenNext",
        images: [
          {
            url: frontMatter.image || "/share.png",
          },
        ],
      },
      twitter: {
        cardType: "summary_large_image",
        site: SITE.url,
      },
    };
  },
};
