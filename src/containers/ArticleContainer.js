import React from 'react';
import { connect } from 'react-redux';
import { fetchSelectedArticleData, fetchAllArticlesData } from '../actionCreators/ArticleActions';
import { switchLanguagePreference } from '../actionCreators/LanguageActions';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { LoadingComponent, LanguageSwitcherComponent } from '../components/index';
const ListComponent = lazy(() => import("../components/article/ListComponent"));
const DetailsComponent = lazy(() => import("../components/article/DetailsComponent"));
const ErrorComponent = lazy(() => import("../components/shared/ErrorComponent"));


function ArticleContainer({ language, switchLanguage, fetchArticle, fetchAllArticles, article }) {
    return (<React.Fragment>
            <LanguageSwitcherComponent availableLanguages={language.allLanguages} selectedLanguage={language.selectedLanguage} switchLanguage={switchLanguage}></LanguageSwitcherComponent>
            <Router>
                <Switch>
                    <Route path="/articles" render={(props) => {
                        return (<Suspense fallback={<LoadingComponent />}>
                                    <ListComponent allArticles={article.allArticles} fetchAllArticles={fetchAllArticles} {...props} />
                                </Suspense>);
                    }} exact />
                    <Route path="/articles/:id" render={(props) => {
                        return (<Suspense fallback={<LoadingComponent />}>
                                    <DetailsComponent selectedArticle={article.selectedArticle} fetchArticle={fetchArticle} {...props} />
                                </Suspense>)
                    }} exact/>
                    <Route path="/" render={() => <Redirect to="/articles" />} exact></Route>
                    <Route path="*" render={() => {
                        return (<Suspense fallback={<LoadingComponent />}>
                                    <ErrorComponent />
                                </Suspense>)
                    }} exact/>
                </Switch>
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
