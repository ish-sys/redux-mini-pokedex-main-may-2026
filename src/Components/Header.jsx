import React from 'react';
import { Container, Form, Nav, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchPokemon } from '../Redux/Slice/pokedexSlice';

function Header({ showSearch }) {
  const team = useSelector(state => state.teamReducer) || [];
  const trainer = useSelector(state => state.trainerReducer);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" className="bg-info shadow" sticky="top">
      <Container className="d-flex flex-wrap justify-content-center justify-content-lg-between">
        
        <Navbar.Brand as={Link} to={'/'} className="text-warning fw-bold fs-3">
          <i className="fa-solid fa-dragon me-2"></i> PokéLeague
        </Navbar.Brand>
        
        {showSearch && (
          <Form className="d-flex mx-auto w-50 my-2 my-lg-0">
            <Form.Control
              type="search"
              placeholder="Search Pokémon..."
              className="me-2 shadow-sm"
              onChange={(e) => dispatch(searchPokemon(e.target.value.toLowerCase()))}
            />
          </Form>
        )}
        
        <div className="w-100 d-flex justify-content-center d-lg-none mt-2">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-transparent border-0 p-0 shadow-none">
            <img 
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs" 
              alt="Menu" style={{ objectFit: "cover", height: "70px", width: "70px" }}
            />
          </Navbar.Toggle>
        </div>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center text-center">
            <Nav.Link as={Link} to={'/'} className="text-white fw-semibold">Home</Nav.Link>
            
            <Nav.Link as={Link} to={'/myteam'} className="text-white fw-semibold">
              My Team
              {team.length > 0 && (
                <Badge bg="warning" text="dark" className="ms-2 rounded-pill">
                  {team.length}
                </Badge>
              )}
            </Nav.Link>
            
            <Nav.Link as={Link} to={'/battle'} className="text-white fw-semibold">Arena</Nav.Link>
            
            {trainer?.name ? (
              <Nav.Link as={Link} to={'/create'} className="d-flex align-items-center justify-content-center ms-lg-3 mt-2 mt-lg-0 p-0">
                <img 
                  src={trainer.avatar} 
                  alt="Trainer" 
                  className="rounded-circle border border-warning border-2 bg-light mx-2"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <span className="text-warning fw-bold text-capitalize">{trainer.name}</span>
              </Nav.Link>
            ) : (
              <Link to={'/create'} className="btn btn-warning text-dark fw-bold ms-lg-3 mt-2 mt-lg-0">
                Create Trainer
              </Link>
            )}
            
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;