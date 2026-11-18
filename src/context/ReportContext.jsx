import { createContext, useContext,useState, useEffect } from "react";

const ReportContext=createContext()

export function ReportProvider({children}){
    const[reports, setReports]=useState([])
    const[showForm, setShowForm]=useState(false)
    const[location, setLocation]=useState("")
    const[coords, setCoords]=useState({lat:1.2197, lng:36.8911})
    const[communities,setcommunities]=useState([])
    const [currentCommunity,setCurrentCommunity]=useState(()=>{
    const saved=localStorage.getItem("currentCommunity")
return saved ?JSON.parse(saved):null})

    const API_URL="http://localhost:3000/reports"
    const COMMUNITIES_URL="http://localhost:3000/communities"

    
    useEffect(()=> {
        fetch(API_URL)
        .then ((res)=> res.json())
        .then((data)=> setReports(data))
        .catch((err)=>console.error("Error fetching reports:",err))

        fetch (COMMUNITIES_URL)
        .then ((res)=>res.json())
        .then((data)=>setcommunities(data))
        .catch((err)=> console.error("Error fetching communties:", err))
    },[])

    function addReport(newReport){
        const reportWithCommunity={...newReport,communityid:currentCommunity ? currentCommunity.id :null,
            communityName: currentCommunity ? currentCommunity.name:"General public"
        }

        fetch (API_URL,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(reportWithCommunity),
        })  
    .then((res)=> res.json())
    .then ((savedReports)=> 
        setReports([savedReports, ...reports]))
    .catch((err)=> console.error("Error adding report:",err))
    }
     function updateReportStatus(id, newStatus){
        fetch(`${API_URL}/${id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({status:newStatus})
        })
        .then((res)=>res.json())
        .then((updateReport)=> {
            setReports((prevReports)=>
                prevReports.map((report)=>
                String(report.id)=== String(id)? {...report,...updateReport,status:newStatus}:report))
            
        })
        .catch((err)=>console.error("Error updating report:",err))
     }
     function deleteReport(id){
        fetch(`${API_URL}/${id}`,{
            method:"DELETE",
        })
        .then(()=>{
            setReports((prevReports)=>
                prevReports.filter((report)=>String(report.id)!==String(id))
            )
        
        })
        .catch((err)=>console.error("Error deleting report:",err))
     }

     function selectLocation(lat,lng){
        setCoords({lat,lng})
        setLocation(`${lat.toFixed(5)},${lng.toFixed(5)}`)
        setShowForm(true)
     }

     function signInCommunity(community){
        const updateMembers=(Number(community.members)||0) + 1
        fetch(`${COMMUNITIES_URL}/${community.id}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({members:updateMembers})
        })

        .then ((res)=> res.json())
        .then((updatedCommunity)=>{
            setcommunities(
                communities.map((c)=>
                c.id===updatedCommunity.id ? updatedCommunity:c)
            )
            setCurrentCommunity(updatedCommunity)
            localStorage.setItem("currentCommunity",JSON.stringify(updatedCommunity))
        })
        .catch((err)=>{
            console.error("Error updating member count:", err)
            setCurrentCommunity(community)
            localStorage.setItem("currentCommunity",JSON.stringify(community))
     })
    }


     function signOutCommunity(){
        setCurrentCommunity(null)
        localStorage.removeItem("currentCommunity")
     }

     function registerCommunity(newCommunity){
        const communityToSave={
            ...newCommunity,
            id:`c${Date.now()}`,
            members:1,
        }
        fetch (COMMUNITIES_URL,{
            method:"POST",
            headers:{"Content-Type":"application.json"},
            body:JSON.stringify(communityToSave),
        })
        .then((res)=>res.json())
        .then((saved)=>{
            setcommunities([...communities,saved])
            signInCommunity(saved)
        })
        .catch((err)=>console.error("Error registering community:",err))
     }

     return(
        <ReportContext.Provider
    value={{
        reports,
        addReport,
        updateReportStatus,
        deleteReport,
        showForm,
        setShowForm,
        location,
        setLocation,
        coords,
        setCoords,
        selectLocation,
        communities,
        currentCommunity,
        signInCommunity,
        signOutCommunity,
        registerCommunity,
    }}
>{children}</ReportContext.Provider>)}

export function useReports(){
    return useContext(ReportContext)
}