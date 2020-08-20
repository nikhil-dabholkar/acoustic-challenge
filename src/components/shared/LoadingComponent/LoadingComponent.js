import React from 'react'
import { Loading } from 'carbon-components-react'

function LoadingComponent () {
  return (<React.Fragment>
    <div data-testid="loadingComponent">
      <Loading description="Active loading indicator" withOverlay={true} />
    </div>
  </React.Fragment>
  )
}

export default LoadingComponent
