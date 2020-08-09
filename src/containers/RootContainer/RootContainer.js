import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedDate, FormattedMessage } from 'react-intl';
import { LoadingComponent } from '../../components/index';
import ArticleContainer from '../ArticleContainer/ArticleContainer';
import HomeContainer from '../HomeContainer/HomeContainer';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { ErrorComponent } from "../../components/index";

const HomeComponent = lazy(() => import("../../components/home/HomeComponent/HomeComponent"));

// const ErrorComponent = lazy(() => import("../../components/shared/ErrorComponent/ErrorComponent"));

function RootContainer({ intl }) {

    return (<React.Fragment>
        <div data-testid="rootContainer">
            <Router>
                <HeaderContainer></HeaderContainer>
                <Jumbotron fluid>
                    <Switch>

                        <Route path="/home" render={(props) => {
                            return (<Suspense fallback={<LoadingComponent />}>
                                <HomeContainer>
                                    <Suspense fallback={<LoadingComponent />}>
                                        <HomeComponent></HomeComponent>
                                    </Suspense>
                                </HomeContainer>
                            </Suspense>);
                        }} exact />
                        <Route path="/articles" render={(props) => {
                            return (<Suspense fallback={<LoadingComponent />}>
                                <ArticleContainer></ArticleContainer>
                            </Suspense>);
                        }} />
                        <Route path="/404" render={() => {
                            const errorObj = {
                                response: {
                                    data: {
                                        errors: {
                                            code: 56009,
                                            message: intl.formatMessage({ id: "rootContainer.invalidURL" })
                                        }
                                    }
                                }
                            }
                            return (
                                <ErrorComponent error={errorObj} />
                            );
                        }} />
                        <Route path="/" render={() => <Redirect to="/home" />} exact></Route>
                        <Route path="*" render={() => <Redirect to="/404" />}></Route>

                    </Switch>
                </Jumbotron>
            </Router>
        </div>
    </React.Fragment>
    );
}

RootContainer.propTypes = {
    intl: PropTypes.object.isRequired
}

export default injectIntl(RootContainer);
