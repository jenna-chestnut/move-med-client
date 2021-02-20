import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';

const smokeTest = (key, component) => {
    describe(`${key} component`, () => {
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
          </Provider>
        , div);
        ReactDOM.unmountComponentAtNode(div);
        })
    })
}

export default smokeTest;