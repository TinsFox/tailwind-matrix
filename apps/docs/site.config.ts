import { title } from "process";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  nav: INavConfig[];
  links: {
    twitter?: string;
    github?: string;
    docs?: string;
  };
}
export interface INavConfig {
  title: string;
  url: string;
}
const NavConfig = [
  {
    title: "Getting Started",
    url: "/getting-started",
  },
  {
    title: "Getting Started",
    url: "/getting-started",
  },
  {
    title: "Getting Started",
    url: "/getting-started",
  },
  {
    title: "Getting Started",
    url: "/getting-started",
  },
];
export const siteConfig: SiteConfig = {
  name: "react tailwind",
  description: "A react components built with Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  nav: NavConfig,
  links: {
    twitter: "https://twitter.com/TinsFox",
    github: "https://github.com/TinsFox/cuiller-ui",
    // docs: location.href,
  },
};
