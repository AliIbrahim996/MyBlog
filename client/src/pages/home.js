import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

import {Link} from "react-router-dom";

import formatDate from "../lib/formatDate";
import http from "../lib/http";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get("/api/posts");
      setPosts(data.data.posts);
    }
    fetchData();
  }, []);

  return (
    <>
      <Container className="my-5" style={{ maxWidth: "800px" }}>
        <Image
          src=""
          width="150"
          style={{ borderRadius: "50%" }}
          className="d-block img-fluid mx-auto"
        />
        <h2 className="tex-center">Welcome to my IT blog</h2>
      </Container>
      <Container style={{ maxWidth: "800px" }}>
        <ListGroup variant="flush" as="ol">
          {posts.map((post) => {
            return (
              <ListGroup.Item key={post._id}>
                <div className="fw-bold h3">
                  <Link
                    to={`/posts/${post._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {post.title}
                  </Link>
                </div>
                <div>
                  {post.author} -{" "}
                  <span className="text-secondary">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    </>
  );
};

export default Home