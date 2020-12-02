import Link from 'next/link'

interface EtnryProps {
  id: any;
  title: string;
}

export default function Entry(entry: EtnryProps) {
  console.log(entry.entry.title)
  return (
    <>
      {entry.entry.title}
      {/* <div>
        <Link href={`/posts/${entry.id.join('/')}`}>
          <a>{entry.title}</a>
        </Link>
      </div> */}
    </>
  )
}