import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addPokemonAPI, getAllPokemonsAPI } from "../../Services/allAPI";

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async () => {
  const serverData = await getAllPokemonsAPI();
  
  if (serverData.data && serverData.data.length > 0) {
    return serverData.data; 
  }

  const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0");
  const list = result.data.results;

  const detailedPromises = list.map(async (item) => {
    const res = await axios.get(item.url);
    
    const detailedData = {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.other.home.front_default,
      types: res.data.types.map(t => t.type.name),
      stats: res.data.stats
    };
    
    await addPokemonAPI(detailedData);
    return detailedData;
  });

  return await Promise.all(detailedPromises);
});

const pokedexSlice = createSlice({
  name: "Pokemons",
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
    dummyPokemons: []
  },
  reducers: {
    searchPokemon: (state, action) => {
      state.pokemons = state.dummyPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(action.payload)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        state.dummyPokemons = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { searchPokemon } = pokedexSlice.actions;
export default pokedexSlice.reducer;