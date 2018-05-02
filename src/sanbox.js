const TorrentSearchApi = require('torrent-search-api');

const torrentSearch = new TorrentSearchApi();

torrentSearch.enableProvider('Torrentz2');

// Search '1080' in 'Movies' category and limit to 20 results
torrentSearch.search('Swadesh', 'Movies', 20)
     .then(torrents => {
         console.log(torrents);
     })
     .catch(err => {
         console.log(err);
     });