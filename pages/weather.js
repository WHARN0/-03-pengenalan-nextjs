import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return alert("Masukkan nama kota!");

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Gagal mengambil data cuaca.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Cek Cuaca</h1>
      <input type="text" placeholder="Masukkan kota" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={getWeather} disabled={loading}>
        {loading ? "Loading..." : "Cek"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>Cuaca di {weather.city}</h2>
          <p>Temperatur: {weather.temperature}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
