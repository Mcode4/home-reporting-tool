## Installed Dependencies(pip install)
- fastapi
- uvicorn
- python-jose[cryptography]
- passlib[bcrypt]
- python-dotenv
- python-multipart

## Start Backend
uvicorn main:app --reload  <!-- Starts running api on http://127.0.0.1:8000 -->

**Notes:**

Got to http://127.0.0.1:8000 and verify it says:

```JSON
{
"status": "API running"
}
```
View all routes at: http://127.0.0.1:8000/docs