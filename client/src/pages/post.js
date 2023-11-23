import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Link, useNavigate, useParams } from "react-router-dom";

import formatDate from "../lib/formatDate";
import http from "../lib/http";

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  // Fetch post
  useEffect(() => {
    async function fetchData() {
      const { content } = await http.get(`/api/posts/${postId}`);
      setPost(content.data.post);
    }
    fetchData();
  }, [postId]);

  const deletePost = async () => {
    await http.delete(`api/posts/${postId}`);
    navigate("/");
  };
  return (
    <>
      <Container className="text-justified my-5" style={{ maxWidth: "800px" }}>
        <h1>{post.title}</h1>
        <div className="text-secondary mb-2">{formatDate(post.createdAt)}</div>
        <div className="text-secondary mb-2">{formatDate(post.updatedAt)}</div>
        {post.tags?.map((tag) => (
          <span>{tag}</span>
        ))}
        <div className="h4 mt-5">{post.content}</div>
        <div className="text-secondary mb-5"> - {post.author}</div>
        <div className="mb-5">
          <Link variant="primary" className="btn btn-primary m-2" to={`/posts/${postId}/edit`}>Edit</Link>
          <Button variant="danger" onClick={deletePost}>Delete</Button>
        </div>
        <Link to="" style={{textDecoration: 'none'}}>&#8592; Back to Home</Link>
      </Container>
    </>
  );
  
};

export default Post
