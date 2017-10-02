import React from 'react';
import ReactDOM from 'react-dom';


import '@blueprintjs/core/dist/blueprint.css';
import 'codemirror/lib/codemirror.css';
import './App.css';

import App from './App';
import API from './api';

API.initialize(true);

ReactDOM.render(<App />, document.getElementById('root'));
