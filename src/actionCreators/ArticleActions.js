import { LOAD_ARTICLE_DETAILS_DATA, LOAD_ALL_ARTICLES_DATA } from '../constants/constants';
const axios = require('axios');

export const fetchSelectedArticleData = (articleId) => {
    return async (dispatch) => {
        const response = await axios.get(`https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/${articleId}`);
        console.log(response);
        dispatch({
            type: LOAD_ARTICLE_DETAILS_DATA,
            payload: response.data
        })
    }
}

export const fetchAllArticlesData = () => {
    return async (dispatch) => {
        const response = await axios.get(`https://run.mocky.io/v3/8421cb68-a9d9-4575-ad5d-b4396c864231/`);
        console.log(response);
        dispatch({
            type: LOAD_ALL_ARTICLES_DATA,
            payload: response.data
        })
    }
}
