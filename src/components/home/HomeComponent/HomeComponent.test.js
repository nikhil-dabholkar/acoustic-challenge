import React from 'react';
import HomeComponent from './HomeComponent';
import HomeContainer from '../../../containers/HomeContainer/HomeContainer';
import { IntlProvider } from 'react-intl';
import { store } from "../../../store/store";
import { Provider } from 'react-redux';
import { render, cleanup, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import en_US from "../../../i18n/en_US.json";
import {fetchAllArticlesData} from '../../../actionCreators/ArticleActions'

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

describe('HomeComponent', () => {
    test('Check if HomeComponent Renders on /home', async () => {
        const route = '/home';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HomeContainer></HomeContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("homeComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if HomeComponent Renders on /', async () => {
        const route = '/';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HomeContainer></HomeContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("homeComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test("Check if matches HomeComponent Snapshot", async () => {
        const route = '/home';
        const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><HomeComponent></HomeComponent></IntlProvider></Provider>, { route }).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
