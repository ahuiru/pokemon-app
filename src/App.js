
import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータの取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細データを取得
      loadPokemon(res.results)
      // console.log(res.results)
      setLoading(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)
        let pokemonRecoad = getPokemon(pokemon.url)
        return pokemonRecoad;
      })
    );
    setPokemonData(_pokemonData)
  };

  console.log(pokemonData)


  return (
    <div className="App">
      {loading ?
        <h1>ロード中・・・</h1>
       :
        <h1>ポケモンデータを取得！</h1>
      }
    </div>
  );
}

export default App;
