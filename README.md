# TUAS Health Tech Lab Machine Vision website

## Project information

This is a project in the Turku University of Applied Sciences Health Technology lab. This website works as an interface where users can register and gain access to a camera stream coming from an application that estimates human body positions and alerts the user if something unusual happens, like for example a fall is detected.

<!-- TOC -->

- [1. Frameworks and packages used in the project](#1-frameworks-and-packages-used-in-the-project)
    - [1.1 Backend](#11-backend)
    - [1.2 Frontend](#12-frontend)
    - [1.3 Important frontend libraries and packages to understand for development](#13-important-frontend-libraries-and-packages-to-understand-for-development)
- [2. Ideas, tutorials and sources used for the project development](#2-ideas,-tutorials-and-sources-used-for-the-project-development)
    - [2.1 Combining Django and React](#21-combining-django-and-react)
    - [2.2 Sources used for configuring webpack for React hot reload](#22-sources-used-for-configuring-webpack-for-react-hot-reload)
- [3. Project installation and setup](#3-project-installation-and-setup)
    - [3.1 Requirements](#31-requirements)
    - [3.2 Create database](#32-create-database)
    - [3.3 Configuring .env file](#33-configuring-.env-file)
    - [3.4 Installing Python packages](#34-installing-python-packages)
    - [3.5 Installing npm packages](#35-installing-npm-packages)
    - [3.6 Running locally](#36-running-locally)
    - [3.7 Making changes in JS & CSS files](#37-making-changes-in-js-&-css-files)

<!-- /TOC -->

## 1. Frameworks and packages used in the project

### 1.1 Backend

Backend is done with Django and Django REST framework where we have API endpoints that are consumed by the frontend Django app built with React which then handles all the frontend views. One exception is `/admin` which lets you access standard Django admin views.

Django is a Python framework for web development. If you are unfamiliar with Django and Django REST Framework, I strongly recommend going through the tutorial links below to get familiar with how Django works and how Django projects are generally structured.

[Django](https://www.djangoproject.com/)
[Django tutorial](https://docs.djangoproject.com/en/3.1/intro/tutorial01/)
[Django REST Framework](https://www.django-rest-framework.org/)
[Django REST Framework tutorial](https://www.django-rest-framework.org/tutorial/1-serialization/)

Authentication:
[Django REST Knox](https://www.django-rest-framework.org/api-guide/authentication/#django-rest-knox)

### 1.2 Frontend

This project has a Django app named frontend. You can find the app folder under `machinevision/frontend` and in that folder you'll find a folder named `src` which contains all the React code which handles the frontend views. Routing is handled by React Router. The Django frontend app has one template in `frontend/templates/frontend/index.html` where the compiled Javascript and CSS is inserted.

This project also has a Webpack configuration file - `webpack.config.js` - which is configured to automatically compile the React code and refresh the view whenever you make changes and save. This is called hot reloading. The same applies when you make changes to `.css` files. Adding images should work as well. All the frontend code gets compiled under `/machinevision/frontend/static/frontend` folder.

If you are unfamiliar with Javascript or React, I strongly recommend spending some time going through at least some basic tutorials before delving into this project's code. While React components can be written as class components, in this project all the code is written as functional components using React Hooks.

Example tutorials for JS & React:
[JavaScript for Beginners Course (2020) - Colt Steele](https://www.youtube.com/watch?v=x2RNw4M6cME&ab_channel=ColtSteele)
[Beginner's Guide to React w/ Hooks (2020) Free Course](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=7542s&ab_channel=ColtSteele)

React docs:
[React](https://reactjs.org/)

Many components use material-ui components:
[Material-UI](https://material-ui.com/)

Compiling Javascript and CSS with hot reloading:
[Webpack](https://webpack.js.org/)
[Babel](https://babeljs.io/)

### 1.3 Important frontend libraries and packages to understand for development

If you're already familiar with React then you might be interested in how this project handles state management, routing and fetching data from APIs. Here's the libraries/packages used for those purposes:

State management:
[Recoil](https://recoiljs.org/)
[Recoil tutorial](https://recoiljs.org/docs/basic-tutorial/intro)

Routing:
[React Router](https://reactrouter.com/web/guides/quick-start)

Fetching data from backend API endpoints:
[Axios](https://www.npmjs.com/package/axios)
[React Query](https://react-query.tanstack.com/docs/overview)

## 2. Ideas, tutorials and sources used for the project development

Here are some of the sources used as inspiration when developing this project and specifically combining Django and React in this way.

### 2.1 Combining Django and React

[Brad Traversy - Full Stack React & Django](https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60&ab_channel=TraversyMedia)

### 2.2 Sources used for configuring webpack for React hot reload

[Webpack setup with hot reloading](https://hackernoon.com/how-to-bring-live-reloading-back-to-a-django-and-react-project-ilf3ubm)

[Configuring CSS with webpack](https://blog.jakoblind.no/css-modules-webpack/)

## 3. Project installation and setup

### 3.1 Requirements

Fork this repository and then clone it into your projects folder. For this project you need:

- Python 3.6 or higher
- pipenv (`pip3 install pipenv`) - [Pipenv docs](https://pipenv-fork.readthedocs.io/en/latest/basics.html)
- [NodeJS](https://nodejs.org/en/)
- Some database engine (relational db) installed in your system ie. postgres or mysql

### 3.2 Create database

Create a new database for the project.

### 3.3 Configuring .env file

Copy the .env.template file and rename it to .env . Configure it as is instructed in the template file. The main thing is to configure the DATABASE_URL as it is there where you define the project database engine, database name and username/password for it.

This means that you need to have some database system installed in your computer, a database created for this project and then use that in the .env file.

For database engine we recommend [postgres](https://www.postgresql.org/)

While not required for this project, if you are unfamiliar with running database commands through the terminal, then you might want to install [pgAdmin](https://www.pgadmin.org/) which is a browser based UI for creating and handling postgres databases.

### 3.4 Installing Python packages

Navigate to the project folder - ie. `tuas-health-tech-machine-vision/` - in your terminal and run `pipenv shell` to activate the pipenv virtual environment for this project. Next, install the required python packages with `pipenv install`. If you need to install additional Python packages for this project, run `pipenv install <package>` and they will be added to the Pipfile as dependencies. This means the packages will be installed only in this project's virtual environment and not globally in your machine.

### 3.5 Installing npm packages

Next run `npm install` to install all the required npm packages from package.json.

### 3.6 Running locally

In the project folder where we have the package.json file, run the command `npm run dev`. This will create a new folder machinevision/frontend/static/frontend, build all the JS files into a main.js file under this folder and also compile any assets like images into this folder as well. Leave this terminal window open.

Open another terminal and in the project folder (where we have manage.py file) run `python manage.py runserver`. This starts the development server and if not specified in the runserver command, by default it will run here - http://127.0.0.1:8000/

If this is the first time you're setting up this project, you will notice in the terminal that you're being prompted to make database migrations. Shut down the server with ctrl+C and run the command `python manage.py migrate`. This will prime your database with all the needed database models. Now start the server again with `python manage.py runserver`.

Now you should be able to see the project website in your localhost.

If you for example run `python manage.py runserver 0.0.0.0:8888`, it will run in http://127.0.0.1:8888/. When you specify the port, it means you can also access the website from other devices that are connected to the same network. You need to find out your ip, type it into your device, add he port number after it and then you should be able to see the website.

You can use the register page to create a regular user. If you want to access the /admin page, then you can run `python manage.py createsuperuser` to create a superuser and login to the admin panel using the created credentials.

### 3.7 Making changes in JS & CSS files

If you make changes in the Javascript files, besides having the django server running in a terminal, you need to have another terminal open where you have the `npm run dev` command running. This command builds the JS files and has webpack keep an eye on any changes and builds the files again automatically when you save.

The files will be built under `machinevision/frontend/static/frontend/` into a file named `main.js`. This file is configured to be ignored by git in the .gitignore file because there can be huge changes in the file even if you do just small changes in the React files. The compiled file will also always have some differences based on the user and their personal file structure on their operating system.
