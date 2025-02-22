# Proyecto Full Stack - Gestión de Tareas

## Descripción General

Este proyecto implementa una aplicación de gestión de tareas (Todo App) utilizando una arquitectura moderna full stack, organizada como un monorepo para facilitar el desarrollo y mantenimiento.

## Estructura del Proyecto

El proyecto está organizado como un monorepo con la siguiente estructura:

```
/
├── apps/
│   ├── frontend/    # Frontend en Angular
│   └── backend/     # Backend en Node.js
```

## Tecnologías Utilizadas

### Frontend

- Angular 19.1 como framework principal
- Angular Material para la interfaz de usuario
- RxJS para programación reactiva
- TypeScript para tipado estático

### Backend

- Node.js como runtime
- Express.js como framework web
- Firebase Admin SDK para persistencia de datos
- TypeScript para desarrollo tipado

## Decisiones de Diseño

### Arquitectura

- **Monorepo**: Gestionado con Turborepo para optimizar el desarrollo y la construcción
- **Clean Architecture**: Implementación de capas (presentación, aplicación, dominio, infraestructura)
- **Arquitectura por Capas**: Clara separación entre la lógica de negocio, acceso a datos y presentación

### Despliegue

- **Frontend**: Desplegado en Firebase Hosting
- **Backend**: Desplegado en Vercel por:
  - Facilidad de configuración y despliegue
  - Integración nativa con repositorios Git
  - Capa gratuita generosa
  - No requiere configuración de tarjeta de crédito (a diferencia de Cloud Functions)
  - Excelente rendimiento y escalabilidad automática

### Seguridad

- Implementación de autenticación basada en email
- Validación de datos en frontend y backend
- Interceptores HTTP para manejo de tokens
- CORS configurado para entornos específicos

## Características Principales

- Gestión completa de tareas (CRUD)
- Autenticación de usuarios
- Interfaz responsiva y moderna
- Persistencia de datos en Firebase
- Validaciones en tiempo real

## Configuración del Proyecto

### Requisitos Previos

- Node.js (v14 o superior)
- PNPM como gestor de paquetes
- Firebase CLI (para despliegue del frontend)

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# Iniciar en modo desarrollo
pnpm run dev
```

## Scripts Disponibles

```json
{
	"build": "turbo build",
	"dev": "turbo dev",
	"lint": "turbo lint",
	"check-types": "turbo check-types",
	"deploy:frontend": "firebase deploy --only hosting:frontend"
}
```
