import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ErrorComponent } from '../components/index'
export default class ErrorBoundaryWrapper extends Component {
    state = {
      error: '',
      errorInfo: '',
      hasError: false
    };

    static getDerivedStateFromError (error) {
      return { hasError: true, error }
    }

    componentDidCatch (error, errorInfo) {
      console.log(error)
      this.setState({ errorInfo })
    }

    render () {
      if (this.state.hasError) {
        return (<ErrorComponent error={this.state.error}></ErrorComponent>)
      }
      return this.props.children
    }
}
ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}
