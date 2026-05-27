# Historial de Cambios y Revisiones (REVISIONS.md)

Este documento registra los cambios implementados en la plataforma web de ETH Lima 2026 para revisiones y seguimiento continuo del proyecto.

---

## 📅 [2026-05-26] Sistema de Internacionalización (i18n) y Temas

Se ha implementado un sistema premium de multi-idiomas y selector de temas que cubre la totalidad de la experiencia del usuario (Index, Login, Register) de manera dinámica y sin recargas de página.

### 1. Convenciones y Arquitectura Next.js 16
* **Migración a Proxy**: Se implementó [src/proxy.ts](file:///home/javier/Documentos/GitHub/hackethl26/src/proxy.ts) exportando la función `proxy` en cumplimiento con la depreciación de `middleware.ts` en Next.js 16.
* **Manejo de Prefijos de Idioma**: Soporte completo para rutas SEO-friendly (`/en`, `/es`, `/pt`). El proxy reescribe internamente la petición (ej. `/es/login` a `/login?lang=es`) manteniendo limpia la URL del cliente.
* **Hreflang y Canonical**: Configurados en [layout.tsx](file:///home/javier/Documentos/GitHub/hackethl26/src/app/layout.tsx) para optimización SEO en los tres idiomas.

### 2. Diccionarios de Traducción (`src/locales/`)
* **Inglés (`en.json`)**: Configuración base de textos, banners, tracks, cronograma y validaciones de formularios.
* **Español (`es.json`)**: Traducción y adaptación cultural completa.
* **Português (`pt.json`)**: Traducción profesional completa.

### 3. Contexto SPA & Auto-detección
* **LanguageProvider**: Archivo [language-provider.tsx](file:///home/javier/Documentos/GitHub/hackethl26/src/components/providers/language-provider.tsx) encargado de:
  - Detectar el idioma del navegador automáticamente en la primera visita.
  - Almacenar la selección en cookies y `localStorage`.
  - Servir las traducciones dinámicas (`t`) y arreglos de cronograma/timeline (`tArray`).
  - Cambiar de ruta mediante SPA (`router.push`) sin forzar recarga completa del navegador.

### 4. Componentes UI Premium
* **LanguageSwitcher**: [language-switcher.tsx](file:///home/javier/Documentos/GitHub/hackethl26/src/components/ui/language-switcher.tsx). Selector de idiomas glassmorphic elegante con banderas, etiquetas cortas y transiciones suaves mediante **Framer Motion**.
* **ThemeToggle**: [theme-toggle.tsx](file:///home/javier/Documentos/GitHub/hackethl26/src/components/ui/theme-toggle.tsx). Botón con animaciones de rotación y desvanecimiento para cambiar entre modos Claro y Oscuro mediante `next-themes`.

### 5. Páginas Actualizadas y Dinamizadas
* **Landing Page (`page.tsx`)**: Traducción de banner de bootcamp, navegación, hero, terminal simulada, sección de información, tracks patrocinados, cronograma interactivo y footer.
* **Login (`login/page.tsx`)**: Formulario completamente traducido. Adaptación visual completa para modo claro y oscuro respetando la identidad premium de la marca.
* **Registro (`register/page.tsx`)**: Formulario estructurado, traducción de habilidades, tracks del formulario, y traducción de mensajes de validación Zod en tiempo de ejecución. Soporte de temas Claro y Oscuro integrado.

---

## 🎯 Estado de Verificación y Compilación
* **TypeScript Compiler (`tsc --noEmit`)**: Compila con `0` errores de tipos.
* **Next.js Builder (`npm run build`)**: Compilación exitosa en producción utilizando Turbopack, sin advertencias de deprecación.
