# KeyKorea Backend

## Prerequisites

You will need to have Docker and Docker Composed installed on your computer to start the backend for development purposes.

You can install Docker from [here](https://docs.docker.com/get-docker/). Note that on Mac and Windows, Docker Compose comes preinstalled with Docker Desktop, however on Linux systems you will have to install Docker Compose seperately from [here](https://docs.docker.com/compose/install/).

A short (2 minutes) explanation of Docker can be found on YouTube [here](https://www.youtube.com/watch?v=Gjnup-PuquQ).

## Getting started in development

### Setting environment variables

- Create an account on cloudinary.com
- Create a copy of the file `.env.example` within the `/api` directory and rename the copy to `.env`
- Fill out the `.env` file using your cloudinary credentials (This `.env` file is in `.gitignore` so your credentials wont be pushed to the main repository on github)

### Start the Django App and the Postgres Database

```bash
docker-compose up
```

Note: The first time you run this command it will take a while to execute, but on future runs it will be much faster due to caching

### Running Django Migrations

On the first time running `docker-compose up`, you will also have to execute commands inside the container to create database migrations for Django

Refer to ["Executing commands within the container"](###-executing-commands-within-the-container) and then run the following commands from within the django api container:

```bash
python3 manage.py makemigrations
```

and then:

```bash
python3 manage.py migrate auth
```

and finally:

```bash
python3 manage.py migrate --run-syncdb
```

### Running Django Fixtures

Fixtures allow us to populate the initial empty database with some initial data

Refer to ["Executing commands within the container"](###-executing-commands-within-the-container) and then run the following commands from within the django api container:

First run the exercises fixture:

```bash
python3 manage.py loaddata exercises.json
```

and then the subexercises fixture:

```bash
python3 manage.py loaddata subexercises.json
```

## Docker and Docker Compose Basics

Docker Compose is a tool for orchestrating docker containers based upon a configuration defined in a 'docker-compose.yaml' file

### Executing commands within the container

If you want to execute a command such as `python3 manage.py migrate` or `python3 manage.py makemigrations`:

First, you need to get the container ID which you wish to execute the command in.

To get the container ID run:

```bash
docker ps
```

and copy the container id which corresponds to the image named `api_django`.

Then, run the command:

```bash
docker exec -it <container id> /bin/bash
```

to start a bash shell inside the container, from which you can run any commands you like such as `python3 manage.py migrate` or `python3 manage.py makemigrations`

### Stopping the containers

To stop the docker contains from running after you have ran `docker-compose up`, you must run:

```bash
docker-compose down
```

You can verify the containers have stopped by then running

```bash
docker ps
```

and verifying that there are no containers listed

Note: On Linux systems, if you get an error running `docker-compose down`, you may first need to run `sudo aa-remove-unknown`
