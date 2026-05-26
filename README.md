# Sala de juegos

## Descripción

'Sala de juegos' es una aplicación web desarrollada como trabajo práctico para la materia Programación IV.

El proyecto consiste en una sala de juegos desarrollada con Angular, donde los usuarios pueden registrarse, iniciar sesión y acceder a distintos juegos. El juego personalizado está inspirado en la mecánica de la ruleta rusa, incorporando decisiones estratégicas, administración de riesgo y sistema de turnos.

## Juego personalizado

El juego personalizado, planea ser un spin-off inspirado en la ruleta rusa clásica.

El jugador se enfrenta a una inteligencia artificial utilizando un arma con balas reales y balas vacías distribuidas aleatoriamente. En cada turno podrá tomar decisiones estratégicas para intentar sobrevivir y derrotar a su oponente.

La propuesta busca combinar azar y estrategia mediante una mecánica simple e intuitiva.

## Tecnologías utilizadas

### Frontend

- Angular 21
- TypeScript
- NgBootstrap
- SCSS

### Backend y persistencia

- Supabase
  - Autenticación
  - Base de datos
  - Persistencia de usuarios

### Deploy

- Vercel

## Funcionalidades implementadas - Sprint 1

### Estructura inicial del proyecto

- Creación y configuración del proyecto Angular.
- Organización base de componentes principales y sus rutas.
- Configuración de estilos globales.

### Navegación

- Implementación de navegación libre entre componentes utilizando Angular Router.

### Componentes desarrollados

- Home / Bienvenida
- Login
- Registro
- Quién Soy

### Página "Quién Soy"

- Obtención de datos desde la API pública de GitHub.
- Visualización de:
  - Nombre de usuario
  - Imagen de perfil
  - Información del desarrollador
- Explicación del juego personalizado y sus reglas básicas.

### Diseño y experiencia de usuario

- Integración de NgBootstrap para componentes visuales.
- Diseño uniforme entre pantallas.
- Implementación de favicon personalizado.

### Deploy

- Publicación de la aplicación en Vercel.

## Funcionalidades implementadas - Sprint 3

### Funcionalidades implementadas
- Juego del ahorcado.
- Juego de mayor o menor.
- Chat general entre usuarios registrados.

## Instalación y ejecución local

### Clonar repositorio

```bash
git clone https://github.com/leanx22/TP_SALA-DE-JUEGOS_PROG_IV
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar entorno de desarrollo

```bash
ng serve
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

## Estado actual del proyecto

Actualmente el proyecto corresponde al Sprint 3 del trabajo práctico. Las próximas etapas incluirán:

- Implementación de aún más juegos.
- Rankings y estadísticas.

## Autor

Leandro Emanuel Guia
