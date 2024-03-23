import React from "react";
import Link from "next/link";

import s from "./footer.module.scss";
import cs from "../../scss/helpers.module.scss";

import Facebook from "../../../public/img/facebook.svg";
import Instagram from "../../../public/img/instagram.svg";
import Twitter from "../../../public/img/twitter.svg";
import Linkedin from "../../../public/img/linkedin.svg";

const social = [
  {
    title: "facebook",
    icon: <Facebook aria-hidden="true" />,
    linkUrl: "",
  },
  {
    title: "instagram",
    icon: <Instagram aria-hidden="true" />,
    linkUrl: "",
  },
  {
    title: "twitter",
    icon: <Twitter aria-hidden="true" />,
    linkUrl: "",
  },
  {
    title: "linkedin",
    icon: <Linkedin aria-hidden="true" />,
    linkUrl: "",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <ul className={s.list}>
          {social.map((obj, i) => (
            <li key={i} className={s.item}>
              <Link
                href={obj.linkUrl}
                target="_blank"
                aria-label={`Go to our ${obj.title} page.`}
                className={s.link}>
                {obj.icon}
              </Link>
            </li>
          ))}
        </ul>

        <small className={s.copy}>Copyright ©2020 All rights reserved</small>
      </div>
    </footer>
  );
};
