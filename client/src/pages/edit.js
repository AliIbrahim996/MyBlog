import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import http from "../lib/http";

const Edit = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchData() {
      const { content } = await http.get(`/api/posts/${postId}`);
      reset(content.data.post);
    }
    fetchData();
  }, [postId, reset]);

  const onSubmit = async ({ title, author, tags, content }) => {
    const payload = {
      title,
      author,
      tags: tags.split(",").map((tag) => tag.trim()),
      content,
    };

    await http.put(`/api/posts/${postId}`, { data: payload });
    navigate(`/posts/${postId}`);
  };
  return (
    <>
      <Container className="my-5" style={{ maxWidth: "800px" }}>
        <h1>Edit your post</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              {...register("title")}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              {...register("author")}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              {...register("tags")}
            ></Form.Control>
            <Form.Text className="text-muted">
              Enter them separately them with ","
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Your content.."
              {...register("content")}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <Link to="/" style={{ textDecoration: "none" }}>
          &#8592; Back to Home
        </Link>
      </Container>
    </>
  );
};

export default Edit
