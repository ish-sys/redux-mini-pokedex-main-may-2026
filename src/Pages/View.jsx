import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Spinner, ProgressBar } from 'react-bootstrap';
import Header from '../Components/Header'; 
import { useParams } from 'react-router-dom';
import { getSinglePokemonAPI } from '../Services/allAPI'; 
import { useDispatch } from 'react-redux';
import { addPokemonToActiveTeam } from '../Redux/Slice/trainerSlice';


function View() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDetailedPokemon = async () => {
      try {
        const response = await getSinglePokemonAPI(id);
        if (response.status === 200) {
          setPokemon(response.data);
        }
      } catch (error) {
        console.log("Failed to fetch Pokémon details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedPokemon();
  }, [id]);

  const handleAddToTeam = (pokemon) => {
    dispatch(addPokemonToActiveTeam(pokemon));
  };

  return (
    <div>
      <Header />

      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="info" />
          </div>
        ) : !pokemon ? (
          <h2 className="text-center text-danger mt-5">Pokémon Not Found</h2>
        ) : (
          <Row className="w-100 shadow-lg p-5 rounded bg-light border">
            <Col lg={5} className="d-flex justify-content-center align-items-center mb-4 mb-lg-0">
              <img
                src={pokemon.image}
                alt=""
                style={{ width: "100%", maxWidth: "400px", objectFit: "contain" }}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={6} className="d-flex flex-column justify-content-center">
              {/* <p className="text-muted mb-1 fs-5"># {pokemon.id}</p> */}
              <h1 className="text-capitalize fw-bold display-4 mb-3">{pokemon.name}</h1>
              <div className="d-flex gap-2 mb-4">
                {pokemon.types?.map((type, index) => (
                  <span key={index} className="badge bg-primary fs-6 px-3 py-2 text-capitalize">
                    {type}
                  </span>
                ))}
              </div>
              <div className="mb-4">
                <h4 className="mb-3 border-bottom pb-2">Base Stats</h4>
                {pokemon.stats?.map((statObj, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="text-capitalize fw-semibold">{statObj.stat.name}</span>
                      <span>{statObj.base_stat}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-start mt-3">
                <Button
                  className='btn btn-warning rounded px-4 py-2 fw-bold text-dark'
                  onClick={() => handleAddToTeam(pokemon)}
                >
                  <i className="fa-solid fa-plus me-2"></i> Add to Team
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default View;