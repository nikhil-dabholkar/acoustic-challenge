import React from 'react'
import HeaderContainer from '../../../containers/HeaderContainer/HeaderContainer'
import LanguageSwitcherComponent from './LanguageSwitcherComponent'
import { IntlProvider } from 'react-intl'
import { store } from '../../../store/store'
import { Provider } from 'react-redux'
import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import enUS from '../../../i18n/en_US.json'
import { switchLanguagePreference } from '../../../actionCreators/LanguageActions'

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

describe('LanguageSwitcherComponent', () => {
  test('Check if LanguageSwitcherComponent Renders on /home', async () => {
    const route = '/home'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageSwitcherComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageSwitcherComponent Renders on /articles', async () => {
    const route = '/articles'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageSwitcherComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageSwitcherComponent Renders on /articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8', async () => {
    const route = '/articles/fa9519d5-0363-4b8d-8e1f-627d802c08a8'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageSwitcherComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageSwitcherComponent Renders on /articles/invalid_item', async () => {
    const route = '/articles/invalid_item'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageSwitcherComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if LanguageSwitcherComponent Renders on /', async () => {
    const route = '/'
    renderWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><HeaderContainer></HeaderContainer></IntlProvider></Provider>, { route })
    const lazyElement = await screen.findByTestId('languageSwitcherComponent')
    expect(lazyElement).toBeInTheDocument()
  })

  test('Check if matches LanguageSwitcherComponent Snapshot', async () => {
    const route = '/'
    const availableLanguages = [{ abbr: 'EN', locale: 'en', label: 'English', region: 'US' }, { abbr: 'PL', locale: 'pl', label: 'Polish', region: 'PL' }]
    const selectedLanguage = { abbr: 'EN', locale: 'en', label: 'English', region: 'US' }
    const tree = rendererWithRouter(<Provider store={store}><IntlProvider locale="en" messages={enUS}><LanguageSwitcherComponent availableLanguages={availableLanguages} selectedLanguage={selectedLanguage} switchLanguage={switchLanguagePreference}></LanguageSwitcherComponent></IntlProvider></Provider>, { route }).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
