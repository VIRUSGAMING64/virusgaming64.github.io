import { useEffect, useState } from 'react';
import { marked } from 'marked';

const RepoDetailTab = ({ repo }) => {
  const [readmeHtml, setReadmeHtml] = useState('');

  useEffect(() => {
    if (repo.readme) {
      marked.setOptions({
        breaks: true,
        gfm: true
      });
      setReadmeHtml(marked.parse(repo.readme));
    }
  }, [repo.readme]);

  const sortedLanguages = Object.entries(repo.languages || {})
    .sort((a, b) => b[1] - a[1]);

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(168, 85, 247, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(251, 146, 60, 0.8)',
    'rgba(234, 179, 8, 0.8)',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          📦 {repo.name}
        </a>
      </h2>

      {/* Description */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">📝 Description</h3>
        <p className="text-gray-300">{repo.description || 'No description available'}</p>
      </div>

      {/* Statistics */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">📊 Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-sm">⭐ Stars</div>
            <div className="text-white text-xl font-semibold mt-1">{repo.stars}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-sm">🍴 Forks</div>
            <div className="text-white text-xl font-semibold mt-1">{repo.forks}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-sm">💾 Size</div>
            <div className="text-white text-xl font-semibold mt-1">{repo.size_formatted}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-gray-400 text-sm">📅 Updated</div>
            <div className="text-white text-sm font-semibold mt-1">
              {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      {sortedLanguages.length > 0 && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">💻 Languages</h3>
          <div className="space-y-3">
            {sortedLanguages.map(([lang, pct], index) => (
              <div key={lang}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">{lang}</span>
                  <span className="text-gray-400 text-sm">{pct}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* README */}
      {repo.readme && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">📖 README</h3>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </div>
      )}
    </div>
  );
};

export default RepoDetailTab;
