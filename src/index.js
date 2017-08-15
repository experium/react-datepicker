import React from 'react';
import ReactDOM from 'react-dom';
import Example from './example/Example';
import './style.css';
import './example/example.css';
import '../node_modules/antd/lib/input/style/index.css';
import '../node_modules/antd/lib/date-picker/style/index.css';
import '../node_modules/antd/lib/time-picker/style/index.css';
import '../node_modules/antd/lib/layout/style/index.css';
import '../node_modules/antd/lib/grid/style/index.css';
import '../node_modules/antd/lib/select/style/index.css';
import '../node_modules/antd/dist/antd.css';

ReactDOM.render(<Example />, document.getElementById('root'));
