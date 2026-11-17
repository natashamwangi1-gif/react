export default function ReportList({reports}){
    return(
        <section id="reports-sec" className="mb-5">
            <h2 className="fw-bold">Community reports</h2>
            <p className="text-muted mb-4">Explore issues reported by community members</p>
            <div className="row g-4">{
                reports.map((report)=>(
                    <div key={report.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4 border-top border-success border-4">
                            <div className="card-body d-flex flex flex-column justify-content-between">

                            <div>
                            <h5 className="card-title fw-bold">{report.title}</h5>
                            <h6 className="card-subtitle mb-2 text-success fw-semibold">{report.location}</h6>
                            <p className="card-text text-secondary">{report.description}</p>
                            </div>
                       
                            <div className="mt-3">
                                <span className={`badge rounded-pill${
                                report.status==="pending"
                                ? "bg-warning text-dark": "bg-info text-dark"}`}> {report.status}</span>
                            </div>
                        </div>
                    </div>
            </div>
                ))}
            </div>
        </section>
    )
}