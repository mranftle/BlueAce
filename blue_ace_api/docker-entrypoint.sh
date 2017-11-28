#!/bin/bash

# Make migrations
# echo "making migrations"
# python manage.py makemigrations
#
# # Apply database migrations
# echo "Apply database auth migrations"
# python manage.py migrate auth
# python manage.py migrate wordpairs
#
# echo "Apply database migrations"
# python manage.py migrate

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000
