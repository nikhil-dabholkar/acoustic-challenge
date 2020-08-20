import React from 'react'
import LanguageWrapper from './LanguageWrapper'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import enUS from '../i18n/en_US.json'

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

describe('LanguageWrapper', () => {
  test('Check if LanguageWrapper Renders on /home', async () => {
    const route = '/home'
    renderWithRouter(<Provider store={store}><LanguageWrapper locale="en" messages={enUS}></LanguageWrapper></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageWrapper')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageWrapper Renders on /articles', async () => {
    const route = '/articles'
    renderWithRouter(<Provider store={store}><LanguageWrapper locale="en" messages={enUS}></LanguageWrapper></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageWrapper')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageWrapper Renders on /articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8', async () => {
    const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    renderWithRouter(<Provider store={store}><LanguageWrapper locale="en" messages={enUS}></LanguageWrapper></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageWrapper')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageWrapper Renders on /articles/invalid_item', async () => {
    const route = '/articles/invalid_item'
    renderWithRouter(<Provider store={store}><LanguageWrapper locale="en" messages={enUS}></LanguageWrapper></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageWrapper')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageWrapper Renders on /', async () => {
    const route = '/'
    renderWithRouter(<Provider store={store}><LanguageWrapper locale="en" messages={enUS}></LanguageWrapper></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageWrapper')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if matches LanguageWrapper Snapshot', async () => {
    const route = '/home'
    const tree = rendererWithRouter(<Provider store={store}><LanguageWrapper locale="en" messages={enUS}></LanguageWrapper></Provider>, { route }).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
