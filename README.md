# ZenFit 🧘‍♂️👟 - Diario de Entrenamiento Minimalista

ZenFit es una aplicación web diseñada para atletas que buscan simplicidad, estética y funcionalidad en el seguimiento de sus entrenamientos de gimnasio y running. Con un diseño basado en **flat colors**, tarjetas interactivas y una experiencia de usuario fluida, ZenFit te ayuda a visualizar tu progreso y mantener la motivación.

![Licencia](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-8E75C2?logo=google-gemini)

---

## ✨ Características Principales

### 📅 Calendario Inteligente
*   **Visualización Mensual:** Un vistazo rápido a tus días de actividad. Cada día muestra indicadores visuales (puntos de color) si has corrido (verde) o entrenado fuerza (azul).
*   **Gestión Diaria:** Haz clic en cualquier día para ampliarlo y gestionar múltiples actividades. Puedes añadir varias sesiones de running o gimnasio en una misma fecha.

### 🏃‍♂️ Running & HIIT Pro
*   **Ritmo Continuo:** Registra distancia, tiempo y descripción de tus rutas habituales.
*   **Modo Intervalos / HIIT:** Diseñado para series. Define el número de repeticiones y el valor (distancia o tiempo) por intervalo. ¡La app calcula automáticamente el volumen total de la sesión!

### 🏋️‍♂️ Registro de Gimnasio (Fuerza)
*   **Gestión por Ejercicios:** Añade ejercicios de forma dinámica.
*   **Series Detalladas:** Registra repeticiones y peso para cada serie individualmente.
*   **Historial Visual:** Interfaz limpia con etiquetas compactas para ver tus levantamientos de un vistazo.

### 📋 Gestión de Rutinas
*   Crea y guarda tus entrenamientos favoritos como "Rutinas".
*   Ahorra tiempo aplicando rutinas predefinidas directamente desde el calendario, evitando tener que escribir los mismos ejercicios o distancias cada vez.

### 📈 Análisis de Progreso
*   **Gráficos Interactivos:** Visualiza tendencias de distancia en running y volumen total (kg levantados) en el gimnasio.
*   **Filtros Temporales:** Analiza tus últimos 7, 30 o 90 días.

### 🤖 Asesor de IA (Gemini)
*   **Coach Personal:** Utiliza la potencia de la IA de Google Gemini para analizar tus últimas sesiones.
*   **Consejos Personalizados:** Recibe sugerencias motivadoras y técnicas basadas en tu consistencia y tipo de entrenamiento.

---

## 🚀 Tecnologías Utilizadas

*   **Frontend:** React 19 (Hooks, Context, Memoización).
*   **Estilos:** Tailwind CSS (Diseño Responsivo y Minimalista).
*   **Iconografía:** Lucide React.
*   **Gráficos:** Recharts.
*   **Inteligencia Artificial:** SDK de Google GenAI (@google/genai).
*   **Persistencia:** LocalStorage (Tus datos se quedan en tu navegador para máxima privacidad).

---

## 🛠️ Instalación y Configuración

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/zenfit.git
    cd zenfit
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura la API Key de Gemini:**
    La aplicación requiere una clave de API de Google AI Studio para las funciones de "Asesor AI". Asegúrate de tener configurada la variable de entorno:
    ```bash
    process.env.API_KEY = "TU_API_KEY_AQUI"
    ```

4.  **Ejecuta el proyecto:**
    ```bash
    npm run dev
    ```

---

## 🎨 Diseño y Estética

ZenFit sigue los principios del **Diseño Minimalista**:
*   **Flat Color Palette:** Uso de colores sólidos y suaves (Slate, Indigo, Emerald, Rose).
*   **Card-Based UI:** Organización clara mediante tarjetas con bordes suaves y sombras sutiles.
*   **Micro-interacciones:** Animaciones de entrada (fades, slides) para una sensación premium.
*   **Accesibilidad:** Tipografía legible (Plus Jakarta Sans) y contrastes adecuados.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo, modificarlo y contribuir.

---

Desarrollado con ❤️ para amantes del deporte y el buen diseño.