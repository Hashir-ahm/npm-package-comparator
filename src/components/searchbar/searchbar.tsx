import { useState } from 'react';
import './searchbar.css';
import { Button, Card, Select, Space, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { getAutocompleteSuggestions } from '../../apiService';

const SearchBar = ({ onLoadingChange, onSelectedValuesChange, onShowComparison }: any) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestions = async (query: string) => {
    if (query) {
      setLoading(true);
      try {
        const suggestions = await getAutocompleteSuggestions(query);
        const newOptions = suggestions.map((suggestion: any) => ({
          label: suggestion.package.name,
          value: suggestion.package.name,
        }));
        setOptions(newOptions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = (value: string) => {
    fetchSuggestions(value);
  };

  const handleChange = (value: string[]) => {
    if (value.length > 2) {
      setError('You can select only up to 2 options.');
    } else {
      setSelectedValues(value);
      setError(null);
      onSelectedValuesChange(value);
    }
  };

  const handleCompare = () => {
    onLoadingChange(true); 
    setTimeout(() => {
      onLoadingChange(false); 
      onShowComparison(true); 
    }, 2000);
  };

  return (
    <div className='search'>
      <Card className='card'>
        <Space style={{ width: '100%' }} direction="vertical">
          <Select
            className='select'
            mode="multiple"
            allowClear
            placeholder="Please select"
            value={selectedValues}
            onChange={handleChange}
            onSearch={handleSearch}
            options={options}
            notFoundContent={loading ? 'Loading...' : null}
            filterOption={false} 
          />
          {error && (
            <Alert className='alert'
              message="Error"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
            />
          )}
        </Space>
        <Button onClick={handleCompare} className='button'>
          <SearchOutlined />
          Compare
        </Button>
      </Card>
    </div>
  );
};

export default SearchBar;
