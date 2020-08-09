import React from 'react';
import { lazy, Suspense } from 'react';
import { LoadingComponent } from '../../components/index';

const HomeComponent = lazy(() => import("../../components/home/HomeComponent/HomeComponent"));
// import {HomeComponent} from '../../components/index';

function HomeContainer({children}) {
    return (<React.Fragment>
        <div data-testid="homeContainer">
            {children}
        </div>
    </React.Fragment>
    );
}

export default HomeContainer;
