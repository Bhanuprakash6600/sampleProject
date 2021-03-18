import  React, { Component } from 'react';
import Layout from './component/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route ,Switch} from 'react-router-dom';
import Orders from './container/Orders/Orders';
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>        
         
          
          <Route path="/Checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
         

          <Route path="/" exact component={BurgerBuilder}/>
          </Switch>

          </Layout>
      </div>
    );

  }
}

export default App;
