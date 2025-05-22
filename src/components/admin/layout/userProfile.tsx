import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import {
  Button,
  Avatar,
  Typography,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { createElement, useEffect, useState } from "react";
import { useAtom } from "jotai";

export default function UserProfile() {
  const { user, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const callbackUrl = `${baseUrl}${pathname}`;
  const profileMenuItems = [
    {
      label: "Perfil",
      icon: UserCircleIcon,
      link: "/dashboard/profile",
    },
    {
      label: "Cerrar sesion",
      icon: ArrowLeftOnRectangleIcon,
      link: `/auth/logout?returnTo=${encodeURIComponent(callbackUrl)}`,
    },
  ];
  const closeMenu = () => setIsMenuOpen(false);
  if (isLoading) {
    return <div></div>;
  }
  if (!user) {
    return (
      <a
        href={`/auth/login?returnTo=${callbackUrl}`}
        className="w-36 h-12 flex justify-center items-center rounded-lg bg-blue-dark hover:shadow-md text-white hover:text-white/80 duration-300"
      >
        Iniciar sesión
      </a>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center h-12 gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                src={user.picture as string}
              />
              <Typography className="capitalize">{user.name}</Typography>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon, link }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <a href={link} key={key}>
                  <MenuItem
                    key={label}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        : ""
                    }`}
                  >
                    {createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}

                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                </a>
              );
            })}
          </MenuList>
        </Menu>
      </div>
    </>
  );
}
