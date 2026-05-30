import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function Arena() {
  const { allTrainers, activeTrainerId } = useSelector(state => state.trainerReducer);
  
  const myTrainer = allTrainers.find(t => t.id === activeTrainerId);
  
  const [opponentId, setOpponentId] = useState("");
  const opponentTrainer = allTrainers.find(t => t.id === parseInt(opponentId));

  const calculateTeamPower = (team) => {
    if (!team || team.length === 0) return 0;
    return team.reduce((total, pokemon) => {
      const pokemonStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
      return total + pokemonStats;
    }, 0);
  };

  const myPower = calculateTeamPower(myTrainer?.team);
  const opponentPower = calculateTeamPower(opponentTrainer?.team);

  if (!myTrainer) {
    return (
      <div>
        <Header showSearch={false} />
        <Container className="text-center" style={{ marginTop: "150px" }}>
          <h2>You must register as a Trainer to enter the Arena!</h2>
          <Link to="/create" className="btn btn-warning fw-bold mt-4">Register Now</Link>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header showSearch={false} />
      <Container style={{ marginTop: "100px", marginBottom: "50px" }}>
        
        {opponentTrainer && (
          <div className="bg-dark text-white p-4 rounded shadow text-center mb-5 border border-warning border-3">
            <h2 className="mb-0">
              {myPower > opponentPower ? `🏆 ${myTrainer.name} WINS!` : 
               myPower < opponentPower ? `💀 ${opponentTrainer.name} WINS!` : 
               "⚔️ IT'S A TIE!"}
            </h2>
            <p className="mt-2 text-muted mb-0">Based on total combined base stats.</p>
          </div>
        )}

        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-lg border-primary border-2 bg-light h-100">
              <Card.Header className="bg-primary text-white fw-bold text-center d-flex align-items-center justify-content-center gap-3">
                <img src={myTrainer.avatar} alt="avatar" style={{width: '40px', height: '40px'}} className="rounded-circle bg-white" />
                <span className="fs-4">{myTrainer.name}'s Team</span>
              </Card.Header>
              <Card.Body>
                <h4 className="text-center mb-4">Total Power: <Badge bg="primary">{myPower}</Badge></h4>
                {myTrainer.team.length === 0 ? <p className="text-center text-muted">No Pokémon in team.</p> : null}
                
                {myTrainer.team.map(pokemon => (
                  <div key={pokemon.id} className="d-flex align-items-center mb-3 p-2 border rounded bg-white shadow-sm">
                    <img src={pokemon.image} alt={pokemon.name} style={{width: '60px', objectFit: 'contain'}} />
                    <h5 className="ms-3 text-capitalize mb-0 flex-grow-1">{pokemon.name}</h5>
                    <Badge bg="secondary">
                      Stats: {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </Badge>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-lg border-danger border-2 bg-light h-100">
              <Card.Header className="bg-danger text-white fw-bold text-center">
                <span className="fs-4">Select Opponent</span>
              </Card.Header>
              <Card.Body>
                <Form.Select 
                  size="lg" 
                  className="mb-4 shadow-sm border-danger"
                  value={opponentId}
                  onChange={(e) => setOpponentId(e.target.value)}
                >
                  <option value="">-- Choose a Trainer --</option>
                  {allTrainers.map(trainer => (
                    <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                  ))}
                </Form.Select>

                {opponentTrainer && (
                  <>
                    <h4 className="text-center mb-4">Total Power: <Badge bg="danger">{opponentPower}</Badge></h4>
                    {opponentTrainer.team.length === 0 ? <p className="text-center text-muted">No Pokémon in team.</p> : null}
                    
                    {opponentTrainer.team.map(pokemon => (
                      <div key={pokemon.id} className="d-flex align-items-center mb-3 p-2 border rounded bg-white shadow-sm">
                        <img src={pokemon.image} alt={pokemon.name} style={{width: '60px', objectFit: 'contain'}} />
                        <h5 className="ms-3 text-capitalize mb-0 flex-grow-1">{pokemon.name}</h5>
                        <Badge bg="secondary">
                          Stats: {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Arena;