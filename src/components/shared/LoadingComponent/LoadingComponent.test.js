import React from 'react';
import ArticleContainer from '../../../containers/ArticleContainer/ArticleContainer';
import LoadingComponent from './LoadingComponent';
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

describe('LoadingComponent', () => {
    test('Check if LoadingComponent Renders', async () => {
        const route = '/articles';
        const {findByTestId} = renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
        const lazyElement = await findByTestId("loadingComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if LoadingComponent Renders',  () => {
        const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8';
        const {getByTestId} = renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
        const lazyElement =  getByTestId("loadingComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    test('Check if LoadingComponent Renders', async () => {
        const route = '/articles/invalid_item';
        renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
        const lazyElement = await screen.findByTestId("loadingComponent")
        expect(lazyElement).toBeInTheDocument()
    })

    it("Check if matches loadingComponent Snapshot", async () => {
        const route = '/articles';
        const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={en_US}><loadingComponent></loadingComponent></IntlProvider></Provider>, { route }).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
