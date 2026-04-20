 Iris Classifier: ML Workflow Explorer

An interactive, high-density machine learning pipeline Explorer designed to demonstrate the core lifecycle of a classification model using the classic Iris dataset.

## 🚀 Overview

This application serves as a beginner-friendly laboratory for understanding how machine learning models work. It guides users through three critical stages of the ML workflow:
1. **Data Selection**: Exploring the raw multivariate dataset.
2. **Distribution Analysis**: Visualizing feature relationships to find discriminative patterns.
3. **Model Inference**: Interacting with a live k-Nearest Neighbors (k-NN) classifier.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Machine Learning**: [ml-knn](https://github.com/mljs/knn) (k-Nearest Neighbors implementation in TypeScript)
- **Visualizations**: [Recharts](https://recharts.org/) (Feature distribution scatter plots)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (High-Density Professional Theme)
- **Animations**: [Motion](https://motion.dev/) (Smooth state transitions)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🎨 Design System: "High Density"

The UI follows a professional "Mission Control" aesthetic:
- **Palette**: Industrial neutrals (`#f0f1f3`, `#000000`, slate-gray).
- **Typography**: Precision-focused font pairings (Inter for UI, JetBrains Mono for data, Cormorant Garamond for accents).
- **HUD Elements**: Real-time system monitoring rails, including CPU and Memory load simulation.
- **Brutalist Accents**: Heavy 2px borders and sharp 4px offset shadows.

## ⚙️ How to Run Locally

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🧠 ML Logic (k-NN)

The app uses the **k-Nearest Neighbors** algorithm (k=3). It classifies new input samples by calculating the Euclidean distance to the nearest labeled specimens in the 4-dimensional feature space (Sepal L/W, Petal L/W).

- **Species Support**: *Iris setosa*, *Iris versicolor*, *Iris virginica*.
- **Features**: 4 continuous numerical dimensions.

## 📄 License

SPDX-License-Identifier: Apache-2.0
