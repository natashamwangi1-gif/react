import { createContext, useContext,useState, useEffect } from "react";

const ReportContext=createContext()

export function ReportProvider({children}){
    const[reports, setReports]=useState([])
    const[showForm, setShowForm]=useState(false)
    const[location, setLocation]=useState("")
    const[coords, setCoords]=useState({lat:1.2197, lng:36.8911})

    const API_URL="http://localhost:3000/reports"

    
    useEffect(()=> {
        fetch(API_URL)
        .then ((res)=> res.json())
        .then((data)=> setReports(data))
        .catch((err)=>console.error("Error fetching reports:",err))
    },[])

    function addReport(newReport){
        const reportToSend={...newReport,id:string(Date.now())}

        fetch (API_URL,{
            METHOD:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(reportToSend),
        })  
    .then((res)=> res.json())
    .then ((savedReports)=> {
        setReports([savedReports, ...reports])
    })
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
            setReports(
                reports.map((report)=>(report.id===id? updateReport:report))
            )
        })
        .catch((err)=>console.error("Error updating report:",err))
     }
     function deleteReport(id){
        fetch(`${API_URL}/${id}`,{
            method:"DELETE",
        })
        .then(()=>{
            setReports(reports.filter((report)=>report.id !==id))
        })
        .catch((err)=>console.error("Error deleting report:",err))
     }

     function selectLocation(lat,lng){
        setCoords({lat,lng})
        setLocation(`${lat.toFixed(5)},${lng.toFixed(5)}`)
        setShowForm(true)
     }
     return(
        <ReportContext.Provider
    value={{
        reports,
        addReport,
        updateReportStatus,
        updateReportStatus,
        deleteReport,
        showForm,
        setShowForm,
        location,
        setLocation,
        coords,
        selectLocation
    }}
>{children}</ReportContext.Provider>)
}
export function useReports(){
    return useContext(ReportContext)
}