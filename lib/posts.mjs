import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')


export function getAllPostIds() {
  console.log(postsDirectory)
  // const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true }).flatMap(dir => {
  //   dir.isFile() ? [`${dir}/${dir.name}`] : fileNames(`${dir}/${dirent.name}`)
  // })

  // const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true })

  // const fileNames = (directory) => {
  //   return fs.readdirSync(directory, { withFileTypes: true }).map(dir => {
  //     dir.isFile ? [`${directory}/${dir.name}`] : [`${dir}`]
  //   })
  // }

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
  console.log(fileNames(postsDirectory))
}

getAllPostIds()