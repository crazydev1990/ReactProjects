import React from 'react'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <>
      <Spinner 
        animation="border" 
        role="status" 
        style={{ textAlign: 'center', margin: 'auto', display: 'block', marginTop: '200px', marginBottom: '200px' }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  )
}

export default Loader
