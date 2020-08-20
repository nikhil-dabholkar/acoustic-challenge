import React from 'react'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
function StoreWrapper (props) {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

StoreWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default StoreWrapper
