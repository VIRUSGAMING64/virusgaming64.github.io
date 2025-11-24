import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReposTab = ({ data }) => {
  if (!data || !data.repositories || data.repositories.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        📭 No repositories found. Statistics will be updated soon.
      </div>
    );
  }

  const chartData = {
    labels: data.repositories.map(repo => repo.name),
    datasets: [
      {
        label: 'Stars',
        data: data.repositories.map(repo => repo.stars),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Forks',
        data: data.repositories.map(repo => repo.forks),
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.85)',
        },
      },
      title: {
        display: true,
        text: 'Repository Statistics',
        color: 'rgba(255, 255, 255, 0.85)',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">📊 Repository Statistics</h2>
      {data.last_updated && (
        <p className="text-gray-400 text-sm">
          ⏰ Last updated: {new Date(data.last_updated).toLocaleString()}
        </p>
      )}

      {/* Chart */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-6" style={{ height: '400px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Repository cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.repositories.map((repo) => (
          <div
            key={repo.name}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                📦 {repo.name}
              </a>
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              {repo.description || '📝 No description'}
            </p>
            <div className="space-y-1 text-sm text-gray-300">
              <p>💾 Size: {repo.size_formatted}</p>
              <p>⭐ {repo.stars} | 🍴 Forks: {repo.forks}</p>
              {Object.keys(repo.languages).length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <p className="text-xs text-gray-400">
                    💻 {Object.entries(repo.languages)
                      .sort((a, b) => b[1] - a[1])
                      .map(([lang, pct]) => `${lang}: ${pct}%`)
                      .join(' | ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReposTab;
