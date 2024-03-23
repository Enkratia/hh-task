"use client";

import React from "react";

export const useMediaQuery = () => {
  // NextJS звчем-то запускает хуки на сервере?
  const isWU = typeof window === "undefined" ? true : false;

  // **
  let mdq1024: MediaQueryList | undefined = undefined;
  let mdq896: MediaQueryList | undefined = undefined;
  let mdq678: MediaQueryList | undefined = undefined;
  let mdq576: MediaQueryList | undefined = undefined;

  if (!isWU) {
    mdq1024 = window.matchMedia("(min-width: 1024px)");
    mdq896 = window.matchMedia("(min-width: 896px)");
    mdq678 = window.matchMedia("(min-width: 678px)");
    mdq576 = window.matchMedia("(min-width: 576px)");
  }

  const [isMQ1024, setIsMQ1024] = React.useState(mdq1024?.matches);
  const [isMQ896, setIsMQ896] = React.useState(mdq896?.matches);
  const [isMQ678, setIsMQ678] = React.useState(mdq678?.matches);
  const [isMQ576, setIsMQ576] = React.useState(mdq576?.matches);

  React.useEffect(() => {
    mdq1024?.addEventListener("change", checkMQ1024);
    mdq896?.addEventListener("change", checkMQ896);
    mdq678?.addEventListener("change", checkMQ678);
    mdq576?.addEventListener("change", checkMQ576);
  });

  const checkMQ1024 = () => {
    if (mdq1024?.matches) {
      setIsMQ1024(true);
    } else {
      setIsMQ1024(false);
    }
  };

  const checkMQ896 = () => {
    if (mdq896?.matches) {
      setIsMQ896(true);
    } else {
      setIsMQ896(false);
    }
  };

  const checkMQ678 = () => {
    if (mdq678?.matches) {
      setIsMQ678(true);
    } else {
      setIsMQ678(false);
    }
  };

  const checkMQ576 = () => {
    if (mdq576?.matches) {
      setIsMQ576(true);
    } else {
      setIsMQ576(false);
    }
  };

  return { isMQ1024, isMQ896, isMQ678, isMQ576 };
};
