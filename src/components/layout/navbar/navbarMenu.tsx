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

interface Props {
  title: string;
  navListMenuItems: {
    title: string;
    description: string;
    icon: any;
  }[];
}

export default function NavbarMenu({ title, navListMenuItems }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }: any, key: any) => (
      <Link href={link} key={key}>
        <MenuItem
          placeholder={undefined}
          className="flex items-center gap-3 rounded-lg"
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6 text-gray-900",
            })}
          </div>
          <div>
            <Typography
              placeholder={undefined}
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold font-montserrat"
            >
              {title}
            </Typography>
            <Typography
              placeholder={undefined}
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
        <Typography
          as="div"
          className="xl:font-xl text-center"
          placeholder={undefined}
        >
          <ListItem
            placeholder={undefined}
            className="h-20 px-5 bg-transparent rounded-none hover:bg-transparent  hover:text-white text-cyan-600 cursor-pointer font-bold font-montserrat"
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
          >
            {title}
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList
        placeholder={undefined}
        className="hidden max-w-screen-xl rounded-xl lg:block"
      >
        <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
          {renderItems}
        </ul>
      </MenuList>
    </Menu>
  );
}
