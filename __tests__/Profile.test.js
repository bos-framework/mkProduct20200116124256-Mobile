import 'react-native';
import React from 'react';
import Profile from '../src/Screens/Container/profileContainer';
import store from '../src/store/store';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<Profile store={store} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
