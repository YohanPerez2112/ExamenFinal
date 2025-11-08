# SegundoParcial 
# RopaStore - Catálogo modularizado (Vue 3 + Bootstrap)

Proyecto de ejemplo para el segundo parcial: aplicación modularizada que muestra un catálogo de ropa.

## Tecnologías
- Vue 3 (Vite)
- Bootstrap 5.3
- Axios
- DummyJSON (API pública para productos)

## Estructura
- `src/components` -> componentes reutilizables (Navbar, Sidebar, Footer, ProductCard)
- `src/views` -> vistas (LoginView, DashboardView, ProductView)
- `src/services/api.js` -> consumo de API
- `public/users.json` -> usuarios de ejemplo para login (educativo)

## Instrucciones
1. `npm install`
2. `npm run dev`
3. Abrir `http://localhost:5173` (según Vite)

## Login
Credenciales en `public/users.json`: `admin/admin123` o `user/user123`. 
> Nota: validación educativa con JSON local; no es un sistema seguro.

## CRUD de Productos
- Se usa DummyJSON para listar y simular creación/actualización/eliminación.
- En la entrega se debe explicar que algunas acciones son simuladas y que para producción se usaría una API real con autenticación.

## Evidencia de colaboración
Agregar commits, ramas y PRs en tu repositorio.
