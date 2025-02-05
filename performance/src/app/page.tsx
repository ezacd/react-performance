import Image from 'next/image';
import './main_page.css';

export default async function Home() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const countries = await res.json();

  const getPopulation = (country: typeof countries) => {
    if (country.population < 1000) {
      return country.population + ' ppl';
    }

    if (country.population < 1000000) {
      return (country.population / 1000).toFixed(2) + ' k';
    }

    return (country.population / 1000000).toFixed(2) + ' mm';
  };

  const getRegion = (country: typeof countries) => {
    const region = country.region;

    switch (region) {
      case 'Europe':
        return '🌍 ' + region;
      case 'Africa':
        return '🌍 ' + region;
      case 'Americas':
        return '🌎 ' + region;
      case 'Asia':
        return '🌏 ' + region;
      case 'Oceania':
        return '🌏 ' + region;
      default:
        return '🇦🇶 ' + region;
    }
  };

  return (
    <div>
      <header>
        <h1>Countries list 🌎</h1>
      </header>

      <div className="controls">
        <input type="text" id="search" placeholder="🔎 Search country..." />
        <select id="region-filter">
          <option value="">All regions 🌎</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
          <option value="antarctic">Antarctic</option>
        </select>
        <select id="sort">
          <option value="name-asc">🔠 Name (A-Z)</option>
          <option value="name-desc">🔠 Name (Z-A)</option>
          <option value="pop-asc">👥 Name (↑)</option>
          <option value="pop-desc">👥 Name (↓)</option>
        </select>
      </div>

      <main>
        <div className="countries">
          {countries.map((country: typeof countries) => (
            <div key={country.cca3} className="country-card">
              <Image
                src={country.flags.png}
                alt="Флаг Бразилии"
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
        </div>
      </main>
    </div>
  );
}
