import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {

  const articleLength = [ "General" , "Technology" , "Business" , "Health" , "Lifestyle" , "Education" , "Travel" , "Food" ];

  const [selectedcategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

     const {getToken} = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedcategory}`;
      const {data} = await axios.post('/api/ai/generate-blog-titles', {prompt}, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if(data.success){
        setContent(data.content);
        toast.success("Write blogTitle successfully")
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
          <Sparkles className="w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image
        </p>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <p className="mt-4 text-sm font-medium">Category</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item) => (
            <span onClick={() => setSelectedCategory(item)} className={`text-xs text-center py-1 border rounded-full cursor-pointer w-30
            ${selectedcategory === item ? 'bg-purple-50 text-purple-700 border-purple-500' : 'bg-gray-50 text-gray-400 border-gray-400'}`} key={item}>{item}</span>
          ))}
        </div>
        
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#be41f5] to-[#9038ec] text-white px-4 py-2 mt-8
        text-sm rounded-1g cursor-pointer'>
           { 
              loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              : <Hash className='w-5'/>
           }
           Generate blogTitle
       </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
                   <div className='flex items-center gap-3'>
                    <Hash className='w-5 h-5 text-purple-600' />
                    <h1 className='text-xl font-semibold' >Generated titles</h1>
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
                     <div className='text-sm flex flex-col h-full items-center gap-5 text-gray-400'>
                      <Hash className='w-9 h-9' />
                      <p>Enter a topic and click "Generate blogTitle" to get started</p>
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
  );
};

export default BlogTitle;

<textarea rows="4" type="text" class="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300" placeholder="Describe what you want to see in the image.."></textarea>