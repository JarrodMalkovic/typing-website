FROM python:3.10-slim

WORKDIR /app

# Install PostgreSQL client libraries
RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*

COPY api/requirements.txt .
RUN pip install -r requirements.txt

COPY api . 

CMD ["gunicorn", "myapi.wsgi"]