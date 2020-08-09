import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSelectedArticleData, fetchAllArticlesData, resetArticlesError } from '../../actionCreators/ArticleActions';
import { Route, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { LoadingComponent } from '../../components/index';
import { ErrorBoundaryWrapper } from '../../wrappers/index';

const ListComponent = lazy(() => import("../../components/article/ListComponent/ListComponent"));
const DetailsComponent = lazy(() => import("../../components/article/DetailsComponent/DetailsComponent"));

function ArticleContainer({ resetError, fetchArticle, fetchAllArticles, article }) {
    const history = useHistory();
    const location = useLocation();
    const errorBoundaryRef = useRef(null);

    useEffect(() => {
        /**
         * When ever the url changes, clear the error 
         */
        return history.listen((location) => {
            resetError();
        })
    }, [history])

    return (<React.Fragment>
        <ErrorBoundaryWrapper key={location.pathname} ref={errorBoundaryRef}>
            <div data-testid="articleContainer">
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
            </div>
        </ErrorBoundaryWrapper>
    </React.Fragment>
    );
}

const mapStateToProps = state => {
    return ({
        article: state.articleReducer
    })
};

const mapDispatchToProps = {
    fetchArticle: fetchSelectedArticleData,
    fetchAllArticles: fetchAllArticlesData,
    resetError: resetArticlesError
}

ArticleContainer.propTypes = {
    resetError: PropTypes.func.isRequired,
    fetchArticle: PropTypes.func.isRequired,
    fetchAllArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ArticleContainer));
