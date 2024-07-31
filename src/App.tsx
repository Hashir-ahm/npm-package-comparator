import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';
import SearchBar from './components/searchbar/searchbar';
import Comparison from './components/comparison/comparison'; 
import Downloads from './components/downloads/downloads';
import Better from './components/better/better';
import Footer from './components/footer/footer';
import { getPackageData } from './apiService'; 

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [packageData, setPackageData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedValues.length === 2) {
      setLoading(true);
      getPackageData(selectedValues)
        .then((data) => {
          setPackageData(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [selectedValues]);

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleSelectedValuesChange = (values: string[]) => {
    setSelectedValues(values);
  };

  const handleShowComparison = (show: boolean) => {
    setShowComparison(show);
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar 
        onLoadingChange={handleLoadingChange}
        onSelectedValuesChange={handleSelectedValuesChange}
        onShowComparison={handleShowComparison}
      />
      {!loading && showComparison && selectedValues.length === 2 && (
        <div className='comparison-container'>
          <Comparison selectedValues={selectedValues} />
          <Downloads 
            package1Data={packageData[selectedValues[0]]}
            package2Data={packageData[selectedValues[1]]}
          />
          <Better selectedValues={selectedValues} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
