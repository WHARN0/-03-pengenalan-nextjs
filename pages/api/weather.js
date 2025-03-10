export default async function handler(req, res) {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Nama kota diperlukan!" });
  }

  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      return res.status(404).json({ error: "Kota tidak ditemukan!" });
    }

    const { lat, lon } = geoData[0];

    // 🔹 2. Ambil cuaca dari Open-Meteo API
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await weatherRes.json();

    res.status(200).json({
      city,
      temperature: weatherData.current_weather.temperature,
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data cuaca." });
  }
}
