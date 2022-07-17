import React from "react";

import { Link } from "gatsby";

import { useSiteMetadata } from "@/hooks";
import type { Node } from "@/types";

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

const Post: React.FC<Props> = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const { author } = useSiteMetadata();

  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <Content body={html} title={title} />
      </div>

      <div className={styles.footer}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <a
          href={getGitMarkdownUrl(post.fileAbsolutePath)}
          target="_blank"
          rel="noopener noreferrer"
        >
          📝 Edit this post on GitHub
        </a>

        <Author />
      </div>

      <div className={styles.comments}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>

      <Link to="/">
        <img alt={author.name} src={author.gif} className={styles.photo} />
      </Link>
    </div>
  );
};

export default Post;
