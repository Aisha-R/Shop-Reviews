# database_mandatory_II

To user MongoDB as database:
The project includes a folder: db. In this folder there are json files used to populate the database. These files will be called by the ‘seeder’ command, which accepts flags (-i for importing data, and -d for destroying data)
1)	git clone <project repository>
2)	git checkout mongodb
3)	npm install
4)	create a database in MongoDB server called ‘review-system’
5)	node seeder -i
6)	node seeder -d
