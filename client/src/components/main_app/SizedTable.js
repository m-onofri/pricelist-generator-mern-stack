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
    setTableData({
      display: size.width + 80 < window.innerWidth,
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

export default SizedTable;