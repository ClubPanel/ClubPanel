export const mainServer = {
  __comment__db: "The below options are for connecting to a MongoDB server.",
  dbURL: "DATABASE URL HERE",
  cookie: {
    __comment: "This config is the options field for express-session @ https://www.npmjs.com/package/express-session.",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      "secure": false
    }
  },
  port: 80,
  enableSSL: false,
  SSLKey: "",
  SSLCert: ""
};

export const mainClient = {
  __comment__name: "The below is the name that will be shown on the website.",
  name: "ClubPanel",
  __comment__domain: "The below is the domain name of the URL to the panel",
  domain: "example.com",
  __comment_sidebar: "The below configured the sidebar that appears on the hamburger from the header.",
  sidebar: {
    "Example Category": [
      {
        text: "Example Link",
        url: "/example",
        aria: "Example"
      }
    ]
  }
};