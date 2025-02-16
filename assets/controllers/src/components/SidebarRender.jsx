import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/SidebarUI";
import { cn } from "../utils/utils";

export function SidebarRender({ isAdmin }) {
  const links = [
    {
      label: "Liste des cours",
      href: "/courseslist",
      icon: <span className="material-symbols-outlined text-xl">menu_book</span>,
    },
    {
      label: "Mes cours",
      href: "/usercourses",
      icon: <span className="material-symbols-outlined text-xl">school</span>,
    },
    {
      label: "Administration",
      href: "/admin/dashboard",
      icon: <span className="material-symbols-outlined text-xl">construction</span>,
      requiresAdmin: true,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex bg-gray-100 dark:bg-neutral-800 min-h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody>
          {/* Logo container with center alignment and bottom margin */}
          <div id="logoDiv" className="flex justify-center mb-8">
            <a href="/">
              <img
                id="logo"
                src="/images/logo/logo.png"
                alt="Logo"
                className={`transition-all duration-200 object-contain ${open ? "h-20 w-20" : "h-10 w-10"}`}
              />
            </a>
          </div>
          {/* Navigation links */}
          <div className="flex flex-col space-y-2">
            {links.map((link, idx) => {
              if (link.requiresAdmin && !isAdmin) return null;
              return (
                <SidebarLink key={idx} link={link}>
                  <a
                    href={link.href}
                    className="flex items-center gap-4 p-2 rounded-md hover:bg-white/20 transition-colors duration-200"
                  >
                    {link.icon}
                    <span className="hidden md:inline">{link.label}</span>
                  </a>
                </SidebarLink>
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
