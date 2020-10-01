# TUAS Health Tech Lab Machine Vision website

## Project information

This is a project in Turku University of Applied Sciences Health Technology lab. This website works as an interface where users can register and request access for a camera stream coming through a Jetson Nano which can read human body positions and alert if something unusual happens.

## Technologies used in the project

### Backend

Backend is done with Django and Django REST framework where we have API endpoints that are consumed by the frontend Django app built with React which then handles all the frontend views.

[Django](https://www.djangoproject.com/)
[Django REST Framework](https://www.django-rest-framework.org/)

Authentication:
[Django REST Knox](https://www.django-rest-framework.org/api-guide/authentication/#django-rest-knox)

### Frontend

The Django frontend app has one template in `frontend/templates/frontend/index.html` where the compiled Javascript and CSS is inserted.

[React](https://reactjs.org/)

UI components:
[Material-UI](https://material-ui.com/)

React state management:
[Recoil](https://recoiljs.org/)

Fetching data from backend API endpoints:
[Axios](https://www.npmjs.com/package/axios)

Compiling Javascript and CSS with hot reloading:
[Webpack](https://webpack.js.org/)
[Babel](https://babeljs.io/)

## Ideas, tutorials and inspiration used for the project

### Combining Django and React

[Brad Traversy - Full Stack React & Django](https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60&ab_channel=TraversyMedia)

### Using Recoil for React state management

[Recoil tutorial](https://recoiljs.org/docs/basic-tutorial/intro)

### Sources for configuring webpack

[Webpack setup with hot reloading](https://hackernoon.com/how-to-bring-live-reloading-back-to-a-django-and-react-project-ilf3ubm)

[Configuring CSS with webpack](https://blog.jakoblind.no/css-modules-webpack/)

## Setting up project locally

### Requirements

Fork this repository and then clone it into your projects folder. For this project you need:

- Python 3.6 or higher
- pipenv (`pip3 install pipenv`) - [Pipenv docs](https://pipenv-fork.readthedocs.io/en/latest/basics.html)
- [NodeJS](https://nodejs.org/en/)
- Some database engine (relational db) installed in your system ie. postgres or mysql

### Create database

Create a new database for the project.

### Configuring .env file

Copy the .env.template file and rename it to .env . Configure it as is instructed in the template file. The main thing is to configure the DATABASE_URL as it is there where you define the project database engine, database name and username/password for it.

This means that you need to have some database system installed in your computer, a database created for this project and then use that in the .env file.

For database engine we recommend [postgres](https://www.postgresql.org/)

While not required for this project, if you are unfamiliar with running database commands through the terminal, then you might want to install [pgAdmin](https://www.pgadmin.org/) which is a browser based UI for creating and handling postgres databases.

### Python packages

Navigate to the project folder - ie. `tuas-health-tech-machine-vision/` - in your terminal and run `pipenv shell` to activate the pipenv virtual environment for this project. Next, install the required python packages with `pipenv install`. If you need to install additional Python packages for this project, run `pipenv install <package>` and they will be added to the Pipfile as dependencies. This means the packages will be installed only in this project's virtual environment and not globally in your machine.

### npm packages

Next run `npm install` to install all the required npm packages from package.json.

### Running locally

In the project folder where we have the package.json file, run the command `npm run dev`. This will create a new folder machinevision/frontend/static/frontend, build all the JS files into a main.js file under this folder and also compile any assets like images into this folder as well. Leave this terminal window open.

Open another terminal and in the project folder (where we have manage.py file) run `python manage.py runserver`. This starts the development server and if not specified in the runserver command, by default it will run here - http://127.0.0.1:8000/

If this is the first time you're setting up this project, you will notice in the terminal that you're being prompted to make database migrations. Shut down the server with ctrl+C and run the command `python manage.py migrate`. This will prime your database with all the needed database models. Now start the server again with `python manage.py runserver`.

Now you should be able to see the project website in your localhost.

If you for example run `python manage.py runserver 0.0.0.0:8888`, it will run in http://127.0.0.1:8888/. When you specify the port, it means you can also access the website from other devices that are connected to the same network. You need to find out your ip, type it into your device, add he port number after it and then you should be able to see the website.

You can use the register page to create a regular user. If you want to access the /admin page, then you can run `python manage.py createsuperuser` to create a superuser and login to the admin panel using the created credentials.

### Making changes in Javascript files (React.js)

If you make changes in the Javascript files, besides having the django server running in a terminal, you need to have another terminal open where you have the `npm run dev` command running. This command builds the JS files and has webpack keep an eye on any changes and builds the files again automatically when you save.

The files will be built under `machinevision/frontend/static/frontend/` into a file named `main.js`. This file is configured to be ignored by git in the .gitignore file because there can be huge changes in the file even if you do just small changes in the React files. The compiled file will also always have some differences based on the user and their personal file structure on their operating system.
