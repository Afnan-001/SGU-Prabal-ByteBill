'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SparklesCore } from "@/components/ui/sparkles";
import { BarLoader } from 'react-spinners';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

function decodeMonthIndex(monthIndex) {
  let year = Math.floor(monthIndex / 12);
  let month = monthIndex % 12;
  if (month === 0) {
    month = 12;
    year -= 1;
  }
  return `${year}-${month.toString().padStart(2, '0')}`;
}

export default function PredictionPage() {
  const [monthlySummary, setMonthlySummary] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      setError('Please log in to view your predictions.');
      setStatus('error');
      return;
    }

    (async () => {
      try {
        const token = await getToken();
        const res = await fetch('/api/predict', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Prediction fetch failed');

        setPredictions(data.predictions || []);
        setMonthlySummary({});
        setStatus('ready');
      } catch (err) {
        console.error('API error:', err);
        setError(err.message);
        setStatus('error');
      }
    })();
  }, [isSignedIn, getToken]);

  const allMonths = new Set();
  predictions.forEach(pred => {
    const predMonth = decodeMonthIndex(pred.month_index);
    allMonths.add(predMonth);
  });

  const months = Array.from(allMonths).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const categories = [...new Set(predictions.map(p => p.category))];

  const colorPalette = [
    '#ff6b6b', '#f7b731', '#4b7bec', '#20bf6b',
    '#8854d0', '#fa8231', '#45aaf2', '#a55eea'
  ];

  const predictedExpenseDatasets = categories.map((category, index) => {
    const predMap = {};
    predictions.forEach(p => {
      if (p.category === category) {
        predMap[decodeMonthIndex(p.month_index)] = p.predicted_monthly_expense;
      }
    });

    return {
      label: `${category} (Predicted)`,
      data: months.map(month => predMap[month] || null),
      borderColor: colorPalette[index % colorPalette.length],
      backgroundColor: colorPalette[index % colorPalette.length],
      borderDash: [6, 6],
      tension: 0.3,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    };
  });

  const chartData = {
    labels: months,
    datasets: predictedExpenseDatasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: typeof window !== 'undefined' ? window.innerWidth >= 640 : true,
        position: 'top',
        labels: {
          color: '#f3f4f6', // Light gray for text
        }
      },
      tooltip: { 
        mode: 'index', 
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#f7b731', // sky for title
        bodyColor: '#f3f4f6',  // Light gray for body
      },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    scales: {
      x: {
        title: { 
          display: true, 
          text: 'Month',
          color: '#f3f4f6', // Light gray
        },
        grid: { 
          display: true,
          color: 'rgba(243, 244, 246, 0.1)' // Light gray with opacity
        },
        ticks: {
          color: '#f3f4f6', // Light gray
        }
      },
      y: {
        title: { 
          display: true, 
          text: 'Expense (₹)',
          color: '#f3f4f6', // Light gray
        },
        grid: { 
          display: true,
          color: 'rgba(243, 244, 246, 0.1)' // Light gray with opacity
        },
        ticks: {
          color: '#f3f4f6', // Light gray
        },
        beginAtZero: true,
      },
    },
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent opacity-60"></div>
          <SparklesCore
            id="loading-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={15}
            className="w-full h-full"
            particleColor="#B4E1EF"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
              Analyzing Your Expenses
            </h1>
            <div className="w-full max-w-md">
              <BarLoader 
                color="#38bdf8" 
                width="100%"
                height={6}
                speedMultiplier={0.8}
              />
            </div>
            <p className="text-sky-200 animate-pulse">
              Crunching numbers and predicting future trends...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent opacity-60"></div>
          <SparklesCore
            id="error-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={15}
            className="w-full h-full"
            particleColor="#B4E1EF"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-sky-500/30 max-w-md mx-4">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-sky-500 hover:bg-sky-600 text-black px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden ">
      {/* Sparkles Background */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent opacity-60"></div>
        <SparklesCore
          id="prediction-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#B4E1EF"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-white">
           Monthly Expense Overview
        </h1>

        <div className="p-4 sm:p-6 rounded-lg border border-sky-500/30 bg-gray-900/80 backdrop-blur-sm shadow-lg mb-10 overflow-x-auto">
          <div className="w-full" style={{ minHeight: '300px', height: 'auto' }}>
            <div className="relative" style={{ minHeight: '300px', height: '50vh' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-sky-100">
           Predicted Expenses (Last 5 Months)
        </h2>

        {predictions.length === 0 ? (
          <p className="text-sky-200">No predicted expenses available.</p>
        ) : (
          Object.entries(
            predictions.reduce((acc, curr) => {
              const label = decodeMonthIndex(curr.month_index);
              if (!acc[label]) acc[label] = [];
              acc[label].push(curr);
              return acc;
            }, {})
          )
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([label, items]) => (
              <div key={label} className="mb-6">
                <h3 className="text-base sm:text-lg font-medium mb-2 text-sky-100">{label}</h3>
                <ul className="space-y-2">
                  {items.map(({ category, predicted_monthly_expense }, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 border border-sky-500/30 rounded-md bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
                    >
                      <span className="font-medium text-sm sm:text-base text-sky-100">{category}</span>
                      <span className="text-sm sm:text-base text-red-500">₹{predicted_monthly_expense.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
        )}
      </div>
    </div>
  );
}