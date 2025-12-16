# TadaU Power Schedule (Group A)

A React-based web application aimed at providing an easy-to-read electricity power schedule for residents in **TadaU (Group A)**. The app tracks the daily rotational power schedule and displays whether the electricity is currently ON or OFF, along with upcoming slots.

## 🌟 Key Features

*   **Real-time Status:** Instantly see if electricity is currently available and how much time is left until the next scheduled power cut or restoration.
*   **Rotational Schedule Logic:** Automatically calculates the schedule based on a 3-day rotation pattern (Day-1, Day-2, Day-3).
*   **Dual Themes:**
    *   **Star Wars Mode:** A futuristic, neon-styled interface with lightsaber effects and space aesthetics (Default).
    *   **Simple Mode:** A clean, minimal dark mode for straightforward information.
*   **Burmese Localization:** All times, numbers, and dates are formatted in Burmese for local convenience.
*   **Multiple Views:**
    *   **Forecast:** A 3-day lookahead to plan your activities.
    *   **List View:** A detailed list of schedule slots.

## 📅 Schedule Pattern

The system follows a predictable 3-day cycle:

*   **Day-1 (Cyan/Jedi):**
    *   12:00 AM - 04:00 AM
    *   12:00 PM - 04:00 PM
*   **Day-2 (Green/Yoda):**
    *   08:00 AM - 12:00 PM
    *   08:00 PM - 12:00 AM
*   **Day-3 (Red/Sith):**
    *   04:00 AM - 08:00 AM
    *   04:00 PM - 08:00 PM

## 🛠️ Tech Stack

*   **Framework:** [React](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AKPAING3147/Tadau-epc.git
    cd tadau-power-schedule-(group-a)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the local URL provided (usually `http://localhost:5173`).

## 👨‍💻 Credits

*   **Developed by:** AKP
*   **Data Source:** MESC-TadaU

---
*May the Force be with your power schedule.*
