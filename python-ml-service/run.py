"""
Development runner for 6ixKar ML Service
"""

import subprocess
import sys
import os


def check_dependencies():
    """Check if all dependencies are installed"""
    try:
        import fastapi
        import uvicorn
        import sklearn
        import pandas
        import numpy
        print("✅ All dependencies installed")
        return True
    except ImportError as e:
        print("❌ Missing dependencies!")
        print(f"   Error: {e}")
        print("\n🔧 Run: pip install -r requirements.txt")
        return False


def main():
    print("\n" + "="*60)
    print("🍁 6ixKar ML Service - Development Server")
    print("="*60 + "\n")
    
    if not check_dependencies():
        sys.exit(1)
    
    print("🚀 Starting FastAPI server...\n")
    
    # Run uvicorn
    subprocess.run([
        sys.executable,
        "-m",
        "uvicorn",
        "main:app",
        "--reload",
        "--host",
        "0.0.0.0",
        "--port",
        "8000"
    ])


if __name__ == "__main__":
    main()
