import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguagesTab = ({ data }) => {
  if (!data || !data.overall_languages || Object.keys(data.overall_languages).length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        📭 No language statistics available.
      </div>
    );
  }

  const sortedLanguages = Object.entries(data.overall_languages)
    .sort((a, b) => b[1] - a[1]);

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(168, 85, 247, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(251, 146, 60, 0.8)',
    'rgba(234, 179, 8, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(20, 184, 166, 0.8)',
    'rgba(99, 102, 241, 0.8)',
  ];

  const chartData = {
    labels: sortedLanguages.map(([lang]) => lang),
    datasets: [
      {
        data: sortedLanguages.map(([, pct]) => pct),
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.85)',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Language Distribution',
        color: 'rgba(255, 255, 255, 0.85)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.toFixed(1)}%`;
          }
        }
      }
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">🌐 Programming Languages Overview</h2>

      {/* Doughnut Chart */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-6 flex justify-center items-center" style={{ height: '400px' }}>
        <div style={{ maxWidth: '500px', width: '100%', height: '100%' }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Language bars */}
      <div className="space-y-4">
        {sortedLanguages.map(([lang, pct], index) => (
          <div key={lang} className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">{lang}</span>
              <span className="text-gray-400">{pct.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
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
  );
};

export default LanguagesTab;
