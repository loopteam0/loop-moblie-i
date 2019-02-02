const tor = require('torrent-search-api');

tor.enableProvider('1337x');

// tslint:disable-next-line:no-unused-expression
    const torrents =  tor.search( '1080', 'Movies' , 20).then(
        res => console.log(res)
    )

     console.log(torrents)

