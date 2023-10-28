const fs = require('fs');
var propertiesReader = require('properties-reader');

try {
    const configData = fs.readFileSync("/home/ubuntu/Desktop/PRIVATE-LEARNINGv2/PROJECTS/LEARNING/SERVER-PORTS.json", 'utf-8');
    const config = JSON.parse(configData);

    console.log("PORT: ", config.REACT_APP_PRIVILEGEPASS_UI);
    console.log("PORT (Backend Server): ", config.NODE_APP_PRIVILEGEPASS_BACKEND);

    const properties = propertiesReader('.env', { writer: { saveSections: true } });
    properties.set("PORT", config.REACT_APP_PRIVILEGEPASS_UI);
    properties.set("REACT_APP_NODE_APP_PRIVILEGEPASS_BACKEND", config.NODE_APP_PRIVILEGEPASS_BACKEND);    
    properties.save('.env', function then(err, data) {
        if (err) {
            console.log("error in write a properties file");
            process.exit(1);
        }
        console.log("saved data to properties file");
    });
} catch (error) {
    console.error('Error reading or parsing the configuration file:', error);
    process.exit(1);
}
