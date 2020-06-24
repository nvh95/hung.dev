// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import styles from './Menu.module.scss';
import Mailchimp from '../Mailchimp';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu }: Props) => (
  <nav className={styles['menu']}>
    <ul className={styles['menu__list']}>
      {menu.map((item) => (
        <li className={styles['menu__list-item']} key={item.path}>
          <Link
            to={item.path}
            className={styles['menu__list-item-link']}
            activeClassName={styles['menu__list-item-link--active']}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <a
        href="https://huwng.wordpress.com/"
        className={styles['menu__list-item-link']}
        rel="noopener noreferrer"
        target="_blank"
      >
        Wordpress Blog
      </a>
      <Mailchimp />
    </ul>
  </nav>
);

export default Menu;
