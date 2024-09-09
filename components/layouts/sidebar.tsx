"use client";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "@/store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "@/store";
import { useState, useEffect } from "react";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMinus from "@/components/icon/icon-minus";
import { usePathname } from "next/navigation";
// import { getTranslation } from '@/i18n';
import menu from "@/store/Menu";
import Image from "next/image";
import { useSession } from "next-auth/react";
// import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  // const { t } = getTranslation();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  // const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <Image
                className="ml-[5px] w-8 flex-none"
                src="/logo.png"
                alt="logo"
                width={100}
                height={100}
              />
              <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">
                E-Service
              </span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              {menu.map((e: any, idx) => {
                {
                  if ("subMenu" in e) {
                    return (
                      <li className="menu nav-item" key={idx}>
                        <button
                          type="button"
                          className={`${
                            currentMenu === e.title ? "active" : ""
                          } nav-link group w-full`}
                          onClick={() => toggleMenu(e.title)}
                        >
                          <div className="flex items-center">
                            <e.icon className="shrink-0 group-hover:!text-primary" />
                            <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                              {e.title}
                            </span>
                          </div>

                          <div
                            className={
                              currentMenu !== e.title
                                ? "-rotate-90 rtl:rotate-90"
                                : ""
                            }
                          >
                            <IconCaretDown />
                          </div>
                        </button>

                        <AnimateHeight
                          duration={300}
                          height={currentMenu === e.title ? "auto" : 0}
                        >
                          <ul className="sub-menu text-gray-500">
                            {e.subMenu?.map((i: any) => {
                              return (
                                <li key={i.href}>
                                  <Link href={i.href}>{i.title}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        </AnimateHeight>
                      </li>
                    );
                  } else if (e.href) {
                    return (
                      <li className="nav-item" key={idx}>
                        <Link href={e.href} className="group">
                          <div className="flex items-center">
                            <e.icon className="shrink-0 group-hover:!text-primary" />
                            <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                              {e.title}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <h2
                        className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]"
                        key={idx}
                      >
                        <IconMinus className="hidden h-5 w-4 flex-none" />
                        <span>{e.title}</span>
                      </h2>
                    );
                  }
                }
              })}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
