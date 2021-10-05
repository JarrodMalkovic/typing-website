release: python3 manage.py migrate auth
release: python3 manage.py migrate --run-syncdb
web: gunicorn myapi.wsgi