<div align="center">

# 🚗 MorrysApp

App móvil de transporte bajo demanda: elige destino en el mapa, compara servicios de auto o moto y solicita tu viaje.

![React Native](https://img.shields.io/badge/React_Native_0.76-61DAFB?style=flat-square&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo_52-000020?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=flat-square&logo=googlemaps&logoColor=white)
![License](https://img.shields.io/badge/licencia-MIT-green?style=flat-square)

</div>

## ✨ Funcionalidades

- **Mapa en tiempo real** con la ubicación del usuario (Expo Location + React Native Maps).
- **Búsqueda de destino** desde la pantalla principal.
- **Catálogo de servicios**: Auto Económico, Comfort, Premium y Moto Express, con precio y tiempo estimado.
- **Solicitud de viaje** desde un modal de confirmación.
- **Perfil de usuario** accesible desde el mapa.
- Navegación por pestañas con **Expo Router** y feedback háptico.

## 📁 Estructura

```
.
├── app/                  # Pantallas (Expo Router, rutas por archivo)
│   └── (tabs)/           # Pestañas principales
├── components/
│   ├── Map/              # Componente de mapa
│   ├── Modals/           # Solicitud de viaje, perfil
│   ├── Services/         # Tarjetas de servicio
│   └── ui/               # Componentes base (tab bar, íconos, botones)
├── constants/            # Paleta de colores
├── hooks/                # Tema y esquema de color
├── assets/               # Íconos, splash y fuentes
└── app.config.js         # Configuración de Expo
```

## 🚀 Instalación

**Requisitos:** Node.js 18+, la app **Expo Go** en tu teléfono o un emulador, y una API key de Google Maps.

```bash
git clone https://github.com/urieldomingezm/MorrysApp.git
cd MorrysApp
npm install
cp .env.example .env      # pega tu GOOGLE_MAPS_API_KEY
npm start
```

Escanea el código QR con Expo Go, o usa `npm run android` / `npm run ios`.

| Script | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo de Expo |
| `npm run android` / `ios` / `web` | Abre en la plataforma indicada |
| `npm test` | Pruebas con Jest |
| `npm run lint` | Linter de Expo |

## 🔐 Variables de entorno

| Variable | Descripción |
|---|---|
| `GOOGLE_MAPS_API_KEY` | Clave de Google Maps (Android/iOS). Se lee desde `app.config.js`. |

> Restringe la clave en Google Cloud a tu paquete de Android y bundle de iOS antes de publicar.

## 👤 Autor

**Angel Uriel Domínguez Medina** · [GitHub](https://github.com/urieldomingezm) · [Portafolio](https://cv-uriel-nine.vercel.app/)

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta [LICENSE](LICENSE).
