"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";
import autoplay from "embla-carousel-autoplay";

import { PostPreview } from "../../../components";
import { useMediaQuery } from "../../../utils/customHooks";

import s from "./recentPostsSlider.module.scss";
import cs from "../../../scss/helpers.module.scss";

const initialPosts: PostType[] = [
  {
    id: "1",
    title: "Making a design system from scratch",
    date: "2020-02-12T17:00:18.075Z",
    tags: ["Design", "Pattern"],
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "2",
    title: "Creating pixel perfect icons in Figma",
    date: "2020-02-12T17:00:18.075Z",
    tags: ["Figma", "Icon Design"],
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "3",
    title: "Creating pixel perfect icons in Figma",
    date: "2020-02-12T17:00:18.075Z",
    tags: ["Figma", "Icon Design"],
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const RecentPostsSlider: React.FC = () => {
  const { isMQ678 } = useMediaQuery();
  const [posts, setPosts] = React.useState(initialPosts.slice(0, 2));

  const plugins = [autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })];
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      active: isMQ678,
    },
    plugins,
  );

  React.useEffect(() => {
    if (isMQ678) {
      setPosts(initialPosts);
    } else {
      setPosts(initialPosts.slice(0, 2));
    }
  }, [isMQ678]);

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.slider}>
        {posts.map((post) => (
          <div key={post.id} className={s.slide}>
            <PostPreview post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};
