import {
  LOAD_ARTICLE_DETAILS_DATA,
  LOAD_ALL_ARTICLES_DATA,
  ERROR_LOAD_DATA,
  ERROR_LOAD_ALL_ARTICLES_DATA,
  LOADING_DATA,
  RESET_ERROR
} from '../constants/constants'
import axios from 'axios'

/**
 * This action will be called when user selects an article from the grid
 */
export const fetchSelectedArticleData = (articleId) => {
  return async (dispatch) => {
    try {
      fetchingData(dispatch)
      const response = await axios.get(
        `https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/${articleId}`
      )
      dispatch({
        type: LOAD_ARTICLE_DETAILS_DATA,
        payload: response.data
      })
    } catch (errorObj) {
      errorFetchingData(errorObj, dispatch)
    }
  }
}

/**
 * This action will be called when user lands on the listing page
 */
export const fetchAllArticlesData = () => {
  return async (dispatch) => {
    try {
      fetchingData(dispatch)
      const response = await axios.get(
        'https://run.mocky.io/v3/8421cb68-a9d9-4575-ad5d-b4396c864231/'
      )
      dispatch({
        type: LOAD_ALL_ARTICLES_DATA,
        payload: response.data.data
      })
    } catch (errorObj) {
      errorFetchingData({ category: ERROR_LOAD_ALL_ARTICLES_DATA }, dispatch)
    }
  }
}

/**
 * This action will be called for clearing the error boundary
 */
export const resetArticlesError = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_ERROR
    })
  }
}

/**
 * This action will be called for showing API call in progress
 */
const fetchingData = (dispatch) => {
  dispatch({
    type: LOADING_DATA
  })
}

/**
 * This action will be called to show API call failed
 */
const errorFetchingData = (errorObj, dispatch) => {
  dispatch({
    type: ERROR_LOAD_DATA,
    payload: errorObj
  })
}
