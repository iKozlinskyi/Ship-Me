define({ "api": [
  {
    "type": "delete",
    "url": "api/loads/:id",
    "title": "Delete load with given id",
    "name": "DeleteLoadById",
    "group": "Load",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Load unique id</p> <p>(200) @apiSuccess {String} status response status</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "NoPermission",
            "description": "<p>User lacks permission</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Cannot find load with given <code>id</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "api/loads/:id",
    "title": "Edit load",
    "name": "EditLoad",
    "group": "Load",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "load.payload",
            "description": "<p>load payload</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "load.dimensions",
            "description": "<p>load dimensions object</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.width",
            "description": "<p>load width</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.height",
            "description": "<p>load height</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.length",
            "description": "<p>load length</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>response status</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "WrongRequestFormat",
            "description": "<p>Request payload has wrong format</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "NoPermission",
            "description": "<p>User lacks permission</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Cannot find load with given <code>id</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "api/loads/:id",
    "title": "Retrieve load by id",
    "name": "GetLoadById",
    "group": "Load",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Load unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>response status.</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "load",
            "description": "<p>Load with given id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load._id",
            "description": "<p>load unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.assigned_to",
            "description": "<p>unique id of driver who has this load assigned</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.created_by",
            "description": "<p>unique id of shipper who created this load</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.status",
            "description": "<p>load status</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.state",
            "description": "<p>load state</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.payload",
            "description": "<p>load payload</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "load.dimensions",
            "description": "<p>load dimensions object</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.width",
            "description": "<p>load width</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.height",
            "description": "<p>load height</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.length",
            "description": "<p>load length</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "logs",
            "description": "<p>array of history logs</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "log.message",
            "description": "<p>log message</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "log.time",
            "description": "<p>log timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "NoPermission",
            "description": "<p>User lacks permission</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Cannot find load with given <code>id</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "api/loads",
    "title": "Retrieve list of loads (for this shipper).",
    "name": "GetLoads",
    "group": "Load",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageNo",
            "defaultValue": "1",
            "description": "<p>Page number (used for pagination of results)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "size",
            "description": "<p>Number of results per page</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "state",
            "description": "<p>Load state</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>response status.</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>Loads created by current Shipper.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load._id",
            "description": "<p>load unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.assigned_to",
            "description": "<p>unique id of driver who has this load assigned</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.created_by",
            "description": "<p>unique id of shipper who created this load</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.status",
            "description": "<p>load status</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.state",
            "description": "<p>load state</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.payload",
            "description": "<p>load payload</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "load.dimensions",
            "description": "<p>load dimensions object</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.width",
            "description": "<p>load width</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.height",
            "description": "<p>load height</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.length",
            "description": "<p>load length</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "logs",
            "description": "<p>array of history logs</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "log.message",
            "description": "<p>log message</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "log.time",
            "description": "<p>log timestamp</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load"
  },
  {
    "type": "get",
    "url": "api/loads",
    "title": "Retrieve list of trucks (for this driver).",
    "name": "GetTrucks",
    "group": "Truck",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "trucks",
            "description": "<p>Loads created by current Shipper.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "truck._id",
            "description": "<p>load unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.assigned_to",
            "description": "<p>unique id of driver who has this truck assigned</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.created_by",
            "description": "<p>unique id of driver who created this truck</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "truck.status",
            "description": "<p>truck status</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "truck.state",
            "description": "<p>truck state</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "truck.maxPayload",
            "description": "<p>truck maximum payload</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "truck.dimensions",
            "description": "<p>truck dimensions object</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.width",
            "description": "<p>truck width</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.height",
            "description": "<p>truck height</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.length",
            "description": "<p>truck length</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck"
  }
] });