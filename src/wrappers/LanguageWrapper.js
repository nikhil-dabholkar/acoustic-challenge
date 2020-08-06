import React from 'react';
import { IntlProvider } from 'react-intl';
import English from '../i18n/en_US.json';
import Polish from '../i18n/pl_PL.json';
function LanguageWrapper(props) {
    return (
        <IntlProvider locale="en" messages={Polish}>
            {props.children}
        </IntlProvider>
    );
}

export default LanguageWrapper;
