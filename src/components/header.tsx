import React from 'react'
import { Button } from './ui/button'


const Header = () => {
  return (
    <header className='z-99 rounded-xl border p-3 shadow-sm flex sticky top-6 bg-card items-center gap-3 mb-8' >
        <span className='w-[64px]'><img src="src/assets/img/tendenciasDev.png" alt="Tendencias Dev" /></span>
        <h1 className='text-3xl font-bold leading-tight tracking-[-0.015em]'>tendenciasDev</h1>
        <Button variant='ghost' size='sm' className='ml-auto'><a href="#" >Creado por Jon Juárez</a></Button>
    </header>
  )
}

export default Header