release: cd api && python3 manage.py migrate auth && python3 manage.py migrate --run-syncdb
web: gunicorn myapi.wsgi