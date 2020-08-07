import React from 'react';
import { connect } from 'react-redux';
import { fetchSelectedArticleData, fetchAllArticlesData } from '../actionCreators/ArticleActions';
import { switchLanguagePreference } from '../actionCreators/LanguageActions';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { LoadingComponent, LanguageSwitcherComponent } from '../components/index';
import { ErrorBoundaryWrapper } from '../wrappers/index';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import styles from './styles/ArticleContainer.module.scss';
import HeaderComponent from '../components/shared/HeaderComponent';
const ListComponent = lazy(() => import("../components/article/ListComponent"));
const DetailsComponent = lazy(() => import("../components/article/DetailsComponent"));
const ErrorComponent = lazy(() => import("../components/shared/ErrorComponent"));

function ArticleContainer({ language, switchLanguage, fetchArticle, fetchAllArticles, article }) {
    return (<React.Fragment>
        <Router>
            <HeaderComponent language={language} switchLanguage={switchLanguage}></HeaderComponent>
            <ErrorBoundaryWrapper>
                <Switch>
                    <Route path="/articles" render={(props) => {
                        return (<Suspense fallback={<LoadingComponent />}>
                            <ListComponent loading={article.loading} error={article.error} allArticles={article.allArticles} fetchAllArticles={fetchAllArticles} {...props} />
                        </Suspense>);
                    }} exact />
                    <Route path="/articles/:id" render={(props) => {
                        return (<Suspense fallback={<LoadingComponent />}>
                            <DetailsComponent loading={article.loading} error={article.error} selectedArticle={article.selectedArticle} fetchArticle={fetchArticle} {...props} />
                        </Suspense>)
                    }} exact />
                    <Route path="/" render={() => <Redirect to="/articles" />} exact></Route>
                    <Route path="*" render={() => {
                        return (<Suspense fallback={<LoadingComponent />}>
                            <ErrorComponent />
                        </Suspense>)
                    }} exact />
                </Switch>
            </ErrorBoundaryWrapper>
        </Router>

    </React.Fragment>
    );
}

const mapStateToProps = state => {
    return ({
        article: state.articleReducer,
        language: state.languageReducer
    })
};

const mapDispatchToProps = {
    fetchArticle: fetchSelectedArticleData,
    fetchAllArticles: fetchAllArticlesData,
    switchLanguage: switchLanguagePreference
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
