export default {
  apps: [{
    script: 'index.ts',
    watch: ['server', 'client'],
    // Delay between restart
    watch_delay: 1000, // 1s
    ignore_watch : ['node_modules']
  }]
}