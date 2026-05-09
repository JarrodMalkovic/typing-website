FROM python:3.10-slim

WORKDIR /app

# Install build tools and PostgreSQL dev libraries
RUN apt-get update && apt-get install -y build-essential postgresql-client libpq-dev && rm -rf /var/lib/apt/lists/*

COPY api/requirements.txt .
RUN pip install -r requirements.txt

COPY api . 

CMD ["gunicorn", "myapi.wsgi"]