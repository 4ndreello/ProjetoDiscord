const Info = require("../database/models/adminSchema.js");
const fetch = require("node-fetch");

module.exports = {
  name: "ready",
  async execute(client, message) {
  
    function getInfo() {   
      fetch('https://api.haumea.club/total.txt')
      .then(res => res.text())
      .then(body =>{
        
        let chatFounds = client.channels.cache.get("869393554160619550");

        if (`🧬 Clients found: ${body}` == chatFounds.name) {
          return;
        }

        chatFounds.setName(`🧬 Clients found: ${body}`)
      
      });
    }


    client.user.setActivity("h!pin");

    //let chatScans = client.channels.cache.get("869393536116723773");
    setInterval(getInfo, 600000);



   // chatScans.setName(`🤖 Run scans: 12`);
   // chatFounds.setName(`🤖 Clients found: 12`)

    console.log("[-] Loaded")
    
  }
};
