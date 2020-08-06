import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl'

function DetailsComponent({match, fetchArticle, selectedArticle}) {
    console.log(match.params.id);

    useEffect(() => {
        fetchArticle(match.params.id);//'fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    }, []);

    return (
        <div className="App">
            Details... 
            <FormattedMessage id="app.header" defaultMessage="English" />
            <div className="App">
                <h1>Article: {JSON.stringify(selectedArticle)}</h1>
            </div>
        </div>
    );
}

export default DetailsComponent;
