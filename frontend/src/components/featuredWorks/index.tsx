"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";
import autoplay from "embla-carousel-autoplay";

import { WorkPreview } from "../../components";
import { useMediaQuery } from "../../utils/customHooks";

import s from "./featuredWorks.module.scss";
import cs from "../../scss/helpers.module.scss";

const initialWorks: WorkType[] = [
  {
    id: "1",
    imageUrl: "https://i.ibb.co/wRk8R6T/work1.png",
    title: "Designing Dashboards",
    date: "2020-03-21T20:10:24.215Z",
    category: "Dashboard",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "2",
    imageUrl: "https://i.ibb.co/F3GpGgC/work2.png",
    title: "Vibrant Portraits of 2020",
    date: "2018-03-21T20:10:24.215Z",
    category: "Illustration",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "3",
    imageUrl: "https://i.ibb.co/k69QD0D/work3.png",
    title: "36 Days of Malayalam type",
    date: "2018-03-21T20:10:24.215Z",
    category: "Typography",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const FeaturedWorks: React.FC = () => {
  const { isMQ576 } = useMediaQuery();
  const [works, setWorks] = React.useState(initialWorks.slice(0, 3));

  const plugins = [autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })];
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      active: !isMQ576,
    },
    plugins,
  );

  React.useEffect(() => {
    if (isMQ576) {
      setWorks(initialWorks);
    } else {
      setWorks(initialWorks.slice(0, 3));
    }
  }, [isMQ576]);

  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>Featured works</h2>

      <div className={`${s.container} ${cs.container}`}>
        <p className={s.title}>Featured works</p>

        <div className={s.sliderWrapper} ref={emblaRef}>
          <div className={s.slider}>
            {works.map((work) => (
              <div key={work.id} className={s.slide}>
                <WorkPreview work={work} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
