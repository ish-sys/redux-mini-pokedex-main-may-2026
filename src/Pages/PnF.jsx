import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

function PnF() {
  return (
    <>
    <Header/>
    <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '65vh' }}>
      <Row>
        <Col>
          <h1 className="display-1 fw-bolder text-danger mb-3">
            <i className="fa-solid fa-circle-exclamation me-3"></i>404
          </h1>
          
          <h2 className="fw-bold mb-4">A Wild Error Appeared!</h2>
          <p className="text-muted fs-5 mb-5">
            The page or trainer you are looking for isn't here yet. 
            <br /> Check the URL or return to safety.
          </p>
          
          <Link to={'/'} className="btn btn-info text-white btn-lg fw-bold shadow-sm px-4 py-2">
            <i className="fa-solid fa-house me-2"></i> Return to Base
          </Link>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default PnF