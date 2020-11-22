import { getAllYearMonths } from '../../../lib/posts'
import Head from 'next/head'

export default function Post(postData) {
  return (
    <>
      <Head>
        <title>{postData.year}年{postData.month}月</title>
        <meta property='og:title' content='' key='title' />
      </Head>
      {postData.year}年{postData.month}月
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
  // Fetch necessary data for the blog post using params.id
  // params.id を利用して blog のデーターを取得する

  return {
    props: {
      ...params
    }
  }
}