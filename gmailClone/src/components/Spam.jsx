import React from 'react'

const Spam = () => {
  return (
    <>
      <div className="card p-3 bg-light">
      <h4 className="text-danger">⚠️ Spam</h4>
      <p className="mt-2 text-muted">Suspicious items filtered automatically.</p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item list-group-item-danger">Crypto Bot — Make millions instantly!</li>
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

export default Spam
