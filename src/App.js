
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import FilmToCart from './pages/FilmToCart';
import FilmDetail from './pages/FilmDetail';
import Header from './components/Header/Header';
import List from './pages/List';
import Error404 from './pages/Error404';
function App() {
  return (
    <div className="App">
   
      <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      {/* <Route path='/filmtocard' element={<FilmToCart/>}/> */}
      <Route path='/filmdetail/:id' element={<FilmDetail/>}/>
      <Route path='/list' element={<List/>}/>
      <Route path='*' element={<Error404/>}/>


     </Routes>
    </div>
  );
}

export default App;
