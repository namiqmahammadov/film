import React from 'react'
import './Pages.css'
import MoonLoader from "react-spinners/MoonLoader";
import NA from '../images/NA.png'
import { Link, useFetcher } from 'react-router-dom'
import { useState , useEffect,CSSProperties} from 'react'
import FilmDetail from './FilmDetail'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Leftlist from '../components/ListLeft/Leftlist';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blueviolet",
};
const Home = () => {
  
  const [searchMyData, setSearchMyData] = useState("")
  const [searchButton, setSearchButton] = useState("harry")
const [display, setDisplay] = useState(false)
let [loading, setLoading] = useState(true);
let [color, setColor] = useState("#ffffff");
const [addList, setAddList] = useState()
const [resultData, setResultData] = useState([])
const [movie, setMovie] = useState([])
const [first, setfirst] = useState(false)
const setDisplayList = (a) => {
  if (movie[0]) { 
    setMovie(a);
    setDisplay(false); 
    setfirst(true)
  } else {
    setfirst(true)
   
    setMovie(a);
    setDisplay(true);
  }
};
// console.log(movie)
const searchData = (e) =>{
 
      setSearchMyData(e.target.value.toLowerCase())
    }
    const searchBtn=(e)=>{
      e.preventDefault();
      if (!searchMyData.trim() ) {
        alert('Zehmet olmasa Film adini duzgun daxil edin')
      }
   else{
      setSearchButton(searchMyData.trim())
      }

    }
    useEffect(()=>{
      fetch(`https://www.omdbapi.com/?s=${searchButton}&apikey=6be6c7a0`)
      .then(res=>res.json())
      .then(data=>{
        setLoading(false)
        setResultData(data.Search)
  }).catch((err)=>(alert('Internet bağlantınızı yoxlayın')))
},[searchButton])

  return (
    <div className='home-page'>
  {/* <Leftlist display={display} resultData={resultData} id={addList}/> */}
  <Leftlist display={display} movie={movie} first={first} />


<div className='srch'>
  {
    loading ? (<div></div>):(<div className="search-div">
    <form action="">
      <input type="text" name="" id="" placeholder='Seach...' onChange={searchData} required/>
      <button className='btn-search ' onClick={searchBtn}>Search</button>
    </form>
        
    </div>)
  }

 <div className="sweet-loading">
     
      <MoonLoader
        color='blueviolet'
        loading={loading}
        cssOverride={override}
        size={30}
        margin-top={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
<div className="card-all-div">
{resultData && resultData.length > 0 ? (
    resultData.map((a,b)=>(
    <Card key={b} style={{ width: '18.5rem',margin: '15px auto'}}>
    <Card.Img variant="top" className="card-img-top" src={a.Poster=='N/A' ?  NA : a.Poster} alt="Title"/>
    <Card.Body>
      <Card.Title className="card-title first">Title : {a.Title}</Card.Title>
      <Card.Text>
         <p className="card-text">Year : {a.Year}</p>
        </Card.Text>
    </Card.Body>
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Link className='btn-primary-add detail' to={`/filmdetail/${a.imdbID}`}> Detail</Link>
      <button className='btn-primary-add' onClick={()=>{setDisplayList(a)}}>Add To List</button>

    </div>
  </Card>
    ))):(
      <h3 className='wrong '>
      So we can help you find movies
    <br />
    please enter full name.
      </h3>
    )
  } 
 
</div>

</div>
    </div>
  )
}

export default Home