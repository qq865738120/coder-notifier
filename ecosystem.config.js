module.exports = {
  apps: [
    {
      name: 'coder-notifier',
      cwd: './',
      script: 'coder-notifier',
      args: 'start',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/app.error.log',
      out_file: './logs/app.out.log',
      instances: 1,
      min_uptime: '120s',
      max_restarts: 10,
      cron_restart: '1 0 * * *',
      merge_logs: true,
      exec_interpreter: 'node',
      exec_mode: 'fork',
      autorestart: true,
      vizion: false,
      restart_delay: 60,
      max_memory_restart: '1G',
    },
  ],
};
