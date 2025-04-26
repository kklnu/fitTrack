
# FitTrack 🏋️‍♀️

FitTrack is a fitness tracking web app that lets users:
- Sign up and log in
- Add workouts
- Set fitness goals
- Track weight progress

---

## 🌟 What It Can Do

- Create an account and log in securely
- Add, edit, and delete workouts
- Set goals with target dates and mark them complete
- Log your weight and notes over time
- Dashboard shows your weekly summary
- Works well on phones and laptops
- Styled with banners and fitness icons

---

## 🛠 Tech Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, Handlebars
- **Database**: MySQL with Sequelize
- **Login System**: express-session and bcrypt
- **Deployed with**: Render
- **Code hosted on**: GitHub

---

## 🔐 Environment Variables (.env)

Keep your private info safe. In your `.env` file:

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
SESSION_SECRET=your_session_secret
```

✅ This file should NOT be uploaded to GitHub!

---

## 📁 Main Files

- `server.js` → runs the app
- `models/` → database models (User, Workout, etc.)
- `controllers/` → route logic
- `views/` → page templates (Handlebars)
- `public/` → CSS, images, and JS

---

## ▶️ How to Use It

1. Install everything:

```
npm install
```

2. Set up `.env` with your DB info.

3. Start the server:

```
node server.js
```

4. Open browser at: `http://localhost:3001`

---





## 👩‍💻 Made by

**Kiranpreet ** – Final Project for Full-Stack Web Development

- **Back-end**: Node.js, Express.js, Sequelize, MySQL
- **Front-end**: HTML, CSS, JavaScript, Handlebars.js
- **Authentication**: express-session, bcrypt
- **ORM**: Sequelize
- **Hosting**: Render (deployment)

---

## 📁 Folder Structure (MVC)

