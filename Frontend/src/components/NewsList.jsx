import React, { useEffect, useState } from "react";
import "../styles/NewsList.css";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://vnexpress.net/rss/bat-dong-san.rss"));
        const data = await response.json();

        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");

        const items = Array.from(xml.querySelectorAll("item")).map(item => {
          const description = item.querySelector("description")?.textContent || "";
          const imageMatch = description.match(/<img.*?src=["'](.*?)["']/);

          return {
            title: item.querySelector("title")?.textContent || "No title",
            link: item.querySelector("link")?.textContent || "#",
            image: imageMatch ? imageMatch[1] : "",
            description: description.replace(/<\/?[^>]+(>|$)/g, ""),
            pubDate: item.querySelector("pubDate")?.textContent || "",
          };
        });

        setNews(items);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy tin tức:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="news-section">
        <div className="news-loading">Đang tải tin tức...</div>
      </div>
    );
  }

  return (
    <section className="news-section">
      <div className="news-container">
        <h2 className="news-heading">Tin tức Bất động sản mới nhất</h2>
        <div className="news-grid">
          {news.slice(0, 6).map((item, index) => (
            <div key={index} className="news-item">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
                {item.image && (
                  <div className="news-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                <div className="news-content">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-date">
                    {new Date(item.pubDate).toLocaleDateString('vi-VN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="news-description">{item.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="news-more">
          <a 
            href="https://vnexpress.net/bat-dong-san" 
            target="_blank" 
            rel="noopener noreferrer"
            className="news-more-link"
          >
            Xem thêm tin tức →
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsList; 