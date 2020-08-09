import React from 'react';
import { lazy, Suspense } from 'react';
import { LoadingComponent } from '../../components/index';

const HomeComponent = lazy(() => import("../../components/home/HomeComponent/HomeComponent"));
// import {HomeComponent} from '../../components/index';

function HomeContainer() {
    return (<React.Fragment>
        <div data-testid="homeContainer">
            <Suspense fallback={<LoadingComponent />}>
                <HomeComponent></HomeComponent>
            </Suspense>
        </div>
    </React.Fragment>
    );
}

export default HomeContainer;
