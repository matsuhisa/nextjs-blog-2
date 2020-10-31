
export default function Post(postData) {
  return (
    <>
      {postData.id}
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id => 利用可能なidを返す
  // getStaticPaths() は返す形式が決まっている
  const paths = [
    {
      params: {
        id: '2018'
      }
    },
    {
      params: {
        id: '2019'
      }
    },
  ]

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