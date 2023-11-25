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

const sections = [{ title: "New post", url: "/posts/new/" }];
function App() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">My Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            {sections.map((section) => (
              <Nav.Link href={section.url}>{section.title}</Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new/" element={<Create />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
