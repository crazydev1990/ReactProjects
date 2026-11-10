import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = () => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        // Ensure canvas element exists before initializing
        if (!canvasRef.current) return;

        // Initialize Chart.js instance
        chartRef.current = new Chart(canvasRef.current, {
            type: 'pie',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Sales',
                    data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
                    backgroundColor: ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'gray', 'aqua', 'purple', 'cyan'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sales Data',
                        color: 'red',
                        font: {
                            size: 24,
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'blue',
                            font: {
                                size: 16,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'red',
                        titleColor: 'blue',
                        bodyColor: 'green',
                        titleFont: {
                            size: 16,
                        },
                        bodyFont: {
                            size: 12,
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months',
                            color: 'black',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount ($)',
                            color: 'black',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        // Cleanup: destroy chart instance when component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default SalesChart;
