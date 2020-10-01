# TUAS Health Tech Lab Machine Vision website

## Project information

This is a project in Turku University of Applied Sciences Health Technology lab. This website works as an interface where users can register and request access for a camera stream coming through a Jetson Nano which can read human body positions and alert if something unusual happens.

## Technologies used in the project

### Backend

Backend is done with Django and Django REST framework where have API endpoints that are consumed by the frontend Django app built with React which then handles all the frontend views.

https://www.djangoproject.com/
https://www.django-rest-framework.org/

Authentication:
https://www.django-rest-framework.org/api-guide/authentication/#django-rest-knox

### Frontend

https://reactjs.org/

UI components:
https://material-ui.com/

React state management:
https://recoiljs.org/

Fetching data from backend API endpoints:
https://www.npmjs.com/package/axios

Babel and webpack are used for compiling all the JS and CSS.

## Setting up project locally

### Requirements

Fork this repository and then clone it into your projects folder. For this project you need:

- Python 3.6 or higher
- pipenv (`pip3 install pipenv`) - https://pipenv-fork.readthedocs.io/en/latest/basics.html
- NodeJS - https://nodejs.org/en/
- Some database engine (relational db) installed in your system ie. postgres or mysql

### Create database

Create a new database for the project.

### Configuring .env file

Copy the .env.template file and rename it to .env . Configure it as is instructed in the template file. The main thing is to configure the DATABASE_URL as it is there where you define the project database engine, database name and username/password for it.

This means that you need to have some database system installed in your computer, a database created for this project and then use that in the .env file.

For database engine we recommend postgres:
https://www.postgresql.org/

While not required for this project, if you are unfamiliar with running database commands through the terminal, then you might want to install pgAdmin which is a browser based UI for creating and handling postgres databases:
https://www.pgadmin.org/

### Python packages

Navigate to the project folder - ie. `tuas-health-tech-machine-vision/` - in your terminal and run `pipenv shell` to activate the pipenv virtual environment for this project. Next, install the required python packages with `pipenv install`. If you need to install additional Python packages for this project, run `pipenv install <package>` and they will be added to the Pipfile as dependencies. This means the packages will be installed only in this project's virtual environment and not globally in your machine.

### npm packages

Next run `npm install` to install all the required npm packages from package.json.

### Running locally

In the project folder (where we have manage.py file) run `python manage.py runserver`. This starts the development server and if not specified in the runserver command, by default it will run here - http://127.0.0.1:8000/

Open up a second terminal and navigate to the project folder where we have the package.json file and run `npm run dev`.

Now you should be able to see the project website in your localhost.

If you for example run `python manage.py runserver 0.0.0.0:8888`, it will run in http://127.0.0.1:8888/. When you specify the port, it means you can also access the website from other devices that are connected to the same network. You need to find out your ip, type it into your device, add he port number after it and then you should be able to see the website.

You can use the register page to create a regular user. If you want to access the /admin page, then you can run `python manage.py createsuperuser` to create a superuser and login to the admin panel using the created credentials.

### Making changes in Javascript files (React.js)

If you make changes in the Javascript files, besides having the django server running in a terminal, you need to have another terminal open where you have the `npm run dev` command running. This command builds the JS files and has webpack keep an eye on any changes and builds the files again automatically when you save.

The files will be built under `machinevision/frontend/static/frontend/` into a file named `main.js`. This file is configured to be ignored by git in the .gitignore file because there can be huge changes in the file even if you do just small changes in the React files. The compiled file will also always have some differences based on the user and their personal file structure on their operating system.
