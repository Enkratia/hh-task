import React from "react";
import Image from "next/image";
import Link from "next/link";

import s from "./hero.module.scss";
import cs from "../../scss/helpers.module.scss";

export const Hero: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Presentation.</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.text}>
          <p className={s.title}>Hi, I am John, Creative Technologist</p>
          <p className={s.descr}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>

          <a href="/csv/resume.csv" className={`${s.btn} ${cs.btn}`} download>
            Download Resume
          </a>
        </div>

        <div className={s.imageWrapper}>
          <div className={s.imageWrapperInner}>
            <Image
              className={s.image}
              src="https://i.ibb.co/sqx9MRx/author.png"
              alt="Authors' picture."
              sizes="250px"
              fill></Image>
          </div>
        </div>
      </div>
    </section>
  );
};
