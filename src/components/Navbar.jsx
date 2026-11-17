import {Link,NavLink}from "react-router-dom"
import{useReports}from "../context/ReportContext"

export default function Navbar(){
    const {reports}=useReports()
    return(
        <nav className="navbar navbar-dark sticky-top shadow"
        style={{backgroundColor:"#0f3d26"}}>
            <div className="container">
                <link className="navbar-brand fw-bold fs-4 text-white text-decoration-none d-flex 
                align-items-center gap" to="/">
                    <span>
                        FixMy <span className="text-warning">Block</span>
                    </span>
                    <span className="badge bg-light text-success rounded-pill fs-6">{reports.length}</span>
                </link> 

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
                    to="/"
                    end
                    className={({isActive})=>
                    `nav-link px-3 py-1 rounded-pill fw-semibold ${
                        isActive ? "bg-warning text-dark" :"text-white"
                    }`
                    }>Map</NavLink>

                    <NavLink 
                    to="/"
                    end
                    className={({isActive})=>
                    `nav-link px-3 py-1 rounded-pill fw-semibold ${
                        isActive ? "bg-warning text-dark" :"text-white"
                    }`
                    }>Reports</NavLink>
                </div>
            </div>
        </nav>
    )
}
