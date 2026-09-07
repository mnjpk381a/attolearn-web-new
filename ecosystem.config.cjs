module.exports = {
  apps: [
    {
      name: 'attolearn',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 382',
      instances: 1,
      exec_mode: 'fork',
      env: { NODE_ENV: 'production' },
    },
  ],
};
