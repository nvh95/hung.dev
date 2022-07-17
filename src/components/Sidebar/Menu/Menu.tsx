import React from "react";

import { Link } from "gatsby";

import * as styles from "./Menu.module.scss";
import Mailchimp from "../Mailchimp";

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
          href="https://huwng.wordpress.com/"
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Wordpress Blog
        </a>
      </li>
    </ul>
    <Mailchimp />
  </nav>
);

export default Menu;
