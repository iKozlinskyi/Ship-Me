# Ship-Me

**This app connects people who has stuff to ship, and drivers who want to earn some money.**
#### App deployed to https://ship-me.herokuapp.com/ (only the back end part works so far)
Please, refer to api docs (found in `/doc` folder) to know more about the implemented endpoints.

## Prerequisites
Make sure you have:
1. NodeJS, npm installed (tested on v. 12.16.1 and v. 6.13.4 respectively)
2. You have access link to MongoDB provider
3. You have api key for OpenWeatherApp (needed for weather info requests)

## Configuring the app

Local configs might be provided by creating `config/local.js` file.
1. Create file `config/local.js`
2. Override records of file `config/default.js` - provide your mongoDB access URI and OpenWeatherApp api key

**OR**
You can run the app with process env: `MONGODB_URI`, `WEATHER_API_KEY`

## Implemented functionality
- Driver is able to register in the system;
- Driver is able to login into the system;
- Driver is able to view his profile info;
- Driver is able to change his account password;
- Driver is able to add trucks;
- Driver is able to view created trucks;
- Driver is able to assign truck to himself;
- Driver is able to update not assigned to him trucks info;
- Driver is able to delete not assigned to him trucks;
- Driver is able to view assigned to him load;
- Driver is able to interact with assigned to him load;
- Shipper is able to register in the system;
- Shipper is able to login into the system;
- Shipper is able to view his profile info;
- Shipper is able to change his account password;
- Shipper is able to delete his account;
- Shipper is able to create loads in the system;
- Shipper is able to view created loads;
- Shipper is able to update loads with status ‘NEW';
- Shipper is able to delete loads with status 'NEW';
- Shipper is able to post a load;
- Shipper is able to view shipping info;
- API documentation uploaded to repository;
- Incoming request are logged into console and database. Unhandled server errors are stored into its own table in DB.
<br>==============
- Ability to filter loads by status;
- Pagination for loads;
- Any system user can see weather information; 

## Running the server
- `yarn start`
Now server is listening on port 8081 (default behavior). Go to http://localhost:8081/


## Running client side
**Client side is not finished yet**

Please, make sure that you have server up and running.


- cd `UI`
- `yarn start` - starts dev server on http://localhost:3000
