import commonAPI from "./commonAPI";
import { server_url } from "./server_url";

export const getAllPokemonsAPI = async () => {
  return await commonAPI('GET', `${server_url}/pokemon`, {});
};

export const addPokemonAPI = async (pokemonData) => {
  return await commonAPI('POST', `${server_url}/pokemon`, pokemonData);
};

export const getSinglePokemonAPI = async (id) => {
  return await commonAPI('GET', `${server_url}/pokemon/${id}`, {});
};