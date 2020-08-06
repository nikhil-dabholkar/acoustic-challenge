import React from 'react';
import { store } from "../store/store";
import { Provider } from 'react-redux';
function StoreWrapper(props) {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
}

export default StoreWrapper;
