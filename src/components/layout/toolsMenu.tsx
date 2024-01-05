import {
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { title } from "process";
import React from "react";
import Image from "next/image";

interface Props {
  toolsMenuItems: {
    title: string;
    description: string;
    icon: any;
  }[];
}

export default function ToolsMenu({ toolsMenuItems }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = toolsMenuItems.map(
    ({ icon, title, description }: any, key: any) => (
      <a href="#" key={key}>
        <MenuItem
          placeholder={undefined}
          className="flex items-center gap-3 rounded-lg"
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              placeholder={undefined}
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              placeholder={undefined}
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );
  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      offset={{ mainAxis: 20 }}
      placement="bottom-end"
    >
      <MenuHandler>
        <Image
          alt=""
          width={50}
          height={50}
          src={"svg/icons/appsIcon.svg"}
          onClick={() => setIsMobileMenuOpen((cur) => !cur)}
          className="w-12 cursor-pointer"
        />
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
