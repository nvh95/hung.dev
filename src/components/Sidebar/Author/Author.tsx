import React from "react";

import { Link } from "gatsby";

import * as styles from "./Author.module.scss";

type Props = {
  author: {
    name: string;
    bio: string;
    photo: string;
    gif: string;
  };
  isIndex?: boolean;
};

const Author = ({ author, isIndex }: Props) => (
  <div className={styles.author}>
    <Link to="/">
      <img alt={author.name} src={author.gif} className={styles.photo} />
    </Link>

    {isIndex ? (
      <h1 className={styles.title}>
        <Link className={styles.link} to="/">
          {author.name}
        </Link>
      </h1>
    ) : (
      <h2 className={styles.title}>
        <Link className={styles.link} to="/">
          {author.name}
        </Link>
      </h2>
    )}
    <p className={styles.subtitle}>{author.bio}</p>
  </div>
);

export default Author;
