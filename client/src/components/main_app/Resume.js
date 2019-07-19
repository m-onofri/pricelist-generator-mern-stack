import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const Resume = ({days, prices, rooming, total}) => {
  const renderDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  const dailyAmount = (rooming, price) => {
    const total = rooming
                    .map(([category, number]) => number * price[category])
                    .reduce((a, b) => {
                      return a + b;
                    }, 0);
    return Math.round(total * 100) / 100;
  }

  const renderTable = (days, prices, rooming) => {
    let result = [];
    for(let i=0; i < days.length; i++) {
      for(let j=0; j < days[i][1].length; j++) {
        result.push(<tr key={uuid.v4()} >
                      <td>{renderDate(days[i][1][j])}</td>
                        {rooming.map(([category, number]) => <td key={uuid.v4()} >{number} x {prices[i][1][category]} €</td>)}
                      <td>{dailyAmount(rooming, prices[i][1])} €</td>
                    </tr>);
      }
    }
    result.push(<tr key={uuid.v4()} >
                  <th>{result.length} days</th>
                    {rooming.map(([category, number]) => <th key={uuid.v4()}>{number} {category}</th>)}
                  <th>{total} €</th>
                </tr>);
    return result;
  }

  return (
      <>
        {renderTable(days, prices, rooming)}
      </>
  );
}

Resume.propTypes = {
  days: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  rooming: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
}

export default Resume;
