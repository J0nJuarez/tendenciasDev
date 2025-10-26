import React from 'react'
import { Button } from './ui/button'


const Header = () => {
  return (
    <header className='bg-card text-card-foreground rounded-xl border p-3 shadow-sm flex sticky items-center gap-3 mb-8' >
        <span className='icon'><img src="./tendeciasDev.png" alt="Tendencias Dev" /></span>
        <h1 className='text-lg font-bold leading-tight tracking-[-0.015em]'>tendenciasDev</h1>
        <Button variant='ghost' size='sm' className='ml-auto'><a href="#" >Creado por Jon Juárez</a></Button>
    </header>
  )
}

export default Header