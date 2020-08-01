import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './helper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ImportPriv from './importPriv';
import ImportSeed from './importSeed';
// import Demo from './demo';
import Create from './create';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

const Tx = require('ethereumjs-tx').Transaction


class App extends React.Component {


  componentDidMount() { }

  NoMatch = () => {
    return (
      <div>No match</div>
    )
  }

  render() {
    return (
      <div>
        <Router>
          <Container style={{ marginTop: "50px" }}>
             <Row>
              <Col><Card><Link to='/'>Import Private</Link></Card></Col>
              <Col><Card><Link to='/ImportSeed'>Import Seed</Link></Card></Col>
              <Col><Card><Link to='/Create'>Create Account</Link></Card></Col>
            </Row>
          </Container>
          <Switch>
            <Route exact path='/' component={ImportPriv} />
            <Route path='/ImportSeed' component={ImportSeed} />
            <Route path='/Create' component={Create} />
            <Route component={this.NoMatch} />
            {/* <Route  path='/homepage'  component={homepage} />
                <Route path='/pdf' component={pdf} />
            */}
          </Switch>
          {/* <ImportPriv /> */}
        </Router>
      </div>
    );
  }
}

export default App;
