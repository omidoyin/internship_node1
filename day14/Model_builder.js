let fs = require('fs');

function Model_builder() {  
  this.build = function () {
    let config = fs.readFileSync('configuration.json');
    let data =  JSON.parse(config.toString('utf-8'))
    
    data.model.forEach(model => {
      let c = ''
      model.field.forEach((field) => {
        c += `${field[0]}:  { type: ${field[1]}, label: '${field[2]}', validation: '${field[3]}' },\n`;
      })
      let complete = `module.exports = (sequelize, DataTypes) => {
        const location = sequelize.define(
          "${model.name}",
          {
            ${c}
          },
        );

        return ${model.name};
      }`
    //TODO
    //generate files and put it into release folder
      fs.writeFileSync(`${path.join(__dirname+"/release", model.name)}.js`, complete)

      //Copy initialize files into release folder
      const folderNames  = fs.readdirSync(__dirname+"/initialize").filter(file => fs.statSync(path.join(__dirname+"/initialize", file)).isDirectory());
      folderNames.forEach(file => {
        const source = path.join(__dirname+"/initialize", file)
        const destination = path.join(__dirname+"/release", file)
        fs.renameSync(source, destination);
      })
    });
    
    
  }

  return this;
}

Model_builder().build()