let fs = require('fs');
const path = require('path');


function Controller_builder() {  
    this.build = function () {
        let config = fs.readFileSync('configuration.json');
        let data =  JSON.parse(config.toString('utf-8'))
        data.model.forEach(model => {
            let c = `
                    router.get('/${model.name}', (req, res) => {});
                    router.post('/${model.name}', (req, res) => {});
                    router.put('/${model.name}', (req, res) => {});
                    router.delete('/${model.name}', (req, res) => {});
                    `;

            let complete = `
                var express = require('express');
                var router = express.Router();
                ${c}
                 module.exports = router;`
            fs.writeFileSync(`${path.join(__dirname+"/release", `${model.name}Controller.js`)}`, complete);
        });
        
    
    }

  return this;
}

Controller_builder().build()




