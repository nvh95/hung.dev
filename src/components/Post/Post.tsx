import React from "react";

import { Link } from "gatsby";
import toastr from "toastr";

import { useSiteMetadata } from "@/hooks";
import type { Node } from "@/types";
import { getRandomElement } from "@/utils";

import { Author } from "./Author";
import { Comments } from "./Comments";
import { Content } from "./Content";
import { Meta } from "./Meta";
import { Tags } from "./Tags";

import * as styles from "./Post.module.scss";

interface Props {
  post: Node;
}

function getGitMarkdownUrl(absolutePath: string) {
  const gitURL = "https://github.com/nvh95/hung.dev/edit/develop";
  const sliceIndex = absolutePath.indexOf("/content");
  const markdownFileGitPath = absolutePath.slice(sliceIndex);
  const blogPostOnGit = `${gitURL}${markdownFileGitPath}`;
  return blogPostOnGit;
}

const greeting = [
  {
    message: "Enjoy your reading!",
  },
  {
    message: "Thank you for your visit!",
  },
  {
    message: "Thank you for being you!",
  },
  {
    message: "Have a nice day!",
  },
  {
    message: "Have a productive day!",
  },
  {
    message:
      "Did you know that I created a library called Jest Preview? Click me to learn more.",
    url: "https://www.jest-preview.com",
  },
  {
    message: "Happy coding. Wanna visit my GitHub?",
    url: "https://github.com/nvh95/",
  },
  {
    message: "Do you tweet? Visit me on Twitter!",
    url: "https://twitter.com/hung_dev",
  },
  {
    message:
      "Do you that you can subscribe to my blog to get notified when I publish new posts?",
    action: () => {
      document.getElementById("mce-EMAIL")?.focus();
    },
  },
  {
    message: "You are doing awesome. Keep it up!",
  },
  {
    message: "Thank you for visiting my blog! I hope you enjoyed it.",
  },
  {
    message:
      "Wanna follow the growth of Javascript ecosystem? Visit bestofjs.org.",
    url: "https://bestofjs.org",
  },
  {
    message: "Do you know about Mock Service Worker? Click me to learn more.",
    url: "https://mswjs.io",
  },
  {
    message:
      "Do you usually work with form? Click me to learn more about React Hook Form.",
    url: "https://react-hook-form.com/",
  },
];

const Post: React.FC<Props> = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const { author } = useSiteMetadata();

  const handleClickAvatar = () => {
    const randomGreeting = getRandomElement(greeting);
    toastr.success(randomGreeting.message, "", {
      onclick: () => {
        if (randomGreeting.url) {
          window.open(randomGreeting.url, "_blank", "noopener");
        }
        if (randomGreeting.action) {
          randomGreeting.action();
        }
      },
    });
  };

  return (
    <div className={styles.post}>
      <Link className={styles.button} to="/">
        All Posts
      </Link>

      <div className={styles.content}>
        <Content body={html} title={title} />
      </div>

      <div className={styles.footer}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <div className={styles.links}>
          <Link to="/"> ⬅️ All posts</Link>
          <a
            href={getGitMarkdownUrl(post.fileAbsolutePath)}
            target="_blank"
            rel="noopener noreferrer"
          >
            📝 Edit this post on GitHub
          </a>
        </div>
        <Author />
      </div>

      <div className={styles.comments}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>

      <Link to="/" onClick={handleClickAvatar}>
        <img alt={author.name} src={author.gif} className={styles.photo} />
      </Link>
    </div>
  );
};

export default Post;
