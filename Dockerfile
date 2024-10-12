# ./Dockerfile

# stage 1: build stage
FROM php:8.3-fpm-alpine as build

# installing system dependencies and php extensions
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    nodejs \
    npm \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd

# install composer
COPY --from=composer:2.7.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/laravel-company-profile

# copy necessary files and change permissions
COPY . .
RUN chown -R www-data:www-data /var/www/laravel-company-profile \
    && chmod -R 775 /var/www/laravel-company-profile/storage/* \
    && chmod -R 775 /var/www/laravel-company-profile/bootstrap/cache/*

# install php and node.js dependencies
RUN composer install \
    && npm install \
    && npm run build

COPY .env.example .env

RUN chown -R www-data:www-data /var/www/laravel-company-profile/vendor \
    && chmod -R 775 /var/www/laravel-company-profile/vendor/*

# stage 2: production stage
FROM php:8.3-fpm-alpine

# install nginx
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    oniguruma-dev \
    gettext-dev \
    freetype-dev \
    nginx \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && docker-php-ext-install bcmath \
    && docker-php-ext-enable bcmath \
    && docker-php-ext-install exif \
    && docker-php-ext-enable exif \
    && docker-php-ext-install gettext \
    && docker-php-ext-enable gettext \
    && docker-php-ext-install opcache \
    && docker-php-ext-enable opcache \
    && rm -rf /var/cache/apk/*

# copy files from the build stage
COPY --from=build /var/www/laravel-company-profile /var/www/laravel-company-profile
COPY ./storage/docker/nginx.conf /etc/nginx/http.d/default.conf
COPY ./storage/docker/php.ini "$PHP_INI_DIR/conf.d/app.ini"

WORKDIR /var/www/laravel-company-profile

CMD [ "php-fpm" ]
