# TUAS Health Tech Lab Machine Vision website

## Project information

This is a project in the Turku University of Applied Sciences Health Technology lab. This website works as an interface where users can register and gain access to a camera stream coming from an application that estimates human body positions and alerts the user if something unusual happens, like for example when a fall is detected.

<!-- TOC -->

- [1. Frameworks and packages used in the project](#1-frameworks-and-packages-used-in-the-project)
    - [1.1 Backend](#11-backend)
    - [1.2 Frontend](#12-frontend)
    - [1.3 Important frontend libraries and packages to understand for development](#13-important-frontend-libraries-and-packages-to-understand-for-development)
- [2. Ideas, tutorials and sources used for the project development](#2-ideas-tutorials-and-sources-used-for-the-project-development)
    - [2.1 Combining Django and React](#21-combining-django-and-react)
    - [2.2 Sources used for configuring webpack for React hot reload](#22-sources-used-for-configuring-webpack-for-react-hot-reload)
- [3. Project installation and setup](#3-project-installation-and-setup)
    - [3.1 Requirements](#31-requirements)
    - [3.2 Installing Postgres](#32-installing-postgres)
    - [3.3 Create database](#33-create-database)
    - [3.4 Configuring .env file](#34-configuring-env-file)
    - [3.5 Installing Python packages](#35-installing-python-packages)
    - [3.6 Installing npm packages](#36-installing-npm-packages)
    - [3.7 Running locally](#37-running-locally)
    - [3.8 Making changes in JS and CSS files](#38-making-changes-in-js-and-css-files)
- [4. General information regarding project structure](#4-general-information-regarding-project-structure)
    - [4.1 `tuas-health-tech-machine-vision/`](#41-tuas-health-tech-machine-vision)
    - [4.2 machinevision root directory](#42-machinevision-root-directory)
    - [4.3 machinevision](#43-machinevision)
    - [4.4 accounts](#44-accounts)
    - [4.5 alarms](#45-alarms)
    - [4.6 frontend](#46-frontend)
- [5. Future development](#5-future-development)

<!-- /TOC -->

## 1. Frameworks and packages used in the project

### 1.1 Backend

Backend is done with Django and Django REST framework where we have API endpoints that are consumed by the frontend Django app built with React which then handles all the frontend views. One exception is `/admin` which lets you access standard Django admin views.

Django is a Python framework for web development. If you are unfamiliar with Django and Django REST Framework, I strongly recommend going through the tutorial links below to get familiar with how Django works and how Django projects are generally structured.

- [Django](https://www.djangoproject.com/)
- [Django tutorial](https://docs.djangoproject.com/en/3.1/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django REST Framework tutorial](https://www.django-rest-framework.org/tutorial/1-serialization/)

Authentication:
- [Django REST Knox](https://www.django-rest-framework.org/api-guide/authentication/#django-rest-knox)

### 1.2 Frontend

This project has a Django app named frontend. You can find the app folder under `machinevision/frontend` and in that folder you'll find a folder named `src` which contains all the React code which handles the frontend views. Routing is handled by React Router. The Django frontend app has one template in `frontend/templates/frontend/index.html` where the compiled Javascript and CSS is inserted.

This project also has a Webpack configuration file - `webpack.config.js` - which is configured to automatically compile the React code and refresh the view whenever you make changes and save. This is called hot reloading. The same applies when you make changes to `.css` files. Adding images should work as well. All the frontend code gets compiled under `/machinevision/frontend/static/frontend` folder.

If you are unfamiliar with Javascript or React, I strongly recommend spending some time going through at least some basic tutorials before delving into this project's code. While React components can be written as class components, in this project all the code is written as functional components using React Hooks.

Example tutorials for JS & React:
- [JavaScript for Beginners Course (2020) - Colt Steele](https://www.youtube.com/watch?v=x2RNw4M6cME&ab_channel=ColtSteele)
- [Beginner's Guide to React w/ Hooks (2020) Free Course](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=7542s&ab_channel=ColtSteele)

React docs:
- [React](https://reactjs.org/)

Many components use material-ui components:
- [Material-UI](https://material-ui.com/)

Compiling Javascript and CSS with hot reloading:
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

### 1.3 Important frontend libraries and packages to understand for development

If you're already familiar with React then you might be interested in how this project handles state management, routing and fetching data from APIs. Here's the libraries/packages used for those purposes:

State management:
- [Recoil](https://recoiljs.org/)
- [Recoil tutorial](https://recoiljs.org/docs/basic-tutorial/intro)

Routing:
- [React Router](https://reactrouter.com/web/guides/quick-start)

Fetching data from backend API endpoints:
- [Axios](https://www.npmjs.com/package/axios)
- [React Query](https://react-query.tanstack.com/docs/overview)

## 2. Ideas, tutorials and sources used for the project development

Here are some of the sources used as inspiration when developing this project and specifically combining Django and React in this way.

### 2.1 Combining Django and React

- [Brad Traversy - Full Stack React & Django](https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60&ab_channel=TraversyMedia)

### 2.2 Sources used for configuring webpack for React hot reload

- [Webpack setup with hot reloading](https://hackernoon.com/how-to-bring-live-reloading-back-to-a-django-and-react-project-ilf3ubm)

- [Configuring CSS with webpack](https://blog.jakoblind.no/css-modules-webpack/)

## 3. Project installation and setup

Fork this repository under your own Github profile and then git clone it into your own projects folder.

### 3.1 Requirements

For this project you need:

- Python 3.6 or higher recommended
- pipenv (`pip3 install pipenv`) - [Pipenv docs](https://pipenv-fork.readthedocs.io/en/latest/basics.html)
- [NodeJS](https://nodejs.org/en/) - LTS version is your safest bet
- Postgres database engine - more about installing this below

### 3.2 Installing Postgres

Though you could use some other relational database engine such as MySQL, we recommend using Postgres as that was used when developing this project. If you know what you're doing, then it most likely doesn't matter which you use though.

Here I'll provide some resources for installing and setting up Postgres. I also recommend downloading pgAdmin4 which is a GUI administration tool for PostgreSQL. It can make creating and managing databases easier rather than handling everything through command line.

- [Download site for Postgres](https://www.postgresql.org/download/)
- [How to Install and Setup PostgreSQL on Windows 10 (2020)](https://www.youtube.com/watch?v=RAFZleZYxsc&ab_channel=ProgrammingKnowledge2)
- [Install PostgreSQL and pgAdmin on Ubuntu 20.04](https://www.youtube.com/watch?v=lX9uMCSqqko&ab_channel=codingpub)

### 3.3 Create database

Create a new database for the project. Open up pgAdmin4, go to your database server -> databases and right click databases -> choose create database. Name it however you want and select the database user which is postgres by default. If you've created another user and want to use that, that is also fine but remember this username and it's password as you will need it when configuring the project .env file. After creating the database, make sure to click it so that you can see the database icon is green. This is just to make sure that the database is online.

### 3.4 Configuring .env file

Under the `machinevision` folder we have a file named `.env.template`. Do not delete or rename this template but instead copy it under the same folder and rename it to `.env`. Configure it as is instructed in the template file. The main thing is to configure the DATABASE_URL as it is there where you define the project database engine, database name and username/password for it which you created in the previous step.

The `.env` file is used for hiding certain important variables. If you look into the project settings file which you can find in `machinevision/machinevision/settings.py`, you'll see how `django-environ` package is used for reading variable information from the `.env file`. If you need to use some variables that contain sensitive information like for example API keys, then you can hide that information in a similar way.

### 3.5 Installing Python packages

Navigate to the project folder - ie. `tuas-health-tech-machine-vision/` - in your terminal and run `pipenv shell` to activate the pipenv virtual environment for this project. Next, install the required python packages with `pipenv install`. If you need to install additional Python packages for this project, run `pipenv install <package>` and they will be added to the Pipfile as dependencies. This means the packages will be installed only in this project's virtual environment and not globally in your machine.

### 3.6 Installing npm packages

Next run `npm install` to install all the required npm packages from package.json.

### 3.7 Running locally

In the project folder where we have the package.json file (ie. `tuas-health-tech-machine-vision/`), run the command `npm run dev`. This will create a new folder `machinevision/frontend/static/frontend` and build all the JS files into a main.js file under this folder and also compile any assets like images into this folder as well. Leave this terminal window open.

Open another terminal and in the project folder (where we have `manage.py` file ie. `tuas-health-tech-machine-vision/machinevision/)` run `python manage.py runserver`. This starts the django server and if not specified in the runserver command, by default it will run here - http://127.0.0.1:8000/

If this is the first time you're setting up this project, you will notice in the terminal that you're being prompted to make database migrations. Shut down the server with ctrl+C and run the command `python manage.py migrate`. This will prime your database with all the needed database models that have been created in this project. Now start the server again with `python manage.py runserver`.

Now you should be able to see the project website in your localhost.

If you for example run `python manage.py runserver 0.0.0.0:8888`, it will run in http://127.0.0.1:8888/. When you specify the port, it means you can also access the website from other devices that are connected to the same network. You need to find out your ip, type it into your device, add the port number after it and then you should be able to see the website.

You can find Django's documentation related to manage.py commands in here:
- [django-admin and manage.py](https://docs.djangoproject.com/en/3.1/ref/django-admin/)

#### Creating a user and an admin user for the website

You can use the register page to create a regular user but by default you won't be able to login because in this project it has been made so that the admin first needs to activate this user. To create an admin user, you can run `python manage.py createsuperuser` to create a superuser and login to the admin panel using the created credentials. You can access the admin site through `/admin`.

### 3.8 Making changes in JS and CSS files

If you make changes in the Javascript files, besides having the django server running in a terminal, you need to have another terminal open where you have the `npm run dev` command running. This command builds the JS & CSS files and has webpack keep an eye on any changes and builds the files again automatically when you save.

The files will be built under `machinevision/frontend/static/frontend/` into a file named `main.js`. This file is configured to be ignored by git in the .gitignore file because there can be huge changes in the file even if you do just small changes in the React files. The compiled file will also always have some differences based on the user and their personal file structure on their operating system.

## 4. General information regarding project structure

As mentioned earlier, if you're not familiar with Django and Django REST Framework, then I recommend going through the tutorials first to gain a better understanding on how the project is structured and what each file is for. Here I will briefly describe the contents of each folder in this project.

### 4.1 `tuas-health-tech-machine-vision/`

In the top level folder we have of course the .gitignore file for adding files that should be ignored by Git. Then we have the Pipfile (and the related Pipfile.lock) where we have all the Python packages that are required for this project. This file is used by Pipenv. When you run the project for the first time, create a virtual environment for the project by running `pipenv shell` and then run `pipenv install`, it will install the python packages specified in this file. If you need to add new python packages to this project for some feature, then install those packages by using the `pipenv install <package_name>` command so that the new package is added as a dependancy in the Pipfile. If you get errors saying that some python module/package is missing, consider adding it to the Pipfile in this way as well.

We also have the package.json (and package-lock.json) that work in the same way as the Pipfile but it is used for any Javascript packages installed for the project. You can also find the scripts in that file as well like for example `npm run dev`.

For the Javascript and CSS compiling we have the .babelrc and webpack.config.js files which contain configurations for compiling JS & CSS files in this project. The webpack file contains instructions for hot reloading as well.

Finally the CHANGELOG can be used to follow what changes have been done over time. The file itself contains links to instructions on how to use it.

### 4.2 machinevision root directory

`tuas-health-tech-machine-vision/machinevision`

This is the root directory which is a container for the Django project. Under this folder we have all the folders created by Django when initially creating a Django project. The .env.template file is the important one as it is used for configuring the project in your local environment. Also when running the `python manage.py <some-command>` command in terminal, make sure to be in this folder as the `manage.py` file is in this folder.

### 4.3 machinevision

`tuas-health-tech-machine-vision/machinevision/machinevision/`

This is the actual Python package for this project. Important files here are `settings.py` and `urls.py`. Settings contains of course all the Django related project settings. Urls contains the project urls. If you add new Django apps to the project, you need to remember to add the app in the settings file and also add any new urls in the urls file.

### 4.4 accounts

`tuas-health-tech-machine-vision/machinevision/accounts/`

This app contains the API endpoints used for registration, login and handling things related to authentication. Important files are `urls.py`, `serializers.py` and `api.py`.

### 4.5 alarms

`tuas-health-tech-machine-vision/machinevision/alarms/`

This app contains the API endpoints used for fetching alarms. The Alarm model is defined in `models.py`, and the API endpoints creation happens in `serializers.py` & `api.py`. Endpoint urls can be found in `urls.py`.

### 4.6 frontend

`tuas-health-tech-machine-vision/machinevision/frontend/`

As the name suggests, this app handles all the frontend views. The important python files are `urls.py` where we basically give just a single view as the index url and that view is in `views.py`. In `views.py` we have just one view function that serves a template from `templates/frontend/index.html`. If you look into that index.html, you'll notice that we just load some fonts and Javascript there and then we have this `<div id="app"></div>` tag with the id "app". It is in this tag that the React application is initialized.

Everything else related to frontend views is then handled in `frontend/src/` folder. Here you'll find the base `App.js` file. Components folder contains smaller React components and views folder is meant for larger views that can contain several different components of our own.

Utils folder is basically for any kind of utility functions that might be used in many different places. If you create such functions, put them here and import where needed for use.

State folder contains different files for handling global React state, meaning state that you might need to use in several different places. This project uses recoil state management library for state management which is meant specifically for React state management. Note that all these states are then imported and exported in `store.js` file. The idea was that you could then easily import whatever state you need from a single place. This might be a bit unnecessary though so it could be changed.

## 5. Future development

The next step for this website project should be adding a possibility to connect to another machine which would run the machinevision application and stream the video out. This could be handled for example through the use of websockets.

The website would request websocket access to the machinevision application (some sort of authentication should be in place here), which would then open up the connection, turn on the stream and that stream would then be displayed on the website. When the machinevision application recognizes something unordinary, it should send a message to the website application either through the frontend socket connection or possibly right to the website's alarm API (this though would again require some authentication) and that would then create a new alarm which would be displayed accordingly in the website.
