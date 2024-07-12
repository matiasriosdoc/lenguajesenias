import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '../src/components/shared/Card';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('handles on press', () => {
  const mockFn = jest.fn();
  const { getByText } = render(<Card name={'cardName'} onPress={mockFn} />);

  fireEvent.press(getByText('cardName'));

  expect(mockFn).toBeCalled();
});
