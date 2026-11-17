import { useEffect } from "react";
import L from "leaflet"



export default function IssueMap({reports, onSelectLocation}){
useEffect(()=>{
    const container=document.getElementById("map") 
    if(!container)return
    if(container._leaflet_id)container._leaflet_id=null
    
   const map=L.map("map").setView([-4.05241,39.70948],13)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution :"&copy;OpenStreetMap constributors",
    }).addTo(map)

    reports.forEach((report)=>{
        L.marker([report.latitude,report.longitude])
        .addTo(map)
        .bindPopup(`<strong>${report.title}</strong><br>${report.description}`)
    })
    let clickedPin=null

    map.on("click", (e)=>{
      const{lat,lng}=e.latlng
      if (onSelectLocation) onSelectLocation(lat,lng)

      if(clickedPin){
        map.removeLayer(clickedPin)
      }
      clickedPin=L.marker([lat,lng])
      .addTo(map)
      .bindPopup("Selected issue location")
      .openPopup()
    })
    return()=>map.remove()
   },[reports])

   

    return (
        <section id="map-sec" className="mb-5">
            <h2 className="fw-bold">Neighbourhood issue map</h2>
            <p className="text">Click on the map to select a problem location</p>
            <div id="map" className="rounded-4 shadow-sm border"
            style={{height:"400px", width:"100%",zIndex:1}}>
                </div>
                </section>
    )
}
