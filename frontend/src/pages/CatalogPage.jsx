import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import ProductCard from "../components/ProductCard/ProductCard";
import { listCategories } from "../services/categoryService";
import { deleteProduct, listProducts } from "../services/productService";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // the categories of the filter come from the API, they are not written by hand
  useEffect(() => {
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    listProducts(selected)
      .then((data) => active && setProducts(data))
      .catch(() => active && setError("No se pudo cargar el catálogo. ¿Está encendido el servidor?"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [selected]);

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar «${product.name}»?`)) return;
    await deleteProduct(product.id);
    // the catalog reflects the change without reloading the page
    setProducts((current) => current.filter((item) => item.id !== product.id));
  };

  return (
    <section>
      <div className="toolbar">
        <div>
          <h2>Catálogo</h2>
          <p className="muted">
            {loading ? "Cargando…" : `${products.length} producto(s)`}
          </p>
        </div>
        <Link className="btn btn--primary" to="/productos/nuevo">+ Nuevo producto</Link>
      </div>

      <CategoryFilter categories={categories} value={selected} onChange={setSelected} />

      {loading && <p className="state">Cargando el catálogo…</p>}
      {error && <p className="state state--error">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="state">No hay productos en esta categoría.</p>
      )}

      <div className="grid">
        {!loading &&
          !error &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
      </div>
    </section>
  );
}
