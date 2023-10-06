import { createContext, useContext, useState, useEffect } from "react";

const DogHouseContext = createContext();

export function useDogHouseContext() {
  return useContext(DogHouseContext);
}

export function DogHouseProvider({ children }) {
  const [dogHouses, setDogHouses] = useState([]);
  const [filteredDogHouses, setFilteredDogHouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the list of dog houses and set the state
  useEffect(() => {
    async function fetchDogHouses() {
      try {
        const res = await fetch("/dog_houses");
        const data = await res.json();
        setDogHouses(data);
        setFilteredDogHouses(data); 
      } catch (error) {
        console.error("Error fetching dog houses:", error);
      }
    }
    fetchDogHouses();
  }, []);

  // Filter dog houses based on the search term
  useEffect(() => {
    const filtered = dogHouses.filter((dogHouse) =>
      dogHouse.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDogHouses(filtered);
  }, [dogHouses, searchTerm]);

  return (
    <DogHouseContext.Provider value={{ dogHouses: filteredDogHouses, setSearchTerm }}>
      {children}
    </DogHouseContext.Provider>
  );
}
