# Michi
![alt text](image.png)

## 📄 Descripción
Este proyecto es una aplicación Angular generada con Angular CLI. Está diseñada para facilitar el desarrollo de aplicaciones web, proporcionando una estructura modular y escalable.

## ✨ Características
- **Servidor de Desarrollo**: Permite ejecutar la aplicación localmente con `ng serve`.
- **Code Scaffolding**: Creación de componentes, directivas y servicios con Angular CLI.
- **Construcción**: Generación de artefactos optimizados para producción.

## 💻 Tecnologías Utilizadas
- Angular
- TypeScript
- HTML5
- SCSS

## 📋 Requisitos
- Node.js y npm instalados.
- Angular CLI instalado globalmente.

## 🛠️ Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/bertapasamontes/Michi.git

2. Instala las dependencias:
```bash
cd .\Michi\
npm install
```

3. Configuración del entorno 🌍
Antes de ejecutar el proyecto, crea el archivo `backend/env.ts` y copia el contenido de `environment.example.ts`, luego agrega tus valores reales.

Ejemplo:
```typescript
export const environment = {
    MONGODB_URL: "mongodb+srv://user:user123@cluster0.ve2kx.mongodb.net/DatabaseMichi?retryWrites=true&w=majority&appName=Cluster0",
    PORT: "3000",
    MAPBOX_URL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    mapBoxToken: "pk.eyJ1IjoiZG9udXRjb25jaG9jbyIsImEiOiJjbTdqMjBnczgwMXlsMm1zYXdjbDJ3djRyIn0.5G7xlZGXidKSDfcMLAhFUQ"
};
```

3. Inicializa el proyecto:
1r terminal:
```powershell
cd .\backend\dist\backend\models\
tsc --watch
```

2o terminal:
```powershell
cd .\backend\dist\backend\
nodemon index.js
```

3r terminal:
```powershell
ng serve -o
```

## 🤝 Contribuciones
¡Contribuciones, sugerencias y mejoras son bienvenidas!

