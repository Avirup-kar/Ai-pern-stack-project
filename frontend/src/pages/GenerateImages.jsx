import { Edit, Hash, Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Generatelmages = () => {

    const ImageStyle = [ "Realistic" , "Ghibli style" , "Anime style" , "Cartoon style" , "Fantasy style" , "Realistic style" , "3D style" , "Portrait style" ,
    ];

     // const {getToken} = useAuth();
  
    const [selectedStyle, setSelectedStyle] = useState('Realistic');
    const [input, setInput] = useState('');
    const [publish, setPublish] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
  
    const onSubmitHandler = async (e) => {
      e.preventDefault()
      return toast.error("This feature is disabled for public")  
    //   try {
    //     setLoading(true);
    //   const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
    //   const {data} = await axios.post('/api/ai/generate-images', {prompt, publish}, {
    //     headers: {
    //       Authorization: `Bearer ${await getToken()}`
    //     }
    //   })

    //   if(data.success){
    //     setContent(data.content);
    //     toast.success("Generate image successfully")
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
          <Sparkles className="w-6 text-green-600" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>

        <textarea 
          rows="4"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image.."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {ImageStyle.map((item) => (
            <span onClick={() => setSelectedStyle(item)} className={`text-xs text-center py-1 border rounded-full cursor-pointer w-30
            ${selectedStyle === item ? 'bg-green-50 text-green-700 border-green-500' : 'bg-gray-50 text-gray-400 border-gray-400'}`} key={item}>{item}</span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
        <label className="cursor-pointer relative">
        <input type="checkbox" id="publish" className="sr-only peer" checked={publish} onChange={(e) => setPublish(e.target.checked)} />

        <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>

        <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
        </label>
        <p className="text-sm">Make this image Public</p>
        </div>

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#00b328] to-[#02ef48] text-white px-4 py-2 mt-8
        text-sm rounded-1g cursor-pointer'>
           { 
             loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
             : <Image className='w-5'/>
          }
           Generate Image
       </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
             <div className='flex items-center gap-3'>
               <Image className='w-5 h-5 text-green-600' />
               <h1 className='text-xl font-semibold' >Generated image</h1>
             </div>

           {!content ? (
            loading ? (<div className='flex-1 flex justify-center items-center'>
             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <span className="w-12 h-12 my-1 rounded-full border-4 border-t-transparent animate-spin"></span>
                <p className="text-[13px] font-bold">Wait a few seconds</p>
             </div>
             </div>
              ) : (
             <div className='flex-1 flex justify-center items-center'>
             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-9 h-9' />
                <p>Enter a topic and click "Generate Image" to get started</p>
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

export default Generatelmages
