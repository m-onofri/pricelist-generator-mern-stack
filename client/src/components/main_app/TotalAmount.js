import React from 'react';
import PropTypes from 'prop-types';

const TotalAmount = ({total}) => (
    <div className="dashboard-total_amount bg-primary my-1">
        <h3>Total Amount</h3>
        <h4>{total} €</h4>
    </div>
);

TotalAmount.propTypes = {total: PropTypes.number.isRequired}

export default TotalAmount;
