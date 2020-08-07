import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { LoadingComponent } from '../components/index';
import ArticleContainer from './ArticleContainer';
import HomeContainer from './HomeContainer';
import HeaderContainer from './HeaderContainer';
import Jumbotron from 'react-bootstrap/Jumbotron'

const ErrorComponent = lazy(() => import("../components/shared/ErrorComponent"));

function RootContainer() {

    return (<React.Fragment>
        <Router>
            <HeaderContainer></HeaderContainer>
            <Jumbotron fluid>
                <Switch>
                    <Route path="/home" render={(props) => {
                        return (<Suspense fallback={<LoadingComponent />}>
                            <HomeContainer></HomeContainer>
                        </Suspense>);
                    }} exact />
                    <Route path="/articles" render={(props) => {
                        return (<Suspense fallback={<LoadingComponent />}>
                            <ArticleContainer></ArticleContainer>
                        </Suspense>);
                    }} />
                    <Route path="/" render={() => <Redirect to="/home" />} exact></Route>
                    <Route path="*" render={() => {
                        return (<Suspense fallback={<LoadingComponent />}>
                            <ErrorComponent />
                        </Suspense>)
                    }} exact />
                </Switch>
            </Jumbotron>
        </Router>
    </React.Fragment>
    );
}

export default RootContainer;
