import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import Header from '../Components/Header';
import { registerTrainer, switchTrainer } from '../Redux/Slice/trainerSlice';

function CreateTrainer() {
  const dispatch = useDispatch();
  
  const { allTrainers, activeTrainerId } = useSelector((state) => state.trainerReducer);

  const [name, setName] = useState("");
  const [region, setRegion] = useState("Kanto");
  
  const avatarUrl = name? `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`
  : `https://api.dicebear.com/7.x/adventurer/svg?seed=Trainer`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a Trainer Name!");
      return;
    }
    
    dispatch(registerTrainer({ name:name, region:region, avatar: avatarUrl }));
    alert(`${name} has been registered and logged in!`);
    setName(""); 
  };

  return (
    <div>
      <Header />
      
      <Container style={{ marginTop: "100px", marginBottom: "50px" }}>
        <h2 className="text-center fw-bold mb-5">Trainer Management</h2>
        
        <Row className="g-5">
          <Col md={6}>
            <Card className="shadow border-info border-2 p-4 bg-light h-100">
              <h4 className="mb-4 text-info fw-bold">Register New Trainer</h4>
              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <img src={avatarUrl} alt="Avatar Preview" className="rounded-circle shadow-sm bg-white" style={{ width: '100px', height: '100px' }} />
                </div>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Trainer Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Starting Region</Form.Label>
                  <Form.Select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value="Kanto">Kanto</option>
                    <option value="Johto">Johto</option>
                    <option value="Hoenn">Hoenn</option>
                    <option value="Sinnoh">Sinnoh</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="info" type="submit" className="w-100 fw-bold text-white shadow-sm">
                  Register Trainer
                </Button>
              </Form>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow border-secondary p-4 h-100">
              <h4 className="mb-4 fw-bold">Registered Roster</h4>
              {allTrainers.length === 0 ? (
                <p className="text-muted text-center mt-5">No trainers registered yet.</p>
              ) : (
                <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: "400px" }}>
                  {allTrainers.map(trainer => (
                    <div key={trainer.id} className={`p-3 border rounded shadow-sm d-flex justify-content-between align-items-center ${activeTrainerId === trainer.id ? 'bg-warning bg-opacity-25 border-warning' : 'bg-white'}`}>
                      <div className="d-flex align-items-center gap-3">
                        <img src={trainer.avatar} alt="avatar" style={{width: '50px', height: '50px'}} className="rounded-circle bg-light border" />
                        <div>
                          <h5 className="mb-0 text-capitalize fw-bold">{trainer.name}</h5>
                          <small className="text-muted">{trainer.region} 💠 Team: {trainer.team.length}/6</small>
                        </div>
                      </div>
                      
                      {activeTrainerId === trainer.id ? (
                        <Badge bg="success" className="p-2">Active</Badge>
                      ) : (
                        <Button variant="outline-dark" size="sm" onClick={() => dispatch(switchTrainer(trainer.id))}>
                          Switch To
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateTrainer;