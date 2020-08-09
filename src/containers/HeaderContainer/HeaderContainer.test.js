import React from 'react';
import HeaderContainer from './HeaderContainer';
import { IntlProvider } from 'react-intl';
import { store } from "../../store/store";
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import en_US from "../../i18n/en_US.json";

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

describe('HeaderContainer', () => {
    test('Check if HeaderContainer Renders on /home', async () => {
        const route = '/home';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerContainer")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderContainer Renders on /articles', async () => {
        const route = '/articles';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerContainer")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderContainer Renders on /articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8', async () => {
        const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerContainer")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderContainer Renders on /articles/invalid_item', async () => {
        const route = '/articles/invalid_item';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerContainer")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderContainer Renders on /', async () => {
        const route = '/';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerContainer")
        expect(lazyElement).toBeInTheDocument()
    })

    test("Check if matches HeaderContainer Snapshot", async () => {
        const route = '/home';
        const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route }).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
