import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedDate, FormattedMessage } from 'react-intl';
import { LoadingComponent } from '../../index';
import { AgGridReact } from 'ag-grid-react';
import styles from './ListComponent.module.scss';
import { Link } from "react-router-dom";

function ListComponent({ fetchAllArticles, allArticles, error, loading, intl }) {

    const [columnDefs, setColumnDef] = useState([]);

    useEffect(() => {
        setColumnDef([
            { headerName: intl.formatMessage({ id: "listComponent.id" }), field: "id", flex: 1 },
            {
                headerName: intl.formatMessage({ id: "listComponent.name" }), field: "name", cellRendererFramework: function (params) {
                    return <Link to={`/articles/${params.data.id}`}>{params.value}</Link>
                }, flex: 1
            }])
    }, [intl]);

    useEffect(() => {
        fetchAllArticles();
    }, []);

    if (error && !loading) {
        throw error;
    } else if (!error && !loading && allArticles) {
        return (<React.Fragment>
            <div data-testid="listComponent" className="container">
                <div className="row">
                    <div className="col">
                        <div className={"ag-theme-alpine " + styles.listComponentContainer + ' ' +  styles.textAlignLeft}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={(allArticles && allArticles.data) ? allArticles.data : []}>
                            </AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    } else {
        return (<LoadingComponent></LoadingComponent>);
    }
}

ListComponent.propTypes = {
    intl: PropTypes.object.isRequired,
    fetchAllArticles: PropTypes.func.isRequired,
    allArticles: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

export default injectIntl(React.memo(ListComponent));
