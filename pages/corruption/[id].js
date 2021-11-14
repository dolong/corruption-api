import { useRouter } from 'next/router'
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function User() {
  const router = useRouter()
  const { data, error } = useSwr(
    router.query.id ? `/api/corruption/${router.query.id}` : null,
    fetcher
  )

  if (error) return <div>Failed to load corruption</div>
  if (!data) return <div>Loading...</div>

  return <div>{JSON.stringify(data)}</div>
}