import Link from 'next/link'

export default function Entry({ entry }) {
  return (
    <>
      <div>
        <Link href={`/posts/${entry.id.join('/')}`}>
          <a>{entry.title}</a>
        </Link>
      </div>
    </>
  )
}