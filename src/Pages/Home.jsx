import React, { useEffect } from 'react';
import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../Redux/Slice/pokedexSlice';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addPokemonToActiveTeam } from '../Redux/Slice/trainerSlice';

function Home() {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector(state => state.pokedexReducer);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, []);

  const handleAddToTeam = (pokemon) => {
    dispatch(addPokemonToActiveTeam(pokemon));
  };

  return (
    <div>
      <Header showSearch={true} />

      <Container className="my-lg-5 my-3">
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="info" />
          </div>
        ) : error ? (
          <h3 className="text-center text-danger mt-5">Error: {error}</h3>
        ) : (
          <Row className="g-4">
            {pokemons.length > 0 ? (
              pokemons.map((pokemon, index) => (
                <Col key={index} sm={12} md={4} lg={3}>
                  <Card className="h-100 shadow border-0 text-center p-3">
                    <Card.Img
                      variant="top"
                      src={pokemon.image}
                      style={{ height: '150px', objectFit: 'contain' }}
                    />
                    <Card.Body>
                      <Card.Title className="text-capitalize fw-bold">
                        {pokemon.name}
                      </Card.Title>
                      <div className="d-flex justify-content-center gap-2 mb-3">
                        {pokemon.types && pokemon.types.map((type, i) => (
                          <span key={i} className="badge bg-secondary text-capitalize">
                            {type}
                          </span>
                        ))}
                      </div>
                      <div className='d-flex gap-2 justify-content-between align-items-center'>
                        <Link className='flex-fill btn btn-outline-info btn-sm w-75' to={`/view/${pokemon.id}`}>
                            View Details
                        </Link>
                        <button
                          className='btn btn-outline-warning btn-sm w-100 flex-fill'
                          onClick={() => handleAddToTeam(pokemon)}
                        >
                          <i className="fa-solid fa-plus me-2"></i> Add to Team
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center mt-5">No Pokémon found.</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;