import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Redux store
import store from './store.js';
import MainComponent from './mainComponent';

// The main application component
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Route path="/" component={() => <MainComponent />} />
                </HashRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
