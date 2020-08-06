import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoadingComponent } from '../index';

function DetailsComponent({match, fetchArticle, selectedArticle, error, loading}) {

    useEffect(() => {
        fetchArticle(match.params.id);//'fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    }, []);

    if (error && !loading) {
        throw error;
    } else if (!error && loading) {
        return (<LoadingComponent></LoadingComponent>);
    } else {
        return (<React.Fragment>
            <div className="App">
                Details... 
                <FormattedMessage id="app.header" defaultMessage="English" />
                <div className="App">
                    <h1>Article: {JSON.stringify(selectedArticle)}</h1>
                </div>
            </div>
        </React.Fragment>); 
    }
}

export default DetailsComponent;
