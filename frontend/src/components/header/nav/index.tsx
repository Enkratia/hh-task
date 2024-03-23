"use client";

import React, { Suspense } from "react";
import Link from "next/link";

import { SignBtn } from "../../../components";
import { useMediaQuery } from "../../../utils/customHooks";
import { capitalize } from "../../../utils/customFunctions";

import s from "./nav.module.scss";
import cs from "../../../scss/helpers.module.scss";
import CloseSvg from "../../../../public/img/close.svg";

const linkNames = ["works", "blog", "contact"];

type NavProps = {
  onModalCloseClick?: () => void;
};

export const Nav: React.FC<NavProps> = ({ onModalCloseClick = null }) => {
  const { isMQ576 } = useMediaQuery();

  const onCloseClick = () => {
    if (isMQ576 || !onModalCloseClick) return;
    onModalCloseClick();
  };

  return (
    <div className={s.rootWrapper}>
      <div className={s.head}>
        <p className={`${s.title} ${cs.title}`}>Menu</p>

        <button onClick={onCloseClick} className={s.close} aria-label="Close this menu.">
          <CloseSvg aria-hidden="true" />
        </button>
      </div>

      <nav className={s.root}>
        <ul className={s.list}>
          {linkNames.map((link, i) => (
            <li key={i} className={s.item}>
              <Link href={`/${link}`} className={s.link}>
                {capitalize(link)}
              </Link>
            </li>
          ))}

          <SignBtn onCloseClick={onCloseClick} className={s.link} />
        </ul>
      </nav>
    </div>
  );
};

// export const Nav: React.FC = () => (
//   <Suspense>
//     <SuspenseNav />
//   </Suspense>
// );
