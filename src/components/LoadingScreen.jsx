import "./LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-logo">
          <span className="text-primary">P</span>
          <span className="text-secondary">r</span>
          <span className="text-accent">o</span>
          <span className="text-primary">g</span>
          <span className="text-secondary">r</span>
          <span className="text-accent">a</span>
          <span className="text-primary">m</span>
          <span className="text-secondary">i</span>
          <span className="text-accent">n</span>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-text">Carregando...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
