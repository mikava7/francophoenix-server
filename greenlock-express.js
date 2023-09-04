import Greenlock from "greenlock-express";
const greenlock = Greenlock.create({
  // Let's Encrypt account and domain configuration
  email: "your-email@example.com",
  agreeTos: true,
  configDir: "/etc/letsencrypt",

  // Using the Express.js app
  app: require("express")().use("/", require("./yourAppFile")),

  // Where to store SSL/TLS certificates
  store: require("greenlock-store-fs"),
  webrootPath: "http://localhost:5173",
});

// Start SSL/TLS certificate retrieval and renewal
greenlock.listen(80, 443);
