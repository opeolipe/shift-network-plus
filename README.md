# SHIFT: Network+ N10-009 Master 🚀

**Shift** is a high-performance, mobile-first study application engineered for the CompTIA Network+ (N10-009) certification. It is designed to bridge the gap between passive reading and active retrieval through psychological study hacks, real-time terminal simulations, and adaptive drilling.

---

## 📖 The "Shift" Philosophy
Most exam prep apps focus on rote memorization. **Shift** focuses on **Exam Instinct**. 
By implementing features like "CompTIA Vision," the app trains users to identify the core question within the "wall of fluff" typical of CompTIA exams. It doesn't just teach you the content; it teaches you how to *take the test*.

---

## 🛠️ Key Features

### 1. Smart Review (Adaptive SRS)
An intelligent learning engine that tracks your performance across the 5 CompTIA domains. If the app detects a weakness (e.g., in Network Security), it triggers **Quarantine Mode**, forcing a hyper-focused drill session on that specific domain until mastery is achieved.

### 2. CompTIA Vision (Anti-Fluff Feature)
A specialized UI toggle that applies a 5px blur to questions longer than 100 characters, leaving only the final sentence (the actual question) clear. This trains the "Reverse Reading" technique—reading the question and answers before the fluff.

### 3. Syslog Analysis & Terminal PBQs
Hands-on Performance-Based Question (PBQ) simulations. Users must analyze raw Cisco/Linux log outputs and identify the specific line causing a failure (e.g., `err-disable`, `shared secret mismatch`, or `Null0` routing loops).

### 4. Audio Commute Mode
A hands-free, high-intensity audio loop using the `SpeechSynthesis API`. The app reads a question, pauses for 5 seconds for the user to answer mentally, and then reads the correct answer—perfect for studying while driving or walking.

### 5. Braindump Canvas
A 5-minute high-pressure drill where users must type out their entire CIDR/Subnetting chart and OSI model from memory into a blank digital whiteboard, mirroring the official testing center environment.

### 6. The Strategy Vault
Integrated exam-day tips from the "CLO's Rulebook," covering the "45-Second Law," "The PBQ Pivot," and "The 24-Hour Taper."

---

## 🚀 Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Precision typography & Swiss-modern aesthetics)
- **Animation**: Framer Motion (Liquid transitions & state feedback)
- **API**: Web Speech API (speechSynthesis)
- **Design**: Mobile-First, Industrial/Technical UI

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/shift-network-plus.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure
- `src/App.tsx`: Main application logic, state management, and view routing.
- `src/data.ts`: The comprehensive N10-009 question bank, including Syslog PBQs and domain metadata.
- `src/types.ts`: Type definitions for the exam engine.
- `src/constants.ts`: Global styling and UI constants.

---

## 🚀 Deployment Guide (Free)

For a professional portfolio look, I recommend deploying this app using one of these free services:

### Option 1: Vercel (Easiest & Recommended)
1. Push your code to a **GitHub repository**.
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
3. Click **"Add New"** > **"Project"**.
4. Import your `shift-network-plus` repository.
5. Vercel will automatically detect **Vite**. Click **"Deploy"**.
6. Your app will be live at `your-project-name.vercel.app`.

### Option 2: Netlify
1. Sign up at [netlify.com](https://netlify.com).
2. Drag and drop your `dist/` folder (after running `npm run build`) onto the Netlify dashboard.
3. Or connect your GitHub repo for automatic deployments.

### Option 3: GitHub Pages (Recommended for this setup)
I have added a specialized GitHub Action workflow to your project to automate this.

1. **Check Config**: I have updated your `vite.config.ts` with `base: '/shift-network-plus/'`.
2. **Push Code**: Push the new `.github/workflows/deploy.yml` file to your GitHub repository.
3. **Configure GitHub Settings**:
   - Go to your repository on GitHub.
   - Click **Settings** (top tab).
   - Click **Pages** (on the left sidebar).
   - Under **Build and deployment > Source**, change the dropdown from "Deploy from a branch" to **"GitHub Actions"**.
4. **Trigger Deployment**:
   - Go to the **Actions** tab in your GitHub repo.
   - You should see a workflow named "Deploy static content to Pages".
   - If it didn't start automatically, click on it and select **Run workflow**.

**Why was it blank?** 
Vite projects generate relative paths. Without the `base` configuration and a proper build step (GitHub Actions), the browser looks for your styles and scripts at the root domain (`carolineratuolivia.com/`) instead of inside your subfolder (`/shift-network-plus/`).

---

## 🧘 Credits
Developed with a focus on educational psychology and high-stakes exam performance.
