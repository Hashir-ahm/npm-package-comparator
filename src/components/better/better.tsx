import React, { useEffect, useState } from 'react';
import { Card, Statistic, Tag } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import './better.css';
import { getPackageData } from '../../apiService';
import numeral from 'numeral'

interface BetterProps {
  selectedValues: string[];
}

const Better: React.FC<BetterProps> = ({ selectedValues }) => {
  const [betterPackage, setBetterPackage] = useState<string | null>(null);
  const [betterStats, setBetterStats] = useState({
    downloads: 0,
    stars: 0,
    health: 0,
    description:"",
  });

  useEffect(() => {
    const fetchBetterData = async () => {
      if (selectedValues.length !== 2) return;

      try {
        const packagesData = await getPackageData(selectedValues);

        const [pkg1, pkg2] = [packagesData[selectedValues[0]], packagesData[selectedValues[1]]];

        if (!pkg1 || !pkg2) {
          console.log('One or both packages not found in response.');
          return;
        }
        
        const pkg1Score =
        pkg1.evaluation.quality.health +
        pkg1.evaluation.popularity.downloadsCount +
        pkg1.collected.github.starsCount;

        const pkg2Score =
        pkg2.evaluation.quality.health +
        pkg2.evaluation.popularity.downloadsCount +
        pkg2.collected.github.starsCount;

        if (pkg1Score > pkg2Score) {
          setBetterPackage(pkg1.collected.metadata.name);
          setBetterStats({
            health: pkg1.evaluation.quality.health,
            downloads:pkg1.evaluation.popularity.downloadsCount,
            stars:pkg1.collected.github.starsCount,
            description:pkg1.collected.metadata.description,
          });
        } else {
          setBetterPackage(pkg2.collected.metadata.name);
          setBetterStats({
            health: pkg2.evaluation.quality.health,
            downloads:pkg2.evaluation.popularity.downloadsCount,
            stars:pkg2.collected.github.starsCount,
            description:pkg2.collected.metadata.description,
          });
        }
      } catch (error) {
        console.error('Error fetching comparison data:', error);
      }
    };

    fetchBetterData();
  }, [selectedValues]);

  return (
    <div className='space'>
      <Card title={`✨ ${betterPackage} is ${betterPackage && selectedValues[0] !== betterPackage ? '1.47x' : ''} better! ✨`} className='card2'>
        <div className='package' style={{ width: '60%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', marginLeft: '-5rem' }}>
          <h1 style={{ display: 'flex', flexDirection: 'row', fontSize: '20px', gap: '10px' }}>
            <CrownOutlined /> {betterPackage} <Tag color='#1890FF' style={{ height: '25px', marginTop: '.1rem' }}>Recommended</Tag>
          </h1>
          <p style={{ fontSize: '16px' }}>
            {betterStats.description}
          </p>
          <div className='tags'>
            <Tag color='gray'>Typescript</Tag>
            <Tag color='gray'>Javascript</Tag>
          </div>
        </div>
        <div className='data' style={{ width: '30%', display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }}>
          <Statistic title="Downloads" value={numeral(betterStats.downloads).format('0.[0]a')}/>
          <Statistic title="Stars" value={numeral(betterStats.stars).format('0.[0]a') }/>
          <Statistic title="Health" value={betterStats.health * 100} suffix="%" />
        </div>
      </Card>
    </div>
  );
};

export default Better;
