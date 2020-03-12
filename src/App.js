import React, { useState } from 'react';
import WebcamCapture from './webcam'
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import DataForm from './form';
import './App.css';

function App() {
  const [data, setData] = useState({ total: 0, date: "12/2/2019", category: 'none', payee: 'unknow' })

  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <WebcamCapture {...props} setData={setData} />}>
          </Route>
          <Route path="/dataform" render={(props) => <DataForm {...props} data={data} />}>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
