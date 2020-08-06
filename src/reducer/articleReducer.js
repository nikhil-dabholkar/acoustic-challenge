import { LOAD_ARTICLE_DETAILS_DATA, LOAD_ALL_ARTICLES_DATA } from '../constants/constants';

const initialState = {
    selectedArticle: null,
    allArticles: []
};

function articleReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_ARTICLE_DETAILS_DATA: 
            return {...state, selectedArticle: action.payload};
        case LOAD_ALL_ARTICLES_DATA: 
            return {...state, allArticles: action.payload};
        default: 
            return state;
    }
}

export default articleReducer;