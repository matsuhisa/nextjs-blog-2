import { getYearMonthPostData, getAllYearMonths } from '../../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'
import Entry from '../../../components/entry'

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
        <Entry entry={entry} key={i} />
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
  // console.table(params)
  const posts = await getYearMonthPostData(params.year, params.month)

  return {
    props: {
      posts,
      ...params
    }
  }
}