import React from 'react'

const AllMails = () => {
  return (
    <>
    <div className="card p-3">
      <h4>📧 All Mails</h4>
      <p className="mt-2 text-muted">Every message aggregated inside one master list view.</p>
      <ul className="list-group list-group-flush mt-3 bg-dark">
         <li className="list-group-item">Google — Welcome to your new account</li>
         <li className="list-group-item">GitHub — Security alert for repository</li>
         <li className="list-group-item">Google — Welcome to your new account</li>
         <li className="list-group-item">GitHub — Security alert for repository</li>
         <li className="list-group-item">Google — Welcome to your new account</li>
         <li className="list-group-item">GitHub — Security alert for repository</li>
        
       </ul> 
    </div>
    </>
  )
}
export default AllMails
