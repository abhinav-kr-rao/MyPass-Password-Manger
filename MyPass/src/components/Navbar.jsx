import React from 'react'

const Navbar = () => {
  return (
  <nav className=' bg-violet-400 pt-8 flex justify-around'>
    <div className=" text-3xl font-bold relative pb-9">
         <span className='text-green-700'>&lt;</span> MyPasswords <span className='text-green-700'>&gt;</span></div>
    <div className=" gap-4">
        <ul className=' flex gap-5 justify-end'>
            <li className=' hover:font-bold'>About</li>
            <li className=' hover:font-bold'>Contact</li>
        </ul>
    </div>
  </nav>
  )
}

export default Navbar
