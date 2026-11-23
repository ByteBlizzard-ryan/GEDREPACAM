# Serveur Laravel GEDREPACAM pour Render (PHP 8.3 + Apache)
FROM php:8.3-apache

# unzip : utilisé par Composer pour installer les dépendances
# rewrite : nécessaire au fichier public/.htaccess de Laravel
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/* \
    && a2enmod rewrite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Apache sert le dossier public/ sur le port fourni par Render (variable PORT)
ENV PORT=10000
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf
RUN echo "" > /etc/apache2/ports.conf \
    && echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername

WORKDIR /var/www/html

# Dépendances PHP (sans les outils de développement)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction --no-progress

# Code de l'application
COPY . .
RUN composer dump-autoload --optimize --no-dev --no-interaction \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 10000
CMD ["apache2-foreground"]
