import React from 'react';
import NVD3Chart from 'react-nvd3';

function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDatum() {
  // let sin = [],
  let sin2 = [],
    sin3 = [];

  const len = 35 + Math.random() * (70 - 35);
  for (let i = 0; i < len; i++) {
    sin2.push({
      x: i,
      y: generateNumber(0, 100)
    });
    sin3.push({
      x: i,
      y: generateNumber(0, 30)
    });
  }
  return [
    {
      values: sin3,
      key: 'Şirketteki Çalışan Sayısı',
      color: '#04a9f5'
    },
    {
      values: sin2,
      key: 'şirketteki Stajyer Sayısı',
      color: '#1de9b6',
      area: true
    }
  ];
}

const MultiBarChart = () => {
  const data = getDatum();
  return <NVD3Chart type="multiBarChart" datum={data} x="x" y="y" height={300} showValues groupSpacing={0.2} />;
};

export default MultiBarChart;
