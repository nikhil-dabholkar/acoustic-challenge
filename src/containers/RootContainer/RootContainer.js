import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { LoadingComponent, ErrorComponent } from '../../components/index'
import ArticleContainer from '../ArticleContainer/ArticleContainer'
import HomeContainer from '../HomeContainer/HomeContainer'
import HeaderContainer from '../HeaderContainer/HeaderContainer'
import Jumbotron from 'react-bootstrap/Jumbotron'

const HomeComponent = lazy(() => import('../../components/home/HomeComponent/HomeComponent'))

function RootContainer ({ intl }) {
  return (<React.Fragment>
    <div data-testid="rootContainer">
      <Router>
        <HeaderContainer></HeaderContainer>
        <Jumbotron fluid>
          <Switch>

            <Route path="/home" render={() => {
              return (<Suspense fallback={<LoadingComponent />}>
                <HomeContainer>
                  <Suspense fallback={<LoadingComponent />}>
                    <HomeComponent></HomeComponent>
                  </Suspense>
                </HomeContainer>
              </Suspense>)
            }} exact />
            <Route path="/articles" render={() => {
              return (<Suspense fallback={<LoadingComponent />}>
                <ArticleContainer></ArticleContainer>
              </Suspense>)
            }} />
            <Route path="/404" render={() => {
              const errorObj = {
                response: {
                  data: {
                    errors: {
                      code: 56009,
                      message: intl.formatMessage({ id: 'rootContainer.invalidURL' })
                    }
                  }
                }
              }
              return (
                <ErrorComponent error={errorObj} />
              )
            }} />
            <Route path="/" render={() => <Redirect to="/home" />} exact></Route>
            <Route path="*" render={() => <Redirect to="/404" />}></Route>

          </Switch>
        </Jumbotron>
      </Router>
    </div>
  </React.Fragment>
  )
}

RootContainer.propTypes = {
  intl: PropTypes.object.isRequired
}

export default injectIntl(RootContainer)
