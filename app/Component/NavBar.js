import React from 'react'

const NavBar = () => {
    return (
        <div>
            <div className='h-[145px] gap-[50px] w-full flex items-center px-[150px] justify-start fixed z-[99]'>
                <img src="favicon.ico" alt="FinFlow Logo" className='h-[75px] rounded-[50px]' />
                <h4 className='uppercase font-medium'>Home</h4>
                <h4 className='uppercase font-medium'>About</h4>
                <h4 className='uppercase font-medium'>Features</h4>
                <h4 className='uppercase font-medium'>Login</h4>
            </div>
        </div>
    )
}

export default NavBar