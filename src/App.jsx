 import { useState, useEffect,  } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReportForm from './components/ReportForm';
import IssueMap from './components/IssueMap';
import ReportList from './components/ReportList';


export default function App(){
  const[reports, setReports]=useState([
    {
    "id":1,
    "title":"pothole on the road",
    "location":"Nyali,Mombasa",
    "description":"There is a large pothole near the road needs repair",
    "status":"pending",
    "latitude":-4.05241,
    "longitude":39.69567,
    },
    {
      "id":2,
      "title":"blocked drainage",
      "location":"Karen, Nairobi",
      "description":"Stormwater drain is clogged along the main road",
      "status":"In progress",
      "latitude":"-1.32838",
      "longitude":"36.70497",

    }
  ])

   const [showForm, setShowForm]= useState(false)
   const[location,setLocation]=useState("")
   const[coords,setCoords]=useState({lat:-4.05241,lng:39.70948})

   function handleAddReport(newReport){
    setReports([newReport,...reports])
   }
   function handleSelectLocation(lat,lng){
    setCoords({lat,lng})
    setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
    setShowForm(true)
   }
   return(
    <div className="bg-light min-vh-100">
      <Navbar/>
      <div className='container py-4'>
        <Hero onOpenForm={()=>setShowForm(true)}/>
          {showForm &&(
            <ReportForm location={location}
            setLocation={setLocation}
            coords={coords}
            onAddReport={handleAddReport}
            onClose={()=>{setLocation("")
              setShowForm(false)}}/>
          )}
          
          <IssueMap reports={reports} onSelectLocation={handleSelectLocation}/>
          <ReportList reports={reports}/>
      </div>
    </div>
   )
  }
