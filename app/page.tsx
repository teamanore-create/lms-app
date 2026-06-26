import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import HomePage from '@/components/Home'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <>
      <HomePage/>
    </>
  )
}
