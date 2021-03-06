import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectListini from '../SelectListini';
import AdminPricelistColumn from './AdminPricelistColumn';
import NewPeriodColumn from './NewPeriodColumn';
import RoomingLabelColumn from './RoomingLabelColumn';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { changePricelistName, deletePricelist, updatePriceListState, toggleNewPeriodFormState, syncNewNameState, setupAdminUpdatePage } from '../../actions/admin';

const AdminUpdate = ({deletePricelist, admin, changePricelistName, updatePriceListState, toggleNewPeriodFormState, syncNewNameState, setupAdminUpdatePage}) => {

    useEffect(() => {
        setupAdminUpdatePage();
    }, [setupAdminUpdatePage]);

    const {loaded, priceLists, priceList, newPricelistName} = admin;
    if (loaded) {
        return(
            <section className="container">
                <div className="admin-update">
                    <h1 className="my-1">Update Pricelist</h1>
                    <div className="admin-update-cmd my-1">
                        <SelectListini
                            label={false}
                            priceLists={priceLists}
                            value={priceList}
                            data={admin.data}
                            updatePriceList={updatePriceListState}
                        />
                        <a 
                            href="!#"
                            className="btn btn-primary btn-long"
                            onClick={toggleNewPeriodFormState}>Add New Period</a>
                        <a 
                            href="!#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (window.confirm('Are you sure? This can NOT be undone!')) {
                                    deletePricelist(admin.priceListId);
                                }
                            }}
                            className="btn btn-danger btn-long">Delete Pricelist</a>
                        <div className="pricelist-name">
                            <input 
                                className="styled-input"
                                type="text"
                                value={newPricelistName}
                                onChange={syncNewNameState}/>
                        </div>
                        <a 
                            href="!#"
                            onClick={(e) => {
                                e.preventDefault();
                                changePricelistName(admin.priceListId, admin.newPricelistName);
                            }}
                            className="btn btn-primary btn-long">Change Pricelist Name</a>
                    </div>
                    <div className="admin-update-prices_columns my-1">
                        <RoomingLabelColumn />
                        <AdminPricelistColumn />
                        {admin.newPeriod && <NewPeriodColumn />}
                    </div>
                </div>
            </section>
            );
    } else {
        return <Spinner />;
    }
}

AdminUpdate.propTypes = {
    admin: PropTypes.object.isRequired,
    changePricelistName: PropTypes.func.isRequired, 
    deletePricelist: PropTypes.func.isRequired, 
    updatePriceListState: PropTypes.func.isRequired,
    toggleNewPeriodFormState: PropTypes.func.isRequired,
    syncNewNameState: PropTypes.func.isRequired,
    setupAdminUpdatePage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    admin: state.admin
 });

export default connect(mapStateToProps, { changePricelistName, deletePricelist, updatePriceListState,toggleNewPeriodFormState, syncNewNameState, setupAdminUpdatePage })(AdminUpdate);