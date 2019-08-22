import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import AlternativeTable from './AlternativeTable';

function SizedTable({days, prices, rooming, total}) {
  
  const roomingArr = Object.entries(rooming).filter(([, number]) => number !== 0);
  
  const[tableData, setTableData] = useState({
    display: true,
    width: 0,
    maxFields: 4
  });

  useEffect(() => {
    if (!tableData.display) {
      console.log(tableData.maxFields,(4 + roomingArr.length));
      setTableData({
        ...tableData,
        maxFields: tableData.maxFields,
        display: tableData.maxFields > (4 + roomingArr.length)
      }); 
    }
  }, [roomingArr.length]);

  const onSize = size => {
    const overMargin = window.innerWidth < 1100 ? 80 : 265;

    setTableData({
      display: size.width + overMargin < window.innerWidth,
      width: size.width,
      maxFields: 4 + roomingArr.length
    }); 
  }

  return (
    <div>
      {tableData.display ? 
        <Table
          onSize={onSize}
          days={days}
          prices={prices}
          rooming={rooming}
          total={total}/> :
        <AlternativeTable
          days={days}
          prices={prices}
          rooming={rooming}
          total={total}/>
      }
    </div>
  );
}

SizedTable.propTypes = {
  days: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  rooming: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}

export default SizedTable;