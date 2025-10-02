import { useClerk, useUser, Protect } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';


const navItems = [
      {to: '/ai', label: 'Dashboard', Icon: House},
      {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
      {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
      {to: '/ai/generate-images', label: 'Generate Images', Icon: Image},
      {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
      {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
      {to: '/ai/review-resume', label: 'Review Resume', Icon: FileText},
      {to: '/ai/community', label: 'Community', Icon: Users},
 ]

const Sidebar = ({ sidebar, setSidebar }) => {

    const {user} = useUser();
const {signOut, openUserProfile} = useClerk()

   return (
   <div className={`w-65 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14
   bottom-0 ${sidebar ? 'translate-x-0' :
   'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
     <div className='my-7 w-full'>
       <img src={user ? user.imageUrl : "/favicon.svg"} alt="User avatar" className='w-13 rounded-full mx-auto'/>
       <h1 className='mt-1 text-center'>{user ? user.fullName : "Guest"}</h1>
       <div className='text-sm text-gray-600 font-medium mx-3 mt-3'> 
        {navItems.map(({to, label, Icon}) => (
              <NavLink key={Icon} to={to} end={to === '/ai'} onClick={()=>setSidebar(false)}
               className={({isActive}) => isActive ? 'bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] rounded-lg  text-white font-medium w-full px-5 py-3 flex items-center gap-3' 
               : 'text-gray-600 font-medium w-full px-6 py-3  flex items-center gap-3 rounded-lg hover:bg-[#F4F7FB] hover:text-blue-600'}>
                <Icon className='w-5 h-5'/>
                <span>{label}</span>
              </NavLink>
        ))}
       </div>
     </div>

     <div className='w-full border-t text-gray-600 border-gray-200 p-4 px-5 flex items-center justify-between'>
        <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={openUserProfile}>
          <img src={user ? user.imageUrl : "/favicon.svg"} alt="User avatar" className='w-8 rounded-full mx-auto'/>
          <div>
            <h1 className=' text-center text-black text-[16px]  leading-[1.2]'>{user ? user.fullName : "Guest"}</h1>
            <p className=' text-[12px] leading-[1.2]'>
            <Protect  plan='premium' fallback="Free">Premium</Protect> Plan
            </p>
          </div>
        </div> 
        <LogOut  className='w-4.5 cursor-pointer text-gray-400 hover:text-gray-700 transition hover:scale-110' onClick={signOut}/>
     </div>
 </div>
 )
}
export default Sidebar
