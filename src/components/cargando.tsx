
const Loader = () => {
  return (
    <div className='flex justify-center items-center relative top-20 h-full w-full'>
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Estado</div>
          <div className="terminal-controls">
            <div className="control close" />
            <div className="control minimize" />
            <div className="control maximize" />
          </div>
        </div>
        <br/>
        <div className="terminaltext">Cargando...</div>
      </div>
    </div>
  );
}

export default Loader;
