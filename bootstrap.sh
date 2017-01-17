# Install NodeJS
echo -e "\n--- Installing NodeJS ---\n"
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - >> /vagrant/provision.log 2>&1
sudo apt-get install -y nodejs >> /vagrant/provision.log 2>&1
echo -e "\n--- Node version: `node -v` ---\n"

# Install Mongodb
echo -e "\n--- Installing MongoDB ---\n"
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 >> /vagrant/provision.log 2>&1
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list >> /vagrant/provision.log 2>&1
apt-get update >> /vagrant/provision.log 2>&1
apt-get install -y mongodb-org=3.2.10 -q -y >> /vagrant/provision.log 2>&1
echo -e "\n--- MongoDB version: `mongod --version` ---\n"

# Setup and seed Mongodb database
echo -e "\n--- Create local database 'ActiveTravel' ---\n"
mongo ActiveTravel
echo -e "\n--- Seed local database 'ActiveTravel' ---\n"
echo -e "\n--- Seed categories collection ---\n"
mongoimport --db ActiveTravel --collection categories --file /vagrant/seed/categories.json
echo -e "\n--- Seed servicecategories collection ---\n"
mongoimport --db ActiveTravel --collection servicecategories --file /vagrant/seed/servicecategories.json
echo -e "\n--- Seed events collection ---\n"
mongoimport --db ActiveTravel --collection events --file /vagrant/seed/events.json
echo -e "\n--- Seed services collection ---\n"
mongoimport --db ActiveTravel --collection services --file /vagrant/seed/services.json
echo -e "\n--- Local database 'ActiveTravel' created and seeded. ---\n"