# Home Reporting Tool
Currently being developed into BETA stage. This is a home reporting tool for documenting properties and saving results to a database connected to your specific user. Setting up is simple and currently supported on linux/mac OS/wsl on Windows.

## Setup
**Prerequisite:**
- Install Docker for Simple Setup. If you run docker you can skip prerequisite steps 1 and 2

1. Have npm(Node Package Manager) installed on your system
2. Install python3.12
2. Download this project to your system(git clone, zip file, etc)
3. cd to the downloaded folder
4. convert .env.example to a .env file. Manually or run `cp .env.example .env` in terminal. There is one .example.env in this directory and one in ./nextjs directory



**Simple Setup(Docker):**

1. Run the docker build command. You can make your own or use: `docker build -t home-reporting-tool .`
2. Run the docker build with the run command. Must have .env from Prerequisite 4. `docker run -p 8000:8000 --env-file .env home-reporting-tool`

**Manual Setup:**

1. Activate python virtual environment in project directory: `python3 -m venv venv` and activate it: `source ./venv/bin/activate`

2. Install python packages from requirements.txt: `pip install -r requirements.txt`
3. Start uvicorn backend: `uvicorn main:app --reload` - read [python notes](./backend/python-notes.md) for more detail
4. Open another terminal and cd to the nextjs folder: `cd ./nextjs` and install node packages and run the frontend server: `npm install && npm run dev`
5. Your site should be running at http://localhost:3000 - make sure port 3000 on your pc is free or read the port your app is running on from your terminal

## Technologies
**Frontend:** 
- JavaScript
- NextJS
- NodeJS

**Backend:**
- Python3
- FastAPI
- SQLite3 (database)