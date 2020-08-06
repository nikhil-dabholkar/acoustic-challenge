import { SELECT_LANGUAGE_PREFERENCE } from '../constants/constants';
const axios = require('axios');

export const switchLanguagePreference = (payload) => ({
    type: SELECT_LANGUAGE_PREFERENCE,
    payload: payload 
})
