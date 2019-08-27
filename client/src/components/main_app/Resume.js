import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import {renderDate, periodAmount} from '../../utils/dateUtilities';

const Resume = ({days, prices, rooming, total}) => {

  const renderTable = (days, prices, rooming) => {
    let result = [];
    const firstDay = days[0][1][0];
    const lastPeriodLength = days[days.length - 1][1].length;
    const lastDay = days[days.length - 1][1][lastPeriodLength - 1] + 86400000;
    const totalDays = days.reduce((total, period) => {
      total +=  period[1].length;
      return total;
    }, 0);
    for(let i=0; i < days.length; i++) {
        const daysNumber = days[i][1].length;
        const start = days[i][1][0];
        const end = days[i][1][daysNumber - 1] + 86400000;
        result.push(<tr key={uuid.v4()} className="data">
                      <td>{renderDate(start)}</td>
                      <td>{renderDate(end)}</td>
                      <td>{daysNumber}</td>
                        {rooming.map(([category, number]) => <td key={uuid.v4()} >{number} x {prices[i][1][category]} €</td>)}
                      <td>{periodAmount(rooming, prices[i][1])} € x {daysNumber} day(s)</td>
                    </tr>);
    }
    result.push(<tr key={uuid.v4()} className="resume bg-primary" >
                  <th>{renderDate(firstDay)}</th>
                  <th>{renderDate(lastDay)}</th>
                  <th>{totalDays}</th>
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
