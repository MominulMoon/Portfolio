# MD Moon - Personal Portfolio

A sleek, interactive, and fully responsive personal developer portfolio designed to showcase projects, skills, and professional services. Built with modern web technologies, this portfolio delivers a premium user experience through smooth gesture-based carousels, fluid animations, and a seamless direct messaging system powered by EmailJS.

## Live Demo

Check out the live project here: [https://moonportfolio2715.netlify.app/](https://moonportfolio2715.netlify.app/)

## Project Overview

This repository contains the source code for my personal developer portfolio website. It is designed to showcase my technical skills, educational background, professional services, and featured projects. The portfolio emphasizes a modern, clean, and highly responsive user experience created natively with React and enriched with smooth, interactive animations via Framer Motion.

## Technology Used in the Project

- **Core Technologies:** HTML5, CSS3, JavaScript (JS)
- **Frontend Architecture:** React (with Vite for fast compilation)
- **Interactions & Animations:** Framer Motion (for drag carousels and hover effects)
- **Styling:** Custom Vanilla CSS with robust responsive grid systems
- **Typography & Icons:** FontAwesome & modern web fonts
- **Messaging API:** EmailJS (for processing direct messages from the contact form)
- **Hosting:** Netlify

## Project Structure

```text
Portfolio/
├── public/                 # Static assets directly served by Vite
│   ├── CV.pdf              # Downloadable resume
│   ├── SVG.svg             # Application favicon
│   └── icons.svg           # Icon spritesheet
├── src/                    # Primary application source code
│   ├── assets/             # Images and design assets
│   ├── Components/         # Modular React components
│   │   ├── About.jsx       # Personal biography section
│   │   ├── Body.jsx        # Main layout wrapper
│   │   ├── Contact.jsx     # Contact links and direct messaging form
│   │   ├── Header.jsx      # Sticky navigation menu
│   │   ├── ProfileCard.jsx # Profile overview and social connectivity
│   │   ├── Projects.jsx    # Draggable Framer Motion project carousel
│   │   ├── Services.jsx    # Service offerings showcase
│   │   ├── Skill.jsx       # Technical skill badges
│   │   └── Stats.jsx       # Interactive experience statistics
│   ├── App.jsx             # Root application component
│   ├── index.css           # Global styling and design tokens
│   ├── main.jsx            # Application entry point
│   └── usePortfolioLogic.js # Custom hook for shared animation & state logic
├── index.html              # HTML shell template
├── package.json            # Deployment scripts and NPM dependencies
└── vite.config.js          # Vite environment configuration
```

## Manual Deployment

To run this project locally on your machine, follow these steps:

### Prerequisites:

You must have [Node.js](https://nodejs.org/) installed before running the project.

### Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MominulMoon/Portfolio.git
   ```
2. **Navigate into the target directory:**
   ```bash
   cd Portfolio
   ```
3. **Install the required dependencies:**
   ```bash
   npm i
   ```

### Running the Environment:

To start the local Vite development server, execute:

```bash
npm run dev
```

The application will spin up and become accessible locally, typically at `http://localhost:5173`.

## About the Developer

- **Name:** MD Moon
- **Degree:** B.Sc. in Computer Science & Engineering (CSE)
- **University:** Rajshahi University of Engineering & Technology (RUET)
- **Location:** Kazla, Rajshahi, Bangladesh
- **Interests & Learning Focus:** MERN Stack, Data Science, Machine Learning
