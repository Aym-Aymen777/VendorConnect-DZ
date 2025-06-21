import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Page A', value: 4000, sparkValue: 1 },
  { name: 'Page B', value: 3000, sparkValue: 4 },
  { name: 'Page C', value: 2000, sparkValue: 2 },
  { name: 'Page D', value: 2780, sparkValue: 5 },
  { name: 'Page E', value: 1890, sparkValue: 7 },
  { name: 'Page F', value: 2390, sparkValue: 2 },
  { name: 'Page G', value: 3490, sparkValue: 4 },
];

const sparkData = [
  { name: '1', line: 1, bar: 1 },
  { name: '2', line: 4, bar: 4 },
  { name: '3', line: 2, bar: 2 },
  { name: '4', line: 5, bar: 5 },
  { name: '5', line: 7, bar: 7 },
  { name: '6', line: 2, bar: 2 },
  { name: '7', line: 4, bar: 4 },
  { name: '8', line: 6, bar: 6 },
];

const radarData = [
  { subject: 'Math', value: 120, fullMark: 120 },
  { subject: 'Chinese', value: 98, fullMark: 120 },
  { subject: 'English', value: 86, fullMark: 120 },
  { subject: 'Geography', value: 99, fullMark: 120 },
  { subject: 'Physics', value: 85, fullMark: 120 },
  { subject: 'History', value: 65, fullMark: 120 },
];

// Custom gradient definitions
const GradientDefs = () => (
  <defs>
    {/* Primary gradient - golden */}
    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#e1a95f" stopOpacity={0.8}/>
      <stop offset="50%" stopColor="#e1a95f" stopOpacity={0.4}/>
      <stop offset="100%" stopColor="#e1a95f" stopOpacity={0.1}/>
    </linearGradient>
    
    {/* Secondary gradient - navy */}
    <linearGradient id="areaGradientSecondary" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#1f3b73" stopOpacity={0.8}/>
      <stop offset="50%" stopColor="#1f3b73" stopOpacity={0.4}/>
      <stop offset="100%" stopColor="#1f3b73" stopOpacity={0.1}/>
    </linearGradient>
    
    {/* Radial gradient for bars */}
    <radialGradient id="barGradient" cx="50%" cy="0%" r="100%">
      <stop offset="0%" stopColor="#e1a95f" stopOpacity={1}/>
      <stop offset="100%" stopColor="#d4941a" stopOpacity={0.8}/>
    </radialGradient>
    
    {/* Glow effect for lines */}
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
);

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-700">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Enhanced Area Chart Component
const EnhancedAreaChart = ({ reversed = false }) => {
  const [animationKey, setAnimationKey] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f4f2ed] to-[#f0ede5] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-1">
          {reversed ? 'Revenue Trend (Alt)' : 'Performance Analytics'}
        </h3>
        <p className="text-sm text-gray-600">Monthly progression data</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} key={animationKey}>
          <GradientDefs />
          <CartesianGrid strokeDasharray="3 3" stroke="#e1a95f" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#1f3b73' }}
            axisLine={{ stroke: '#e1a95f', strokeWidth: 2 }}
            tickLine={{ stroke: '#e1a95f' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#1f3b73' }}
            axisLine={{ stroke: '#e1a95f', strokeWidth: 2 }}
            tickLine={{ stroke: '#e1a95f' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={reversed ? "#e1a95f" : "#1f3b73"}
            strokeWidth={3}
            fill={reversed ? "url(#areaGradientSecondary)" : "url(#areaGradient)"}
            fillOpacity={0.6}
            filter="url(#glow)"
            animationDuration={2000}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Enhanced Spark Charts Component
const EnhancedSparkCharts = () => {
  const [activeChart, setActiveChart] = useState('line');

  // Rectangle histogram data
  const histogramData = [
    { name: 'A', value: 3 },
    { name: 'B', value: 7 },
    { name: 'C', value: 5 },
    { name: 'D', value: 2 },
    { name: 'E', value: 6 },
    { name: 'F', value: 4 },
    { name: 'G', value: 8 }
  ];

  return (
    <div className="bg-gradient-to-br from-[#f4f2ed] to-[#f0ede5] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-1">Quick Metrics</h3>
        <div className="flex gap-2 mb-3">
          <button 
            onClick={() => setActiveChart('line')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeChart === 'line' 
                ? 'bg-[#1f3b73] text-white shadow-md' 
                : 'bg-white/50 text-[#1f3b73] hover:bg-white/70'
            }`}
          >
            Trend
          </button>
          <button 
            onClick={() => setActiveChart('bar')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeChart === 'bar' 
                ? 'bg-[#e1a95f] text-white shadow-md' 
                : 'bg-white/50 text-[#1f3b73] hover:bg-white/70'
            }`}
          >
            Volume
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Line Spark Chart */}
        <div className={`transition-all duration-500 ${activeChart === 'line' ? 'opacity-100 transform-none' : 'opacity-30 scale-95'}`}>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={sparkData}>
              <GradientDefs />
              <Line
                type="monotone"
                dataKey="line"
                stroke="#1f3b73"
                strokeWidth={3}
                dot={{ fill: '#e1a95f', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#e1a95f', stroke: '#1f3b73', strokeWidth: 2 }}
                animationDuration={1500}
                filter="url(#glow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Rectangle Histogram */}
        <div className={`transition-all duration-500 ${activeChart === 'bar' ? 'opacity-100 transform-none' : 'opacity-30 scale-95'}`}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={histogramData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <GradientDefs />
              <CartesianGrid strokeDasharray="2 2" stroke="#e1a95f" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#1f3b73", fontSize: 11 }} 
                axisLine={{ stroke: "#e1a95f", strokeWidth: 1.5 }}
                tickLine={{ stroke: "#e1a95f" }}
              />
              <YAxis 
                tick={{ fill: "#1f3b73", fontSize: 11 }} 
                axisLine={{ stroke: "#e1a95f", strokeWidth: 1.5 }}
                tickLine={{ stroke: "#e1a95f" }}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="#1f3b73" 
                radius={[3, 3, 0, 0]}
                animationDuration={1400}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Enhanced Radar Chart Component
const EnhancedRadarChart = () => {
  const [animateRadar, setAnimateRadar] = useState(false);
  
  useEffect(() => {
    setAnimateRadar(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f4f2ed] to-[#f0ede5] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#1f3b73] mb-1">Skills Assessment</h3>
        <p className="text-sm text-gray-600">Multi-dimensional performance</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={radarData}>
          <GradientDefs />
          <PolarGrid 
            stroke="#e1a95f" 
            strokeWidth={1.5}
            opacity={0.6}
          />
          <PolarAngleAxis 
            tick={{ fontSize: 12, fill: '#1f3b73', fontWeight: 'medium' }}
            className="font-medium"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 120]} 
            tick={{ fontSize: 10, fill: '#1f3b73' }}
            tickCount={4}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#1f3b73"
            fill="url(#areaGradient)"
            fillOpacity={0.4}
            strokeWidth={3}
            dot={{ fill: '#e1a95f', strokeWidth: 2, r: 4 }}
            animationDuration={2000}
            filter="url(#glow)"
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Main Dashboard Component
export default function EnhancedChartsBoxes() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1f3b73] to-[#e1a95f] bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Comprehensive data visualization suite</p>
        </div>

        {/* Charts Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Top Row */}
          <div className="lg:col-span-1">
            <EnhancedAreaChart />
          </div>
          
          <div className="lg:col-span-1">
            <EnhancedSparkCharts />
          </div>
          
          {/* Bottom Row */}
          <div className="lg:col-span-1">
            <EnhancedRadarChart />
          </div>
          
          <div className="lg:col-span-1">
            <EnhancedAreaChart reversed={true} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { label: 'Total Revenue', value: '$124,532', change: '+12.5%', positive: true },
            { label: 'Active Users', value: '23,456', change: '+8.2%', positive: true },
            { label: 'Conversion Rate', value: '3.2%', change: '-0.3%', positive: false }
          ].map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#1f3b73]">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}