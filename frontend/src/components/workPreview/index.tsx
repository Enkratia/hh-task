import React from "react";
import Image from "next/image";

import s from "./workPreview.module.scss";
import cs from "../../scss/helpers.module.scss";
import Link from "next/link";

type WorkProps = {
  work: WorkType;
};

export const WorkPreview: React.FC<WorkProps> = ({ work }) => {
  return (
    <article className={s.root}>
      <div className={s.imageWrapper}>
        <Link href="" className={s.imageWrapperInner}>
          <Image
            src={work.imageUrl}
            alt="Works' picture."
            sizes="(max-width: 576px) 100vw, 250px"
            fill></Image>
        </Link>
      </div>

      <div className={s.text}>
        <h3 className={s.title}>
          <Link className={s.titleLink} href="">
            {work.title}
          </Link>
        </h3>

        <div className={s.metadata}>
          <span className={s.date}>{new Date(work.date).getFullYear()}</span>

          <Link href="" className={s.category}>
            {work.category}
          </Link>
        </div>

        <p className={s.content}>{work.content}</p>
      </div>
    </article>
  );
};
