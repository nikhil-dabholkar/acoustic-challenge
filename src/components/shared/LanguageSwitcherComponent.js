import React from 'react';
import { Link } from 'carbon-components-react';

function LanguageSwitcherComponent({availableLanguages, selectedLanguage, switchLanguage}) {
    return (<React.Fragment>
        {availableLanguages.map((language) => {
            if (language.locale !== selectedLanguage.locale) {
                return (<span>
                    <Link href="#" onClick={() => switchLanguage(language)}>{language.abbr}</Link>
                </span>)
            }
            return <span>{language.abbr}</span>
        })}
    </React.Fragment>);
}

export default LanguageSwitcherComponent;
