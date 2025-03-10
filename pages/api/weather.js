export default async function handler(req, res) {
  const city = req.query.city;

  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`);
    const geoData = await geoRes.json();

    const { lat, lon } = geoData[0];

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
