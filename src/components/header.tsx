

const Header = () => {
  return (
    <header className='z-99 py-3 flex w-full sticky top-6 items-center gap-3 mb-8 ' >
        <div className="terminal-loader w-full">
        <div className="terminal-header">
          <div className="terminal-title"><a href="#" >Creado por Jon Juárez</a></div>
          <div className="terminal-controls">
            <div className="control close" />
            <div className="control minimize" />
            <div className="control maximize" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-6">
            <img className='w-[64px]' src="src/assets/img/tendenciasDev.png" alt="Tendencias Dev" />
            <h1 className="terminaltext">tendenciasDev</h1>
        </div>
      </div>
    </header>
  )
}

export default Header