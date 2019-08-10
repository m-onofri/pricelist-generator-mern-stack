import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const AlternativeTable = ({rooming, days, prices, total}) => {

  //Remove the rooming items equal to zero
  //Return => [["ad", 2], ...]
const roomingArr = Object.entries(rooming).filter(([, number]) => number !== 0);

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
        result.push(<div key={uuid.v4()} className="t-row">
                        <div class="t-head">
                            <h3>From</h3>
                            <h3>To</h3>
                            <h3>Days</h3>
                            {rooming.map(([category,]) => <h3 key={uuid.v4()} >{category}</h3>)}
                            <h3>Amount</h3> 
                        </div>
                        <div class="t-data">
                            <h3>{renderDate(start)}</h3>
                            <h3>{renderDate(end)}</h3>
                            <h3>{daysNumber}</h3>
                            {rooming.map(([category, number]) => <h3 key={uuid.v4()} >{number} x {prices[i][1][category]} €</h3>)}
                            <h3>{dailyAmount(rooming, prices[i][1])} € x {daysNumber} day(s)</h3>
                        </div>
                    </div>);
    }
    result.push(<div key={uuid.v4()} className="t-row" >
                    <div class="t-head">
                        <h3>From</h3>
                        <h3>To</h3>
                        <h3>Days</h3>
                        {rooming.map(([category,]) => <h3 key={uuid.v4()} >{category}</h3>)}
                        <h3>Total</h3> 
                    </div>
                    <div class="t-data">
                        <h3>{renderDate(firstDay)}</h3>
                        <h3>{renderDate(lastDay)}</h3>
                        <h3>{totalDays}</h3>
                            {rooming.map(([category, number]) => <h3 key={uuid.v4()}>{number} {category}</h3>)}
                        <h3>{total} €</h3>
                    </div>
                </div>);
    return result;
  }

  return (
    <div class="alt-table">
        {renderTable(days, prices, roomingArr)}
    </div> 
  )
}

AlternativeTable.propTypes = {
  days: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  rooming: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}

export default AlternativeTable;
