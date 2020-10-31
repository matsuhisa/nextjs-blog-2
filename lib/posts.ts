import fs from 'fs'
import path from 'path'
// import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
  const fileNames = (dir, files = []) => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const dirs = [];
    for (const dirent of dirents) {
      if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
      if (dirent.isFile()) files.push(`${dir}/${dirent.name}`.replace(path.join(process.cwd(), 'posts/'), ''));
    }
    for (const d of dirs) {
      files = fileNames(d, files);
    }
    return files;
  };

  return fileNames(postsDirectory).map( fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/')
      }
    }
  })
}
