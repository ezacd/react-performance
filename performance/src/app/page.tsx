import Image from 'next/image';
import './main_page.css';

export default function Home() {
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
          <div className="country-card">
            <Image
              src="https://flagcdn.com/w320/fr.png"
              alt="Флаг Франции"
              width={100}
              height={100}
            />
            <div className="info">
              <h2>Франция</h2>
              <p>👥 67 млн</p>
              <p>🌍 Европа</p>
            </div>
          </div>

          <div className="country-card">
            <Image
              src="https://flagcdn.com/w320/jp.png"
              alt="Флаг Японии"
              width={100}
              height={100}
            />
            <div className="info">
              <h2>Япония</h2>
              <p>👥 126 млн</p>
              <p>🌏 Азия</p>
            </div>
          </div>

          <div className="country-card">
            <Image
              src="https://flagcdn.com/w320/br.png"
              alt="Флаг Бразилии"
              width={100}
              height={100}
            />
            <div className="info">
              <h2>Бразилия</h2>
              <p>👥 213 млн</p>
              <p>🌎 Америка</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
