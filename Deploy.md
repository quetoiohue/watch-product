# Deployment

- `heroku login`
- `git init`
- `heroku create my-app`
- `git add .`
- `git commit -m “Initial Commit”`
- `git push heroku master`

- create a `Procfile` file and pass this code:
  `web: vendor/bin/heroku-php-apache2 public/`

# Log error

- `heroku logs --tail`
