# 🎙️ Chat & Voice Bot Frontend  

A modern, interactive frontend for a **real-time Chat and Voice Bot**, built with **Next.js**, **TailwindCSS**, **Framer Motion**, **AudioContext**, and **WebSocket** for seamless voice and text communication.  

---

## ✨ Features  
- 🖌 **Next.js + TailwindCSS** – Fast, responsive, and beautifully styled UI.  
- 🎬 **Framer Motion** – Smooth and modern animations.  
- 🎤 **Voice Support** –  
  - Record audio using the **Web Audio API (AudioContext)**.  
  - Playback bot responses with text-to-speech.  
- 🔗 **WebSocket Connection** – Persistent, real-time chat and voice communication.  
- 📱 **Responsive Design** – Optimized for desktop and mobile devices.  

---

## 🛠️ Tech Stack  
| Technology     | Purpose                            |  
|----------------|-----------------------------------|  
| **Next.js**    | React framework for SSR/SPA         |  
| **TailwindCSS**| Utility-first styling               |  
| **Framer Motion**| Animations and transitions        |  
| **AudioContext**| Voice recording and playback       |  
| **WebSocket**  | Continuous, real-time communication |  

---

## 🚀 Getting Started  

### 1️⃣ Prerequisites  
- **Node.js** (v18 or later recommended)  
- **npm** or **yarn** package manager  

### 2️⃣ Installation  
```bash
# Clone the repository
git clone https://github.com/your-username/chat-voice-bot-frontend.git

# Navigate to the project folder
cd chat-voice-bot-frontend

# Install dependencies
npm install
# or
yarn install
```

### 3️⃣ Environment Variables  
Create a `.env.local` file in the root directory and add:  
```env
NEXT_PUBLIC_WS_URL=ws://your-backend-server-url
```

### 4️⃣ Run the Development Server  
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

---

## 🧭 Usage  
1. Start your backend WebSocket server.  
2. Launch the frontend (`npm run dev`).  
3. Click the **microphone button** to start recording your voice.  
4. Speak your query → The bot processes and responds with both **text** and **voice**.  
5. Enjoy smooth animations and real-time chat updates.  

---

## 📸 Preview  

<img width="1470" height="956" alt="Screenshot 2025-09-19 at 11 14 18 PM" src="https://github.com/user-attachments/assets/cea238e5-314c-40f0-8089-7cab6d65e0b8" />

---

## 🧑‍💻 Development Notes  
- Uses **AudioContext** for audio recording and playback.  
- Uses **Framer Motion** for animations like fade-ins, slides, and button transitions.  
- Designed with **TailwindCSS** for fast styling and easy customization.  
- WebSocket reconnect logic can be added for more robust connections.  

---

## 📜 License  
This project is licensed under the **MIT License** – feel free to use and modify it.  
