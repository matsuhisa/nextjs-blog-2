import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'

export default function Post(postData) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta property='og:title' content={postData.title} key='title' />
        <meta property='og:description' content={postData.description} key='description' />
      </Head>
      <h1>{postData.title}</h1>
      <div className="foo" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id => 利用可能なidを返す
  // getStaticPaths() は返す形式が決まっている
  // const paths = [
  //   {
  //     params: {
  //       id: ['2018','03', 'books_kaizen']
  //     }
  //   },
  // ]

  const paths = getAllPostIds()
  return {
    paths, fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  // params.id を利用して blog のデーターを取得する

  const postData = await getPostData(params.id)
  return {
    props: {
      ...postData
    }
  }
}