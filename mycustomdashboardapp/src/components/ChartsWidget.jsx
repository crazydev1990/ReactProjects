
import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function ChartsWidget() {
  const barCanvas = useRef(null);
  const lineCanvas = useRef(null);

  useEffect(() => {
    const barChart = new Chart(barCanvas.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: "Users",
          data: [120, 190, 150, 250, 220, 300],
          backgroundColor: "#4f46e5",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const lineChart = new Chart(lineCanvas.current, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: "Revenue",
          data: [100, 180, 140, 280, 240, 350],
          borderColor: "#16a34a",
          backgroundColor: "rgba(22,163,74,0.12)",
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      barChart.destroy();
      lineChart.destroy();
    };
  }, []);

  return (
    <div className="charts-grid">
      <div className="widget-card">
        <h3>Users Statistics</h3>
        <div className="chart-area">
          <canvas ref={barCanvas}></canvas>
        </div>
      </div>

      <div className="widget-card">
        <h3>Revenue Statistics</h3>
        <div className="chart-area">
          <canvas ref={lineCanvas}></canvas>
        </div>
      </div>
    </div>
  );
}
