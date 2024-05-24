import React from 'react';
import NVD3Chart from 'react-nvd3';

const originalNames = [
  'Bilgisayar Programcılığı',
  'Bilişim Güvenliği Teknolojisi',
  'Biyomedikal Cihaz Teknolojisi',
  'E-Ticaret ve Pazarlama',
  'Elektrik',
  'Hibrid ve Elektrikli Taşıtlar Teknolojileri',
  'İnsansız Hava Aracı Teknolojisi ve Operatörlüğü',
  'Lojistik',
  'Makine',
  'Mekatronik',
  'Silah Sanayi Teknikerliği'
];

const datum = [
  { key: '1', y: 29, color: '#ff8a65' },
  { key: '2', y: 0, color: '#f4c22b' },
  { key: '3', y: 32, color: '#04a9f5' },
  { key: '4', y: 196, color: '#3ebfea' },
  { key: '5', y: 2, color: '#4F5467' },
  { key: '6', y: 98, color: '#1de9b6' },
  { key: '7', y: 13, color: '#a389d4' },
  { key: '8', y: 5, color: '#FE8A7D' },
  { key: '9', y: 98, color: '#1de' },
  { key: '10', y: 13, color: '#a38' },
  { key: '11', y: 5, color: '#FE8' }
];

const PieBasicChart = () => {
  return (
    <div>
      <NVD3Chart id="chart" height={300} type="pieChart" datum={datum} x="key" y="y" />
      <ul>
        {datum.map((d, index) => (
          <li key={d.key}>
            {d.key}: {originalNames[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PieBasicChart;
