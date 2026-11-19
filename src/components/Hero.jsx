import{Link}from "react-router-dom"
import { useReports } from "../context/ReportContext" 


export default function Hero(){
    const{setShowForm}=useReports()
    return(
        <div id="home" className="p-5 mb-5 text-white rounded-4 shadow lg text-center"
        style={{backgroundColor:"#0f3d26",
            backgroundSize:"cover",
            backgroundPosition:"center"
        }}>
            <h1 className="display-5 fw-bold">Report local Problems in your Neighbourhood</h1>
            <p className="lead mb-4">Help keep your area clean,safe, and well maintained.</p>
            <button className="btn btn-success btn-lg rounded-pill px-4 fw-semibold shadow" 
            onClick={()=>setShowForm(true)}>Report an Issue</button>
        </div>
    )
}