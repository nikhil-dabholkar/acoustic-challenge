import React, { useEffect } from 'react';

function ListComponent({fetchAllArticles, allArticles}) {

    useEffect(() => {
        fetchAllArticles();
    }, []);

    return (
        <div className="App">
            Listing... {JSON.stringify(allArticles)}
        </div>
    );
}

export default ListComponent;
