# Admoneo

### Getting Started
In order to run this server, you need to do a few things to get it going. This assumes you already have node and npm installed.
##### Install Node Dependencies
Type into the command line ``` npm install ``` to install all the modules node needs to run.
##### Install Mongodb
If you're using a cloud9 server, run these commands to install Mongodb
```
mkdir -p data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest $@' > mongod
chmod a+x mongod
```
After that type ./mongod to start the Mongodb server.