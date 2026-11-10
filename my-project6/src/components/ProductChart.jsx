import React from 'react'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const ProductChart = () => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                // ૧. અહીં લિમિટ ૧૦ રાખી છે જેથી ચાર્ટ ગીચ ન થાય
                const response = await fetch('https://dummyjson.com/products?limit=10');
                const data = await response.json();
                
                if (!canvasRef.current) return;

                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // ૨. ડેટા DummyJSON મુજબ 'data.products' માંથી રીડ કર્યો
                chartRef.current = new Chart(canvasRef.current, {
                    type: 'bar', // બાર ચાર્ટ
                    data: {
                        labels: data.products.map((product) => product.title), // અહીં 'title' આવશે
                        datasets: [{
                            label: 'Price ($)',
                            data: data.products.map((product) => product.price), // કિંમત
                            backgroundColor: ['red','pink','blue','green','yellow','orange','purple'],
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                display: true
                            }
                        }
                    }
                });
            } catch (error) {
                console.error("ડેટા લાવવામાં ભૂલ થઈ:", error);
            }
        };

        getProducts();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []); 

    return (
        <div style={{ marginTop: '40px' }}>
            <h2>My Product Chart</h2>
            <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}

export default ProductChart;
