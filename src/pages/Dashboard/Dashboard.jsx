import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import {
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  // Dummy data
  const stats = [
    { title: "Page Views", value: "234k", change: "+4.3%", icon: Eye },
    { title: "Time on Site", value: "12m 3s", change: "+19%", icon: Clock },
    { title: "Bounce Rate", value: "52.12%", change: "-14%", icon: TrendingUp },
    { title: "Revenue", value: "$2,206.62", change: "+11%", icon: DollarSign },
    { title: "Total Followers", value: "3,456k", change: "+18%", icon: Users },
  ];

  const barData = [
    { month: "Jan", visitors: 4000 },
    { month: "Feb", visitors: 3200 },
    { month: "Mar", visitors: 2800 },
    { month: "Apr", visitors: 5000 },
    { month: "May", visitors: 4300 },
    { month: "Jun", visitors: 3900 },
  ];

  const pieData = [
    { name: "Local", value: 400 },
    { name: "Domestic", value: 300 },
    { name: "International", value: 300 },
  ];
  const COLORS = ["#3b82f6", "#22c55e", "#ef4444"];

  const countries = [
    { country: "USA", traffic: 4534, bounce: "33%", exits: "12%" },
    { country: "UK", traffic: 5463, bounce: "9%", exits: "7%" },
    { country: "India", traffic: 6534, bounce: "20%", exits: "21%" },
    { country: "Canada", traffic: 4324, bounce: "15%", exits: "19%" },
    { country: "France", traffic: 5463, bounce: "32%", exits: "15%" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto ml-72 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
          <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, John! Here’s the latest overview.</p>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6">
          {/* Highlight Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              🎉 Congratulations John!
            </h2>
            <p className="text-gray-600 mb-1">
              You reached <strong>10M Page Views</strong>
            </p>
            <small className="text-gray-400">
              You’ve achieved 100% of your target today.
            </small>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex flex-col gap-2"
              >
                <div className="text-blue-500 flex items-center">
                  <s.icon size={22} />
                </div>
                <h3 className="text-gray-900 font-semibold">{s.title}</h3>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <small className="text-gray-400">{s.change} vs last month</small>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow p-6">
              <h3 className="text-gray-900 font-semibold mb-4">Website Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow p-6">
              <h3 className="text-gray-900 font-semibold mb-4">Website Visitors</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Country Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Country Traffic Source</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 border border-gray-200 text-left font-semibold text-gray-900">
                    Country
                  </th>
                  <th className="p-3 border border-gray-200 text-left font-semibold text-gray-900">
                    Total Traffic
                  </th>
                  <th className="p-3 border border-gray-200 text-left font-semibold text-gray-900">
                    Bounce Rate
                  </th>
                  <th className="p-3 border border-gray-200 text-left font-semibold text-gray-900">
                    Exits
                  </th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 text-sm">{c.country}</td>
                    <td className="p-3 border border-gray-200 text-sm">{c.traffic}</td>
                    <td className="p-3 border border-gray-200 text-sm">{c.bounce}</td>
                    <td className="p-3 border border-gray-200 text-sm">{c.exits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
