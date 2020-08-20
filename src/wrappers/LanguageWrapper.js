import React from 'react'
import { IntlProvider } from 'react-intl'
import enUS from '../i18n/en_US.json'
import plPL from '../i18n/pl_PL.json'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
function LanguageWrapper ({ children, language }) {
  let languageMessages = null
  switch (language.selectedLanguage.label) {
    case 'English':
      languageMessages = enUS
      break
    case 'Polish':
      languageMessages = plPL
      break
    default:
      languageMessages = enUS
      break
  }
  return (
    <IntlProvider locale={language.selectedLanguage.locale} messages={languageMessages}>
      <div data-testid="languageWrapper">
        {children}
      </div>
    </IntlProvider>
  )
}

const mapStateToProps = state => {
  return ({
    language: state.languageReducer
  })
}

LanguageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.object
}

export default connect(mapStateToProps)(LanguageWrapper)
