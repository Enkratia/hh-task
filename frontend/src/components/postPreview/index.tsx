"use client";

import React from "react";
import Link from "next/link";

import { formatDate } from "../../utils/customFunctions";

import s from "./postPreview.module.scss";
import cs from "../../scss/helpers.module.scss";

type PostPreviewProps = {
  post: PostType;
};

export const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  return (
    <article className={s.root}>
      <h3 className={s.title}>
        <Link className={s.titleLink} href="">
          {post.title}
        </Link>
      </h3>

      <ul className={s.metadata}>
        <li className={s.metadataItem}>{formatDate(post.date)}</li>

        {post.tags.map((tag, i) => (
          <li key={i} className={s.metadataItem}>
            <Link href="" className={s.metadataTag}>
              {tag}
            </Link>

            {i === post.tags.length - 1 ? "" : ","}
          </li>
        ))}
      </ul>

      <p className={s.content}>{post.content}</p>
    </article>
  );
};
