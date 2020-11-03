import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post(postData) {
  return (
    <>
      {postData.title}
      {postData.description}
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
  // console.table(params.id)

  const postData = await getPostData(params.id)
  return {
    props: {
      ...postData
    }
  }
}