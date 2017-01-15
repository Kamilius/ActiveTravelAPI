# ActiveTravelAPI

## Prerequisites
- Vagrant - https://www.vagrantup.com/
- VirtualBox - https://www.virtualbox.org/
- Running Vagrant under Windows may require additional SSH client installation (ex. PuTTY or similar)

## To get up and running
- clone repository
- go to repository directory with terminal
- get application environment up: `$ vagrant up`
- connect to environment: `$ vagrant ssh`
- go to project's folder: `$ cd /vagrant`
- install npm package dependencies: `$ npm install`
- launch application: `$ npm start`
- after launch application will be available from host machine by http://127.0.0.1:5656/api

## Available npm scripts
- `$ npm start` - launches application with file change watcher.