import { useState } from "react";
export default function ReportForm({location,setLocation,coords,onAddReport,onClose}){
    const [category, setCategory]=useState("")
    const [otherIssue,setOtherIssue]=useState("")
    const[description,setDescription]=useState("")

    function handleSubmit(e){
        e.preventDefault()

        const finalTitle=category==="other" ?otherIssue:category

        const newReport={
            id: Date.now(),
            title:finalTitle,
            location:location,
            description:description,
            status:"pending",
            latitude:coords.lat,
            longitude:coords.lng,
        }
        onAddReport(newReport)
        setCategory("")
        setOtherIssue("")
        setLocation("")
        setDescription("")
        onClose()
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
                            onChange={(e)=>setLocation(e.target.value)}required />
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
                    onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}