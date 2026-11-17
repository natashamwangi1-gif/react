export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm"
        style={{backgroundColor:"#0f3d26"}}>
            <div className="container">
                <a className=" navbar-brand fw-bold fs-4 text-white text-decoration-none" href="#home">FixMyBlock</a>
                <div className="d-flex gap-3">
                    <a className="nav-link link-warning fw-semibold" href="#home">Home</a>
                    <a className="nav-link link-warning fw-semibold" href="#map-sec">Map</a>
                    <a className="nav-link link-warning fw-semibold" href="#reports-sec">Reports</a>                                              
                </div>
            </div>
        </nav>
    )
}
