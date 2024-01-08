
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import index from './store';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={index}>
        <App />
    </Provider>,
)
