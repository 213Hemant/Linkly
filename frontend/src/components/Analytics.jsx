import React from "react";
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function Analytics({ links }) {
  // Total links & clicks
  const totalLinks  = links.length;
  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0);

  // Data for pie: top 5 links by clicks
  const pieData = links
    .map(l => ({ name: l.shortCode, value: l.clickCount }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Data for bar: all links
  const barData = links.map(l => ({
    code: l.shortCode,
    clicks: l.clickCount
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded text-center">
          <p className="text-lg">Total Links</p>
          <p className="text-3xl font-bold">{totalLinks}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded text-center">
          <p className="text-lg">Total Clicks</p>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-md font-medium mb-2">Top 5 Clicked Links</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-md font-medium mb-2">Clicks per Link</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="code" />
              <YAxis allowDecimals={false} />
              <BarTooltip />
              <Bar dataKey="clicks" fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
