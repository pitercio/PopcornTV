var images = require("images");
var logger = require("./logger");

function generateFanart(imdb, callback) {
  logger.Debug("=== Generating Fanart ===");
    var fs = require('fs');
    if (fs.existsSync('assets/cache/' + imdb + '.jpg')) {
        logger.Debug('Fanart already downloaded, serving.');
        callback('cache/' + imdb + '.jpg');
    } else {
        var API = require('./MoviesAPI');
        var movies = API.getFanart(imdb, function(url) {
            var http = require('https');
            if (url == 'null') {
                callback('thumbnails/Background_blank_1080.jpg');
            } else {
                var file = fs.createWriteStream("tmp.jpg");
                var request = http.get(url, function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                        images('tmp.jpg').resize(1920, 1080).draw(images('assets/thumbnails/gradient_1080.png'), 0, 0).save('assets/cache/' + imdb + '.jpg');
                        callback('cache/' + imdb + '.jpg');
                        fs.unlink('tmp.jpg');
                    });
                });
            }
        });
    }
}
function generateFanartTV(url, imdb, callback) {
    logger.Debug("=== Generating Fanart for TV ===");
    var fs = require('fs');
    if (fs.existsSync('assets/cache/' + imdb + '.jpg')) {
        logger.Debug('Fanart already downloaded, serving.');
        callback('cache/' + imdb + '.jpg');
    } else {
      var http = require('https');
      if (url == 'null') {
          callback('thumbnails/Background_blank_1080.jpg');
       } else {
           var file = fs.createWriteStream("tmp.jpg");
           var request = http.get(url, function(response) {
              response.pipe(file);
               file.on('finish', function() {
                   images('tmp.jpg').resize(1920, 1080).draw(images('assets/thumbnails/gradient_1080.png'), 0, 0).save('assets/cache/' + imdb + '.jpg');
                   callback('cache/' + imdb + '.jpg');
                   fs.unlink('tmp.jpg');
               });
          });
       }
    }
}

exports.generateFanart = generateFanart;
exports.generateFanartTV = generateFanartTV;