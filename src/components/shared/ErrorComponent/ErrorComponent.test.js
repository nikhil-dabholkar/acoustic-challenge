import React from 'react';
import ErrorComponent from './ErrorComponent';
import RootContainer from '../../../containers/RootContainer/RootContainer';
import { IntlProvider } from 'react-intl';
import { store } from "../../../store/store";
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import en_US from "../../../i18n/en_US.json";
import App from '../../../App';
import TestRenderer from 'react-test-renderer'; // ES6

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
    test('Check if ErrorComponent Renders', async () => {
        TestRenderer.act(() => {
            jest.useFakeTimers();
            const route = '/articles/invalid_route';
            const { container } = renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><RootContainer></RootContainer></IntlProvider></Provider>, { route })
            setTimeout(async () => {
                console.log(container.innerHTML);
                const lazyElement = await screen.findByTestId("errorComponent")
                expect(lazyElement).toBeInTheDocument();
            }, 25);
            jest.runAllTimers();
        })

    })

    it("Check if matches ErrorComponent Snapshot", () => {
        const route = '/invalid_route';
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
