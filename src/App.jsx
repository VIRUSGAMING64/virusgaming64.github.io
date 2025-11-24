import { useState, useEffect } from 'react';
import Background from './components/Background';
import Sidebar from './components/Sidebar';
import ReposTab from './components/ReposTab';
import LanguagesTab from './components/LanguagesTab';
import RepoDetailTab from './components/RepoDetailTab';

function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('languages-tab');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load repository statistics
    fetch('/data/repo-stats.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error loading repository statistics:', error);
      });
  }, []);

  useEffect(() => {
    // Apply random dark gradient background
    const gradients = [
      'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
      'linear-gradient(135deg, #000000 0%, #0f2027 50%, #203a43 100%)',
      'linear-gradient(135deg, #0c0c0c 0%, #1c1c3c 100%)',
      'linear-gradient(135deg, #1a1a1a 0%, #2d2d44 100%)',
      'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
      'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      'linear-gradient(135deg, #0c0c1e 0%, #1e1e3f 100%)',
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    document.body.style.background = randomGradient;
  }, []);

  const renderContent = () => {
    if (!data) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Loading...</div>
        </div>
      );
    }

    if (activeTab === 'repos-tab') {
      return <ReposTab data={data} />;
    }

    if (activeTab === 'languages-tab') {
      return <LanguagesTab data={data} />;
    }

    // Check if it's a repo detail tab
    if (activeTab.startsWith('repo-')) {
      const repoName = activeTab.replace('repo-', '');
      const repo = data.repositories?.find(r => r.name === repoName);
      if (repo) {
        return <RepoDetailTab repo={repo} />;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen relative">
      <Background />
      
      <div className="flex h-screen relative z-10">
        <Sidebar
          repos={data?.repositories || []}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 text-white">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;

