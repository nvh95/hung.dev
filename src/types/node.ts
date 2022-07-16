import Fields from "./fields";
import Frontmatter from "./frontmatter";

interface Node {
  id: string;
  fields: Fields;
  fileAbsolutePath: string;
  frontmatter: Frontmatter;
  html: string;
}

export default Node;
