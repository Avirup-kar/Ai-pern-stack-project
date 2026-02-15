import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {

  const navigation = useNavigate();
  const {user} = useUser()

    return (
    <div className="px-4 sm:px-20 xl:px-32">
      <div className="text-center">
        <h2 className="text-3x1 sm:text-4xl md:text-4xl 2xl:text-[45px] font-semibold mx-auto leading-[1.1] text-gray-700">Powerful AI Tools</h2>
        <p className='mt-2 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600' >
          Everything you need to create, enhance, and optimize your content with <br/>
          cutting-edge "AI" technology.
        </p>
      </div>

      <div className='flex flex-wrap mt-10 justify-center'>
          {AiToolsData.map((tool, index)=>(
          <div key={index} className='p-8 m-4 max-w-xs rounded-xl bg-[#FDFDFE]
          shadow-xl border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer' onClick={()=>{user && navigation(tool.path)}}>
          <tool.Icon className ='w-12 h-12 p-3 text-white rounded-x1' 
          style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}/>
           <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
           <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
          </div>
         ))}
      </div>
    </div>
  );
};

export default AiTools;
