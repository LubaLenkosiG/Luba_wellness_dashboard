import {
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

export const MenuItems = [
  {
    label: "Dashboard",
    href: "/dashAdmin",
    icon: <FaHome size={20} />,
    roles: ["admin", "patient"],
  },
  {
    label: "Risk Input",
    href: "/riskinput",
    icon: <FaClipboardList size={20} />,
    roles: ["admin"],
  },
  {
    label: "Predictions",
    href: "/predictions",
    icon: <FaChartBar size={20} />,
    roles: ["admin", "patient"],
  },

  {
    label: "Log Out",
    href: "/logout",
    icon: <FaSignOutAlt size={20} />,
    roles: ["admin", "patient"],
  },
];
