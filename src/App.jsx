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
    // Apply random gradient background
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
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

