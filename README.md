# Blockhouse Dashboard Project

This project is a web application featuring a dashboard with multiple charts, built using Next.js for the frontend and Django for the backend API.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Development Approach](#development-approach)

## Features

- Dashboard with multiple chart types:
  - Pie Chart
  - Bar Chart
  - Line Chart
  - Candlestick Chart
- Responsive design
- Data fetched from a Django backend API
- Docker setup for easy development and deployment

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Recharts (for chart rendering)
- Tailwind CSS (for styling)

### Backend
- Django
- Django REST Framework

### DevOps
- Docker
- Docker Compose

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/dashboard-project.git
   cd dashboard-project
   ```

2. Install Docker and Docker Compose if you haven't already.

3. Build the Docker images:
   ```
   docker-compose build
   ```

## Running the Application

1. Start the application using Docker Compose:
   ```
   docker-compose up
   ```

2. Access the frontend at `http://localhost:3000`
3. The backend API will be available at `http://localhost:8000`

## Project Structure

```
dashboard-project/
├── frontend/
│   ├── components/
│   │   ├── BarChart.tsx
│   │   ├── CandlestickChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── PieChart.tsx
│   │   └── Dashboard.tsx
│   ├── pages/
│   │   └── index.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── api/
│   │   ├── views.py
│   │   └── urls.py
│   ├── dashboard_project/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## Development Approach

1. **Frontend Development**:
   - Utilized Next.js for its server-side rendering capabilities and optimized performance.
   - Implemented reusable chart components using Recharts for data visualization.
   - Employed TypeScript for enhanced type safety and better developer experience.
   - Used Tailwind CSS for rapid UI development and consistent styling.

2. **Backend Development**:
   - Developed a Django backend to serve chart data via RESTful API endpoints.
   - Utilized Django REST Framework for easy API development.

3. **Data Flow**:
   - Implemented data fetching in the Dashboard component using React hooks.
   - Ensured type safety between backend responses and frontend component props.

4. **Containerization**:
   - Dockerized both frontend and backend for consistent development and deployment environments.
   - Used Docker Compose to orchestrate the multi-container application.

5. **Responsive Design**:
   - Ensured the dashboard layout is responsive and works well on various screen sizes.

6. **Code Quality**:
   - Maintained clean and readable code with proper comments and documentation.
   - Followed best practices for both Next.js and Django development.
