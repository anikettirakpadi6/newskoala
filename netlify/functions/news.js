const fetch = require("node-fetch");

exports.handler = async (event) => {
  const {
    category = "general",
    page = 1,
    pageSize = 7,
  } = event.queryStringParameters || {};

  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};