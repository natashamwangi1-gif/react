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
  const{showForm,setShowForm}=useReports()
    

  return(
    <div className="bg-light min-vh-100 d-flex flex-column"
    ><Navbar/>
    <main className="container py-4 flex-grow-1">
      <Routes>
        <Route 
        path="/"
        element={<>
        <Hero/>
         {showForm && <ReportForm/>}
          <IssueMap />
          <ReportList />
          </>}
          />
         <Route path="/map"
          element={<>
          {showForm &&<ReportForm/>}
          <IssueMap />
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
            {showForm &&<ReportForm/>}
            <ReportList />
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
