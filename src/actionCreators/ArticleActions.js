import { LOAD_ARTICLE_DETAILS_DATA, LOAD_ALL_ARTICLES_DATA, ERROR_LOAD_DATA, ERROR_LOAD_ALL_ARTICLES_DATA, LOADING_DATA, RESET_ERROR } from '../constants/constants';
const axios = require('axios');

export const fetchSelectedArticleData = (articleId) => {
    return async (dispatch) => {
        try {
            fetchingData(dispatch);
            const response = await axios.get(`https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/${articleId}`);
            dispatch({
                type: LOAD_ARTICLE_DETAILS_DATA,
                payload: response.data
            })
        } catch(errorObj) {
            errorFetchingData(errorObj, dispatch);
        }
    }
}

export const fetchAllArticlesData = () => {
    return async (dispatch) => {
        try {
            fetchingData(dispatch);
            const response = await axios.get(`https://run.mocky.io/v3/8421cb68-a9d9-4575-ad5d-b4396c864231/`);
            dispatch({
                type: LOAD_ALL_ARTICLES_DATA,
                payload: response.data
            })
        } catch(errorObj) {
            errorFetchingData({category: ERROR_LOAD_ALL_ARTICLES_DATA}, dispatch);
        }
    }
}

export const resetArticlesError = () => {
    return async (dispatch) => {
        dispatch({
            type: RESET_ERROR
        })
    }
}

const fetchingData = (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })
}

const errorFetchingData = (errorObj, dispatch) => {
    dispatch({
        type: ERROR_LOAD_DATA,
        payload: errorObj
    })
}
