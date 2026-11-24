# DDAEmpresariales13

Laboratorio de la **semana 13** del curso Desarrollo de Aplicaciones Empresariales (DAE), sección 4-C24-A.
Estructura principal de una aplicación de comercio electrónico: **Django + Django REST Framework** en el
servidor y **ReactJS (Vite)** en el cliente.

## Reparto entre servidor y cliente

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| Servidor | `backend/catalog/` | Modelos `Category` y `Product`, administrador, serializadores anidados y los recursos REST |
| Servidor | `backend/config/` | Configuración del proyecto, rutas y archivos de medios |
| Cliente | `frontend/src/services/` | Capa de servicios: el único lugar que habla con la API |
| Cliente | `frontend/src/pages/` | Páginas: catálogo y alta/edición de producto |
| Cliente | `frontend/src/components/` | Componentes reutilizables (una carpeta por componente) |

El producto se expone con su **categoría anidada**, de modo que la pantalla del catálogo se arma con una
sola petición en vez de dos.

## Cómo levantarlo

### 1. Servidor (puerto 8001)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # en Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_catalog    # 3 categorías y 8 productos con imagen
python manage.py createsuperuser
python manage.py runserver 8001
```

### 2. Cliente (puerto 5173)

```bash
cd frontend
npm install
npm run dev
```

La dirección del API se configura en un solo sitio, `frontend/.env`:

```
VITE_API_URL=http://127.0.0.1:8001/api
```

## Rutas del API

| Método y ruta | Qué hace |
|---|---|
| `GET /api/categories/` | Lista las categorías |
| `POST /api/categories/` | Crea una categoría |
| `GET /api/products/` | Lista los productos con su categoría anidada |
| `GET /api/products/?category=<id>` | Filtra el listado por categoría |
| `GET /api/products/<id>/` | Un producto |
| `POST /api/products/` | Crea un producto (`category_id` para la categoría) |
| `PUT /api/products/<id>/` | Modifica un producto |
| `DELETE /api/products/<id>/` | Elimina un producto |

## Observaciones

- El precio y las existencias los decide el servidor; el cliente solo pide y muestra.
- `ProductViewSet` usa `select_related("category")` para no disparar una consulta por producto.
- Ningún componente importa axios: todo pasa por `src/services/`.
