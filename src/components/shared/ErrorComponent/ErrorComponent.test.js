import React from 'react';
import ErrorComponent from './ErrorComponent';
import RootContainer from '../../../containers/RootContainer/RootContainer';
import { IntlProvider } from 'react-intl';
import { store } from "../../../store/store";
import { Provider } from 'react-redux';
import { render, cleanup, screen, wait } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import en_US from "../../../i18n/en_US.json";
import App from '../../../App';
import TestRenderer from 'react-test-renderer'; // ES6
import { shallow, render as r1, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArticleContainer from '../../../containers/ArticleContainer/ArticleContainer';
 
Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);


function renderWithRouter(
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    }
}

function rendererWithRouter(
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    return {
        ...renderer.create(<Router history={history}>{ui}</Router>),
        history,
    }
}

describe('ErrorComponent', () => {
    test('Check if ListComponent Renders on invalid article', async () => {
        const route = '/articles/invalid_article_id';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("errorComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test("Check if matches ErrorComponent Snapshot", () => {
        const route = '/404';
        const errorObj = {
            response: {
                data: {
                    errors: {
                        code: 56009,
                        message: en_US["rootContainer.invalidURL"]
                    }
                }
            }
        }
        const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ErrorComponent error={errorObj} ></ErrorComponent></IntlProvider></Provider>, { route }).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
