import React, { useState, useEffect } from 'react';
import "./home.css";
import worldnews from "./world-news.png";

function Home() {
  const [data, setdata] = useState([]);
  const [searchdata, setsearchdata] = useState('');
  const [category, setcategory] = useState('');


  useEffect(() => {npm 
    async function getdata() {
      if (searchdata) {
        let result = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=e2dc6436499a46d09130b7e8f4378890`);
        const searchquery = await result.json();
        const filterdata = searchquery.articles.filter(e =>
          e.title.toLowerCase().includes(searchdata.toLowerCase())
        );
        setdata(filterdata);
      } else {
        let result = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=e2dc6436499a46d09130b7e8f4378890`);
        const letestnews = await result.json();
        setdata(letestnews.articles);
      }
    }
    getdata();
  }, [searchdata,category]);

  return (
    <div className='home-page'>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text search" id="basic-addon1"><img className='imgworld1' src={worldnews} alt='' /></span>
        </div>
        <input type="text" value={searchdata}  alt='search-image' onChange={(e) => setsearchdata(e.target.value)} className="form-control my-3" placeholder="Search News..." aria-label="Search News" aria-describedby="basic-addon1" />
      </div>
      <div className="input-group mb-3 dropdown">
      <select className="custom-select" value={category}  onChange={(e)=> setcategory(e.target.value)} placeholder='Category..'>
          <option value="" style={{padding:"50px",fontstyle:"italic"}}>All CATEGORY</option>
          <option value="business" style={{padding:"50px"}}>Business</option>
          <option value="entertainment" style={{padding:"50px"}}>Entertainment</option>
          <option value="general" style={{padding:"50px"}}>General</option>
          <option value="health" style={{padding:"50px"}}>Health</option>
          <option value="science" style={{padding:"50px"}}>Science</option>
          <option value="sports" style={{padding:"50px"}}>Sports</option>
          <option value="technology" style={{padding:"50px"}}>Technology</option>
        </select>
      </div>
      {searchdata ===''?(
  <div className="textcode">
<h2 className='textnews'>Letest News</h2>
</div>
):null}
      <div className='column'>
        <div className='container'>
          <div className="row my-5">
            {data.map((user) => (
              <div key={user.url} className='col-md-4'>
                <div className="card my-1" style={{ width: "18rem" }}>
                {user.urlToImage?(
        <img className="card-img-top imgsize" src={user.urlToImage} alt="newsimages"/>
      ):(
        <img className="card-img-top imgsize" alt="newsimages3" src="https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-12.jpg" />
      )}
                  <div className="card-body">
                    <h5 className="card-title">{user.title}</h5>
                    <p className="card-text">{user.description}</p>
                    <a href={user.url} rel="noopener noreferrer" className="btn btn-primary">Read...</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
