import React from 'react'
import PropTypes from 'prop-types'

function HomeContainer ({ children }) {
  return (<React.Fragment>
    <div data-testid="homeContainer">
      {children}
    </div>
  </React.Fragment>
  )
}

HomeContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default HomeContainer
