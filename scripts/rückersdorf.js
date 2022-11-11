#!/usr/bin/env node

const fs = require( "fs" );
const path = require( "path" );
const RSS = require( "rss" );

const OUT_FILE_RAW = "rss/rückersdorf.xml"
const OUT_FILE = path.resolve( process.env.HOME, "html", OUT_FILE_RAW );

process.stdin.on('data', data => {
  const input = data.toString().trim();

  const rawData = input.split("<h5>").filter( x => x ).map(x => ( {
    date: x.split("</h5>")[0],
    url: "https://www.rueckersdorf.eu" + x.split('href="')[1].split('"')[0],
    title: x.split('title="')[1].split('"')[0].split("Meldung: ")[1],
  }));

  const feed = new RSS({
    title: 'Gemeinde Rückersdorf',
    description: 'News',
    author: 'Gemeinde Rückersdorf',
    feed_url: 'https://jneidel.com/' + OUT_FILE_RAW,
    site_url: 'https://www.rueckersdorf.eu/news/index.php',
    language: 'de',
    pubDate: (new Date()).toString(),
    ttl: '360',
  });

  rawData.map( x => {
    const translateDate = date => {
      const split = date.split(".");
      const day = split[0];
      const month = (d => {
        switch(d) {
          case "01": return "jan";
          case "02": return "feb";
          case "03": return "mar";
          case "04": return "apr";
          case "05": return "may";
          case "06": return "jun";
          case "07": return "jul";
          case "08": return "aug";
          case "09": return "sep";
          case "10": return "oct";
          case "11": return "nov";
          case "12": return "dec";
        }
      })( split[1] );
      const year = split[2];

      return new Date( `${day}. ${month} ${year}` ).toString();
    }

    feed.item( {
      title: x.title,
      description: x.title,
      url: x.url,
      date: translateDate(x.date),
    } );
  });

  const xml = feed.xml({indent: true});
  fs.writeFileSync( OUT_FILE, xml );
} );
