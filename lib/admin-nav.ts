export function adminNav(activeHref: string) {
  return [
    { href: "/admin", label: "Overview", active: activeHref === "/admin" },
    { href: "/admin/users", label: "Users", active: activeHref === "/admin/users" },
    { href: "/admin/requests", label: "Messages", active: activeHref === "/admin/requests" },
    { href: "/admin/projects", label: "Projects", active: activeHref === "/admin/projects" },
    { href: "/admin/examples", label: "Work Examples", active: activeHref === "/admin/examples" },
  ];
}
