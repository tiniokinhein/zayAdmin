import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { auth } from './auth/firebase'
import Home from './pages/Home'
import Login from './pages/Login'
import Posts from './pages/Posts'
import CreatePost from './components/post/CreatePost'
import Categories from './pages/Categories'
import CreateCategory from './components/category/CreateCategory'
import Units from './pages/Units'
import CreateUnit from './components/unit/CreateUnit'
import EditPost from './components/post/EditPost'
import DeletePost from './components/post/DeletePost'
import EditUnit from './components/unit/EditUnit'
import DeleteUnit from './components/unit/DeleteUnit'
import EditCategory from './components/category/EditCategory'
import DeleteCategory from './components/category/DeleteCategory'
import Banners from './pages/Banners'
import CreateBanner from './components/banner/CreateBanner'
import EditBanner from './components/banner/EditBanner'
import DeleteBanner from './components/banner/DeleteBanner'
import ViewOrder from './components/order/ViewOrder'
import EditOrder from './components/order/EditOrder'
import DeleteOrder from './components/order/DeleteOrder'
import CompletedOrders from './pages/CompletedOrders'
import ViewCompleted from './components/completed/ViewCompleted'
import DeleteCompleted from './components/completed/DeleteCompleted'
import ViewCancelled from './components/cancelled/ViewCancelled'
import DeleteCancelled from './components/cancelled/DeleteCancelled'
import CancelledOrders from './pages/CancelledOrders'
import Invoices from './pages/Invoices'
import ViewInvoice from './components/invoice/ViewInvoice'
import EditInvoice from './components/invoice/EditInvoice'
import DeleteInvoice from './components/invoice/DeleteInvoice'
import PrintInvoice from './components/invoice/PrintInvoice'



function PublicRoute({ component:Component , authenticated , ...rest }) {
  return(
    <Route
      {...rest}
      render={
        (props) => authenticated === false ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

function PrivateRoute({ component:Component , authenticated , ...rest }) {
  return(
    <Route
      {...rest}
      render={
        (props) => authenticated === true ? 
          <Component {...props} /> : 
          <Redirect 
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
      }
    />
  )
}

class App extends React.Component 
{
  state = {
    authenticated: false
  }

  componentDidMount() {
    auth
    .onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true
        })
      } else {
        this.setState({
          authenticated: false
        })
      }
    })
  }

  render() {
    return(
      <React.Fragment>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" authenticated={this.state.authenticated} component={Home} />

            <PrivateRoute path="/edit-post/:slug" authenticated={this.state.authenticated} component={EditPost} />
            <PrivateRoute path="/delete-post/:slug" authenticated={this.state.authenticated} component={DeletePost} />

            <PrivateRoute path="/edit-unit/:slug" authenticated={this.state.authenticated} component={EditUnit} />
            <PrivateRoute path="/delete-unit/:slug" authenticated={this.state.authenticated} component={DeleteUnit} />

            <PrivateRoute path="/edit-category/:slug" authenticated={this.state.authenticated} component={EditCategory} />
            <PrivateRoute path="/delete-category/:slug" authenticated={this.state.authenticated} component={DeleteCategory} />

            <PrivateRoute path="/edit-banner/:slug" authenticated={this.state.authenticated} component={EditBanner} />
            <PrivateRoute path="/delete-banner/:slug" authenticated={this.state.authenticated} component={DeleteBanner} />

            <PrivateRoute path="/order/:id" authenticated={this.state.authenticated} component={ViewOrder} />
            <PrivateRoute path="/edit-order/:id" authenticated={this.state.authenticated} component={EditOrder} />
            <PrivateRoute path="/delete-order/:id" authenticated={this.state.authenticated} component={DeleteOrder} />

            <PrivateRoute path="/completed-order/:id" authenticated={this.state.authenticated} component={ViewCompleted} />
            <PrivateRoute path="/delete-completed-order/:id" authenticated={this.state.authenticated} component={DeleteCompleted} />

            <PrivateRoute path="/cancelled-order/:id" authenticated={this.state.authenticated} component={ViewCancelled} />
            <PrivateRoute path="/delete-cancelled-order/:id" authenticated={this.state.authenticated} component={DeleteCancelled} />

            <PrivateRoute path="/invoice/:id" authenticated={this.state.authenticated} component={ViewInvoice} />
            <PrivateRoute path="/edit-invoice/:id" authenticated={this.state.authenticated} component={EditInvoice} />
            <PrivateRoute path="/delete-invoice/:id" authenticated={this.state.authenticated} component={DeleteInvoice} />
            <PrivateRoute path="/print-invoice/:id" authenticated={this.state.authenticated} component={PrintInvoice} />
            
            <PrivateRoute path="/create-unit" authenticated={this.state.authenticated} component={CreateUnit} />
            <PrivateRoute path="/create-post" authenticated={this.state.authenticated} component={CreatePost} />
            <PrivateRoute path="/create-category" authenticated={this.state.authenticated} component={CreateCategory} />
            <PrivateRoute path="/create-banner" authenticated={this.state.authenticated} component={CreateBanner} />
            
            <PrivateRoute path="/invoices" authenticated={this.state.authenticated} component={Invoices} />
            <PrivateRoute path="/posts" authenticated={this.state.authenticated} component={Posts} />
            <PrivateRoute path="/categories" authenticated={this.state.authenticated} component={Categories} />
            <PrivateRoute path="/units" authenticated={this.state.authenticated} component={Units} />
            <PrivateRoute path="/banners" authenticated={this.state.authenticated} component={Banners} />
            <PrivateRoute path="/completed-orders" authenticated={this.state.authenticated} component={CompletedOrders} />
            <PrivateRoute path="/cancelled-orders" authenticated={this.state.authenticated} component={CancelledOrders} />

            <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
