# Laravel Company Profile

This project is a dynamic company profile website that allows administrators to manage various aspects of the application. Whether you’re showcasing your own company or building this for a client, the features include:

## Overview

### Admin Dashboard

- The heart of the system, where authorized users can log in and access powerful tools.
- Admins can modify application metadata, such as the title, description, and other essential information.
- Language management: Admins can add, edit, or remove supported languages for the website.
- Content management: Admins can update the company profile content, ensuring it stays fresh and relevant.

### Localization and Translation

- Multilingual support: Admins can change the website language.
- Translation management: Admins can easily add translations for different sections of the site.

### Security and Permissions

- Role-based access control (RBAC): Different admin roles (superadmin, admin, blogger, etc.) with varying permissions.
- Authentication and authorization: Ensuring only authorized users can access the dashboard.

## Tech Stack

**Frontend:** Inertia x React

**Backend:** Laravel

**Database:** MySQL

**Authentication:** JWT or Sanctum

## Run Locally

Clone the project

~~~bash
git clone https://github.com/Sleepy4k/laravel-company-profile.git
~~~

Go to the project directory

~~~bash
cd laravel-company-profile
~~~

Install composer dependencies

~~~bash
composer install
~~~

Install node dependencies

~~~bash
npm install
~~~

Build frontend page

~~~bash
npm run build
~~~

Run pre-setup command

~~~bash
php artisan naka:pre-setup
~~~

Start the server

~~~bash
php artisan serve
~~~

## Notes

- Pre Setup Error

To solve this error you need to run pre setup command.
copy command below and paste it on your terminal.

~~~bash
php artisan naka:pre-setup
~~~

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_NAME`
`APP_KEY`
`APP_URL`
`APP_DEBUG`
`APP_ENV`

`DB_CONNECTION`
`DB_HOST`
`DB_DATABASE`
`DB_USERNAME`
`DB_PASSWORD`

## Acknowledgements

- [Laravel](https://laravel.com/docs/11.x)
- [MySQL](https://dev.mysql.com/doc)

## Feedback

If you have any feedback, please make an issue with detail description, proof of concept, and composer dependencies list
