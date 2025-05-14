# 🧩 Clone Trello – Full Stack App

Este proyecto es un clon simplificado de Trello, desarrollado como parte de una prueba técnica. Contiene:

- 🔙 Backend en Node.js + Express + MySQL
- 🔐 Autenticación con JWT
- 🧩 CRUD completo de tareas (cards)
- 📁 Frontend en Angular
- 🔗 Comunicación real entre frontend y backend
- ✅ Redirección al dashboard tras login exitoso

---

## ✅ Estado del Proyecto

- [x] Backend funcional completo: autenticación, boards, listas y tareas
- [x] Base de datos operativa y enlazada con mysql2/promise
- [x] API verificada con Postman
- [x] Frontend en Angular creado y ejecutándose
- [x] Template UI base incorporado
- [x] Conexión del frontend al backend (completa)
- [x] Flujo completo de login desde Angular con JWT
- [x] Visualización dinámica de datos reales (pendiente)

---

<h2>📂 Estructura del Repositorio</h2>
<pre style="background:#f6f8fa; padding: 1em; border-radius: 5px; overflow-x: auto; font-family: monospace;">
clone-trello/
├── backend/               # Proyecto Express + MySQL + JWT (API REST)
├── frontend/              # Proyecto Angular 15+ (interfaz de usuario)
├── README.md              # Documentación del proyecto
├── trellodb_boards.sql    # Script SQL: tabla de tableros
├── trellodb_cards.sql     # Script SQL: tabla de tarjetas
├── trellodb_lists.sql     # Script SQL: tabla de listas
├── trellodb_tasks.sql     # Script SQL: tabla de tareas
└── trellodb_users.sql     # Script SQL: tabla de usuarios
</pre>


---

## ⚙️ Requisitos

- Node.js 18+
- Angular CLI
- MySQL Server 5.7+ o 8
- Git

---

## 🚀 Cómo ejecutar localmente

### Backend

```bash
cd backend
npm install
npm start
Variables requeridas en .env:

env
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=nombre_bd
JWT_SECRET=clave_secreta
Frontend
bash
Copiar
Editar
cd frontend
npm install
ng serve
Abrir navegador en: http://localhost:4200

📌 Nota adicional

El backend está completamente funcional. Se ha realizado la conexión exitosa del frontend usando Angular, incluyendo login con validación JWT, y redirección automática a /app/boards al iniciar sesión correctamente.

👨‍💻 Desarrollado por
Daniel Montoya
daniel.fundisa@gmail.com
GitHub: https://github.com/sociedaddidactica
