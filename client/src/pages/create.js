import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import http from "../lib/http";

const API_VERSION = process.env.API_VERSION || "v1";
const API_URI = process.env.API_URI || `/api/${API_VERSION}`;

const Post = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ title, author, tags, content }) => {
    const payload = {
      title,
      author,
      tags: tags.split(",").map((tag) => tag.trim()),
      content,
    };

    await http.post(`${API_URI}/posts/`, { data: payload });
    navigate("/");
  };

  return (
    <>
      <Container className="my-5" style={{ maxWidth: "800px" }}>
        <h1>Create new Post</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              {...register("title")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              {...register("author")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              {...register("tags")}
            />
            <Form.Text className="text-muted">
              Enter them separately them with ","
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Your content..."
              {...register("content")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Share
          </Button>
        </Form>
        <Link to="/" style={{ textDecoration: "none" }}>
          &#8592; Back to Home
        </Link>
      </Container>
    </>
  );
};

export default Post