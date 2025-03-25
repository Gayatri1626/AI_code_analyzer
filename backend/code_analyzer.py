import json
import re

def analyze_code(code, file_type):
    # Scoring categories
    score = {
        "naming": 10,
        "modularity": 20,
        "comments": 20,
        "formatting": 15,
        "reusability": 15,
        "best_practices": 20
    }

    recommendations = []

    # Naming convention checks
    if file_type in ["js", "jsx"]:
        # Check for camelCase in JS
        if re.search(r'[A-Z][a-z]+', code):
            score["naming"] -= 2
            recommendations.append("Use consistent camelCase for variable names.")
    elif file_type == "py":
        # Check for snake_case in Python
        if re.search(r'[A-Z][a-z]+', code):
            score["naming"] -= 2
            recommendations.append("Use snake_case for function names in Python.")

    # Modularity checks (functions with too many lines)
    functions = re.findall(r'def\s+\w+\s*\(.*?\):', code)
    if len(functions) > 1:
        score["modularity"] -= 5
        recommendations.append("Refactor long functions into smaller, modular functions.")

    # Comments and documentation checks
    if file_type in ["js", "jsx"]:
        if "//" not in code:
            score["comments"] -= 5
            recommendations.append("Add comments for better code readability.")
    elif file_type == "py":
        if "#" not in code:
            score["comments"] -= 5
            recommendations.append("Add docstrings or comments for better documentation.")

    # Formatting and indentation checks
    if "\t" in code:
        score["formatting"] -= 3
        recommendations.append("Use consistent spaces instead of tabs for indentation.")

    # Best practices
    if "console.log" in code:
        score["best_practices"] -= 5
        recommendations.append("Avoid using console.log in production code.")

    # Calculate overall score
    overall_score = sum(score.values())

    # Prepare the output in the desired JSON format
    result = {
        "overall_score": overall_score,
        "breakdown": score,
        "recommendations": recommendations
    }

    return json.dumps(result, indent=4)
