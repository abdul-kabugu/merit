// @ts-nocheck
import { useCreateMerit } from '@/hooks'
import {useState} from 'react'

export default function CreateMerit() {
  const [meritTitle, setmeritTitle] = useState("")
  const [meritDescription, setmeritDescription] = useState("")
  const [meritImage, setmeritImage] = useState()
  const {createMerit} = useCreateMerit()
  return (
    <div>
        <h1>Create merit</h1>
            <div className='flex flex-col gap-5'>
          <input  type="text"  value={meritTitle} onChange={e => setmeritTitle(e.target.value)} placeholder="Merit name " className='border border-blue-500 py-2' />
           <textarea  value={meritDescription} onChange={e => setmeritDescription(e.target.value)}  placeholder="Merit  describtion"     />
           <input   type="file"  onChange={ e => setmeritImage(e.target.files[0])} />
             <button className='py-2 px-5 bg-black text-white' onClick={() => createMerit(meritDescription, meritImage, meritTitle)}>create merit</button>
           </div>
    </div>
  )
}
