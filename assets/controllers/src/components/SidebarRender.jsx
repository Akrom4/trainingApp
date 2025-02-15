import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/SidebarUI";
import { cn } from "../utils/utils";

export function SidebarRender({ isAdmin }) {
  const links = [
    {
      label: "Liste des cours",
      href: "/courseslist",
      icon: <span className="material-symbols-outlined">menu_book</span>,
    },
    {
      label: "Mes cours",
      href: "/usercourses",
      icon: <span className="material-symbols-outlined">school</span>,
    },
    {
      label: "Administration",
      href: "/admin/dashboard",
      icon: <span className="material-symbols-outlined">construction</span>,
      requiresAdmin: true,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className={cn("rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody>
          <div id="logoDiv">
            <a href="/">
              <img id="logo" src="/images/logo/logo.png" alt="Logo"/>
            </a>
          </div>
          <div>
            {links.map((link, idx) => {
              if (link.requiresAdmin && !isAdmin) {
                return null;
              }
              return (
                <SidebarLink key={idx} link={link}>
                  <a href={link.href} className="icon google-font filled">
                    {link.icon}
                    {link.label}
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
