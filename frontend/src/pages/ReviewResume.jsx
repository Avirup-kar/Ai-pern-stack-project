import { EraserIcon, FileText, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {

    const {getToken} = useAuth();

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');


  
    const onSubmitHandler = async (e) => {
      e.preventDefault()
      try {
      setLoading(true);
      const fromData = new FormData();
      fromData.append('resume', input);


      const {data} = await axios.post('/api/ai/resume-review', fromData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if(data.success){
        setContent(data.content);
        toast.success("Review resume successfully")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
    }

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start xl:justify-start justify-center flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-green-400" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <input
          type="file"
          accept='applycation/pdf'
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full p-2 px-3 mt-2 cursor-pointer outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />
        <p className='text-xs text-gray-500 mt-1 font-light'>Supports " PDF " resume only.</p>

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#00d28b] to-[#00a0b1] text-white px-4 py-2 mt-6
        text-sm rounded-1g cursor-pointer'>
           { 
              loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              : <FileText className='w-5'/>
           }
          Review Resume
       </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
             <div className='flex items-center gap-3'>
               <FileText className='w-5 h-5 text-green-400' />
               <h1 className='text-xl font-semibold' >Analysis Results</h1>
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
                <FileText className='w-9 h-9' />
                <p>Upload a resume and click "Review Resume" to get started</p>
             </div>
             </div>)
             ) : (
              <div className='mt-3 h-full overflow-y-auto text-sm text-slate-600'>
                  <div className="reset-tw">
                      <Markdown>{content}</Markdown>
                  </div>
              </div>
             )}
      </div>
    </div>
  )
}

export default ReviewResume
