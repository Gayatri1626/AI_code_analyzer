import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from code_analyzer import analyze_code

app = FastAPI()

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Root endpoint to confirm application is running
    """
    return {"message": "Carbon Crunch Code Analyzer is running"}

@app.post("/analyze-code")
async def upload_code(file: UploadFile = File(...)):
    """
    Endpoint to analyze uploaded code file
    """
    try:
        # Read file contents
        contents = await file.read()
        file_contents = contents.decode('utf-8')
        
        # Determine file type
        file_extension = os.path.splitext(file.filename)[1].lower()
        
        # Analyze code based on file type
        if file_extension in ['.py']:
            result = analyze_code(file_contents, 'py')
        elif file_extension in ['.js', '.jsx']:
            result = analyze_code(file_contents, 'js')
        else:
            return JSONResponse(
                status_code=400, 
                content={"detail": f"Unsupported file type: {file_extension}"}
            )
        
        return result
    
    except UnicodeDecodeError:
        return JSONResponse(
            status_code=400, 
            content={"detail": "Unable to decode file. Please ensure it's a text file."}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"detail": str(e)}
        )

# Error handler for 404 Not Found
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Endpoint not found"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)