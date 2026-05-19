# TEMPLATE REPO – Apps Directory

This `apps/` directory contains the core applications that make up the template repo platform:

- **Desktop Application**: An Electron-based desktop client built with TypeScript and `electron-vite`
- **Backend API**: A FastAPI (Python) server that provides API endpoints for the platform
- **Web Frontend**: A React + TypeScript web application built with Vite

This README provides step-by-step instructions for setting up and running each application in your local development environment.

---

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js)
- **Python** (version 3.12)
- **Conda** (Anaconda or Miniconda)
- **Git**

---

## Desktop

The desktop application is built with Electron and TypeScript, providing a native desktop experience for the template project.

### Setup

1. **Create the Electron app**

   ```sh
   npm install electron-vite@latest desktop
   ```

   When prompted:
   - **Framework**: Vanilla
   - **Variant**: TypeScript

   > **Note**: Vanilla TypeScript is chosen intentionally. React can be added later if UI complexity demands it.

2. **Install dependencies**

   ```sh
   cd desktop
   npm install
   ```

3. **Run in development mode**

   ```sh
   npm run dev
   ```

   If successful, an Electron window should open, confirming the desktop development pipeline is working.

---

## Backend

The backend provides API endpoints that the desktop and web applications communicate with.

### Setup

1. **Create backend directory**

   From the project root:

   ```sh
   mkdir backend
   cd backend
   ```

2. **Create and activate Conda environment**

   ```sh
   conda create -n kairos-nexus python=3.12
   conda activate kairos-nexus
   ```

3. **Create `requirements.txt`**

   Create a `requirements.txt` file with the following content:

   ```txt
   fastapi
   uvicorn[standard]
   ```

   Then install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. **Create FastAPI application**

   ```sh
   mkdir app
   cd app
   ```

   Create `main.py` with the following contents:

   ```python
   from fastapi import FastAPI

   app = FastAPI(title="Your Product API")

   @app.get("/health")
   def health():
       return {"status": "ok"}

   @app.get("/")
   def root():
       return {"message": "Hello from FastAPI"}
   ```

5. **Run the backend server**

   From the **backend root directory** (the folder containing `app/`):

   ```sh
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Verify the backend**

   Open the following URLs in a browser:

   - http://localhost:8000
   - http://localhost:8000/health
   - http://localhost:8000/docs

   If these load successfully, the backend is running correctly.

### Understanding Uvicorn

FastAPI is a **framework for defining API routes**, but it does not run a web server by itself.

**Uvicorn** is the ASGI web server that:
- Opens a network port (e.g., `8000`)
- Listens for incoming HTTP requests
- Forwards requests to the FastAPI app
- Returns responses to the client

Request flow:

```
Client (Browser / Electron / Web)
        ↓
     Uvicorn   ← web server
        ↓
     FastAPI   ← API logic
```

FastAPI is always run **through** Uvicorn.

---

## Frontend

The web frontend is a React + TypeScript application built with Vite, providing a browser-based interface for your template project.

### Setup

1. **Create the web application**

   From the project root:

   ```sh
   npm create vite@latest web -- --template react-ts
   ```

   When prompted:
   - Select **No** to rolldown vite
   - Select **Yes** to install with npm
   - Select **Yes** to start now

2. **Install dependencies and run**

   ```sh
   cd web/
   npm install
   npm run dev
   ```

   The application will start in your browser at **localhost**.

3. **Clean up boilerplate**

   Remove the following boilerplate files and code:

   - `src/index.css` (delete file contents - clear file)
   - `src/App.css` (delete file)
   - `src/App.tsx` (delete file)
   - Delete any images in the `./public` directory
   - `index.html` (update the `<title>` tag)
   - `main.tsx` Replace the `<App/>` component with ***Hello, World!*** text and remove the import as needed

### Tailwind CSS Setup

1. **Install Tailwind CSS**

   Navigate into the `/web` folder and run:

   ```sh
   npm install -D tailwindcss@3.4.1 postcss autoprefixer
   npx tailwindcss init -p
   ```

   This will:
   - Install Tailwind CSS and its PostCSS dependencies
   - Generate `tailwind.config.js`
   - Generate `postcss.config.js`

2. **Configure Tailwind**

   Edit `tailwind.config.js` and update the content array:

   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

   Edit `src/index.css` and replace the contents with:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   Ensure `postcss.config.js` looks like this:

   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

3. **Run the development server**

   ```sh
   npm run dev
   ```

   This will start the app in your web browser's **localhost preview**.

---

## Summary

At this stage, you have:

- ✅ A working Electron desktop application
- ✅ A working FastAPI backend server
- ✅ A working React web frontend
- ✅ Verified local development workflows for all three applications

This provides a clean foundation for adding:

- Playwright browser automation
- Backend-driven control logic
- Stripe billing integration
- Postgres database persistence

---
