import { createContext, useContext, useState, useEffect } from "react";

const CottageContext = createContext();

export function useCottageContext() {
  return useContext(CottageContext);
}

export function CottageProvider({ children }) {
  const [cottages, setCottages] = useState([]);
  const [filteredCottages, setFilteredCottages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCottages() {
      try {
        const res = await fetch("/dog_houses");
        const data = await res.json();
        setCottages(data);
        setFilteredCottages(data); 
      } catch (error) {
        console.error("Error fetching dog houses:", error);
      }
    }
    fetchCottages();
  }, []);

  useEffect(() => {
    const filtered = cottages.filter((cottage) =>
      cottage.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCottages(filtered);
  }, [cottages, searchTerm]);

  return (
    <CottageContext.Provider value={{ cottages: filteredCottages, setSearchTerm }}>
      {children}
    </CottageContext.Provider>
  );
}
