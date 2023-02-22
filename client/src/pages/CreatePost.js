import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assests";
import { getRandomPrompt } from "../utils/index";
import { FormField, Loader } from "../components";
import { logoimg } from "../assests";

const CreatePost = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dalle-zjea.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data.photo}`,
        });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-zjea.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <section style={{ borderRight: "1px solid lightgray", width: "850px" }}>
        <div>
          <div style={{ padding: "30px" }}>
            <h1 style={{}}>Create</h1>
            <p style={{ fontFamily: "cursive" }}>
              {" "}
              Create imaginative and visually stunning images through DALL-E AI
              and share them with the community.
            </p>
          </div>
          <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div
              style={{
                border: "3px solid #f8f9fa",
                padding: "20px",
                width: "600px",
                marginLeft: "35px",
              }}
            >
              <div
                style={{
                  border: "1px solid lightgray",
                  padding: "10px",
                  marginTop: "-35px",
                }}
              >
                <FormField
                  labelName="Your name"
                  type="text"
                  name={username ? "name" : form.name ? "name" : null}
                  placeholder="John Doe"
                  value={username ? username : form.name}
                  handleChange={username  ? handleChange : null}
                />
                <FormField
                  labelName="Prompt"
                  type="text"
                  name="prompt"
                  placeholder="A plush toy robot sitting against a yellow wall"
                  value={form.prompt}
                  handleChange={handleChange}
                  isSurpriseMe
                  handleSurpriseMe={handleSurpriseMe}
                />
              </div>
              <div className="mt-5 flex gap-5">
                <button
                  type="button"
                  onClick={generateImage}
                  className="btn btn-success"
                  style={{ marginLeft: "35px" }}
                >
                  {generatingImg ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>

            <div
              className="mt-10"
              style={{ marginTop: "20px", marginLeft: "30px" }}
            >
              <p style={{ fontFamily: "cursive" }}>
                Once you have created the image you want, you can shatre it with
                others in the community.
              </p>
              <button type="submit" className="btn btn-secondary">
                {loading ? "Sharing..." : "Share with the community"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <div>
        {form.photo ? (
          <img
            style={{
              width: "400px",
              borderRadius: "10px",
              float: "right",
              marginRight: "110px",
              marginTop: "-450px",
            }}
            src={form.photo}
            alt={form.prompt}
            className="w-full h-full object-contain "
          />
        ) : generatingImg ? (
          <div
            class="spinner-border"
            role="status"
            style={{
              float: "right",
              marginRight: "290px",
              marginTop: "-350px",
              width: "50px",
              height: "50px",
            }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <p
              style={{
                float: "right",
                fontSize: "30px",
                color: "gray",
                marginRight: "80px",
                marginTop: "-200px",
              }}
            >
              Generated image will appear here
            </p>
            <img
              style={{
                backgroundClip: "content-box",
                backgroundSize: "cover",
                borderRadius: "30px",
                width: "200px",
                marginLeft: "1100px",
                marginTop: "-700px",
              }}
              src={logoimg}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
