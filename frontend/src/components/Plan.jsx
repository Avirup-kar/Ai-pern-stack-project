import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-2x1 mx-auto z-20 mt-10 mb-30 px-15'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'> Choose your plan</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Start for <b>free</b> and scale up as you grow. Find the perfect <b>plan</b> for your content creation needs.</p>
      </div>

      <div className='mt-14 mx-auto  max-w-170'>
        <PricingTable />
      </div>
   </div>
  )
}

export default Plan
