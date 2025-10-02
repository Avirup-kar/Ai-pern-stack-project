import {  Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {

    const [input, setInput] = useState('');
    const [object, setObject] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    // const {getToken} = useAuth();


    const onSubmitHandler = async (e) => {
       e.preventDefault()
       return toast.error("This feature is disabled for public") 
    //    try {
    //   setLoading(true);
    //   if(object.split(' ').length > 1){
    //    return toast('Please enter only one object name')
    // }
      
    //   const fromData = new FormData();
    //   fromData.append('image', input);
    //   fromData.append('object', object);


    //   const {data} = await axios.post('/api/ai/remove-image-object', fromData, {
    //     headers: {
    //       Authorization: `Bearer ${await getToken()}`
    //     }
    //   })
    //   if(data.success){
    //     setContent(data.content);
    //     toast.success("Object removed successfully")
    //   }else{
    //     toast.error(data.message)
    //   }
    // } catch (error) {
    //   toast.error(error.message)
    // }
    // setLoading(false)
    }

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start xl:justify-start justify-center flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-blue-500" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>

        {input ?
        <label htmlFor="image"><img className='w-55 mx-auto object-cover rounded-lg overflow-hidden cursor-pointer' src={input ? URL.createObjectURL(input) : ''} alt="selected_pic" /></label>
         : ''}
        <input
          type="file"
          accept='image/*'
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-2 cursor-pointer outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="mt-6 text-sm font-medium">Describe object name to remove</p>

        <textarea 
          rows="4"
          type="text"
          onChange={(e) => setObject(e.target.value)}
          value={object}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g., watch or spoon , Only single object name"
          required
        />

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#5575f5] to-[#8941ec] text-white px-4 py-2 mt-6
        text-sm rounded-1g cursor-pointer'>
          { 
              loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              : <Scissors className='w-5'/>
           }
          Remove Object
       </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
             <div className='flex items-center gap-3'>
               <Scissors className='w-5 h-5 text-blue-500' />
               <h1 className='text-xl font-semibold' >Processed Image</h1>
             </div>

            {!content ? (
              loading ? (<div className='flex-1 flex justify-center items-center'>
             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <span className="w-12 h-12 my-1 rounded-full border-4 border-t-transparent animate-spin"></span>
                <p className="text-[15px] font-semibold">Wait a few seconds</p>
             </div>
             </div>
              ) : (
             <div className='flex-1 flex justify-center items-center'>
             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Scissors className='w-9 h-9' />
                <p>Upload an image and click "Remove Object" to get started</p>
             </div>
             </div>)
            ) : (
              <div className='mt-3 h-full overflow-y-auto text-sm text-slate-600'>
                <div className=" h-full w-full">
                   <img className="object-cover h-full w-full" src={content} alt="image" />
                </div>
            </div>
            )}
      </div>
    </div>
  )
}

export default RemoveObject
