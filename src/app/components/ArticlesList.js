import React, { useEffect, useState } from "react";

const NewsDisplay = ({ selectedValue, selectedCategory, selectedLanguage }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null); // Track the API response status

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api?country=${selectedValue}&category=${selectedCategory}&lang=${selectedLanguage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("showing the data out")
        console.log(data)
        setStatus(data.status); 
        if (data.status === "success" && data.totalResults >= 1) {
          setArticles(data.results); 
        } else {
          throw new Error("No News Found bro");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedValue, selectedCategory, selectedLanguage]);

  if (loading)
    return (
      <div className="flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    ); // Tailwind loading spinner

  if (error)
    return (
      <div className="text-red-500">
        Failed to load articles: {error.message}
      </div>
    );

  if (status !== "success") {
    // Show a message if the status is not "success"
    return (
      <div className="text-yellow-500">
        Unable to fetch articles. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {articles.map((article) => (
        <div key={article.article_id} className="rounded-lg p-2 py-1">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 ">
              <h2 className="font-bold font-mono text-yellow-300 text-lg">
                {article.title}
              </h2>
              <p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-pink-400 text-sm"
                >
                  Read more
                </a>
              </p>
            </div>
            <img
              className="w-20 h-20 object-cover object-center rounded-xl border-2 border-gray-300 ml-2"
              src={
                article.image_url ||
                "https://img.theweek.in/content/dam/week/wire-updates/the-week-pti-wire-updates.jpg"
              }
              alt={article.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsDisplay;
