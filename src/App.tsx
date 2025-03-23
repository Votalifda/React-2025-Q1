import React, {useState, useEffect, FC} from "react";
import {ICountry} from "./types.ts";
import Country from "./Country.tsx";
import CountryDetails from "./CountryDetails.tsx";
import './App.css'

const App: FC = () => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("All");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const getVisited = () => {
        const visitedRaw = localStorage.getItem("visited");
        return visitedRaw ? JSON.parse(visitedRaw) : [];
    }

    const setVisited = (ccn3: string) => {
        localStorage.setItem("visited", JSON.stringify([...getVisited(), ccn3]));

        setFilteredCountries(prevState => prevState.map((item) => ({
            ...item,
            visited: getVisited().includes(item.ccn3)
        })));
    }

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => setCountries(data));
    }, []);

    const filterCountries = () => {

        const res =  countries
            .filter((country) =>
                region === "All" ? true : country.region === region
            )
            .filter((country) =>
                country.name.common.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                const valA = sortBy === "name" ? a.name.common : a.population;
                const valB = sortBy === "name" ? b.name.common : b.population;
                return sortOrder === "asc"
                    ? valA > valB
                        ? 1
                        : -1
                    : valA < valB
                        ? 1
                        : -1;
            })
            .map((item) => ({
                ...item,
                visited: getVisited().includes(item.ccn3)
            }));

        setFilteredCountries(res);
    };

    useEffect(() => {
        filterCountries();
    }, [countries, search, region, sortBy, sortOrder]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRegion(e.target.value);
        };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSortBy(e.target.value);
        };

    const handleSortOrderChange = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const handleOnCloseSelectedCountry = () => {
        setSelectedCountry(null)
    }

    const handleOnViewCountry = (ccn3: string) => {
        const country = countries.find((item) => item.ccn3 === ccn3);
        if (country) {
            setSelectedCountry(country);
            setVisited(country.ccn3)
        }
    }

    return (
        <div className="wrapper">
            <div className="list">
                <div className="filters">
                    <div className="form-control">
                        <label>Search:</label>
                        <input type="text" placeholder="Search..." value={search} onChange={handleSearch}/>
                    </div>
                    <div className="form-control">
                        <label>Region:</label>
                        <select value={region} onChange={handleRegionChange}>
                            <option value="All">All</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Sort By:</label>
                        <select value={sortBy} onChange={handleSortChange}>
                            <option value="name">Name</option>
                            <option value="population">Population</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Sort Dir:</label>
                        <button onClick={handleSortOrderChange}>Sort {sortOrder === "asc" ? "▲" : "▼"}</button>
                    </div>
                </div>
                <ul className="results">
                    {filteredCountries.map((item) => (
                        <Country item={item} onView={handleOnViewCountry}/>
                    ))}
                </ul>
            </div>
            {selectedCountry && <CountryDetails item={selectedCountry} onClose={handleOnCloseSelectedCountry} />}
        </div>
    );
};

export default App;
