import { Link } from "react-router-dom";

const money = (value) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(value));

export default function ProductCard({ product, onDelete }) {
  return (
    <article className="card">
      <div className="card__image">
        {product.image ? <img src={product.image} alt={product.name} /> : <span>Sin imagen</span>}
      </div>
      <div className="card__body">
        <span className="badge">{product.category?.name ?? "Sin categoría"}</span>
        <h3>{product.name}</h3>
        <p className="card__desc">{product.description}</p>
        <div className="card__row">
          <strong className="price">{money(product.price)}</strong>
          <span className={product.stock > 0 ? "stock" : "stock stock--out"}>
            {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
          </span>
        </div>
        <div className="card__actions">
          <Link className="btn btn--ghost" to={`/productos/${product.id}/editar`}>Editar</Link>
          <button className="btn btn--danger" type="button" onClick={() => onDelete(product)}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
