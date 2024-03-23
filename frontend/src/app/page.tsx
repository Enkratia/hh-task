import React from "react";
import { Metadata } from "next";

import { FeaturedWorks, Hero, RecentPosts } from "../components";

import cs from "../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function Home() {
  return (
    <main>
      <h1 className={cs.srOnly}>Portfolio. Home page.</h1>

      <Hero />
      <RecentPosts />
      <FeaturedWorks />
    </main>
  );
}
