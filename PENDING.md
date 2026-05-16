# Tareas Pendientes - ETH Lima Hackathon 2026

Este documento detalla las funcionalidades y tareas pendientes para completar la plataforma de la hackathon.

## 🔐 Autenticación y Perfil
- [x] **Página de Login**: Implementar la interfaz de `/login` y conectarla con NextAuth (Credentials Provider).
- [x] **Página de Registro**: Finalizar la interfaz de `/register` y asegurar la conexión con la acción de servidor `registerHacker`.
- [x] **Perfil de Usuario**: Crear una vista para que los hackers puedan editar su `bio`, `skills`, `techStack` y links sociales (GitHub, LinkedIn).
- [ ] **Verificación de Email**: Configurar el flujo de verificación si es necesario.

## 👥 Equipos y Proyectos
- [ ] **Dashboard del Participante**: Crear una vista centralizada para el usuario autenticado.
- [ ] **Gestión de Equipos**: 
    - [ ] Lógica para crear un equipo (`Team`).
    - [ ] Sistema de invitación/unión a equipos existentes.
- [ ] **Envío de Proyectos**:
    - [ ] Formulario de entrega de proyecto (Nombre, Descripción, README, Demo URL, Repo URL).
    - [ ] Asociación de proyecto a un `Track` específico.

## 🛠️ Administración y Gestión
- [x] **Panel de Administrador**:
    - [x] Interfaz para aprobar/rechazar aplicaciones de hackers (`status` en el modelo `User`).
    - [x] Gestión de patrocinadores (`Sponsor`) y retos (`Track`) desde la base de datos (reemplazar `MOCK_DATA`).
- [ ] **Sistema de Votación (Judges)**:
    - [ ] Panel para jueces donde puedan ver proyectos asignados.
    - [ ] Formulario de evaluación con los criterios definidos (Innovación, UX/UI, Factibilidad, etc.).

## 📅 Mentorías
- [ ] **Agendamiento de Mentorías**: 
    - [ ] Interfaz para que los equipos soliciten ayuda.
    - [ ] Panel para mentores para ver y aceptar solicitudes.

## 🚀 Infraestructura y Despliegue
- [ ] **Base de Datos**: Asegurar que todas las migraciones de Prisma estén aplicadas en Supabase/PostgreSQL de producción.
- [ ] **Variables de Entorno**: Configurar `NEXTAUTH_SECRET`, `DATABASE_URL`, y proveedores de OAuth (si se agregan) en Vercel.
- [ ] **Optimización SEO**: Agregar meta-tags dinámicos para las páginas de tracks y proyectos.

## 🎨 UI/UX y Pulido
- [ ] **Estados de Carga**: Agregar skeletons y loaders en las transiciones de rutas protegidas.
- [ ] **Validaciones**: Mejorar la validación de formularios en el cliente (Zod + React Hook Form).
- [ ] **Notificaciones**: Implementar Toasts para feedback de acciones (registro exitoso, error de login, etc.).
