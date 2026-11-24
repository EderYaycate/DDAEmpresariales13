export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="filter">
      <button
        type="button"
        className={value === "" ? "chip chip--on" : "chip"}
        onClick={() => onChange("")}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={String(value) === String(category.id) ? "chip chip--on" : "chip"}
          onClick={() => onChange(String(category.id))}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
