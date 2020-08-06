import React from 'react';
import {Loading} from 'carbon-components-react';


function LoadingComponent() {
    return (<React.Fragment>
                <Loading description="Active loading indicator" withOverlay={true} />
            </React.Fragment>
    );
}

export default LoadingComponent;
