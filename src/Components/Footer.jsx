import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-dark text-white w-100 mt-auto py-5">
      <Container>
        <Row className="gy-4">
          
          <Col md={4} className="text-center text-md-start">
            <h4 className="text-warning fw-bold">
              <i className="fa-solid fa-dragon me-2"></i> PokéLeague
            </h4>
            <p>
              The ultimate roster and battle arena manager. Build your team, calculate stats, and dominate.
            </p>
          </Col>

          <Col md={4} className="text-center">
            <h5 className="mb-3">Quick Links</h5>
            <div className="d-flex flex-column">
              <Link to={'/'} className="text-white text-decoration-none mb-2">Home</Link>
              <Link to={'/myteam'} className="text-white text-decoration-none mb-2">My Team</Link>
              <Link to={'/battle'} className="text-white text-decoration-none">Arena</Link>
            </div>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <h5 className="mb-3">Connect</h5>
            <div className="fs-3">
              <a href="#" className="text-white me-3"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="text-white me-3"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#" className="text-white"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </Col>
          
        </Row>

        <hr className="border-light mt-4 mb-3" />

        <Row>
          <Col className="text-center">
            <p className="mb-0 pb-2" style={{ fontSize: '14px' }}>
              &copy; {currentYear} PokéLeague Roster Manager. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer