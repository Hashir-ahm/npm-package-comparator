import { useEffect, useState } from 'react';
import { Card, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import './comparison.css';
import { getPackageData } from '../../apiService';

interface DataType {
  key: string;
  data1: React.ReactNode;
  data2: React.ReactNode;
}

interface ComparisonProps {
  selectedValues: string[];
}

const Comparison = ({ selectedValues }: ComparisonProps) => {
  const [data, setData] = useState<DataType[]>([]);
  const [columns, setColumns] = useState<TableProps<DataType>['columns']>([]);

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (selectedValues.length !== 2) return;

      try {
        const packagesData = await getPackageData(selectedValues);
        
        const [pkg1, pkg2] = [packagesData[selectedValues[0]], packagesData[selectedValues[1]]];

        if (!pkg1 || !pkg2) {
          console.log('One or both packages not found in response.');
          return;
        }

        setColumns([
          {
            title: 'Package Name',
            dataIndex: 'key',
            rowScope: 'row',
            width: '20%',
          },
          {
            title: `${pkg1.collected.metadata.name} (${pkg1.collected.metadata.version})`,
            dataIndex: 'data1',
            width: '40%',
          },
          {
            title: `${pkg2.collected.metadata.name} (${pkg2.collected.metadata.version})`,
            dataIndex: 'data2',
            width: '40%',
          },
        ]);

        setData([
          {
            key: 'Description',
            data1: pkg1.collected.metadata.description || 'N/A',
            data2: pkg2.collected.metadata.description || 'N/A',
          },
          {
            key: 'Keywords',
            data1: (pkg1.collected.metadata.keywords || []).map((keyword, index) => (
              <Tag color="blue" key={index}>{keyword}</Tag>
            )),
            data2: (pkg2.collected.metadata.keywords || []).map((keyword, index) => (
              <Tag color="green" key={index}>{keyword}</Tag>
            )),
          },
          {
            key: 'Repository',
            data1: pkg1.collected.metadata.repository.type || 'N/A',
            data2: pkg2.collected.metadata.repository.type || 'N/A',
          },
          {
            key: 'License',
            data1: <Tag color="yellow">{pkg1.collected.metadata.license}</Tag>,
            data2: <Tag color="yellow">{pkg2.collected.metadata.license}</Tag>,
          },
          {
            key: 'Last Modified Date',
            data1: pkg1.collected.metadata.date || 'N/A',
            data2: pkg2.collected.metadata.date || 'N/A',
          },
          {
            key: 'Authors/Publishers',
            data1: pkg1.collected.metadata.author?.name || 'N/A',
            data2: pkg2.collected.metadata.author?.name || 'N/A',
          },
          {
            key: 'Maintainers',
            data1: pkg1.collected.metadata.maintainers[0].username || 'N/A',
            data2: pkg2.collected.metadata.maintainers[0].username || 'N/A',
          },
        ]);
      } catch (error) {
        console.error('Error fetching comparison data:', error);
      }
    };

    fetchComparisonData();
  }, [selectedValues]);

  return (
    <div className='space'>
      <Card title="Comparison" className='card2'>
        <Table columns={columns} dataSource={data} bordered pagination={false} style={{ width: '100%' }} />
      </Card>
    </div>
  );
};

export default Comparison;
