import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

import * as constants from "./constants";
import * as types from "./types";
import * as utils from "./utils";

const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { frontmatter }: types.Edge["node"] = node;
    const { tags, category, slug } = frontmatter || {};

    if (slug) {
      const value = utils.concat("/", slug);

      createNodeField({ node, name: "slug", value });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({ node, name: "slug", value });
    }

    if (tags) {
      const value = tags.map((tag) =>
        utils.concat(
          constants.routes.tagRoute,
          "/",
          utils.toKebabCase(tag),
          "/",
        ),
      );

      createNodeField({ node, name: "tagSlugs", value });
    }

    if (category) {
      const value = utils.concat(
        constants.routes.categoryRoute,
        "/",
        utils.toKebabCase(category),
        "/",
      );

      createNodeField({ node, name: "categorySlug", value });
    }
  }
};

export { onCreateNode };
