# install composer

-   `php artisan queue:table`
-   `php artisan migrate:fresh --seed`
-   `php artisan passport:client --personal`
-   `php artisan serve`

# make command on OS

-   `php artisan make:command RunTriggerProductTask`
-   `php list`

# set up and crontab

-   `crontab -l`
-   `crontab -e`
-   `* * * * * cd /home/quangtran/Desktop/DATA/React/watch-product/backend && php artisan schedule:run >> /dev/null 2>&1`

# clear cache

php artisan config:cache

php artisan config:clear

php artisan route:cache

php artisan route:clear

php artisan optimize --force
