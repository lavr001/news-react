export default async function handler(request, response) {
  const { searchParams } = new URL(
    request.url,
    `http://${request.headers.host}`
  );
  const q = searchParams.get("q");
  const from = searchParams.get("from");
  const sortBy = searchParams.get("sortBy") || "popularity"; // Default to popularity
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Use an environment variable

  if (!apiKey) {
    return response.status(500).json({ error: "API key is not configured." });
  }

  if (!q) {
    return response
      .status(400)
      .json({ error: "Query parameter 'q' is required." });
  }

  const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    q
  )}&from=${from}&sortBy=${sortBy}&apiKey=${apiKey}`;

  try {
    const newsResponse = await fetch(newsApiUrl);
    const newsData = await newsResponse.json();
    response.status(200).json(newsData);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    response.status(500).json({ error: "Failed to fetch news from NewsAPI" });
  }
}
