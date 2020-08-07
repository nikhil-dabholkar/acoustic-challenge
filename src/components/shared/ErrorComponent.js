import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { InlineNotification } from 'carbon-components-react';
import styles from "./styles/ErrorComponent.module.scss";

function ErrorComponent({ error }) {
    if (error.response.data.errors.code && error.response.data.errors.message) {
        return (<div className={styles.container}><InlineNotification hideCloseButton kind="error" subtitle={<span>{error.response.data.errors.message}</span>} title={`${error.response.data.errors.code}: `}
        /></div>)
    } else {
        return (<div className={styles.container}><InlineNotification hideCloseButton
            kind="error"
            subtitle={<span><FormattedMessage id="errorComponent.default" defaultMessage="Something went wrong, Please try again after sometime."></FormattedMessage></span>}
            title="9008: "
        /></div>)
    }
}

ErrorComponent.propTypes = {
    intl: PropTypes.object.isRequired
}

export default injectIntl(React.memo(ErrorComponent));
