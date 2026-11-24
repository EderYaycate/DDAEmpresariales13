import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { listCategories } from "../services/categoryService";
import { createProduct, getProduct, updateProduct } from "../services/productService";

const EMPTY = { name: "", description: "", price: "", stock: 0, category_id: "" };

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!editing) return;
    getProduct(id).then((product) =>
      setForm({
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        stock: product.stock,
        category_id: product.category?.id ?? "",
      })
    );
  }, [id, editing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form, price: String(form.price), stock: Number(form.stock) };
    try {
      if (editing) await updateProduct(id, payload);
      else await createProduct(payload);
      navigate("/");
    } catch {
      setError("No se pudo guardar. Revisa los datos del formulario.");
      setSaving(false);
    }
  };

  return (
    <section>
      <h2>{editing ? "Editar producto" : "Nuevo producto"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="name" value={form.name} onChange={handleChange} required maxLength={120} />
        </label>
        <label>
          Descripción
          <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
        </label>
        <div className="form__row">
          <label>
            Precio (S/)
            <input name="price" type="number" step="0.01" min="0" value={form.price}
                   onChange={handleChange} required />
          </label>
          <label>
            Existencias
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
          </label>
        </div>
        <label>
          Categoría
          <select name="category_id" value={form.category_id} onChange={handleChange} required>
            <option value="">Selecciona una categoría…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        {error && <p className="state state--error">{error}</p>}
        <div className="form__actions">
          <button className="btn btn--primary" type="submit" disabled={saving}>
            {saving ? "Guardando…" : "Guardar"}
          </button>
          <button className="btn btn--ghost" type="button" onClick={() => navigate("/")}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
