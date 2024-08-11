import React, { Component } from 'react';
import './App.css';
import Data from './Component/Data'
import Data2 from './Component/Data2'

import 'bulma/css/bulma.css'

class App extends Component {
  
  render() {
    return (
    <div className="wrapper section">
      <div className="App columns">
        <div className="column is-8 is-offset-2">
            <h1 className="title has-text-info has-text-centered">TimeZone Converter</h1>
            <div className="columns is-flex">
                <div className="column is-6">
                    <Data />
                </div>
                <div className="column is-6">
                    <Data2 />
                </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;