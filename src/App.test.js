import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './App';
import renderer from 'react-test-renderer';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
jest.mock('react/lib/ReactDefaultInjection');

it('renders correctly', () => {
  const tree = renderer.create(
    <CommentBox url="http://localhost:3001/api/comments"></CommentBox>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
