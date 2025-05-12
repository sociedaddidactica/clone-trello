# 🧩 Clone Trello – Full Stack App

Este proyecto es un clon simplificado de Trello, desarrollado como parte de una prueba técnica. Contiene:

- 🔙 Backend en Node.js + Express + MySQL
- 🔐 Autenticación con JWT
- 🧩 CRUD completo de tareas (cards)
- 📁 Frontend en Angular (en progreso)
- 🧪 Comunicación real entre frontend y backend

---

## ✅ Estado del Proyecto

- [x] Backend funcional completo: autenticación, boards, listas y tareas
- [x] Base de datos operativa y enlazada con mysql2/promise
- [x] API verificada con Postman
- [x] Frontend en Angular creado y ejecutándose
- [x] Template UI base incorporado
- [ ] Conexión del frontend al backend (en curso)
- [ ] Flujo completo de login desde Angular
- [ ] Visualización dinámica de datos reales

---

## 📂 Estructura del Repositorio

clon-trello/
├── backend/ # Proyecto Express + MySQL + JWT
├── frontend/ # Proyecto Angular 15+
└── README.md # Este archivo

yaml
Copiar
Editar

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

ini
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
🛠 Durante el desarrollo se presentó un percance técnico con el equipo local, lo cual afectó los tiempos para completar la integración del frontend. Sin embargo, el backend está completamente operativo y listo para conectarse a Angular. La interfaz será completada a la brevedad.

👨‍💻 Desarrollado por
Daniel Montoya
daniel.fundisa@gmail.com
GitHub: https://github.com/sociedaddidactica
