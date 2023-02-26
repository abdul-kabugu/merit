// @ts-nocheck
import { useCreateMerit } from '@/hooks'
import {useState, useRef} from 'react'
import {useForm} from 'react-hook-form'
import {AiOutlineCloudUpload} from 'react-icons/ai'
export default function CreateMerit() {
const [meritCover, setmeritCover] = useState()
  const {register, handleSubmit, formState : {errors}} = useForm()
  const {createMerit} = useCreateMerit()
  const mediaFileRef = useRef(null)
  console.log("the selected file media", meritCover?.type)
    const handleSelectFile = () =>  {
        mediaFileRef.current.click()
    }
    const handleCreateMerit =  async (data) =>  {
      await createMerit(data.description, meritCover, data.title, data.links, meritCover?.type)
    console.log("the out puts", data.title)
    }
  return (
    <div className='max-w-[1300px] mx-auto border py-3 px-4  flex sm:flex-col lg:flex-row gap-20 items-center justify-center'>
      <div className='w-[500px]'>
        <h1 className='font-bold text-3xl'>Create merit</h1>
        <p className='font-semibold text-black/70 mb-4'>Anything you enter here will be publicly visible.</p>
         <form onSubmit={handleSubmit(handleCreateMerit)}>
          <div className='flex flex-col gap-3'>
          <label className='font-semibold'>Heading</label>
         <input {...register("title", {required : true})} className="border border-gray-300 max-w-[500px] focus:outline-none rounded-lg py-2 px-3" placeholder='Heading....' />
         {errors.title && <p className='text-sm text-red-600 mt-0'> * This field is required</p>}
         </div>
         <div className='flex gap-3 flex-col'>
          <label className='font-semibold mt-2'>Description</label>
         <textarea {...register("description" , {required : true})}
           className="resize-none h-28 max-w-[500px] px-3 py-3 border border-gray-300 focus:outline-none rounded-lg"
           placeholder='HTML certificate ...'
         />
         {errors.description && <p className='text-sm text-red-600 mt-0'> * This field is required</p>}
         </div>
         <div className='flex flex-col gap-4 mt-3'>
          <label>Link</label>
         <input {...register("links" )} className="border border-gray-300 max-w-[500px] focus:outline-none rounded-lg py-2 px-3"
          placeholder='www.scrimba.com'
         />
         
         </div>
     
          <button type='submit' className='font-semibold bg-purple-600 text-white mt-10 w-1/3 mx-auto py-2 px-6 rounded-lg sm:hidden lg:inline'>Create</button>
           
          
         </form>
         </div>
         <div className='relative'>
           <h1 className='font-semibold text-xl text-center'>Cover</h1>
            <p className='text-center mb-2 text-black/70'>The  cover of the  badge</p>
       <div className='border-2 border-dashed border-purple-400 w-[400px] h-[300px] rounded-lg shadow-lg flex items-center justify-center py-2 px-3'>
         <input    type="file" onChange={e => setmeritCover(e.target.files[0])} ref={mediaFileRef} hidden />
          { ! meritCover ?
          <div className='flex flex-col items-center justify-center gap-3'>
          <AiOutlineCloudUpload onClick={handleSelectFile} className="cursor-pointer" size={40} />
           <p className='text-xs text-black/50'>Supported  files   GIF / PNG / JPG / MP4</p>
          </div>
          : (
            <img src={URL.createObjectURL(meritCover)}   className="w-[100%] object-fill h-[100%] rounded-lg"   />
          )
       }
       </div>

         {meritCover  &&
         <div className='absolute top-[95%] right-5 bg-purple-100 py-3 px-3 rounded-full cursor-pointer' onClick={handleSelectFile}>
         <AiOutlineCloudUpload size={30}  className="text-black/50" />
         </div>
         }
       </div>
       <button  className='font-semibold bg-purple-600 text-white mt-10 w-1/3 mx-auto py-2 px-6 rounded-lg lg:hidden'>Create</button>
    </div>
  )
}
