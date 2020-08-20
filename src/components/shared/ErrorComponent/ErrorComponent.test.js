import React from 'react'
import ErrorComponent from './ErrorComponent'
import { IntlProvider } from 'react-intl'
import { store } from '../../../store/store'
import { Provider } from 'react-redux'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import enUS from '../../../i18n/en_US.json'
import ArticleContainer from '../../../containers/ArticleContainer/ArticleContainer'

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

describe('ErrorComponent', () => {
  test('Check if ListComponent Renders on invalid article', async () => {
    const route = '/articles/invalid_article_id'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><ArticleContainer></ArticleContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('errorComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if matches ErrorComponent Snapshot', () => {
    const route = '/404'
    const errorObj = {
      response: {
        data: {
          errors: {
            code: 56009,
            message: enUS['rootContainer.invalidURL']
          }
        }
      }
    }
    const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><ErrorComponent error={errorObj} ></ErrorComponent></IntlProvider></Provider>, { route }).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
