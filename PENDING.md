# Tareas Pendientes - ETH Lima Hackathon 2026

Este documento detalla las funcionalidades y tareas pendientes para completar la plataforma de la hackathon.

## 🔐 Autenticación y Perfil
- [x] **Página de Login**: Implementar la interfaz de `/login` y conectarla con NextAuth (Credentials Provider).
- [x] **Página de Registro**: Finalizar la interfaz de `/register` y asegurar la conexión con la acción de servidor `registerHacker`.
- [x] **Perfil de Usuario**: Crear una vista para que los hackers puedan editar su `bio`, `skills`, `techStack` y links sociales (GitHub, LinkedIn).
- [ ] **Verificación de Email**: Configurar el flujo de verificación si es necesario.

## 👥 Equipos y Proyectos
- [x] **Dashboard del Participante**: Crear una vista centralizada para el usuario autenticado.
- [x] **Gestión de Equipos**: 
    - [x] Lógica para crear un equipo (`Team`).
    - [x] Sistema de invitación/unión a equipos existentes (Invite Codes).
- [x] **Envío de Proyectos**:
    - [x] Formulario de entrega de proyecto (Nombre, Descripción, README, Demo URL, Repo URL).
    - [x] Asociación de proyecto a un `Track` específico.

## 🛠️ Administración y Gestión
- [x] **Panel de Administrador**:
    - [x] Interfaz para aprobar/rechazar aplicaciones de hackers (`status` en el modelo `User`).
    - [x] Gestión de patrocinadores (`Sponsor`) y retos (`Track`) desde la base de datos (reemplazar `MOCK_DATA`).
- [x] **Sistema de Votación (Judges)**:
    - [x] Panel para jueces donde puedan ver proyectos asignados.
    - [x] Formulario de evaluación con los criterios definidos (Innovación, UX/UI, Factibilidad, etc.).
- [x] **Agendamiento de Mentorías**:
    - [x] Interfaz para que los equipos soliciten ayuda.
    - [x] Lógica de asignación de mentores.

## 🚀 Infraestructura y Despliegue
- [ ] **Base de Datos**: Asegurar que todas las migraciones de Prisma estén aplicadas en Supabase/PostgreSQL de producción.
- [ ] **Variables de Envío**: Configurar `NEXTAUTH_SECRET`, `DATABASE_URL`, y proveedores de OAuth (si se agregan) en Vercel.
- [x] **Optimización SEO**: Agregar meta-tags dinámicos para las páginas de tracks y proyectos.

## 🎨 UI/UX y Pulido
- [x] **Estados de Carga**: Agregar skeletons y loaders en las transiciones de rutas protegidas.
- [x] **Validaciones**: Mejorar la validación de formularios en el cliente (Zod + React Hook Form).
- [x] **Notificaciones**: Implementar Toasts para feedback de acciones (registro exitoso, error de login, etc.).
