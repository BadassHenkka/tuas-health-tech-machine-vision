# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

List all changes after the last release here (newer on top). Each change on a separate bullet point line.

### Added

- Add initial project structure
- Add django frontend app and implement React for frontend
- Add django accounts app
- Add API endpoints for login, logout, registering and fetching user
- Add Login, Register and Dashboard components and handle routing with react-router
- Add working login/register functionality and error handling
- Add placeholder WebcamStream component until we implement the video stream from Jetson Nano
- Add everything that is compiled under machinevision/frontend/static/frontend/ into .gitignore - this will always change based on user so it doesn't make sense to include it
- Add webpack configuration for CSS
- Add basic CSS reset and test a placeholder background image for DashboardView
- Add more info and improve README.md

### Changed

- Change folder structure - each component has its own folder with the JS file and CSS file

### Fixed

- Installed @babel/runtime + @babel/plugin-transform-runtime and fixed .babelrc config so that async functions work

### Removed

- Deleted compiled frontend/main.js
