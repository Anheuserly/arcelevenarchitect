import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import loading screen
import LoadingScreen from './components/LoadingScreen';

// Import pages
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Services from './pages/Services';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import InstagramFeed from './pages/InstagramFeed';
import Blog from './pages/Blog';
import Feedback from './pages/Feedback';

// Import components
import Footer from './components/Footer';

// Import global styles
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(true);
  
  // Optional: Add a minimum loading time to ensure the loading screen is visible
  useEffect(() => {
    // Ensure loading screen shows for at least 2 seconds
    const minLoadingTime = setTimeout(() => {
      // This will only set loading to false if the finishLoading function has been called
      setLoading(prevLoading => {
        if (!prevLoading) return false;
        // If we're still loading after min time, wait for actual loading to complete
        return prevLoading;
      });
    }, 2000);
    
    return () => clearTimeout(minLoadingTime);
  }, []);
  
  // Function to finish loading
  const finishLoading = () => {
    setLoading(false);
  };
  
  return (
    <>
      {loading ? (
        <LoadingScreen finishLoading={finishLoading} />
      ) : (
        <Router>
          <div className="app">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/:projectSlug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:articleSlug" element={<JournalDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/instagram-feed" element={<InstagramFeed />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;