import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id.join('/')}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

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

  // getStaticPaths のために決まった形にしている
  // {
  //   params: {
  //     id: ['2018','03', 'books_kaizen']
  //   }
  // },
  return fileNames(postsDirectory).map( fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/')
      }
    }
  })
}
