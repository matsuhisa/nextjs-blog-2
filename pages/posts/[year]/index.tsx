
export default function Post(postData) {
  console.log('year1 ->')
  return (
    <>
      {postData.year}
    </>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id => 利用可能なidを返す
  // getStaticPaths() は返す形式が決まっている
  console.log('year ->')
  const paths = [
    {
      params: {
        year: '2020'
      }
    },
    {
      params: {
        year: '2019'
      }
    }
  ]

  return {
    paths, fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  // params.id を利用して blog のデーターを取得する
  console.log('year2 ->')
  return {
    props: {
      ...params
    }
  }
}