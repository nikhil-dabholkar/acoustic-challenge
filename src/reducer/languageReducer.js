import { SELECT_LANGUAGE_PREFERENCE } from '../constants/constants';

const initialState = {
    selectedLanguage: {"abbr": "EN", "locale": "en", "label": "English", "region": "US"},
    allLanguages: [{"abbr": "EN", "locale": "en", "label": "English", "region": "US"},{"abbr": "PL", "locale": "pl", "label": "Polish", "region": "PL"}]
};

function languageReducer(state = initialState, action) {
    switch(action.type) {
        case SELECT_LANGUAGE_PREFERENCE: 
            return {...state, selectedLanguage: action.payload};
        default: 
            return state;
    }
}

export default languageReducer;