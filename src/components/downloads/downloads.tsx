import { Card } from 'antd';
import { Line } from '@ant-design/plots';
import './downloads.css';

interface DownloadsProps {
  package1Data: any; 
  package2Data: any;
}

const Downloads = ({ package1Data, package2Data }: DownloadsProps) => {
  const package1Downloads = package1Data.collected.npm.downloads || [];
  const package2Downloads = package2Data.collected.npm.downloads || [];

  const dates = new Set([
    ...package1Downloads.map((item: any) => item.from),
    ...package2Downloads.map((item: any) => item.from),
  ]);

  const allDates = Array.from(dates).sort();

  const createDataMap = (downloads: any[], packageName: string) => {
    const dataMap = new Map(allDates.map(date => [date, 0]));

    downloads.forEach((item: any) => {
      if (dataMap.has(item.from)) {
        dataMap.set(item.from, item.count);
      }
    });

    return Array.from(dataMap.entries()).map(([date, count]) => ({
      date,
      value: count,
      package: packageName,
    }));
  };

  const data = [
    ...createDataMap(package1Downloads, package1Data.collected.metadata.name),
    ...createDataMap(package2Downloads, package2Data.collected.metadata.name),
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'package',
    point: {
      size: 5,
      shape: 'diamond',
    },
    lineStyle: {
      lineWidth: 2,
    },
    xAxis: {
      type: 'time',
      tickInterval: 30 * 24 * 60 * 60 * 1000,
      tickCount: 5,
    },
    yAxis: {
      title: {
        text: 'Downloads',
      },
    },
    tooltip: {
      showMarkers: false,
    },
    legend: {
      position: 'top-left',
    },
  };

  return (
    <div className='space'>
      <Card title="Downloads" className='card3'>
        <div>
          <Line style={{ width: "100%" }} {...config} />
        </div>    
      </Card>
    </div>
  );
};

export default Downloads;
