import React from 'react'
import PropTypes from 'prop-types'
import { LanguageSwitcherComponent } from '../../index'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import styles from './HeaderComponent.module.scss'

function HeaderComponent ({ language, switchLanguage }) {
  const location = useLocation()

  return (<React.Fragment>
    <div data-testid="headerComponent">
      <nav className="navbar navbar-light bg-white">
        <a className="navbar-brand" href="/">
          <img src={require('../../../assets/images/logo.png')} width="100px" className="d-inline-block align-top" alt="" />
        </a>
        <span className={styles.languageSwitcherContainer}>
          <LanguageSwitcherComponent availableLanguages={language.allLanguages} selectedLanguage={language.selectedLanguage} switchLanguage={switchLanguage}></LanguageSwitcherComponent>
        </span>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={'nav-item' + ((location.pathname === '/home') ? ' active' : '')}>
              {<Link className="nav-link" to={'/'}><FormattedMessage id="headerComponent.home" defaultMessage="Home"></FormattedMessage></Link>}
            </li>
            <li className={'nav-item' + ((location.pathname === '/articles' || location.pathname.startsWith('/articles/')) ? ' active' : '')}>
              {<Link className="nav-link" to={'/articles'}><FormattedMessage id="headerComponent.articles" defaultMessage="Articles"></FormattedMessage></Link>}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </React.Fragment>

  )
}

HeaderComponent.propTypes = {
  language: PropTypes.object.isRequired,
  switchLanguage: PropTypes.func.isRequired
}

export default React.memo(HeaderComponent)
