import {useState} from "react"
import{Link}from "react-router-dom"
import { useReports } from "../context/ReportContext"
export default function ReportList(){

    const {reports, currentCommunity}=useReports()
    const [onlyMyCommunity, setOnlyMyCommunity]=useState(false)
    const [filter,setFilter]=useState("All")
    const filteredReports=reports.filter((r)=>{
        const matchesStatus=filter==="All"||r.status?.toLowerCase()===filter.toLowerCase()

        const matchesCommunity=!onlyMyCommunity||!currentCommunity||r.communityId ===currentCommunity.id||
        r.location?.toLowerCase().includes(currentCommunity.area.split(",")[0].toLowerCase())
        return matchesStatus && matchesCommunity
    })
    
    return(
        <section id="reports-sec" className="mb-5">
            <h2 className="fw-bold">Community reports</h2>
            <p className="text-muted mb-4">Explore issues reported by community members</p>
            

            <div className="d-flex flex-wrap gap-3 mb-4" >{["All","pending", "In progress", "Resolved"].map((status)=>(
                 <button key={status}
                 className={`btn btn-sm rounded-pill me-1 px-3 text-capitalize ${
                 filter===status?"btn-success":"btn-outline-success"}`}
                 onClick={()=>setFilter(status)}>{status}</button>))}

                 {currentCommunity && (
                    <button type="button"
                    className={`btn btn-sm rounded-pill px-3  ${
                        onlyMyCommunity ?"btn-warning text-dark fw-semibold":"btn-outline-secondary"
                    }`}
                    onClick={()=>setOnlyMyCommunity(!onlyMyCommunity)}>
                        {onlyMyCommunity ? ` Showing:$ {currentCommunity.name}`:"filter:My Community"}
                    </button>
                 )}
            </div>

            <div className="row g-4">{
                filteredReports.map((report)=>(
                    <div key={report.id} className="col-md-6 col-lg-4">
                        <div className=" card report-card h-100 border-0 shadow-sm rounded-4 border-top border-success border-4">
                            <div className="card-body d-flex flex flex-column justify-content-between">
                            <div>
                                <h5 className="card-title fw-bold">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-success fw-semibold">{report.location}</h6>
                                {report.communityName && (
                                    <span className="badge bg-success-subtle text-success border border-success rounded-pill mb-2">
                                        {report.communityName}
                                    </span>
                                )} </div>
                            <p className="card-text text-secondary">{report.description}</p>
                            </div>
                       
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <span className={`badge rounded-pill ${
                                report.status==="Resolved"
                                ? "bg-success text-white": report.status==="In progress"? "bg-info text-dark"
                            :"bg-warning text-dark"}`}> {report.status}</span>
                            <Link to={`/reports/${report.id}`} 
                            className="btn btn-outline-success btn-sm rounded-pill px-3 fw-semibold">
                                View Details </Link>
                            </div>
                        </div>
                    </div>
            
                ))}
            </div>
        </section>
    )
}