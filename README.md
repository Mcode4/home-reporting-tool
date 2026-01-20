# Home Reporting Tool
Currently being developed into BETA stage. This is a home reporting tool for documenting properties and saving results to a database connected to your specific user. Setting up is simple and currently supported on linux/mac OS/wsl on Windows.

## Setup
**Prerequisite:**
- If you're using docker you can skip prerequisite steps 1, 2, and 4

1. Have npm(Node Package Manager) installed on your system
2. Install python3.12
3. Download this project to your system(git clone, zip file, etc)
4. convert all .env.example to a .env file. Manually or run `cp .env.example .env` in terminal. There is one .example.env in this directory and one in ./nextjs directory

**Docker Setup:**

1. Run the docker build command. You can make your own or use: `docker build -t home-reporting-tool --build-arg ACCESS_TOKEN_EXPIRE_MINUTES=60 --build-arg SQLITE_PATH=report_tool_db.db --build-arg POSTGRES_URL={YOUR URL} --build-arg SECRET_KEY=supersecretkey123 --build-arg ALGORITHM=HS256 --build-arg PROJECT_ENV=development .`
- (Optional) Edit POSTGRES_URL={YOUR URL} Edit PROJECT_ENV to "Production" if you add a postegres url
2. Run the docker build with the run command. Must have .env from Prerequisite 4. `docker run -p 10000:10000 --env-file .env home-reporting-tool`
3. With docker setup, you'll have to wait for Nginx to run. The delay is from the code in the root's package.json: `"start-nginx": "sleep 40 && cd nginx && nginx -g 'daemon off;'"`. It waits to ensure frontend and backend load but can be removed if running locally: `"start-nginx": "cd nginx && nginx -g 'daemon off;'"`
4. Access site at http://localhost:10000

**Manual Setup:**
- Quick Command in root directory: `npm install && npm run local-setup`

1. `cd backend` and add a python virtual environment in project directory: `python3 -m venv venv` and activate it: `source ./venv/bin/activate`
2. Install the python packages from requirements.txt: `pip install -r requirements.txt`
3. Start uvicorn backend: `uvicorn main:app --reload` - read [python notes](./backend/python-notes.md) for more detail
4. Open another terminal and cd to the "frontend" folder: `cd ./frontend` and install node packages and run the frontend server: `npm install && npm run dev` or for production `npm install && npm run build && npm run start`
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