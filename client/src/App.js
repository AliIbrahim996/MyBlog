import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Post from "./pages/post";
import Create from "./pages/create";
import Edit from "./pages/edit";

function App() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">My Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link href="posts/new">New post</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/new" element={<Create />} />
        <Route path="/posts/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
