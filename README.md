# Code Quality Analyzer

## Overview
This is a comprehensive tool for analyzing code quality in Python and JavaScript files, providing detailed insights and recommendations.

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

## Techstack
- Frotend - React(for file uploadand results)
- backend - fastapi
- JS - regex based checks
- github - .yml file(to set workflow)

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate ( optional )
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
    ├──public/
       └── index.html
    ├── src/
    │   └── App.js        # React application
        └── App.css
        └── Codeanalyzer.js
        └── index.css
        └── index.js
    └── package.json    # Frontend dependencies
    └── tailwind.config.js
└── sample_files/
    └── good_exm.py
```

## How to Use
1. Start backend server
2. Start frontend application
3. Upload a Python or JavaScript file
4. View detailed code quality analysis

## Supported Languages
- Python (.py)
- JavaScript (.js, .jsx)
