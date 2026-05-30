import { configureStore } from "@reduxjs/toolkit";
import pokedexSlice from "./Slice/pokedexSlice"
import trainerSlice from './Slice/trainerSlice'

const pokeStore=configureStore({
  reducer:{
    pokedexReducer: pokedexSlice,
    trainerReducer:trainerSlice
  }
})

export default pokeStore