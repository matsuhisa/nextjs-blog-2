import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id.join('/')}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

export function getAllYearMonths() {
  const postDirectories = (directory) => {
    const directories = []
    const readDirectories = fs.readdirSync(postsDirectory, { withFileTypes: true })

    readDirectories.forEach(result => {
      if (result.isDirectory()) {
        const secondDirectories = fs.readdirSync(`${directory}/${result.name}`, { withFileTypes: true })
        secondDirectories.forEach(result2 => {
          if (result2.isDirectory()) {
            directories.push({ params: { year: result.name, month: result2.name } })
          }
        })
      }
    })
    return directories
  }

  return postDirectories(postsDirectory)
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
  return fileNames(postsDirectory).map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/')
      }
    }
  })
}

export async function getYearMonthPostData(year: string, month: string) {
  console.log(`${postsDirectory}/${year}/${month}`)
  const postFiles = fs.readdirSync(`${postsDirectory}/${year}/${month}`, { withFileTypes: true })
  const posts = []

  postFiles.forEach(post => {
    if (post.isFile()) {
      const fullPath = path.join(postsDirectory, `/${year}/${month}/${post.name}`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      posts.push({
        id: [year, month, post.name.replace('.md', '')],
        date: matterResult.data['date'],
        title: matterResult.data['title'],
        description: matterResult.data['description'],
      })
    }
  })

  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
