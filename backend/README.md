# install composer

-   `php artisan queue:table`
-   `php artisan migrate:fresh`
-   `php artisan passport:client --personal`
-   `php artisan serve`

# make command on OS

-   `php artisan make:command RunTriggerProductTask`
-   `php list`

# set up and crontab

-   `crontab -l`
-   `crontab -e`
-   `* * * * * cd /home/quangtran/Desktop/DATA/React/watch-product/backend && php artisan schedule:run >> /dev/null 2>&1`
