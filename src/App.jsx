 import { useReports  } from "./context/ReportContext"
 import {Routes, Route}from "react-router-dom"
 import "./App.css"
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReportForm from './components/ReportForm';
import IssueMap from './components/IssueMap';
import ReportList from './components/ReportList';
import ReportDetails from "./components/ReportDetails";
import CommunityAuth from "./components/communityAuth";


export default function App(){
  const{reports,
    addReport,
    showForm,
    setShowForm,
    location,
    setLocation,
    coords,
    setCoords,
    selectLocation
  }=useReports()


const renderFormModal=()=>
  showForm &&(
    <ReportForm
    location={location}
    setLocation={setLocation}
    coords={coords}
    setCoords={setCoords}
    onAddReport={addReport}
    onClose={()=>{
      setLocation("")
      setShowForm(false)
    }}
    />
  )

  return(
    <div className="bg-light min-vh-100 d-flex flex-column"
    ><Navbar/>
    <main className="container py-4 flex-grow-1">
      <Routes>
        <Route 
        path="/"
        element={<>
        <Hero onOpenForm={()=>setShowForm(true)}/>
          {renderFormModal()}
          <IssueMap reports={reports} coords={coords} onSelectLocation={selectLocation}/>
          <ReportList reports={reports}/>
          </>}
          />
         <Route path="/map"
          element={<>
          {renderFormModal()}
          <IssueMap reports={reports} coords={coords} onSelectLocation={selectLocation}/>
          </>
          }
          />
          <Route path="/reports"
          element={
            <><div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">All community reports</h2>
              <button className="btn btn-success rounded-pill px-4" onClick={()=>setShowForm(true)}>
                +Report an issue
              </button>
            </div>
            {renderFormModal()}
            <ReportList reports={reports}/>
            </>
          }
          />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/community" element={<CommunityAuth />} />
      </Routes>
    </main>
    </div>
  )
}
