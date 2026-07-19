# FIFA World Cup 2026™ GenAI Stadium Operations Simulator 🏟️⚽

A state-of-the-art, interactive Single Page Application (SPA) dashboard simulating Generative AI-powered Stadium Operations at MetLife Stadium (East Rutherford, NJ) for the FIFA World Cup 2026™. The simulator integrates real-time WebGL graphics, telemetry metrics, simultaneous multilingual translation services, operational warnings, and an automated diagnostics testing suite.

## 🔗 Live Demo
Experience the simulator live on GitHub Pages:
👉 **[Live Stadium Operations Simulator](https://rushikiran7.github.io/fifa-stadium-simulator/)**

---

## 🌟 Key Features

### 1. 3D WebGL Stadium Viewport (Three.js)
* Dynamic rendering of MetLife Stadium, surrounding environments (grid layouts, parking areas, foliage), and spectator stands.
* Real-time **specular crowd particle physics** showing live flow corridors through gates.
* Interactive retractable glass roof structure that closes/opens dynamically based on active weather events.
* Full 3D camera controls including Orbit Auto-Rotation, Top-Down Plan view, and Reset Camera actions.

### 2. Scenario Simulation Selector
Host operators can simulate different stadium environmental conditions and watch the GenAI platform re-route flows and adapt dashboard systems:
* **Normal Match Day**: Clear skies, standard operations, and typical telemetry.
* **Emergency Evacuation**: Flashes warning red strobe lights, updates the jumbotron to "EXIT NOW", sets emergency alarms, and forces crowd flows to disperse outwards through exits.
* **Severe Thunderstorm**: Slides the virtual stadium roof shut, darkens the environment, and adjusts sustainability metrics (lowering solar energy, boosting water collection efficiency to 94%).
* **Post-Match Rush**: Elevates crowd density to maximum capacity and flags East Rail Gate B exit bottlenecks.

### 3. Integrated GenAI Self-Test & Diagnostics HUD
Includes a built-in automated browser unit testing runner to audit core systems:
* **XSS Sanitization Guard**: Validates that scripting tags are securely escaped.
* **Translation Coverage**: Verifies key mapping across English, Spanish, French, and Classical Nahuatl (LOC).
* **Boundary Clamping**: Checks safety limits on numerical ranges (0-100%).
* **3D Node Mapping**: Confirms wayfinding landmarks translate to valid 3D vector coordinates.
* **State Transitions & WebGL Check**: Verifies scenario switches and active canvas renderers.

### 4. Simultaneous Multilingual Translation & AI Assistant
* Input announcements or commands in the console (e.g., "Check Gate B flow", "Restock concession water", "Emergency evacuation").
* The GenAI translation engine outputs simultaneous broadcasts in **English (EN)**, **Spanish (ES)**, **French (FR)**, and **Nahuatl (LOC)**.
* Dynamic voice assistant mic animations sync automatically.

### 5. Web Accessibility (a11y) & Performance Tuning
* **Zero 60 FPS DOM Thrashing**: Relocated camera coordinate DOM updates to OrbitControls `change` events rather than drawing them inside the `requestAnimationFrame` loop when the camera is static.
* **WebGL Garbage Collection**: Active route paths and locator pins are cleanly disposed from memory using geometry, material, and texture `.dispose()` calls.
* **A11y Standards**: Focus states, Tab navigation, `aria-pressed`, `aria-label`, and `role` tags are fully integrated for screen readers and keyboard accessibility.

---

## 🛠️ Technical Stack
* **Graphics Engine**: [Three.js](https://threejs.org/) (WebGL)
* **Styling**: Vanilla CSS3 Custom Properties (Futuristic Neon & Glassmorphism design system)
* **Structure & Scripts**: Vanilla HTML5, DOM APIs, and JavaScript ES6+
* **Deployment**: GitHub Pages (Static Hosting)

---

## 💻 Local Setup & Development
Since the project uses absolute local paths and requires standard script loading, host it on a local server to avoid browser `file://` warnings:

1. Clone this repository:
   ```bash
   git clone https://github.com/Rushikiran7/fifa-stadium-simulator.git
   cd fifa-stadium-simulator
   ```

2. Run a simple local web server:
   ```bash
   # Using Python
   python -m http.server 8080

   # Or using Node.js
   npx http-server -p 8080
   ```

3. Open your browser and navigate to `http://localhost:8080`.
