# 🏆 Tournament Pro

**Tournament Pro** is a modern, full-stack web application designed for grassroots football, amateur leagues, and fantasy sports enthusiasts. It acts as a digital control center for league administrators and a real-time tracking tool for referees on the pitch.

![Tournament Pro Banner](https://via.placeholder.com/1000x400.png?text=Tournament+Pro+-+The+Pitch+is+Ready)
*(Note: Replace this placeholder with a real screenshot of your dashboard later!)*

## ✨ Core Features

- **⚽ Advanced Tournament Management:** Create leagues, set start dates, and track active statuses.
- **🛡️ Team & Roster Hub:** Register teams seamlessly and manage squad limits.
- **🔐 Spectator Gateway (FPL-Style):** Generate unique 6-digit alphanumeric passcodes allowing fans and friends to join leagues securely as spectators.
- **📓 The Digital Referee Notebook:** A mobile-friendly interface for referees to log live match events (Goals, Yellow/Red Cards, Minutes) which automatically update the scoreboard.
- **🤖 Automated Fixture Generator:** Instantly generate round-robin schedules for all registered teams with a single click.

## 🛠️ Tech Stack

**Frontend (Client)**
- React.js (Vite)
- Tailwind CSS v4 (Modern CSS Engine)
- React Router DOM (Navigation & Auth Guards)
- Lucide React (Iconography)

**Backend (Server)**
- Node.js & Express.js
- PostgreSQL (Relational Database)
- JSON Web Tokens (JWT) & bcryptjs (Role-Based Authentication)
- RESTful API Architecture

## 🚀 Local Setup & Installation

Follow these steps to get the pitch ready on your local machine.

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/tournament-pro.git
cd tournament-pro
\`\`\`

### 2. Database Setup (PostgreSQL)
Ensure PostgreSQL is running on your machine. Create a new database named \`tournament_db\`.

### 3. Environment Variables
Create a \`.env\` file inside the \`/server\` directory and add the following:
\`\`\`env
PORT=5000
DATABASE_URL=postgres://your_db_user:your_db_password@localhost:5432/tournament_db
JWT_SECRET=your_super_secret_key_here
\`\`\`

### 4. Install Dependencies
You will need to install dependencies for both the client and the server.
\`\`\`bash
# Install Server dependencies
cd server
npm install

# Open a new terminal and install Client dependencies
cd client
npm install
\`\`\`

### 5. Start the Application
\`\`\`bash
# Start the Express Server (from /server)
npm run dev

# Start the React Vite App (from /client)
npm run dev
\`\`\`
The application will be running at \`http://localhost:5173\`.

## 🗺️ Roadmap
- [x] JWT Authentication & Role-Based Access
- [x] Tournament & Team Creation
- [x] Automated Match Generation
- [x] Spectator Passcode Gateway
- [ ] Live Match Event Logging (Referee Notebook) ⏳ *In Progress*
- [ ] Fantasy Football Scoring Engine
- [ ] Progressive Web App (PWA) Mobile Installability

## 📄 License
This project is proprietary. All rights reserved.