import React from 'react';
import HeaderContainer from '../../../containers/HeaderContainer/HeaderContainer';
import HeaderComponent from './HeaderComponent';
import { IntlProvider } from 'react-intl';
import { store } from "../../../store/store";
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import en_US from "../../../i18n/en_US.json";
import { switchLanguagePreference } from "../../../actionCreators/LanguageActions";

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

describe('HeaderComponent', () => {
    test('Check if HeaderComponent Renders on /home', async () => {
        const route = '/home';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderComponent Renders on /articles', async () => {
        const route = '/articles';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderComponent Renders on /articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8', async () => {
        const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderComponent Renders on /articles/invalid_item', async () => {
        const route = '/articles/invalid_item';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HeaderComponent Renders on /', async () => {
        const route = '/';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("headerComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test("Check if matches HeaderComponent Snapshot", async () => {
        const route = '/';
        const language = {
            selectedLanguage: {"abbr": "EN", "locale": "en", "label": "English", "region": "US"},
            allLanguages: [{"abbr": "EN", "locale": "en", "label": "English", "region": "US"},{"abbr": "PL", "locale": "pl", "label": "Polish", "region": "PL"}]
        };
        const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HeaderComponent language={language} switchLanguage={switchLanguagePreference}></HeaderComponent></IntlProvider></Provider>, { route }).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
