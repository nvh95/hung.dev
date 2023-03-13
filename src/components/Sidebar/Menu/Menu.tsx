import React from "react";

import { Link } from "gatsby";

import Mailchimp from "../Mailchimp";

import * as styles from "./Menu.module.scss";

type Props = {
  menu: Array<{
    label: string;
    path: string;
  }>;
};

const Menu: React.FC<Props> = ({ menu }: Props) => (
  <nav className={styles.menu}>
    <ul className={styles.list}>
      {menu.map((item) => (
        <li className={styles.item} key={item.path}>
          <Link
            to={item.path}
            className={styles.link}
            activeClassName={styles.active}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li className={styles.item}>
        <a
          href="https://handbook.hung.dev"
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Handbook
        </a>
      </li>
      <li className={styles.item}>
        <a
          href="https://huwng.wordpress.com/"
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Wordpress Blog
        </a>
      </li>
      <li className={styles.item}>
        <a
          href="https://trochuyenit.hung.dev/?utm_source=blog"
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Podcast
        </a>
      </li>
    </ul>
    <Mailchimp />
  </nav>
);

export default Menu;
