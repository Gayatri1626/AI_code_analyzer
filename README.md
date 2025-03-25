# Carbon Crunch: Code Quality Analyzer

## Overview
Carbon Crunch is a comprehensive tool for analyzing code quality in Python and JavaScript files, providing detailed insights and recommendations.

## Features
- Analyze .py, .js, and .jsx files
- Scoring across 6 key categories
- Actionable improvement recommendations
- Support for both Python and JavaScript

## Prerequisites
- Python 3.11
- Node.js 22.14
- pip
- npm

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Project Structure
```
carbon-crunch/
│
├── backend/
│   ├── main.py           # FastAPI application
│   ├── code_analyzer.py  # Code analysis logic
│   └── requirements.txt  # Python dependencies
│
└── frontend/
    ├── src/
    │   └── App.js        # React application
    └── package.json      # Frontend dependencies
```

## How to Use
1. Start backend server
2. Start frontend application
3. Upload a Python or JavaScript file
4. View detailed code quality analysis

## Supported Languages
- Python (.py)
- JavaScript (.js, .jsx)
