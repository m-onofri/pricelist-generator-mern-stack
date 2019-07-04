import React from 'react';

const Periods = ({index, data, addNewValuesHandler}) => {
    return (
        <div className="periods" id={`period-${index}`}>
            <input type="text" name="name" value={data.name} onChange={addNewValuesHandler}/>
            <input type="text" name="period" value={data.period} onChange={addNewValuesHandler} />
            <input type="date" name="start" value={data.start} onChange={addNewValuesHandler}/>
            <input type="date"  name="end" value={data.end} onChange={addNewValuesHandler}/>
            <input type="number" name="ad" step="0.01" value={data.ad} onChange={addNewValuesHandler}/>
            <input type="number" name="ad34" step="0.01" value={data.ad34} onChange={addNewValuesHandler}/>
            <input type="number" name="chd3" step="0.01" value={data.chd3} onChange={addNewValuesHandler}/>
            <input type="number" name="chd4" step="0.01" value={data.chd4} onChange={addNewValuesHandler}/>
            <input type="number" name="inf" step="0.01" value={data.inf} onChange={addNewValuesHandler}/>
            <input type="number" name="culla" value={data.culla} onChange={addNewValuesHandler}/>
            <input type="number" name="animal" value={data.animal} onChange={addNewValuesHandler}/>
            <input type="number" name="sing" value={data.sing} onChange={addNewValuesHandler}/>
        </div>
    );
}

export default Periods;