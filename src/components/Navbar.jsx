import {Link,NavLink}from "react-router-dom"
import{useReports}from "../context/ReportContext"

export default function Navbar(){
    const {reports, currentCommunity}=useReports()
    return(
        <nav className="navbar navbar-dark sticky-top shadow"
        style={{backgroundColor:"#0f3d26"}}>
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4 text-white text-decoration-none d-flex 
                align-items-center gap" to="/">
                    <span>
                        FixMy<span className="text-warning">Block</span>
                    </span>
                   
                </Link> 

                <div className="d-flex gap-2">
                    <NavLink 
                    to="/"
                    end
                    className={({isActive})=>
                    `nav-link px-3 py-1 rounded-pill fw-semibold ${
                        isActive ? "bg-warning text-dark" :"text-white"
                    }`
                    }>Home</NavLink>

                    <NavLink 
                    to="/map"
                    className={({isActive})=>
                    `nav-link px-3 py-1 rounded-pill fw-semibold ${
                        isActive ? "bg-warning text-dark" :"text-white"
                    }`
                    }>Map</NavLink>

                    <NavLink 
                    to="/reports"
                    className={({isActive})=>
                    `nav-link px-3 py-1 rounded-pill fw-semibold d-flex align-items-center gap-1 ${
                        isActive ? "bg-warning text-dark" :"text-white"
                    }`
                    }> <span>Reports</span>
                    <span className="badge bg-light text-dark rounded-pill" 
                    style={{fontSize:"0.7rem"}}>{reports.length}</span></NavLink>

                    
                    <NavLink to="/community"
                    className={({isActive})=>
                    `nav-link px-3 py-1 rounded-pill fw-semibold ${
                        isActive ? "bg-warning text-dark":"text-white"
                    }`}>{currentCommunity ? currentCommunity.name:"Community Sign-in"}</NavLink>
                </div>
            </div>
        </nav>
    )
}
