import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const Navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const {user} = useUser();

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen absolute top-0 left-0 right-0 bottom-0'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <img src={assets.logo} alt="logo" className='cursor-pointer' onClick={() => Navigate("/")}/>
        {
          sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(false)}/>
           : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=>setSidebar(true)}/>
        }
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#F4F7FB]'>
           <Outlet />
        </div>
      </div> 
    </div>
  ) : (
    <div className='w-full h-[95vh] flex items-center justify-center'>
       <SignIn />
    </div>
  )
}

export default Layout
