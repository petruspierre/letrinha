import { render, fireEvent } from '@test/components';

import Option from '../Option';

const defaultProps = {
  active: false,
  name: 'Theme Option',
  colors: {
    primary: '#fff',
    secondary: '#000',
  },
  onClick: jest.fn(),
};

describe('Option component', () => {
  describe('renders sucessfully', () => {
    it('render component', () => {
      const { getByText, getByTestId } = render(<Option {...defaultProps} />);

      expect(getByText('Theme Option')).toBeInTheDocument();
      expect(getByTestId('previewPrimary')).toBeInTheDocument();
      expect(getByTestId('previewSecondary')).toBeInTheDocument();
    });

    it('render previews', () => {
      const { getByTestId } = render(<Option {...defaultProps} />);

      expect(getByTestId('previewPrimary')).toHaveStyleRule(`background: #fff`);
      expect(getByTestId('previewSecondary')).toHaveStyleRule(
        `background: #000`
      );
    });

    it('render border when active', () => {
      const { getByText } = render(<Option {...defaultProps} active />);

      const defaultTheme = getByText('Theme Option').parentElement;

      expect(defaultTheme).toHaveStyleRule('border-bottom');
    });
  });

  it('calls onClick callback', () => {
    const cb = jest.fn();

    const { getByRole } = render(<Option {...defaultProps} onClick={cb} />);

    fireEvent.click(getByRole('menuitem'));

    expect(cb).toHaveBeenCalledTimes(1);
  });
});
