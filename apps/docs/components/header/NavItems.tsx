import Link from "next/link";
interface INavItems {
  label: string;
  href: string;
}
const navItems: INavItems[] = [
  {
    label: "Docs",
    href: "/docs/installation",
  },
  {
    label: "Components",
    href: "components",
  },
];

export const NavItems = () => {
  return (
    <>
      {navItems.map((nav) => (
        <Link key={nav.href} href={nav.href}>
          {nav.label}
        </Link>
      ))}
    </>
  );
};
