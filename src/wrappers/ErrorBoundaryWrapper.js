import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ToastNotification} from 'carbon-components-react';
export default class ErrorBoundaryWrapper extends Component {
    state = {
        error: '',
        errorInfo: '',
        hasError: false,
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
        this.setState({ errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return (<ToastNotification lowContrast kind='info'
                caption="00:00:00 AM"
                iconDescription="describes the close button"
                subtitle={<span>Subtitle text goes here. <a href="#example">Example link</a></span>}
                timeout={0}
                title="Notification title"
            />)
        }
        return this.props.children;
    }
}
ErrorBoundaryWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

