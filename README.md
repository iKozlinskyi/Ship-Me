# Ship-Me

**This app connects people who has stuff to ship, and drivers who want to earn some money.**

Please, refer to api docs (found in `/docs` folder) to know more about the implemented endpoints.

### Implemented functionality
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

### Configuring the app

Local configs might be provided by creating `config/local.js` file.

### Running the server
- `yarn start`
Now server is listening on port 8081 (default behavior). Go to http://localhost:8081/


### Running client side
**Client side is not finished yet**

Please, make sure that you have server up and running.


- cd `UI`
- `yarn start` - starts dev server on http://localhost:3000
