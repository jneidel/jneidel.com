#!/usr/bin/env node

const fs = require( "fs" );
const path = require( "path" );
const RSS = require( "rss" );

const OUT_FILE_RAW = "rss/ff.xml"
const OUT_FILE = path.resolve( process.env.HOME, "html", OUT_FILE_RAW );

/* to json */
const data = fs.readFileSync( 0, "utf-8" );
try {
  var json = JSON.parse( data );
} catch( e ) {
  console.error( "invalid json:\n" + e );
  process.exit();
}

const episodes = json.episodes.items.map( e => {
  return {
    name: e.name,
    desc: e.description,
    url: e.external_urls.spotify,
    date: e.release_date,
  };
} );

/* rss */
const feed = new RSS({
    title: 'Fest & Flauschig',
    description: 'Fest & Flauschig mit Jan Böhmermann und Olli Schulz. Der preisgekrönte, verblüffend fabelhafte, grenzenlos fantastische Podcast für sie, ihn und es.',
    author: 'Jan Böhmermann und Olli Schulz',
    feed_url: 'https://jneidel.com/' + OUT_FILE_RAW,
    site_url: 'https://open.spotify.com/show/1OLcQdw2PFDPG1jo3s0wbp',
    image_url: 'https://i.scdn.co/image/41181b411fc8c59094c9a913dc0029dc0e014251',
    language: 'de',
    pubDate: (new Date()).toString(),
    ttl: '360',
});

episodes.forEach( e => {
  feed.item( {
    title: e.name,
    description: e.desc,
    url: e.url,
    date: e.date,
  } );
} );

const xml = feed.xml({indent: true});
fs.writeFileSync( OUT_FILE, xml );
