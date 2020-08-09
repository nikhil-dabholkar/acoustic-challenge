import React from 'react';
import { connect } from 'react-redux';
import { switchLanguagePreference } from '../../actionCreators/LanguageActions';
import { HeaderComponent } from '../../components/index';

function HeaderContainer({ language, switchLanguage }) {
    return (<React.Fragment>
        <div data-testid="headerContainer"></div>
        <HeaderComponent language={language} switchLanguage={switchLanguage}></HeaderComponent>
    </React.Fragment>
    );
}

const mapStateToProps = state => {
    return ({
        language: state.languageReducer
    })
};

const mapDispatchToProps = {
    switchLanguage: switchLanguagePreference
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HeaderContainer));
