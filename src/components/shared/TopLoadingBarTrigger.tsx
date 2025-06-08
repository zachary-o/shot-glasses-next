"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLoadingBar } from "react-top-loading-bar";

const TopLoadingBarTrigger = () => {
  const pathName = usePathname();
  const loadingBar = useLoadingBar();

  useEffect(() => {
    loadingBar.start();

    const timer = setTimeout(() => {
      loadingBar.complete();
    }, 400);

    return () => clearTimeout(timer);
  }, [loadingBar, pathName]);
  return null;
};
export default TopLoadingBarTrigger;
