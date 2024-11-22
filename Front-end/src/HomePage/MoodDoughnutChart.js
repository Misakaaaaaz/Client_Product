// MoodDoughnutChart.js
import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// 注册 Chart.js 的必要元素
Chart.register(ArcElement, Tooltip, Legend);

function MoodDoughnutChart({ moodData }) {
    const chartRef = useRef(null);

    // Mood 映射
    const moodMapping = {
        1: { label: 'Despondent', color: '#ED5958' },
        2: { label: 'Frustrated', color: '#AF3BE7' },
        3: { label: 'Neutral', color: '#EDEDED' },
        4: { label: 'Content', color: '#F0C302' },
        5: { label: 'Ecstatic', color: '#7DEF0D' },
    };

    // 构造 Doughnut 图表数据
    const moodCounts = {};
    moodData.forEach(item => {
        moodCounts[item.moodScore] = (moodCounts[item.moodScore] || 0) + 1;
    });

    const labels = Object.keys(moodCounts).map(key => moodMapping[key].label);
    const dataValues = Object.values(moodCounts);
    const backgroundColors = Object.keys(moodCounts).map(key => moodMapping[key].color);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: backgroundColors,
                borderWidth: 0,
            },
        ],
    };

    // Get today's mood score
    const getMoodScoreForToday = (moodData) => {
        const today = new Date().toISOString().split('T')[0];
        const todayMoodEntry = moodData.find(entry => entry.moodDate === today);
        return todayMoodEntry ? todayMoodEntry.moodScore : 0;
    };

    // its for real use, check today's mood
    const todayMood = getMoodScoreForToday(moodData)
    // const todayMood = 4

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '90%' }}>
                {/* 在 Doughnut 图的中心插入图片 */}
                {(todayMood != 0) ?
                    <img
                        src={`${process.env.PUBLIC_URL}/daily_mood/${todayMood}.png`}
                        alt="Center Mood"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '110px', // 控制图片的尺寸
                            height: '110px',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            zIndex: '1',
                        }}
                    />:<b>No Mood for Today</b>
                }
               
                {/* Doughnut 图表 */}
                <div style={{ position: 'relative', zIndex: '2' }}>
                    <Doughnut
                        ref={chartRef}
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '85%',
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: false,
                                    external: function (context) {
                                        // 获取 tooltip 元素，如果不存在则创建
                                        let tooltipEl = document.getElementById('chartjs-tooltip');
                                        if (!tooltipEl) {
                                            tooltipEl = document.createElement('div');
                                            tooltipEl.id = 'chartjs-tooltip';
                                            tooltipEl.style.position = 'absolute';
                                            tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
                                            tooltipEl.style.borderRadius = '3px';
                                            tooltipEl.style.color = 'white';
                                            tooltipEl.style.padding = '10px';
                                            tooltipEl.style.pointerEvents = 'none';
                                            tooltipEl.style.zIndex = '999';
                                            document.body.appendChild(tooltipEl);
                                        }

                                        // 获取 tooltip 模型数据
                                        const tooltipModel = context.tooltip;

                                        if (tooltipModel.opacity === 0) {
                                            tooltipEl.style.opacity = '0';
                                            return;
                                        }

                                        // 设置 tooltip 内容
                                        if (tooltipModel.body && tooltipModel.dataPoints) {
                                            // 获取当前数据点的索引
                                            const dataIndex = tooltipModel.dataPoints[0].dataIndex;
                                            // 获取对应的标签
                                            const moodLabel = labels[dataIndex];

                                            // 通过标签找到相应的日期
                                            const dates = moodData
                                                .filter(item => moodMapping[item.moodScore].label === moodLabel)
                                                .map(item => item.moodDate)
                                                .join(', ');

                                            tooltipEl.innerHTML = `${moodLabel}: ${dates}`;
                                        }

                                        // 设置 tooltip 的位置
                                        const position = context.chart.canvas.getBoundingClientRect();
                                        tooltipEl.style.opacity = '1';
                                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                                        tooltipEl.style.zIndex = '999';
                                    },
                                }
,
                            },
                        }}
                    />
                </div>
            </div>
            {/* 动态渲染心情标签 */}
            <div style={{ marginLeft: 'auto', marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {Object.keys(moodCounts)
                    .sort((a, b) => b - a)
                    .map((key) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <div
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: moodMapping[key].color,
                                    borderRadius: '50%',
                                    marginRight: '8px',
                                }}
                            ></div>
                            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{moodMapping[key].label}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MoodDoughnutChart;
