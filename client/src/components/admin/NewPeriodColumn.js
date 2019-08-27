import React from 'react';
import { connect } from 'react-redux';
import { updateNewPeriodDataState, addPeriod, toggleNewPeriodFormState } from '../../actions/admin';
import PropTypes from 'prop-types';

const NewPeriodColumn = ({newPeriodData, priceListId, updateNewPeriodDataState, addPeriod,toggleNewPeriodFormState}) => {

    const {periodName, start, end, ad, ad34, chd3, chd4, inf, culla, animal, sing} = newPeriodData;
            return(
                <div className="column price-column">
                    <div className="input-block">
                        <input type="text" name="periodName" value={periodName} required onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" name="start" value={start} required onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="date" style={{"padding": "0.215rem 0"}} name="end" value={end} required onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="ad" step="0.01" value={ad} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="ad34" step="0.01" value={ad34} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="chd3" step="0.01" value={chd3} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="chd4" step="0.01" value={chd4} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="inf" step="0.01" value={inf} required min="0"onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="culla" step="0.01" value={culla} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="animal" step="0.01" value={animal} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <input type="number" name="sing" step="0.01" value={sing} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div className="input-block">
                        <a 
                            href="!#" 
                            className="btn btn-success" 
                            onClick={(e) => {
                                e.preventDefault();
                                addPeriod(newPeriodData, priceListId, undefined);
                            }}>
                        Add</a>
                    </div>
                    <div className="input-block">
                        <a href="!#" className="btn btn-danger" onClick={toggleNewPeriodFormState}>Back</a>
                    </div>
                </div>
            );
}

const mapStateToProps = state => ({
    newPeriodData: state.admin.newPeriodData,
    priceListId: state.admin.priceListId
})

NewPeriodColumn.propTypes = {
    newPeriodData: PropTypes.object.isRequired,
    priceListId: PropTypes.string.isRequired, 
    updateNewPeriodDataState: PropTypes.func.isRequired, 
    addPeriod: PropTypes.func.isRequired,
    toggleNewPeriodFormState: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { updateNewPeriodDataState, addPeriod, toggleNewPeriodFormState })(NewPeriodColumn);