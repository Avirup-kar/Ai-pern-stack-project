import { useUser } from "@clerk/clerk-react";
import React, {useState, useEffect} from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {

  const {getToken} = useAuth();

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true);
  const {user} = useUser()

  const fetchCreations = async () => {
  try {
      const token = await getToken();
if (!token) {
  console.log("Token not ready, skipping fetch");
  return;
}
      const {data} = await axios.get('/api/user/get-published-creations', {
         headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(data?.success){
        setCreations(data.creations);
      }else{
        toast.error(data?.message || "can't fetch published creations try again later")
      }
    } catch (error) {
      toast.error(error.message)
    }
   setLoading(false)
  }

  const imageLikeToggle = async (id)=>{
        try {
        const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
         headers: {
          Authorization: `Bearer ${await getToken()}`
        }
        })
          
        if(data?.success){
          toast.success(data.message);
          await fetchCreations();
        }else{
          toast.error(data?.message || "Something went wrong please try again later")
        }
        } catch (error) {
          toast.error(error.message)
  }}


  useEffect(() => {
  if (user) { // only run when user exists
    fetchCreations();
  }
}, [user]);

  
  

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-[16px] font-medium text-gray-700">Creations</h1>
       <div className="bg-white h-full w-full rounded-xl p-5 overflow-y-auto">
      {creations.map((creation) => (
        <div key={creation?.id} className= 'relative group inline-block pl-3 pt-4 w-full sm:max-w-1/2 lg:max-w-1/3'>
             <img src={creation?.content} alt="" className='w-full h-full
             object-cover rounded-lg'/>
             <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3
              group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
               <p className='text-sm hidden group-hover:block'>{creation?.prompt}</p>
               <div className="flex items-center gap-2">
                 <p>{creation?.likes?.length}</p>
                 <Heart onClick={()=> imageLikeToggle(creation?.id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`}/>
               </div>
             </div>
        </div>
      ))}
      </div>
    </div>
  ) : (<div className='flex-1 h-full w-full flex justify-center items-center'>
             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <span className="w-12 h-12 my-1 rounded-full border-4 border-t-transparent animate-spin"></span>
                <p className="text-[13px] font-bold">Wait a few seconds</p>
             </div>
      </div>);
};

export default Community;
