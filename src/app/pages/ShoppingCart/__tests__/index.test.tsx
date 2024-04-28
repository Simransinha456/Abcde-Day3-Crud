import * as React from 'react';
import { render } from '@testing-library/react';

import { ShoppingCart } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<ShoppingCart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ShoppingCart />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
