import React from 'react';
import ReactDom from 'react-dom';
import Inbox from './components/Inbox';
import Sent from './components/Sent';
import Drafts from './components/Draft';
import Trash from './components/Trash';
import AllMails from './components/AllMails';
import Spam from './components/Spam';
import Logo from './components/Logo';
import { createBrowserRouter as Router, RouterProvider, Outlet, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// ફાઇલની સૌથી ઉપર આ લાઇન ચેક કરો અથવા ઉમેરો
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './App.css';

const Layout = () => {
  return(
    <>
    <div className="d-flex flex-column vh-100">
      <div className="bg-danger text-white p-3 fw-bold fs-4 shadow-sm">
        <img src='./logo.png' alt='logo' style={{height:'100px',width:'100px',display:'inline-flex',alignContent:'flex-start',gap:'25px',lineHeight:'1.2'}} />
        <span>GMail</span>
      </div>
      <Container fluid className="flex-grow-1 p-0">
        <Row className="h-100 g-0">
          <Col md={2} className="bg-light p-3 border-end">
            <div className="d-flex flex-column gap-2 fw-bold">
              <Link to="/inbox" className="btn btn-outline-dark text-start border-0 py-2">📥 Inbox</Link>
              <Link to="/drafts" className="btn btn-outline-dark text-start border-0 py-2">📝 Drafts</Link>
              <Link to="/sent" className="btn btn-outline-dark text-start border-0 py-2">📤 Sent</Link>
              <Link to="/all-mails" className="btn btn-outline-dark text-start border-0 py-2">📧 All Mails</Link>
              <Link to="/spam" className="btn btn-outline-dark text-start border-0 py-2">⚠️ Spam</Link>
              <Link to="/trash" className="btn btn-outline-dark text-start border-0 py-2">🗑️ Trash</Link>
            </div>
          </Col>
          <Col md={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}
function App() {
  const router=Router([
    {
       path: "/",
       element: <Layout />, // The root skeleton framework shell
       children: [
                    { 
                      path: "", 
                      element: <Inbox /> 
                    }, // Default fallback loads inbox immediately at "/"
                    { 
                      path: "inbox", 
                      element: <Inbox /> 
                    },
                    { 
                      path: "drafts",
                      element: <Drafts /> 
                    },
                    { 
                      path: "sent", 
                      element: <Sent /> 
                    },
                    {
                       path: "all-mails", 
                       element: <AllMails /> 
                    },
                    { 
                      path: "spam", 
                      element: <Spam />
                     },
                    { 
                      path: "trash", 
                      element: <Trash /> 
                    }
          ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>   
    </>
  )
}

export default App
