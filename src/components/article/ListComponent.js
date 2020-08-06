import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoadingComponent } from '../index';

function ListComponent({fetchAllArticles, allArticles, error, loading}) {

    useEffect(() => {
        fetchAllArticles();
    }, []);

    if (error && !loading) {
        throw error;
    } else if (!error && loading) {
        return (<LoadingComponent></LoadingComponent>);
    } else {
        return (<React.Fragment>
            <div className="App">
                Listing... {JSON.stringify(allArticles)}
            </div>
        </React.Fragment>
        );
    }
}

export default ListComponent;
