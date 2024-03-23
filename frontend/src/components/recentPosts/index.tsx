import React from "react";
import Link from "next/link";

import { RecentPostsSlider } from "../../components";

import s from "./recentPosts.module.scss";
import cs from "../../scss/helpers.module.scss";

export const RecentPosts: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Recent posts</h2>

      <div className={`${s.container} ${cs.container}`}>
        <div className={s.head}>
          <p className={s.title}>Recent posts</p>

          <Link href="/recent-posts" className={s.link}>
            View all
          </Link>
        </div>

        <RecentPostsSlider />
      </div>
    </section>
  );
};
