import Image from 'next/image'
import { Button } from './components/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <Button
       size={'lg'}
       intent={'primary'}
      className='rounded-xl'
       
       >
        Project Init
       </Button>
    </main>
  )
}