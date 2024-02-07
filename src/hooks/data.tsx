import { useEffect, useState } from "react";
import "../test.css";
// Function based React lifecycle
// 1. Component mount
// 2. Component unmount

// Class based react lifecycle
// 1. ComponentDidMount
// 2. ComponentDidUpdate
// 3. ComponentWillUnmount

export function Data() {
  const [isPostVisible, setIsPostivisible] = useState(false);

  const [posts, setPost] = useState<
    { id: number; userId: number; body: string; title: string }[]
  >([]);

  const [photos, setPhotos] = useState<
    {
      albumId: number;
      id: number;
      title: string;
      thumbnailUrl: string;
      url: string;
    }[]
  >([]);

  const fetchPost = () => {
    console.log("Fetch post is mounted:", isPostVisible);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    })
      .then((response) => {
        const parsed = response.json();
        parsed.then((data) => {
          // console.log("data from server", data);
          setPost(data);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });

    return () => {
      console.log("Fetch post is unmounted");
    };
  };

  const fetchPhoto = () => {
    fetch("https://jsonplaceholder.typicode.com/photos", {
      method: "GET",
    })
      .then((responseOfPhoto) => {
        const parsedPhoto = responseOfPhoto.json();
        parsedPhoto.then((data) => {
          console.log("Photo from server ", data);
          setPhotos(data);
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(fetchPost, [isPostVisible]);
  useEffect(fetchPhoto, [isPostVisible]);

  const handlePostToggle = () => {
    setIsPostivisible(!isPostVisible);
  };

  return (
    <div>
      <h1
        style={{
          margin: "16px 0",
        }}
      >
        Posts
      </h1>
      <div>
        <button onClick={handlePostToggle}>Toggle Posts</button>
      </div>
      {isPostVisible ? (
        <div>
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "16px",
                  boxShadow: "1px 2px 3px #eee",
                }}
              >
                <h2>{post.title}</h2>
                <p>{[post.body]}</p>
              </div>
            );
          })}{" "}
          {/* classname diyerw nth child ma function halne ani masonry hunxa */}
          <div className="grid_container">
            {photos.map((photo) => {
              return (
                <div key={photo.id} className="grid_img">
                  <img src={photo.url} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Post is not visible</p>
      )}
    </div>
  );
}
