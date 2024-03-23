"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { SkeletonSignBtn } from "../../../components";
import { useMediaQuery } from "../../../utils/customHooks";
import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signBtn.module.scss";
import cs from "../../scss/helpers.module.scss";

type SignBtnProps = {
  className: string;
  onCloseClick: () => void;
};

const SuspenseSignBtn: React.FC<SignBtnProps> = ({ className, onCloseClick }) => {
  const { isMQ576 } = useMediaQuery();

  const { data: session } = useSession();
  const pathname = usePathname();
  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const [isActive, setIsActive] = React.useState(false);

  // **
  const onDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget.lastElementChild) return;

    const dropdown = e.currentTarget;
    setIsActive((b) => !b);

    function hideDropdown(e: MouseEvent) {
      if (dropdown && !e.composedPath().includes(dropdown)) {
        setIsActive(false);
        document.documentElement.removeEventListener("click", hideDropdown);
      }
    }

    document.documentElement.addEventListener("click", hideDropdown);
  };

  const onExitClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    await signOut({
      redirect: false,
    });

    window.location.reload();
  };

  // **
  const onModalCloseClick = () => {
    onCloseClick && onCloseClick();
  };

  return session ? (
    isMQ576 ? (
      <div onClick={onDropdownClick} className={s.root}>
        <button className={`${s.btn} ${className}`}>{session.user?.email}</button>

        <ul className={`${s.list} ${isActive ? s.listActive : ""}`}>
          <li className={s.item}>
            <Link href="" className={s.link}>
              Profile
            </Link>
          </li>

          <li className={s.item}>
            <Link onClick={onExitClick} href="/" className={s.link}>
              Exit
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      <Link
        onClick={onModalCloseClick}
        className={`${s.btn} ${className}`}
        href="/account/profile"
        scroll={false}>
        {session.user?.email}
      </Link>
    )
  ) : (
    <Link
      className={className}
      href={`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
      scroll={false}>
      Sign-in/up
    </Link>
  );
};

// **
export const SignBtn: React.FC<SignBtnProps> = ({ className, onCloseClick }) => (
  <Suspense fallback={<SkeletonSignBtn />}>
    <SuspenseSignBtn className={className} onCloseClick={onCloseClick} />
  </Suspense>
);
