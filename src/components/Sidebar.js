const Sidebar = ({ repos, activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-black/70 backdrop-blur-md text-white p-3 rounded-lg border border-gray-700 hover:bg-black/90 transition-all"
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full bg-black/70 backdrop-blur-lg border-r border-gray-700 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } w-64 md:w-auto`}
      >
        <div className="flex flex-col p-4 space-y-2 h-full overflow-y-auto">
          {/* Main navigation buttons */}
          <button
            onClick={() => {
              setActiveTab('repos-tab');
              setIsOpen(false);
            }}
            className={`px-4 py-2 rounded-lg text-left transition-all ${
              activeTab === 'repos-tab'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            📦 Repos
          </button>
          <button
            onClick={() => {
              setActiveTab('languages-tab');
              setIsOpen(false);
            }}
            className={`px-4 py-2 rounded-lg text-left transition-all ${
              activeTab === 'languages-tab'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            💻 Languages
          </button>

          {/* Repositories section */}
          {repos && repos.length > 0 && (
            <>
              <div className="pt-4 pb-2 text-xs text-gray-400 uppercase tracking-wider border-t border-gray-700 mt-4">
                📚 Repositories
              </div>
              {repos.map((repo) => (
                <button
                  key={repo.name}
                  onClick={() => {
                    setActiveTab(`repo-${repo.name}`);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-left transition-all text-sm ${
                    activeTab === `repo-${repo.name}`
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  📦 {repo.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
