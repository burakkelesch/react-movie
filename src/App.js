import React,{ Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link,Route,Switch} from "react-router-dom";
import MovieList from './components/movie-list.component';
import AddMovie from './components/movie-add.component';
import MovieDetail from './components/movie-detail.component';


class App extends Component {
  
  render()
  {
    return(
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <a href="/movies" className='navbar-brand'>BilgeAdam</a>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={"/movies"} className='nav-link'>Film Listesi</Link>
            </li>
            <li className='nav-item'>
              <Link to={"/ekle"} className='nav-link'>Film Ekle</Link>
            </li>
          </div>
        </nav>
        <div className='container mt-3'>
          <Switch>
            <Route exact path="/movies" component = {MovieList} />
            <Route exact path="/ekle" component = {AddMovie} />
            <Route exact path={"/movies/:id"} component = {MovieDetail} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
