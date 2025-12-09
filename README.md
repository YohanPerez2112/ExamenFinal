# 📘 Aplicación Web – Gestión de Usuarios y Productos

## Descripción del Proyecto
Esta es una **Single Page Application (SPA)** desarrollada con **Vue.js 3**, **Vue Router** y **Bootstrap 5**.  
Permite gestionar **Usuarios** y **Productos** mediante operaciones **CRUD**, implementa **autenticación básica**, **rutas protegidas**, **modales**, **alertas** y uso de **Bootstrap Icons**.  

El proyecto fue desarrollado como examen final del curso **Desarrollo de Aplicaciones Web**, integrando todas las competencias del curso.


## Características Principales

- **Autenticación de Usuario:** Login y cierre de sesión con token simulado en `localStorage`.  
- **Rutas Protegidas:** Acceso restringido a usuarios autenticados.  
- **CRUD de Usuarios:** Crear, editar, eliminar y listar usuarios con modales y alertas.  
- **CRUD de Productos:** Crear, editar, eliminar y listar productos con modales y alertas.  
- **Bootstrap 5:** Diseño responsivo, formularios estilizados, modales, alertas e íconos.  
- **Buenas Prácticas:** Código modular, componentes reutilizables, consumo de APIs con Axios.


## Tecnologías Utilizadas

- Vue.js 3 (Composition API)  
- Vue Router  
- Bootstrap 5 y Bootstrap Icons  
- Axios  
- MockAPI  
- Git y GitHub  

---

## Estructura del Proyecto
/src
├── /components
├── /views
├── /router
├── /services
├── /assets
├── App.vue
└── main.js 
## Instalar dependencias

- npm install
- npm install bootstrap@5.3.0 

## Ejecutar en entorno de desarrollo:

npm run dev



## Flujo de la Aplicación

- Login
- Ingreso de usuario y contraseña.
- Validación de credenciales en MockAPI.
- Token simulado guardado en localStorage si es correcto.
- Redirección a panel principal; sin token → acceso denegado.
- CRUD de Usuarios y Productos
- Listado en tablas responsivas.
- Crear/Editar mediante modales.
- Eliminar mediante modal de confirmación.
- Alertas para notificar éxito o error de operaciones.

## Conclusiones

- La aplicación demuestra el uso de SPA modernas con Vue.js, consumo de APIs, rutas protegidas y diseño responsivo con Bootstrap.
- Refuerza buenas prácticas de desarrollo, modularización, reutilización de componentes y control de versiones.
- Permite al usuario realizar operaciones CRUD de manera intuitiva y segura.
