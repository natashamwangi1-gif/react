import {useParams,useNavigate,Link} from "react-router-dom"
import { useReports } from "../context/ReportContext"

export default function ReportDetails(){
    const {id}=useParams()
    const navigate=useNavigate()
    const { reports, updateReportStatus,deleteReport}=useReports()

    const report=reports.find((r)=> String(r.id)===String(id))

    if(!report){
        return (
            <div className="text-center py-5">
                <h3 className="fw-bold">Report not found</h3>
                <p className="text-muted">It may have been resolved or removed</p>
                <Link  to="/reports" className="btn btn-success rounded-pill px-4 ">Back to all reports</Link>
            </div>
        )
    }
    function handleDelete(){
        deleteReport(report.id)
        navigate("/reports")
    }
    return(
        <div className="py-3">
            <Link to="/reports" className=" btn btn-outline-secondary btn-sm rounded-pill px-3 mb-4">
            &larr; Back to Reports</Link>
            <div className="card border-0 shadow-sm rounded-4 border-top border-success border-4">
            <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                    <div>
                        <h2 className="fw-bold mb-1">{report.title}</h2>
                        <p className="text-success fw-semibold mb-0">{report.location}</p>
                         <div>
                            <h2 className="fw-bold mb-1">{report.title}</h2>
                            <p className="text-success fw-semibold mb-1">{report.location}</p>
                            <p className="text-mutedc small mb-0">
                                <strong>Community :</strong>{report.communityName ||"General Public"}
                            </p>
                         </div>
                    </div>
                    <span className={`badge rounded-pill fs-6 px-3 py-2 ${
                    report.status==="Resolved"
                    ? "bg-success text-white":report.status==="In progress"
                    ? "bg-info text-dark":"bg-warning text-dark"}`}>
                        {report.status}
                    </span>
                </div>
                <hr/>
                <h5 className="fw-bold mt-4">Description</h5>
                <p className="lead text-secondary ">{report.description}</p>
                <p className="small text-muted mb-4">
                    GPS Coordinates:{report.latitude},{report.longitude}
                </p>
                <div className="d-flex gap-2 flex-wrap">
                    {report.status==="pending"&&(
                        <button className="btn btn-info rounded-pill px-4 fw-semifold"
                        onClick={()=>updateReportStatus(report.id,"In progress")
                        }>Mark in progress</button>
                    )}
                    {report.status !=="Resolved" &&(
                    <button className="btn btn-success rounded-pill px-4 fw-semibold"
                    onClick={()=> updateReportStatus(report.id, "Resolved")}>
                        Mark as Resolved
                    </button>
                )}
                <button className=" btn btn-outline-danger rounded-pill px-4 fw-semibold" 
                onClick={handleDelete}>Delete Report</button>
                </div>
            </div>
            </div>
        </div>
    )
}