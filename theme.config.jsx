import { useConfig } from "nextra-theme-docs";

import Footer from "./components/Footer";
import Logo from "./components/Logo.svg";

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  logo: <Logo />,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  docsRepositoryBase: "https://github.com/sst/open-next/tree/main/docs",
  project: {
    link: "https://github.com/sst/open-next",
  },
  chat: {
    link: "https://sst.dev/discord",
  },
  footer: {
    text: <Footer />,
  },
  navigation: {
    prev: false,
    next: false,
  },
  feedback: {
    useLink: () => "https://github.com/sst/open-next/issues/new",
  },
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
      description:
        frontMatter.description || "Open source Next.js serverless adapter",
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
        site: "https://open-next.js.org",
      },
    };
  },
};
