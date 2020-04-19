define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "authenticate user",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>current user username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>current user password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"Potato\"\n  \"password\": \"123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>user JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"User authenticated successfully\",\n  \"token\": \"adde238h238hfuhf289pf892fh2f23fphf2p\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/auth.routes.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "register user",
    "name": "Register",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>new user username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new user password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"Potato\"\n  \"password\": \"123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"User registered successfully\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/auth.routes.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "api/loads",
    "title": "Create new load",
    "name": "CreateLoad",
    "group": "Load",
    "permission": [
      {
        "name": "shipper"
      }
    ],
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
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"payload\": 500,\n   \"dimensions\": {\n       \"width\": 50,\n       \"height\": 75,\n       \"length\": 150\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Load created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "api/loads/:id",
    "title": "Delete load with given id",
    "name": "DeleteLoadById",
    "group": "Load",
    "permission": [
      {
        "name": "shipper"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
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
            "description": "<p>response status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Load removed successfully\"\n}",
          "type": "json"
        }
      ]
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
    "permission": [
      {
        "name": "shipper"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>load id</p>"
          },
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Load successfully edited\"\n}",
          "type": "json"
        }
      ]
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
    "permission": [
      {
        "name": "shipper, driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
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
            "optional": true,
            "field": "load.assigned_to",
            "description": "<p>unique id of driver who has this load assigned</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "load.created_by",
            "description": "<p>unique id of shipper who has created this load</p>"
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n     \"status\": \"SUCCESS\",\n     \"load\": {\n         \"_id\": \"5e8dc61bf5bd45190024ea29\",\n         \"created_by\": \"5e8dc5786c0040313c3cb6f0\",\n         \"status\": \"NEW\",\n         \"logs\": [\n             {\n                 \"message\": \"Load created\",\n                 \"time\": \"1586349595\"\n             },\n             {\n                 \"message\": \"Changed status to NEW\",\n                 \"time\": \"1586349595\"\n             }\n         ],\n         \"payload\": 100,\n         \"dimensions\": {\n             \"width\": 111,\n             \"height\": 45,\n             \"length\": 30\n         }\n     }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    },
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
    "permission": [
      {
        "name": "shipper"
      }
    ],
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
            "description": "<p>response status text</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>Loads created by current Shipper</p>"
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
            "optional": true,
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"status\": \"SUCCESS\",\n    \"loads\": [\n        {\n            \"_id\": \"5e8dc5e96c0040313c3cb6f5\",\n            \"assigned_to\": \"5e8dc5726c0040313c3cb6ee\",\n            \"created_by\": \"5e8dc5786c0040313c3cb6f0\",\n            \"status\": \"SHIPPED\",\n            \"state\": \"Arrived to Delivery\",\n            \"logs\": [\n                {\n                    \"message\": \"Load created\",\n                    \"time\": \"1586349545\"\n                },\n                {\n                    \"message\": \"Changed status to NEW\",\n                    \"time\": \"1586349545\"\n                },\n                {\n                    \"message\": \"Changed status to POSTED\",\n                    \"time\": \"1586355412\"\n                },\n                {\n                    \"message\": \"Changed status to NEW\",\n                    \"time\": \"1586355413\"\n                },\n                {\n                    \"message\": \"Changed status to POSTED\",\n                    \"time\": \"1586357753\"\n                },\n                {\n                    \"message\": \"Assigned to driver with id: 5e8dc5726c0040313c3cb6ee\",\n                    \"time\": \"1586357753\"\n                },\n                {\n                    \"message\": \"Changed status to ASSIGNED\",\n                    \"time\": \"1586357753\"\n                },\n                {\n                    \"message\": \"Change load state to: En Route to Pick Up\",\n                    \"time\": \"1586357753\"\n                },\n                {\n                    \"message\": \"Change load state to: Arrived to Pick Up\",\n                    \"time\": \"1586359395\"\n                },\n                {\n                    \"message\": \"Change load state to: En Route to Delivery\",\n                    \"time\": \"1586359445\"\n                },\n                {\n                    \"message\": \"Change load state to: Arrived to Delivery\",\n                    \"time\": \"1586359456\"\n                },\n                {\n                    \"message\": \"Changed status to SHIPPED\",\n                    \"time\": \"1586359456\"\n                }\n            ],\n            \"payload\": 100,\n            \"dimensions\": {\n                \"width\": 25,\n                \"height\": 45,\n                \"length\": 30\n            }\n        },\n        {\n            \"_id\": \"5e8dc61bf5bd45190024ea29\",\n            \"created_by\": \"5e8dc5786c0040313c3cb6f0\",\n            \"status\": \"NEW\",\n            \"logs\": [\n                {\n                    \"message\": \"Load created\",\n                    \"time\": \"1586349595\"\n                },\n                {\n                    \"message\": \"Changed status to NEW\",\n                    \"time\": \"1586349595\"\n                }\n            ],\n            \"payload\": 100,\n            \"dimensions\": {\n                \"width\": 111,\n                \"height\": 45,\n                \"length\": 30\n            }\n        },\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/load.routes.js",
    "groupTitle": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "api/loads/:id/post",
    "title": "Change load status to \"posted\"",
    "name": "PostLoad",
    "group": "Load",
    "permission": [
      {
        "name": "shipper"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>load id</p>"
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
          },
          {
            "group": "200",
            "type": "String",
            "optional": true,
            "field": "assigned_to",
            "description": "<p>driver id who has this load assigned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Load posted successfully\",\n \"assigned_to\": \"5e8dc61bf5bd4519001d3d29\"\n}",
          "type": "json"
        }
      ]
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
    "type": "patch",
    "url": "api/loads/:id/state",
    "title": "Update load state",
    "name": "UpdateLoadState",
    "group": "Load",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>load id</p>"
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Load state changed successfully\"\n}",
          "type": "json"
        }
      ]
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
    "url": "/api/me",
    "title": "Driver - Get logged driver data",
    "name": "Me-Driver",
    "group": "Me",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Current user unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Current user username</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "passwordLastChanged",
            "description": "<p>timestamp last password change</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": true,
            "field": "truck",
            "description": "<p>Driver`s assigned truck _id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": true,
            "field": "assignedLoad",
            "description": "<p>Driver`s assigned load _id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"role\": \"driver\",\n  \"passwordLastChanged\": \"2020-04-08T12:37:06.692Z\",\n  \"createdAt\": \"2020-04-08T12:37:06.692Z\",\n  \"_id\": \"5e8dc5726c0040313c3cb6ee\",\n  \"username\": \"Potato\",\n  \"truck\": \"5e8ddf6bc0157f32f40ab292\"\n  \"assignedLoad\": \"5e8ddf6bc0157f32f40ab293\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/me.routes.js",
    "groupTitle": "Me",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/me",
    "title": "Shipper - Get logged shipper data",
    "name": "Me-Shipper",
    "group": "Me",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Current user unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Current user username</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role</p>"
          },
          {
            "group": "200",
            "type": "Date",
            "optional": false,
            "field": "passwordLastChanged",
            "description": "<p>timestamp last password change</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>Shipper`s created loads</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"role\": \"shipper\",\n  \"passwordLastChanged\": \"2020-04-08T12:37:06.692Z\",\n  \"createdAt\": \"2020-04-08T12:37:06.692Z\",\n  \"_id\": \"5e8dc5726c0040313c3cb13e\",\n  \"username\": \"Banana\",\n  \"loads\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/me.routes.js",
    "groupTitle": "Me",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "api/trucks/:id/assign",
    "title": "Assign truck to current driver",
    "name": "AssignTruck",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Truck unique id</p>"
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
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Truck assigned successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "api/trucks/:id",
    "title": "Delete truck by id",
    "name": "DeleteTruck",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Truck unique id</p>"
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
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Truck removed successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "api/trucks/:id",
    "title": "Edit truck - using custom truck params",
    "name": "EditTruck_-_using_custom_params",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Truck unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.maxPayload",
            "description": "<p>truck maximum payload</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "truck.dimensions",
            "description": "<p>truck dimensions object</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.width",
            "description": "<p>truck width</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.height",
            "description": "<p>truck height</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.length",
            "description": "<p>truck length</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"maxPayload\": 1250,\n   \"dimensions\": {\n       \"width\": 170,\n       \"height\": 155,\n       \"length\": 342\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Truck edited successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "api/trucks/:id",
    "title": "Edit truck - using pre-defined type",
    "name": "EditTruck_-_using_type",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Truck unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<ul> <li>truck type = SPRINTER | SMALL_STRAIGHT | LARGE_STRAIGHT</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"type\": \"SPRINTER\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Truck edited successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "api/trucks/:id",
    "title": "Get truck with given id.",
    "name": "GetTruckById",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>truck unique <code>id</code></p>"
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
            "field": "truck._id",
            "description": "<p>truck unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": true,
            "field": "truck.assigned_to",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"5e8ddf6bc0157f32f40ab292\",\n   \"assigned_to\": \"5e8dc5726c0040313c3cb6ee\",\n   \"created_by\": \"5e8dc5726c0040313c3cb6ee\",\n   \"status\": \"IN SERVICE\",\n   \"maxPayload\": 4000,\n   \"dimensions\": {\n       \"width\": 350,\n       \"height\": 200,\n       \"length\": 700\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "api/trucks",
    "title": "Retrieve list of trucks (for this driver).",
    "name": "GetTrucks",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "trucks",
            "description": "<p>Trucks created by current Driver.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "truck._id",
            "description": "<p>truck unique id</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": true,
            "field": "truck.assigned_to",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"trucks\": [\n   {\n       \"_id\": \"5e8ddf6bc0157f32f40ab292\",\n       \"assigned_to\": \"5e8dc5726c0040313c3cb6ee\",\n       \"created_by\": \"5e8dc5726c0040313c3cb6ee\",\n       \"status\": \"IN SERVICE\",\n       \"maxPayload\": 4000,\n       \"dimensions\": {\n           \"width\": 350,\n           \"height\": 200,\n           \"length\": 700\n       }\n   },\n   {\n       \"_id\": \"5e8ddf9c41cd264ef439c508\",\n       \"created_by\": \"5e8dc5726c0040313c3cb6ee\",\n       \"status\": \"IN SERVICE\",\n       \"maxPayload\": 1200,\n       \"dimensions\": {\n           \"width\": 250,\n           \"height\": 170,\n           \"length\": 300\n       }\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "api/trucks",
    "title": "Create new truck - using custom truck params",
    "name": "PostTruck_-_using_custom_params",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.maxPayload",
            "description": "<p>truck maximum payload</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "truck.dimensions",
            "description": "<p>truck dimensions object</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.width",
            "description": "<p>truck width</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.height",
            "description": "<p>truck height</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "truck.dimensions.length",
            "description": "<p>truck length</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"maxPayload\": 1250,\n   \"dimensions\": {\n       \"width\": 170,\n       \"height\": 155,\n       \"length\": 342\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Truck created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "api/trucks",
    "title": "Create new truck - using pre-defined type",
    "name": "PostTruck_-_using_type",
    "group": "Truck",
    "permission": [
      {
        "name": "driver"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<ul> <li>truck type = SPRINTER | SMALL_STRAIGHT | LARGE_STRAIGHT</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"type\": \"SPRINTER\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Response status text</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"Truck created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.routes.js",
    "groupTitle": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT-auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
