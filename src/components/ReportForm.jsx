import { useState } from "react";
import { useReports } from "../context/ReportContext";


export default function ReportForm(){
    const{location,setLocation,coords,setCoords,addReport, setShowForm}=useReports()
    const [category, setCategory]=useState("")
    const [otherIssue,setOtherIssue]=useState("")
    const[description,setDescription]=useState("")

    async function handleFindLocation(){
        if(!location.trim())return
        try{
            const res =await fetch (
            `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ke&q=${encodeURIComponent(location)}`
            )
            const data=await res.json()
            if(data && data.length> 0){
                const lat=parseFloat(data[0].lat)
                const lng=parseFloat(data[0].lon)
                setCoords({lat,lng})
                return{lat,lng}
            }
        }catch(err){
            console.error("Location search failed:",err)
        }
        return coords
    }
    async function handleLocateClick(){
        await handleFindLocation()
            const mapSection=document.getElementById("map-sec")
            if(mapSection){
                mapSection.scrollIntoView({behavior:"smooth",block:"center"})
            }
        
    }
    async function handleSubmit(e){
        e.preventDefault()

        const finalTitle=category==="other" ?otherIssue:category
        const finalCoords=coords||(await handleFindLocation())||{lat:-1.286389, lng:36.817223}

        const newReport={
            id:String(Date.now()),
            title:finalTitle,
            location:location,
            description:description,
            status:"pending",
            latitude:finalCoords.lat,
            longitude:finalCoords.lng,
        }
        addReport(newReport)
        setCategory("")
        setOtherIssue("")
        setLocation("")
        setDescription("")
        setShowForm(false)
    }
    return(
        <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
                <h3 className="fw-bold mb-3 ">Report an Issue</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Category</label>
                        <select className="form-select"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)} required>
                            <option value="">Choose an Issue</option>
                            <option value="pothole">Pothole</option>
                            <option value="Garbage Dump">Garbage dump</option>
                            <option value="Broken Streetlight">Broken streetlight</option>
                            <option value="Blocked drainage">Blocked drainage</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {category ==="other" &&(
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Specify your issue </label>
                                <input type="text"
                                className="form-control"
                                value={otherIssue}
                                onChange={(e)=> setOtherIssue(e.target.value)}required />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Location(or click on the map below)</label>
                            <input type="text"
                            className="form-control"
                            value={location}
                            onChange={(e)=>{setLocation(e.target.value) 
                                setCoords(null)
                            }}/>
                            <button type="button"
                            className="btn btn-outline-success"
                            onClick={handleLocateClick}>Locate on Map</button>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-success px-4 me-2">Submit Report</button>
                    <button type="button" className="btn btn-outline-secondary px-4 me-2" 
                    onClick={()=>{
                        setLocation("")
                        setShowForm(false)
                    }}>Cancel</button>
                </form>
            </div>
        </div>
    )
}