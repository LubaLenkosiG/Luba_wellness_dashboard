"use client";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { FaCog, FaSearch } from "react-icons/fa";
import "@/app/globals.css";
import { MenuItems } from "@/components/Menu";
import LogoutModal from "@/components/LogoutModal";

const Layout = ({ children }) => {
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [logoutHref, setLogoutHref] = useState("");

  const handleLogoutClick = useCallback((href) => {
    setLogoutHref(href); // Save the logout link
    setIsDialogVisible(true); // Show the confirmation dialog
  }, []);

  const handleCloseModal = () => {
    setIsDialogVisible(false);
  };


  const pathnameFromRouter = usePathname();
  const [pathname, setPathName] = useState("homePage");

  const isActive = (path) => {
    console.log("path name :  ", pathname);

    return pathname === path
      ? "ml-5 bg-bgSoftLight text-white hover:text-bgSoftLight "
      : "hover:text-gray-950 transition-all duration-300 ";
  };

  useEffect(() => {
    if (pathnameFromRouter) {
      setPathName(pathnameFromRouter);
    }

    const sidebarToggleBtn = document.getElementById("toggle-sidebar");
    const sidebarCollapseMenu = document.getElementById(
      "sidebar-collapse-menu"
    );

    // Handle sidebar toggle
    sidebarToggleBtn?.addEventListener("click", () => {
      if (!sidebarCollapseMenu.classList.contains("open")) {
        sidebarCollapseMenu.classList.add("open");
        sidebarCollapseMenu.style.cssText =
          "width: 250px; visibility: visible; opacity: 1;";
        sidebarToggleBtn.style.cssText = "left: 236px;";
      } else {
        sidebarCollapseMenu.classList.remove("open");
        sidebarCollapseMenu.style.cssText =
          "width: 32px; visibility: hidden; opacity: 0;";
        sidebarToggleBtn.style.cssText = "left: 10px;";
      }
    });
    return () => {
      sidebarToggleBtn?.removeEventListener("click", () => {});
    };
  }, [pathnameFromRouter]);

  return (
    <div className="relative bg-transparent h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8 ">
          <div
            id="sidebar-collapse-menu"
            className="scrollbar-hide bg-transparent shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500 flex flex-col justify-between"
          >
            <div className="">
              <div className="pt-8 pb-2 px-6 sticky top-0 bg-transparent min-h-[80px] z-[100]">
                <a href="/superAdmin" className="outline-none flex">
                  <h4 className="tracking-widest text-2xl font-bold text-[#f7f6f9]">
                    WellnessWatch
                  </h4>
                </a>
                <hr className="w-full mt-3" />
              </div>

              <div className="py-6 px-6">
                <ul className="space-y-2">
                  {MenuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className={` text-sm flex items-center cursor-pointer rounded-md px-3 py-3 transition-all duration-500  hover:bg-[#d9f3ea] gap-3 text-white ${isActive(
                          item.href
                        )}`}
                        onClick={
                          item.href === "/logout"
                            ? (e) => {
                                e.preventDefault(); // Prevent the default link navigation
                                handleLogoutClick(item.href);
                              }
                            : undefined
                        } //
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-8 pb-2 px-6 animate-pulse text-textLight">
              <h4>Version 3.0-Alpha-Pro</h4>
            </div>
          </div>
        </nav>

        <button
          id="toggle-sidebar"
          className="lg:hidden w-8 h-8 z-[100] fixed top-[36px] left-[10px] cursor-pointer  flex items-center justify-center rounded-full outline-none transition-all duration-500"
        >
          <CiMenuFries
            size={35}
            className="cursor-pointer  ml-auto p-1 text-white w-full h-full rounded-full z-40"
          />
        </button>

        <section className="main-content w-full px-8">
          <header className="z-50 bg-transparent sticky top-0 pt-8">
            <div className="flex flex-wrap items-center w-full relative tracking-wide">
              <div className="flex items-center gap-y-6 max-sm:flex-col z-50 w-full pb-2">
                <div className="flex invisible max-sm:hidden max-md:hidden items-center gap-4 w-full px-6 bg-white shadow-sm min-h-[48px] sm:mr-20 rounded-md outline-none border-none">
                  <input
                    type="text"
                    placeholder="Search something..."
                    className="w-full text-sm bg-transparent rounded outline-none"
                  />
                  <FaSearch
                    size={35}
                    className="w-6 cursor-pointer fill-gray-400 ml-auto"
                  />
                </div>

                <div className="flex items-center justify-end gap-6 ml-auto">
                  <div className="flex items-center space-x-6">
                    <div className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-red-200 cursor-pointer">
                      <FaCog className="w-[18px] h-[18px] text-bgColor animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="my-10 px-2 w-full">
            <div className="w-full">{children}</div>
          </div>
        </section>
      </div>
      <LogoutModal isOpen={isDialogVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default Layout;
