import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title, handleDelete }) => {
  if (data?.length > 0) {
    return data.map((post, id) => (
      <Card key={post._id} {...post} handleDelete={() => handleDelete(id)} />
    ));
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const handleDelete = (id) => {
    setAllPosts(allPosts.filter((post) => post._id !== id));
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://dalle-zjea.onrender.com/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section
      style={{ maxWidth: "7xl", margin: "auto", backgroundColor: "#f8f9fa" }}
    >
      <div style={{ textAlign: "center", padding: "30px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{ fontWeight: "bold", fontSize: "32px", color: "#222328" }}
          >
            The Community Showcase
          </h1>
          <p style={{ marginTop: "2px", fontSize: "16px", color: "#666e75" }}>
            Browse through a collection of imaginative and visually stunning
            images generated by DALL-E AI
          </p>
        </div>
        <div style={{ width: "600px", marginLeft: "550px" }}>
          <FormField
            type="text"
            name="text"
            searchText
            placeholder=""
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
      </div>

      <div style={{ marginTop: "10px", padding: "20px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  marginBottom: "3px",
                  color: "#666e75",
                }}
              >
                Showing results for{" "}
                <span style={{ color: "#222328" }}>{searchText}</span>
              </h2>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "3px",
                margin: "0 -1px",
              }}
            >
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards
                  handleDelete={handleDelete}
                  data={allPosts}
                  title="No posts found"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
