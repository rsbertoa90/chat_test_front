module.exports = {
  apps : [{
    name: 'matesfabi.com',
    script: './node_modules/nuxt/bin/nuxt-start',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
   /*  args: 'one two', */
    instances: 1,
   
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'forge',
      host: '159.89.228.17',
      ref: 'origin/master',
      repo: 'git@github.com:resbertoa90/matesfabifront.git',
      path: '/home/forge/matesfabi.com',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
