import React from 'react';
import PropTypes from 'prop-types';
import {totalAmount} from '../../utils/dateUtilities';
import { connect } from 'react-redux';

const TotalAmount = ({dashboard}) => (
    <div className="dashboard-total_amount bg-primary my-1">
        <h3>Total Amount</h3>
        <h4>{totalAmount(dashboard)} €</h4>
    </div>
);

const mapStateToProps = state => ({
    dashboard: state.pricelist
})

TotalAmount.propTypes = {dashboard: PropTypes.object.isRequired}

export default connect(mapStateToProps)(TotalAmount);
