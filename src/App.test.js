import React from 'react';
import App from './App';
import {IntlProvider} from 'react-intl';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

test('renders learn react link', () => {
  const { getByText } = render(<Provider store={store}><IntlProvider locale="en"><App></App></IntlProvider></Provider>);

});

it("matches snapshot", () => {
    const tree = renderer.create(<Provider store={store}><IntlProvider locale="en"><App></App></IntlProvider></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
})
