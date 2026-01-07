# Home Reporting Tool
Currently being developed into BETA stage. This is a home reporting tool for documenting properties and saving results to a database connected to your specific user. Setting up is simple and currently supported on linux/mac OS/wsl on Windows.

## Setup
**Prerequisite:**

1. Have npm(Node Package Manager) installed on your system
2. Download this project to your system(git clone, zip file, etc)
3. cd to the downloaded folder

**Simple Setup:**

1. Run the command `npm install` on terminal in current direction(where this README file is located)
2. Run the command `npm run start:dev` This should get the app running on http://localhost:3000 - make sure port 3000 on your pc is free or read the port your app is running on from your terminal

**Manual Setup:**

1. cd to the backend directory: `cd ./backend/`
2. Start uvicorn backend: `uvicorn main:app --reload` - read [python notes](./backend/python-notes.md) for more detail
3. Open a terminal and cd to the frontend folder: `cd ./frontend/`
4. Install node packages and run the frontend server: `npm install && npm run dev`
5. Your site should be running at http://localhost:3000 - make sure port 3000 on your pc is free or read the port your app is running on from your terminal

## Technologies
**Frontend:** 
- JavaScript
- NextJS
- NodeJS

**Backend:**
- Python3
- FastAPI
- Sqlite3 (database)