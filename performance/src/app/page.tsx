'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import './main_page.css';
import React from 'react';

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

type SortingOption = 'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<string>('all');
  const [sorting, setSorting] = useState<SortingOption>('name-asc');

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data: Country[] = await res.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const getFilteredSortedCountries = useMemo(() => {
    return countries
      .filter((country) => {
        return region === 'all' || country.region.toLowerCase() === region;
      })
      .filter((country) => {
        return country.name.common.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a, b) => {
        switch (sorting) {
          case 'name-asc':
            return a.name.common.localeCompare(b.name.common);
          case 'name-desc':
            return b.name.common.localeCompare(a.name.common);
          case 'pop-asc':
            return a.population - b.population;
          case 'pop-desc':
            return b.population - a.population;
          default:
            return 0;
        }
      });
  }, [countries, region, search, sorting]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegion(e.target.value);
    },
    [],
  );

  const handleSortingChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSorting(e.target.value as SortingOption);
    },
    [],
  );

  return (
    <div>
      <header>
        <h1>Countries list 🌎</h1>
      </header>

      <div className="controls">
        <input
          type="text"
          id="search"
          placeholder="🔎 Search country..."
          onChange={handleSearchChange}
        />
        <select id="region-filter" onChange={handleRegionChange}>
          <option value="all">All regions 🌎</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
          <option value="antarctic">Antarctic</option>
        </select>
        <select id="sort" onChange={handleSortingChange}>
          <option value="name-asc">🔠 Name (A-Z)</option>
          <option value="name-desc">🔠 Name (Z-A)</option>
          <option value="pop-asc">👥 Population (↑)</option>
          <option value="pop-desc">👥 Population (↓)</option>
        </select>
      </div>

      <main>
        <div className="countries">
          <CountryList countries={getFilteredSortedCountries} />
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

  return (country.population / 1000000).toFixed(2) + ' m';
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

const CountryCard = React.memo(function CountryCard({
  country,
}: {
  country: Country;
}) {
  return (
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
  );
});

function CountryList({ countries }: { countries: Country[] }) {
  return (
    <>
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </>
  );
}
