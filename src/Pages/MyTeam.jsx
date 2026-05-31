import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Header from '../Components/Header'; 
import { removePokemonFromActiveTeam } from '../Redux/Slice/trainerSlice';
import { Link } from 'react-router-dom';

function MyTeam() {
  const dispatch = useDispatch();
  
  const { allTrainers, activeTrainerId } = useSelector((state) => state.trainerReducer);
  
  const myTrainer = allTrainers.find(t => t.id === activeTrainerId);
  const team = myTrainer ? myTrainer.team : [];

  if (!myTrainer) {
    return (
      <div>
        <Header showSearch={false} />
        <Container className="text-center" style={{ marginTop: "150px" }}>
          <h2>You must register as a Trainer to build a team!</h2>
          <Link to="/create" className="btn btn-warning fw-bold mt-4">Register Now</Link>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <Container style={{ marginTop: "100px", marginBottom: "50px" }}>
        <div className="text-center mb-5">
          <img src={myTrainer.avatar} alt="avatar" style={{width: '80px', height: '80px'}} className="rounded-circle bg-light border shadow-sm mb-3" />
          <h2 className="fw-bold text-capitalize">
            {myTrainer.name}'s Team <span className="text-muted fs-4">({team.length}/6)</span>
          </h2>
        </div>

        {team.length === 0 ? (
          <div className="text-center mt-5 p-5 bg-light rounded shadow-sm border">
            <h3 className="text-muted mb-3">Your team is currently empty!</h3>
            <p>Go back to the Pokédex to add some members.</p>
            <Link to="/" className="btn btn-info fw-bold px-4 py-2 mt-3">
              Browse Pokédex
            </Link>
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
            {team.map((pokemon) => (
              <Col key={pokemon.id} sm={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0 text-center p-3 bg-light">
                  <Card.Img 
                    variant="top" 
                    src={pokemon.image} 
                    style={{ height: '180px', objectFit: 'contain' }} 
                  />
                  <Card.Body>
                    {/* <p className="text-muted mb-1">#{pokemon.id}</p> */}
                    <Card.Title className="text-capitalize fw-bold fs-4 mb-3">
                      {pokemon.name}
                    </Card.Title>
                    
                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {pokemon.types?.map((type, i) => (
                        <span key={i} className="badge bg-secondary text-capitalize">
                          {type}
                        </span>
                      ))}
                    </div>

                    <Button 
                      variant="outline-danger" 
                      className="w-100 fw-bold"
                      onClick={() => dispatch(removePokemonFromActiveTeam(pokemon.id))}
                    >
                      <i className="fa-solid fa-trash me-2"></i> Release
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default MyTeam;