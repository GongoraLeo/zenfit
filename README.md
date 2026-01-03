
# ZenFit 🧘‍♂️👟 - Diario de Entrenamiento Minimalista

ZenFit es una aplicación web diseñada para atletas que buscan simplicidad, estética y funcionalidad en el seguimiento de sus entrenamientos de gimnasio y running. Utiliza **React 19** y **Google Gemini AI** para ofrecer una experiencia moderna y asesoría personalizada.

---

## 🚀 Cómo lanzar el proyecto (Paso a paso)

Para evitar el "pantallazo en blanco", sigue estas instrucciones exactas:

### 1. Requisitos previos
*   Tener instalado **Node.js** (versión 18 o superior).
*   Una clave de API de **Google AI Studio** (consíguela gratis en [ai.google.dev](https://ai.google.dev/)).

### 2. Instalación
Clona el repositorio y entra en la carpeta:
```bash
git clone https://github.com/tu-usuario/zenfit.git
cd zenfit
```

Instala las dependencias necesarias:
```bash
npm install
```

### 3. Configuración de la API Key
Para que el "Asesor AI" funcione, debes exponer tu clave de API. 
**Opción A (Recomendada para desarrollo local):** Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_GEMINI_API_KEY=tu_clave_aqui
```
*(Nota: El código de la app debe usar `import.meta.env.VITE_GEMINI_API_KEY` o el entorno configurado).*

### 4. Ejecución
Inicia el servidor de desarrollo:
```bash
npm run dev
```
La aplicación se abrirá en `http://localhost:3000`.

---

## ✨ Características Principales
*   **Calendario Inteligente:** Visualiza tus entrenamientos por colores (Verde: Running, Azul: Gimnasio).
*   **Running & HIIT:** Modo de intervalos con cálculos automáticos de volumen.
*   **Gimnasio Pro:** Registro detallado de series, repeticiones y pesos.
*   **Análisis de Progreso:** Gráficos interactivos de volumen de carga y distancias.
*   **IA Coach:** Consejos motivadores generados por Gemini basados en tus datos.

---

## 🛠️ Tecnologías
*   **React 19:** Última versión con mejoras en rendimiento.
*   **Vite:** Herramienta de construcción ultra rápida.
*   **Tailwind CSS:** Estilos modernos y minimalistas.
*   **Recharts:** Visualización de datos elegante.

---

## 📄 Notas de Desarrollo
Si decides desplegar esto en un hosting estático (Vercel, Netlify), asegúrate de configurar la variable de entorno `API_KEY` en el panel de control del hosting.

---
Desarrollado con ❤️ para la comunidad fitness.
