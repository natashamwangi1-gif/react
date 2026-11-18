import { useState } from "react";
import{useNavigate}from "react-router-dom"
import { useReports } from "../context/ReportContext";

export default function CommunityAuth(){
    const{
        communities,
        currentCommunity,
        signInCommunity,
        signOutCommunity,
        registerCommunity,
    }=useReports()

    const[searchTerm, setSearchTerm]=useState("")
    const [showRegister, setShowRegister]=useState(false)
    const[name,setName]=useState("")
    const[area,setArea]=useState("")
    const [description ,setDescription]=useState("")
    const navigate =useNavigate()

    const matchingCommunities=communities.filter(
        (c)=>c.name.toLowerCase().includes(searchTerm.toLowerCase())||
        c.area.toLowerCase().includes(searchTerm.toLowerCase())
    )
    function handleSelectCommunity(community){
        signInCommunity(community)
        navigate("/")
    }

    function handleRegisterSubmit(e){
        e.preventDefault()
        registerCommunity({name,area ,description})
        setName("")
        setArea("")
        setDescription("")
        setShowRegister(false)
        navigate("/")
    }
    return(
        <div className="py-4" style={{maxWidth:"650px",margin:"0 auto"}}>
            <h2 className="fw-bold mb-2">Community Portal</h2>
            <p className="text-muted mb-4">Search for your neighbourhood association to sign-in, or register a new one.
            </p>
        
        {currentCommunity &&(
            <div className="alert alert-success d-flex justify-content-between align-items-center-rounded-4">
                <div>Signed in as <strong>{currentCommunity.name}</strong>({currentCommunity.area})</div>
                <button className="btn btn-sm btn-outline-danger rounded-pill"
                    onClick={signOutCommunity}>Sign Out
                </button>
            </div>
        )}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
                <label className="form-label fw-semibold">Search community or Area</label>
                <input type="text"
                className="form-control mb-3"
                placeholder="e.g. Westlands, Nyali, Karen..."
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)} />

                {matchingCommunities.length>0 ? (
                    <div className="list-group mb-3">
                        {matchingCommunities.map((comm)=>(
                            <div key={comm.id}
                            className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-0 fw-bold">{comm.name}</h6>
                                    <small className="text-success">{comm.area}</small>
                                    <p className="mb-0 small text-muted">{comm.description}</p>
                                </div>
                                <button className="btn btn-success btn-sm rounded-pill px-3"
                                onClick={()=>handleSelectCommunity(comm)}>Sign In</button>
                            </div>
                        ))
                        }
                    </div>  
                ):
                (
                    <div className="text-center py-3">
                        <p className="text-muted mb-2">No community found matching "{searchTerm}".</p>
                        <button className="btn btn-outline-success rounded-pill px-4"
                        onClick={()=>{
                            setName(searchTerm)
                            setShowRegister(true)
                        }}>+Register "{searchTerm || "New Community"}"</button>
                    </div>
                )}
                {!showRegister && matchingCommunities.length >0 &&(
                    <div className="text-end">
                        <button className="btn btn-link text-success p-0 text-decoration-none fw-semibold"
                        onClick={()=>setShowRegister(true)}>Can't find your community? Register it here</button>
                    </div>
                )}
            </div>
        </div>
        {showRegister &&(
            <div className="card border-0 shadow-sm rounded-4 border-top border-success border-4">
                <div className="card-body p-4">
                    <h4 className="fw-bold mb-3">Register a new community</h4>
                    <form onSubmit={handleRegisterSubmit}>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Community name</label>
                            <input type="text"
                            className="form-control"
                            placeholder="e.g. Kilimani Neighbourhood Watch" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)} required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Area / Neighbourhood</label>
                            <input type="text"
                            className="form-control"
                            placeholder="e.g.Kilimani,Nairobi"
                            value={area}
                            onChange={(e)=> setArea(e.target.value)}required
                             />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold ">Description</label>
                            <textarea className="form-control"
                            rows="3"
                            placeholder="What is your Community focused on?"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)} required />

                        </div>

                        <button type="submit" className=" btn btn-success rounded-pill px-4 me-2">
                            Register & Sign In
                        </button>
                        
                        <button type="button"
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={()=> setShowRegister(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        )}

        </div>
    )
        
}