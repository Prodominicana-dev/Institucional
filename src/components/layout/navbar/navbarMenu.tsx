import {
  Menu,
  MenuHandler,
  Typography,
  ListItem,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

interface Props {
  title: string;
  className?: string;
  navListMenuItems: {
    title: string;
    description: string;
    icon: any;
    link: string;
  }[];
}

const routeMap: Record<string, string> = {
  "/quienessomos": "/whoarewe",
  "/historia": "/history",
  "/ceo": "/ceo",
  "/organigrama": "/organizationalstructure",
  "/marcolegal": "/legalframework",
  "/servicios/inversion": "/services/invest",
  "/servicios/exportacion": "/services/export",
  "/galeria": "/gallery",
  "/noticias": "/news",
  "/eventos": "/events",
  "/tv": "/tv",
};

export default function NavbarMenu({ title, navListMenuItems }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, "");
  const translatedPath = routeMap[normalizedPathname] || normalizedPathname;
   const locale = useLocale();
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }: any, key: any) => (
      <Link href={link} locale={locale} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg border-0">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6 text-gray-900",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold font-montserrat"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500 font-montserrat"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      offset={{ mainAxis: 20 }}
      placement="bottom"
      allowHover={true}
    >
      <MenuHandler>
        <Typography as="div" className="xl:font-xl text-center">
          <ListItem
            className={`h-20 px-5 bg-transparent rounded-none hover:bg-transparent  hover:text-white ${
              navListMenuItems.some((item) => item.link === translatedPath)
                ? "text-white"
                : "text-cyan-600"
            } cursor-pointer font-bold font-montserrat`}
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
          >
            {title}
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
        <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
          {renderItems}
        </ul>
      </MenuList>
    </Menu>
  );
}
