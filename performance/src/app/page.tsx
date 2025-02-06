'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './main_page.css';

interface Country {
  cca3: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
  };
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('all');
  const [sorting, setSorting] = useState<string>('name-asc');

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data: Country[] = await res.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const filteredCountries =
    region === 'all'
      ? countries
      : countries.filter((country) => country.region.toLowerCase() === region);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sorting === 'name-asc') {
      return a.name.common.localeCompare(b.name.common);
    } else if (sorting === 'name-desc') {
      return b.name.common.localeCompare(a.name.common);
    } else if (sorting === 'pop-asc') {
      return a.population - b.population;
    } else if (sorting === 'pop-desc') {
      return b.population - a.population;
    }
    return 0;
  });

  return (
    <div>
      <header>
        <h1>Countries list 🌎</h1>
      </header>

      <div className="controls">
        <input type="text" id="search" placeholder="🔎 Search country..." />
        <select id="region-filter" onChange={(e) => setRegion(e.target.value)}>
          <option value="all">All regions 🌎</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
          <option value="antarctic">Antarctic</option>
        </select>
        <select id="sort" onChange={(e) => setSorting(e.target.value)}>
          <option value="name-asc">🔠 Name (A-Z)</option>
          <option value="name-desc">🔠 Name (Z-A)</option>
          <option value="pop-asc">👥 Population (↑)</option>
          <option value="pop-desc">👥 Population (↓)</option>
        </select>
      </div>

      <main>
        <div className="countries">
          <CountryList countries={sortedCountries} />
        </div>
      </main>
    </div>
  );
}

const getPopulation = (country: Country) => {
  if (country.population < 1000) {
    return country.population + ' ppl';
  }

  if (country.population < 1000000) {
    return (country.population / 1000).toFixed(2) + ' k';
  }

  return (country.population / 1000000).toFixed(2) + ' m'; // исправил "mm" на "m"
};

const getRegion = (country: Country) => {
  const region = country.region;

  switch (region) {
    case 'Europe':
    case 'Africa':
      return '🌍 ' + region;
    case 'Americas':
      return '🌎 ' + region;
    case 'Asia':
    case 'Oceania':
      return '🌏 ' + region;
    default:
      return '🇦🇶 ' + region;
  }
};

function CountryList({ countries }: { countries: Country[] }) {
  return (
    <>
      {countries.map((country) => (
        <div key={country.cca3} className="country-card">
          <Image
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width={100}
            height={100}
          />
          <div className="info">
            <h2>{country.name.common}</h2>
            <p>👥 {getPopulation(country)}</p>
            <p>{getRegion(country)}</p>
          </div>
        </div>
      ))}
    </>
  );
}
