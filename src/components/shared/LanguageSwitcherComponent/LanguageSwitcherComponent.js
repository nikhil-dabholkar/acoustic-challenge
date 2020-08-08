import React from 'react';
import { Link } from 'carbon-components-react';

function LanguageSwitcherComponent({ availableLanguages, selectedLanguage, switchLanguage }) {
    return (<React.Fragment>
        <div data-testid="languageSwitcherComponent">
            {availableLanguages.map((language, index, array) => {
                const delimitter = " | ";
                if (language.locale !== selectedLanguage.locale) {
                    return (<span key={language.locale + language.region} >
                        <Link href="#" onClick={() => switchLanguage(language)}>{language.label}</Link>
                        {(index < array.length - 1) ? delimitter : ""}
                    </span>)
                }
                return (<span key={language.locale + language.region} >{language.label}{(index < array.length - 1) ? delimitter : ""}</span>)
            })}
        </div>
    </React.Fragment>);
}

export default LanguageSwitcherComponent;