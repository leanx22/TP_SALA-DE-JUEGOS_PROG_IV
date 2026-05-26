# Sala de juegos

## Descripción

'Sala de juegos' es una aplicación web desarrollada como trabajo práctico para la materia Programación IV.

El proyecto consiste en una web app contenedora de mini-juegos desarrollada con Angular, donde los usuarios pueden registrarse, iniciar sesión, chatear y acceder a sus estadísticas personales respecto a sus partidas recientes.

## Juego personalizado

El juego personalizado, llamado 7Dice, es un mini-juego de estilo casino donde el azar y toma de decisiones del jugador determinarán si gana o lo pierde todo.
Cada nueva ronda el usuario tendrá 2 decisiones.
- Tirar los dados
- Plantarse

Al tirar los dados se realiza la suma de cada uno y el resultado es sumado al pozo del jugador. Sin embargo, si la suma de cada dado
da como resultado exactamente el número 7 la partida finalizará y el jugador perderá todo el pozo acumulado.
Si este decide plantarse el juego termina y se le "recompensa" con los puntos acumulados.

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

- Vercel.


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

Actualmente el proyecto corresponde al Sprint 4 del trabajo práctico. Ya no hay más requisitos a implementar.

### En este sprint se agregó
- Implementación de juego personalizado y trivia.
- Rankings y estadísticas.

## Autor

Leandro Emanuel Guia
