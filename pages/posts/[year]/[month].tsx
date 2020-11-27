import { getYearMonthPostData, getAllYearMonths } from '../../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'

export default function Post(postData) {
  // console.table(postData.posts)
  return (
    <>
      <Head>
        <title>{postData.year}年{postData.month}月</title>
        <meta property='og:title' content='' key='title' />
      </Head>

      <h1>{postData.year}年{postData.month}月</h1>
      {postData.posts.map((entry, i) => (
        <Link href={`/posts/${entry.id.join('/')}`}>
          <a>{entry.title}</a>
        </Link>
      ))}
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id => 利用可能なidを返す
  // getStaticPaths() は返す形式が決まっている

  // const paths = [
  //   {
  //     params: {
  //       year: '2020',
  //       month: '09',
  //     }
  //   },
  //   {
  //     params: {
  //       year: '2018',
  //       month: '03',
  //     }
  //   },
  // ]

  const paths = getAllYearMonths()
  return {
    paths, fallback: false
  }
}

export async function getStaticProps({ params }) {
  console.table(params)
  const posts = await getYearMonthPostData(Number(params.year), Number(params.month))

  return {
    props: {
      posts,
      ...params
    }
  }
}