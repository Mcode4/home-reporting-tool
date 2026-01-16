module.exports = {
  apps: [
    {
      name: "fastapi",
      script: "uvicorn",
      args: "main:app --host 0.0.0.0 --port 8000",
      interpreter: "python3",
      watch: false
    },
    {
      name: "nextjs",
      script: "npm",
      args: "run start",
      cwd: "./nextjs",
      watch: false
    }
  ]
};
