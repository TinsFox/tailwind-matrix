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
  links: {
    twitter?: string;
    github?: string;
    docs?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "tailwind design",
  description: "A components built with Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/TinsFox",
    github: "https://github.com/TinsFox/cuiller-ui",
    // docs: location.href,
  },
};
