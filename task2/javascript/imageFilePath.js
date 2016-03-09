/**
 * Created by igor on 9/3/16.
 */
//Parse Longitude to tile number
function long2tile(lon,zoom) { return (Math.floor((Number(lon)+180)/360*Math.pow(2,zoom))); }

//Parse Latitude to tile number
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

//Parse Zoomlevel to Integer
function toInt(zoomlevel){
    try {
        return parseInt(zoomlevel);
    } catch(e) {
        alert("Error: "+e.message)
    }
}

function validateZoomlevel(zoomlevel) { // zoomlevel value checking
    if (zoomlevel === '') {
        throw { name: 'Bad zoomlevel', message: 'Zoomlevel has no value' }
    }

    if (isNaN(zoomlevel)) {
        throw { name: 'Bad zoomlevel', message: 'Invalid zoomlevel. It must be integer' }
    }
    if (zoomlevel < 0 || zoomlevel > 18) {
        throw { name: 'Bad zoomlevel', message: 'zoomlevel out of range' }
    }
}

function validateLatitude(latitude) { // latitude value checking
    if (latitude === '') {
        throw { name: 'Bad latitude', message: 'Latitude has no value' }
    }

    if (isNaN(latitude)) {
        throw { name: 'Bad latitude', message: 'Invalid latitude' }
    }
    if (latitude <= -90 || latitude >= 90) {
        throw { name: 'Bad latitude', message: 'latitude out of range' }
    }
}

function validateLongitude(longitude) { // longitude value checking
    if (longitude === '') {
        throw { name: 'Bad longitude', message: 'Longitude has no value' }
    }

    if (isNaN(longitude)) {
        throw { name: 'Bad longitude', message: 'Invalid longitude' }
    }
    if (longitude < -180 || longitude > 180) {
        throw { name: 'Bad longitude', message: 'longitude out of range' }
    }
}


function getImageFilePath(zoomlevel, latitude, longitude){

    try {
        validateZoomlevel(zoomlevel);
        validateLatitude(latitude);
        validateLongitude(longitude);
        var zoomlevelIndex = toInt(zoomlevel);
        var verticalIndex = lat2tile(latitude,zoomlevel);
        var horizontalIndex = long2tile(longitude,zoomlevel);
        var filePath = zoomlevelIndex.toString() + '/' + verticalIndex.toString() + '/' + horizontalIndex.toString();

        alert ("File path is " + filePath );
        //retrun FilePath;

    } catch(e) {
        alert("Error: "+e.message)
    }
}