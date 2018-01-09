import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, configure } from 'enzyme';
import {flattenArray} from "./services/Utils";
import XO from './components/XO';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// #TODO: Add tests to check move, gameWin, game reset and board population

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('flattens a multi dimensional array', () => {
  expect(flattenArray([[1,2], [3, 4],])).toEqual([1,2,3,4]);
});


it('Game always starts with Player X', () => {
  const game = shallow(<XO />);
  expect(game.state().size).toEqual(3);
});