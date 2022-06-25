import fs from 'fs';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'content', 'blog');

export const postFilePath = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx$/.test(path));
