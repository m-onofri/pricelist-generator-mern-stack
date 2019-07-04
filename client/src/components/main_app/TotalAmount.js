import React from 'react';
import PropTypes from 'prop-types';

const TotalAmount = ({total}) => <h2 id="totalAmount">Total: {total} €</h2>

TotalAmount.propTypes = {total: PropTypes.number.isRequired}

export default TotalAmount;
