import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function VitalsChart({ vitals }) {
  // Show only the last ~2 minutes of data (120 points)
  const displayData = vitals.slice(-120);

  return (
    <div className="vitals-chart">
      <h3>Heart Rate & SpO₂ Over Time</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={displayData}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="ts"
            tickFormatter={(ts) =>
              new Date(ts).toLocaleTimeString("en-US", {
                minute: "2-digit",
                second: "2-digit"
              })
            }
          />

          <YAxis
            yAxisId="left"
            label={{
              value: "Heart Rate (bpm)",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "SpO₂ (%)",
              angle: 90,
              position: "insideRight"
            }}
          />

          <Tooltip />
          <Legend />

          {/* Heart Rate Line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="hr"
            stroke="#ff4d4d"
            dot={false}
            name="Heart Rate"
            isAnimationActive={false}   // ensures smooth scrolling, no jumping
          />

          {/* SpO2 Line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="spo2"
            stroke="#1e90ff"
            dot={false}
            name="SpO₂"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
