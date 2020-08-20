import React from 'react'
import HomeContainer from './HomeContainer'
import { IntlProvider } from 'react-intl'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import enUS from '../../i18n/en_US.json'

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

describe('HomeContainer', () => {
  test('Check if HomeContainer Renders on /home', async () => {
    const route = '/home'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HomeContainer></HomeContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('homeContainer')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if HomeContainer Renders on /', async () => {
    const route = '/'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HomeContainer></HomeContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('homeContainer')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if matches HomeContainer Snapshot', async () => {
    const route = '/home'
    const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HomeContainer></HomeContainer></IntlProvider></Provider>, { route }).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
