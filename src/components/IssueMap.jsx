import { useEffect } from "react";
import L from "leaflet"

export default function IssueMap({reports, coords,onSelectLocation}){
useEffect(()=>{
    const container=document.getElementById("map") 
    if(!container)return
    if(container._leaflet_id)container._leaflet_id=null
    
    const centreLat=coords?.lat ||-1.286389
    const centreLng=coords?.lng ||36.817223

   const map=L.map("map").setView([centreLat, centreLng],13)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution :"&copy;OpenStreetMap constributors",
    }).addTo(map)

    reports.forEach((report)=>{
        L.marker([report.latitude,report.longitude])
        .addTo(map)
        .bindPopup(`<strong>${report.title}</strong><br>${report.description}`)

    })
    let clickedPin=null

    if(coords?.lat && coords?.lng){
        L.marker([coords.lat,coords.lng])
        .addTo(map)
        .bindPopup("Selected/Searched location")
        .openPopup()
    }

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
   },[reports, coords])

   

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
