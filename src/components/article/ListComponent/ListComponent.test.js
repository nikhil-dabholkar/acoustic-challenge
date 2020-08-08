import React from 'react';
import ListComponent from './ListComponent';
import ArticleContainer from '../../../containers/ArticleContainer/ArticleContainer';
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

describe('ListComponent', () => {
    test('Check if ListComponent Renders', async () => {
        const route = '/articles';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("listComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    it("Check if matches ListComponent Snapshot", async () => {
        const route = '/articles';
        const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ListComponent fetchAllArticles={fetchAllArticlesData} ></ListComponent></IntlProvider></Provider>, { route }).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
