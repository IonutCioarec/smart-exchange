import React from 'react';
import { intlNumberFormat } from 'utils/formatters';
import { PortfolioStatsProps, PortfolioDataObject } from 'types/frontendTypes';
import { portfolioColors, portfolioRewardsImages } from 'config';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';
import { Col, Row } from 'react-bootstrap';
import PortfolioRewardsChart from './PortfolioRewardsChart';
import { useMobile } from 'utils/responsive';

const PortfolioRewardsStats: React.FC<PortfolioStatsProps> = ({ data, balance }) => {
  const isMobile = useMobile();
  
  return (
    <>
      <div className='rewards-container' style={{ minHeight: '336px' }}>
        <Row>
          <Col xs={12} lg={6}>
            <p className='font-size-sm text-silver mb-0'>Available Rewards</p>
            <p className='text-white mb-0' style={{ fontSize: '40px' }}>${intlNumberFormat(balance, 0, 2)}</p>
        
            <Link to={'/pools'}>
              <Button
                size='small'
                className='btn-intense-default btn-intense-info hover-btn p-2 b-r-sm font-size-sm'
                style={{ minWidth: '100px' }}
              >
                <RedeemIcon fontSize='small' />
                <span className='ms-2'>Claim All</span>
              </Button>
            </Link>
          </Col>

          <Col xs={12} lg={6}>
            {!isMobile && (
              <div className='m-t-n-xl'>
                <PortfolioRewardsChart data={data} />
              </div>
            )}
          </Col>

          <Col xs={12} lg={12}>
            <p className='font-size-sm mb-1 text-silver mt-4'>Source</p>
            <table className='text-white font-size-sm fullWidth'>
              <tbody>
                {data.map((item: PortfolioDataObject, index: number) => {
                  const totalValue = data.reduce((sum, currentItem) => sum + currentItem.value, 0);
                  const percentage = ((item.value / totalValue) * 100).toFixed(2);

                  return (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(100,100,100, 0.3)' }}>
                      <td style={{ color: portfolioColors[index] }} width={'35%'}>
                        {portfolioRewardsImages[index]} {item.name}
                      </td>
                      <td width={'35%'} align="right">
                        ${item.value.toFixed(2)}
                      </td>
                      <td width={'30%'} align="right">
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PortfolioRewardsStats;