import { Link, Route, Routes } from "react-router-dom";

import CatalogPage from "./pages/CatalogPage";
import ProductFormPage from "./pages/ProductFormPage";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">TecsupShop</Link>
        <nav>
          <Link to="/">Catálogo</Link>
          <Link to="/productos/nuevo">Nuevo producto</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/productos/nuevo" element={<ProductFormPage />} />
          <Route path="/productos/:id/editar" element={<ProductFormPage />} />
        </Routes>
      </main>
      <footer className="footer">
        DAE · Semana 13 · Estructura de una aplicación de comercio electrónico
      </footer>
    </div>
  );
}
