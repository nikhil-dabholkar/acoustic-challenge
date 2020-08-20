import { SELECT_LANGUAGE_PREFERENCE } from '../constants/constants'

/**
 * This action will be called when user changes the language
 */
export const switchLanguagePreference = (payload) => ({
  type: SELECT_LANGUAGE_PREFERENCE,
  payload: payload
})
