import React from 'react'
import DetailsComponent from './DetailsComponent'
import ArticleContainer from '../../../containers/ArticleContainer/ArticleContainer'
import { IntlProvider } from 'react-intl'
import { store } from '../../../store/store'
import { Provider } from 'react-redux'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import enUS from '../../../i18n/en_US.json'
import { fetchSelectedArticleData } from '../../../actionCreators/ArticleActions'

afterEach(cleanup)

function renderWithRouter (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}

function rendererWithRouter (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  return {
    ...renderer.create(<Router history={history}>{ui}</Router>),
    history
  }
}

describe('DetailsComponent', () => {
  test('Check if DetailsComponent Renders on present article', async () => {
    const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('detailsComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if matches DetailsComponent Snapshot', async () => {
    const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><DetailsComponent fetchArticle={fetchSelectedArticleData} match={{ params: { id: 'fa9519d5-0363-4b8d-8e1f-627d802c08a8' } }}></DetailsComponent></IntlProvider></Provider>, { route }).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
