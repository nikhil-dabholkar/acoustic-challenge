import { ERROR_LOAD_DATA, LOAD_ARTICLE_DETAILS_DATA, LOAD_ALL_ARTICLES_DATA, LOADING_DATA, RESET_ERROR } from '../constants/constants';

const initialState = {
    selectedArticle: null,
    allArticles: null,
    error: null,
    loading: true
};

function articleReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_ARTICLE_DETAILS_DATA: 
            return {...state, loading: false, error: null, selectedArticle: action.payload};
        case LOAD_ALL_ARTICLES_DATA: 
            return {...state, loading: false, error: null, allArticles: action.payload};
        case ERROR_LOAD_DATA: 
            return {...state, loading: false, selectedArticle: null, allArticles: null, error: action.payload};
        case LOADING_DATA: 
            return {...state, loading: true, error: null};
        case RESET_ERROR: 
            return {...state, loading: false, error: null};
        default: 
            return state;
    }
}

export default articleReducer;