import React, { useState, useEffect } from "react";
import {  GemIcon, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import Creationitem from "../components/Creationitem";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dasboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken} = useAuth();

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/user/get-user-creations', {
         headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if(data?.success){
        setCreations(data.creations);
      }else{
        toast.error(data?.message || "can't fetch creations try again later")
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full p-8 overflow-y-auto">

    <div className="flex flex-wrap gap-4 mb-10">
    {/* Total creation card (first cird) */}
      <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
        <div className="text-slate-600">
          <p className="text-sm">Total Creations</p>
          <h2 className="text-xl font-semibold">{creations?.length}</h2>
        </div>
        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
          <Sparkles className="w-5" />
        </div>
      </div>

       {/* Active Plan card (Second cird) */}
      <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
        <div className="text-slate-600">
          <p className="text-sm">Active Plan</p>
         <Protect  plan='premium' fallback="Free">Premium</Protect>
        </div>
        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
          <GemIcon className="w-5" />
        </div>
      </div>
    </div>

    {loading ? <div className='flex-1 h-full w-full flex justify-center items-center'>
             <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <span className="w-12 h-12 my-1 rounded-full border-4 border-t-transparent animate-spin"></span>
                <p className="text-[13px] font-bold">Wait a few seconds</p>
             </div>
      </div> : (<div className='space-y-3'>
       <p className='mt-6 mb-4'>Recent Creations</p>
       {
        creations.map((item, index) => <Creationitem key={index} item={item}/>)
       }
     </div>)}
    </div>
  );
};

export default Dasboard;
