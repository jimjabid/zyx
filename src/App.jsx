import { useState, useEffect, useRef } from 'react';
import LandingPage from './pages/LandingPage';
import { PreLoader } from './components';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const loadingStateRef = useRef({
    windowLoaded: false,
    animationCompleted: false,
    minimumTimeElapsed: false,
    startTime: Date.now()
  });

  const checkIfShouldFinishLoading = () => {
    const { windowLoaded, animationCompleted, minimumTimeElapsed } = loadingStateRef.current;
    
    // Only finish loading when minimum time has elapsed AND 
    // (window has loaded OR animation completed naturally)
    if (minimumTimeElapsed && (windowLoaded || animationCompleted)) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Minimum loading time to allow animation to complete (2.5 seconds)
    const minimumLoadTime = 2500;
    
    // Start minimum time counter
    const minimumTimeTimeout = setTimeout(() => {
      loadingStateRef.current.minimumTimeElapsed = true;
      checkIfShouldFinishLoading();
    }, minimumLoadTime);

    // Handle window load event
    const handleWindowLoad = () => {
      loadingStateRef.current.windowLoaded = true;
      checkIfShouldFinishLoading();
    };

    // Safety timeout (8 seconds)
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 8000);

    // Add window load listener
    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // Cleanup
    return () => {
      clearTimeout(minimumTimeTimeout);
      clearTimeout(safetyTimeout);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, [loading]);

  const handlePreLoaderComplete = () => {
    loadingStateRef.current.animationCompleted = true;
    checkIfShouldFinishLoading();
  };

  if (loading) {
    return <PreLoader onComplete={handlePreLoaderComplete} />;
  }

  return <LandingPage />;
}

export default App;
