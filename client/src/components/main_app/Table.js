import React from 'react';
import Resume from './Resume';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import sizeMe from 'react-sizeme';

const Table = ({rooming, days, prices, total}) => {

  //Remove the rooming items equal to zero
  //Return => [["ad", 2], ...]
  const roomingArr = Object.entries(rooming).filter(([, number]) => number !== 0);

  return (
    <table className="table">
      <tbody>
        <tr class="header bg-primary">
          <th>From</th>
          <th>To</th>
          <th>Days</th>
          {roomingArr.map(([category,]) => <th key={uuid.v4()} >{category}</th>)}
          <th>Total</th>
        </tr>
        <Resume
          days={days}
          prices={prices}
          rooming={roomingArr}
          total={total}/>
      </tbody>
    </table>
  )
}

Table.propTypes = {
  days: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  rooming: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}

export default sizeMe()(Table);
