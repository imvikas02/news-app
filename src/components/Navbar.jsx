import React, { useEffect, useState } from 'react';
import './navbar.css';

export default function Navbar(props) {
  const [marquees,setmarquee] = useState([]);
  useEffect(()=>{
   async function marquedata(){
      let result = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=e2dc6436499a46d09130b7e8f4378890`);
      result = await result.json();
      setmarquee(result.articles);
    }
     marquedata();
  },[])
 
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <a className="navbar-brand mx-9" href="#" style={{ color: "#000080" }}>
          News-Adda
        </a>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
         <div className='top-alert-content'>
         <div className='top-alert'>
          <marquee behavior="scroll" scrollamount="2" direction="left">
            {marquees.map((user) => user.description).join('  ****   |    ****  ')}
            </marquee>
            </div>
            </div>
        </div>
      </nav>
    </>
  );
}
