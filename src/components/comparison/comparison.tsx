import React, { useEffect, useState } from 'react';
import { Card, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import './comparison.css';
import { getPackageData } from '../../apiService';

interface DataType {
  key: string;
  name: React.ReactNode;
  age: React.ReactNode;
}

interface ComparisonProps {
  selectedValues: string[];
}

const Comparison: React.FC<ComparisonProps> = ({ selectedValues }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [columns, setColumns] = useState<TableProps<DataType>['columns']>([]);

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (selectedValues.length !== 2) return;

      try {
        const packagesData = await getPackageData(selectedValues);
        // console.log('Fetched data:', packagesData);

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
            dataIndex: 'name',
            width: '40%',
          },
          {
            title: `${pkg2.collected.metadata.name} (${pkg2.collected.metadata.version})`,
            dataIndex: 'age',
            width: '40%',
          },
        ]);

        setData([
          {
            key: 'Description',
            name: pkg1.collected.metadata.description || 'N/A',
            age: pkg2.collected.metadata.description || 'N/A',
          },
          {
            key: 'Keywords',
            name: (pkg1.collected.metadata.keywords || []).map((keyword, index) => (
              <Tag color="blue" key={index}>{keyword}</Tag>
            )),
            age: (pkg2.collected.metadata.keywords || []).map((keyword, index) => (
              <Tag color="green" key={index}>{keyword}</Tag>
            )),
          },
          {
            key: 'Repository',
            name: pkg1.collected.metadata.repository.type || 'N/A',
            age: pkg2.collected.metadata.repository.type || 'N/A',
          },
          {
            key: 'License',
            name: <Tag color="yellow">{pkg1.collected.metadata.license}</Tag>,
            age: <Tag color="yellow">{pkg2.collected.metadata.license}</Tag>,
          },
          {
            key: 'Last Modified Date',
            name: pkg1.collected.metadata.date || 'N/A',
            age: pkg2.collected.metadata.date || 'N/A',
          },
          {
            key: 'Authors/Publishers',
            name: pkg1.collected.metadata.author?.name || 'N/A',
            age: pkg2.collected.metadata.author?.name || 'N/A',
          },
          {
            key: 'Maintainers',
            name: pkg1.collected.metadata.maintainers.username || 'N/A',
            age: pkg2.collected.metadata.maintainers.username || 'N/A',
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
