
Este proyecto es una aplicación web desarrollada en **Angular** para la gestión y visualización de recetas de cocina.

## Arquitectura de la Solución

La solución sigue una arquitectura basada en componentes, separando claramente la lógica de presentación, la gestión de datos y la navegación.

### Componentes Principales (`/src/app`)

La interfaz de usuario se construye a partir de componentes modulares:

- **Navbar (`/navbar`)**:

  - Componente de navegación superior.
  - Facilita el acceso rápido a las secciones principales (Inicio, Recetas, Contacto).

- **Módulo de Recetas (`/receta`)**:

  - **RecetaComponent**: Vista principal que lista las recetas disponibles. Implementa funcionalidades como búsqueda, filtrado por puntuación y ordenación.
  - **RecetaDetailComponent (`/receta/receta-detail`)**: Vista de detalle encargada de mostrar la información completa de una receta específica.

- **Formulario de Contacto (`/contact-form`)**:
  - Componente independiente para la interacción con el usuario (envío de mensajes).

### Capa de Datos y Modelos

- **Modelos (`/models`)**:

  - Define las interfaces TypeScript (ej. `Receta`) para garantizar el tipado fuerte y la coherencia de los datos en toda la aplicación.

- **Servicios (`/services`)**:
  - **RecetasService**: Centraliza la comunicación HTTP. Se encarga de conectar los componentes con el backend para recuperar o guardar información de recetas.

### Backend (Simulado)

- **JSON Server**:
  - Se utiliza `json-server` junto con el archivo `db.json` para simular una API REST completa.
  - Permite realizar operaciones CRUD (Create, Read, Update, Delete) sin necesidad de configurar una base de datos real durante el desarrollo.

---

## Guía de Inicio Rápido

### Prerrequisitos

- Node.js y npm instalados.
- Angular CLI (`npm install -g @angular/cli`).

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el Backend (API Mock)

Es necesario iniciar primero el servidor de datos simulado:

```bash
npm run start:api
```

_El servidor API escuchará en `http://localhost:3000`._

### 3. Iniciar la Aplicación (Frontend)

En una nueva terminal, inicia el servidor de desarrollo de Angular:

```bash
npm start
```

_La aplicación estará disponible en `http://localhost:4200`._
