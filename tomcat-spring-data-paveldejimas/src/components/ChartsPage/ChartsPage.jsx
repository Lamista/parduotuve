import React from "react";
import { Bar } from "react-chartjs-2";

const ChartsPage = ({ products }) => {
    let upTo10 = products.filter(p => p.price < 10).length;
    let upTo50 = products.filter(p => p.price >= 10 && p.price < 50).length;
    let upTo100 = products.filter(p => p.price >= 50 && p.price < 100).length;
    let upTo1000 = products.filter(p => p.price >= 100 && p.price < 1000).length;
    let more1000 = products.filter(p => p.price >= 1000).length;

    const state = {
        dataBar: {
            labels: ["0-10", "10-50", "50-100", "100-1000", "1000 and more"],
            datasets: [
                {
                    label: "Qty of Products at price range (€)",
                    data: [upTo10, upTo50, upTo100, upTo1000, more1000, 3],
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)"
                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                ]
            }
        }
    }

    return (
        <div>
            <h3 className="mt-5">Products at specific price range</h3>
            <Bar data={state.dataBar} options={state.barChartOptions} />
        </div>
    );
}

export default ChartsPage;