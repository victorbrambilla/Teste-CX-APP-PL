// Start client and resize app
let client = ZAFClient.init();

client.on("app.registered", (e) => {
  client.invoke("resize", { width: "100%", height: "100%" });
});

// Create screen context
import Main from "./Main.js";
Main();
