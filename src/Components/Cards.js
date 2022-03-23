import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Card.css'


const Cards = () => {

    const [apidata,setapidata] = useState([]);
    const[searchTitle,setSearchTitle] = useState("");

    
        useEffect(()=>{
        getdata();
        },[])

    function getdata(){
    axios.get('https://api.npoint.io/20c1afef1661881ddc9c').then((actualdata)=>{
    const players = actualdata.data.playerList;
    // console.log("b4", players)
    
    // Sorting value ascending to descending
    players.sort((a,b)=>a.Value-b.Value);    
    console.log("after", players)
    return players
    }).then(playersData =>   {  setapidata(playersData)}
    )
  }

  return (
    <div className='main'>
        
        <div className="input-container">
        <input type="text" className='inputstyle' placeholder='Enter Player Name' onChange = {(e)=>{setSearchTitle(e.target.value)}}/>
        <input type="text" className='inputstyle' placeholder='Enter Tname' onChange = {(e)=>{setSearchTitle(e.target.value)}}/>

        </div>
       
       <div className='container'>
        {apidata.filter((value)=>{    
                // Filtering data by PFNAme and TName
            if(searchTitle === ""){
                return value;
            }else if(value.PFName.toLowerCase().includes(searchTitle.toLowerCase())){
                return value;
            }else if(value.TName .toLowerCase().includes(searchTitle.toLowerCase())){
                return value;
            }

        }).map((mydata)=>{
            return(
                <>
                  {/* Mapping the api data */}
                       <div className="card " style={{width : '19rem'}}>
                          <img src = {`./player-images/${mydata.Id}.jpg`} className="card-img-top" alt={`${mydata.PFName} photo`} />
                          <div className="card-body">
                          <h5 className="card-title card-info"><b style={{color:'#8b8c89'}}>●</b> {mydata.PFName}</h5>
                          <h5 className="card-title card-info"><b style={{color:'#8b8c89'}}>●</b> {mydata.SkillDesc}</h5>
                          <h5 className="card-title card-info"><b style={{color:'#f9c80e'}}>$</b>  &nbsp;{mydata.Value}</h5>
                          <h5 className="card-title upcoming-info">Upcoming match <br /><span>{mydata.UpComingMatchesList[0].CCode} vs {mydata.UpComingMatchesList[0].VsCCode}</span></h5>
                          <h5 className="card-title nextmatch-info">Next Match : <span><b>{new Date(mydata.UpComingMatchesList[0].MDate).toLocaleString()}</b></span></h5>

                          <p className="card-text"></p>
                          </div>
                      </div>
                
                </>
                )
            })}



      </div>
    </div>
  )
}

export default Cards;