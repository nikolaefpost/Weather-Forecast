import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux';
import store from './store';
import './index.scss'
import {LanguageProvider} from "./context/lanuage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <LanguageProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </LanguageProvider>,
)
