import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import DogHouseList from "./DogHouseList";
import DogHouseDetails from "./DogHouseDetails";

function Home() {
    return (
        <div>
            <h1>Welcome to DogHouse 254</h1>
                <Link to="/doghouses">View Dog Houses</Link>
                <Routes>
                    <Route path="/doghouses" element={<DogHouseList />} />
                    <Routes path="/doghouses/:id">
                        <Route element={<DogHouseDetails />} />
                    </Routes>
                </Routes>
        </div>
    );
}

export default Home;