import './App.css';
import 'antd/dist/antd.min.css';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Detail from './pages/Detail/Detail';
import ScrollTotop from './utils/ScrollTotop';
import Checkout from './pages/Checkout/Checkout';
import { history } from './utils/history';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import Films from './pages/Admin/Films'
import Users from './pages/Admin/User'
import Template from './templates'
function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Loading />
        <ScrollTotop />
        <Switch>
          <Template.Home exact path="/home" Component={Home} />
          <Template.Home exact path="/contact" Component={Contact} />
          <Template.Home exact path="/news" Component={News} />
          <Template.Home exact path="/detail/:id" Component={Detail} />
          <Template.Checkout exact path="/checkout/:id" Component={Checkout} />
          <Template.User exact path="/login" Component={Login} />
          <Template.User exact path="/register" Component={Register} />
          <Template.Checkout exact path="/profile" Component={Profile} />
          <Template.Admin exact path="/admin" Component={Dashboard} />
          <Template.Admin exact path="/admin/films" Component={Films.Film} />
          <Template.Admin exact path="/admin/films/addnew" Component={Films.AddPhim} />
          <Template.Admin exact path="/admin/films/edit/:id" Component={Films.EditPhim} />
          <Template.Admin exact path="/admin/films/showtimes/:id/:tenPhim" Component={Films.Showtime} />
          <Template.Admin exact path="/admin/users" Component={Users.User} />
          <Template.Admin exact path="/admin/users/edit/:id" Component={Users.EditUser} />
          <Template.Admin exact path="/admin/users/adduser" Component={Users.AddUser} />
          <Template.Home exact path="/" Component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
