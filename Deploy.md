# Deployment

- `heroku login`
- `git init`
- `heroku create my-app`
- `git add .`
- `git commit -m “Initial Commit”`
- `git push heroku master`

- create a `Procfile` file and pass this code:
  `web: vendor/bin/heroku-php-apache2 public/`

# Migrate DB

- `heroku run php artisan migrate:fresh --seed`
- `heroku run php artisan passport:client --personal`

# Log error

- `heroku logs --tail`
