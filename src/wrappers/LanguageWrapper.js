import React from 'react';
import { IntlProvider } from 'react-intl';
import en_US from '../i18n/en_US.json';
import pl_PL from '../i18n/pl_PL.json';
import { connect } from 'react-redux';
function LanguageWrapper({children, language}) {
    console.log(language);
    let languageMessages = null;
    switch(language.selectedLanguage.label) {
        case 'English':
            languageMessages = en_US;
        break;
        case 'Polish':
            languageMessages = pl_PL;
        break;
        default: 
            languageMessages = en_US;
        break;
    }
    return (
        <IntlProvider locale={language.selectedLanguage.locale} messages={languageMessages}>
            {children}
        </IntlProvider>
    );
}

const mapStateToProps = state => {
    return ({
        language: state.languageReducer
    })
};

export default connect(mapStateToProps)(LanguageWrapper);
