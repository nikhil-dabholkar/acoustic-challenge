import { SELECT_LANGUAGE_PREFERENCE } from '../constants/constants';
const axios = require('axios');

/**
 * This action will be called when user changes the language 
 */
export const switchLanguagePreference = (payload) => ({
    type: SELECT_LANGUAGE_PREFERENCE,
    payload: payload 
})
