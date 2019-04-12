var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
    // poke.json stores the pokemon array under key "pokemon", 
    // so we are recreating the same structure with this object
    var obj = {
        travel_history: data
    };

    fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getAllNames(data) {
    var allNames = [];
    for(var i = 0; i < data.length; i++) {
        var newName = data[i].name;
        
        if(!~allNames.indexOf(newName)) allNames.push(newName);
        
    }
    return allNames;
}
function getAllTags(data) {
    var allTags = [];
    for(var i = 0; i < data.length; i++) {
        var tags = data[i].countries;
        for(var j = 0; j < tags.length; j++) {
            if(!~allTags.indexOf(tags[j])) allTags.push(tags[j]);
        }
    }
    return allTags;
}
module.exports = {
    loadData: loadData,
    saveData: saveData,
    getAllNames: getAllNames,
    getAllTags: getAllTags
}
