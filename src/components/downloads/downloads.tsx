import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/plots';
import { getPackageData } from '../../apiService';
import './downloads.css';
import { ChartData } from 'chart.js';

interface DownloadsProps {
  selectedValues: string[];
}

const Downloads = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: []
  });

  // Example selected values
  const selectedValues = ['react', 'vue']; // Replace with actual selected values

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPackageData(selectedValues);

        // Process the data for chart
        const labels = selectedValues; // The labels are package names
        const datasets = Object.keys(data).map(packageName => ({
          label: packageName,
          data: [data[packageName].collected.npm.downloads],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }));

        setChartData({
          labels: labels,
          datasets: datasets
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      
        <Line data={chartData} />
    </div>
  );
};

export default Downloads;
