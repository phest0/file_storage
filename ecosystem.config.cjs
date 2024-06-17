export const apps = [
  {
    name: "File Storage app",
    script: "./server.js",
    env_production: {
      NODE_ENV: "production",
    },
    env_development: {
      NODE_ENV: "development",
    },
    error_file: "$HOME/pm2/logs/error",
    out_file: "$HOME/pm2/logs/out",
  },
];
