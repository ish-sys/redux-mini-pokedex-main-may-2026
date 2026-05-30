import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
  name: "trainers",
  initialState: {
    allTrainers: [],      
    activeTrainerId: null 
  },
  reducers: {
    registerTrainer: (state, action) => {
      const newTrainer = {
        ...action.payload,
        id: Date.now(), 
        team: []        
      };
      state.allTrainers.push(newTrainer);
      state.activeTrainerId = newTrainer.id; 
    },
    switchTrainer: (state, action) => {
      state.activeTrainerId = action.payload; 
    },
    addPokemonToActiveTeam: (state, action) => {
      const activeTrainer = state.allTrainers.find(t => t.id === state.activeTrainerId);
      
      if (!activeTrainer) {
        alert("You must register as a Trainer first!");
        return;
      }
      if (activeTrainer.team.length >= 6) {
        alert("Your team is full! Max 6 Pokémon.");
        return;
      }
      if (activeTrainer.team.find(p => p.id === action.payload.id)) {
        alert(`${action.payload.name} is already on your team!`);
        return;
      }
      
      activeTrainer.team.push(action.payload);
      alert(`${action.payload.name} added to ${activeTrainer.name}'s team!`);
    },
    removePokemonFromActiveTeam: (state, action) => {
  const activeTrainer = state.allTrainers.find(t => t.id === state.activeTrainerId);
  if (activeTrainer) {
    activeTrainer.team = activeTrainer.team.filter(p => p.id !== action.payload);
  }
  }}
});

export const { registerTrainer, switchTrainer, addPokemonToActiveTeam,removePokemonFromActiveTeam } = trainerSlice.actions;
export default trainerSlice.reducer;