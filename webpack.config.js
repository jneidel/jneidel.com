const path = require( "path" );
const fs = require( "fs" );
const { genScss, pug, md } = require( "setup-webpack" );

const prod = false;
const config = [];
const bundles = [ "index", "resume-de", "resume-en", "now", "movies", "proposal" ];

/*
* Dynamically add files from 'src/data/md/*.md' to be compiled to 'md/*.html'
*/
const sourceDirectory = path.resolve( __dirname, "src" );
const mdSourceDirectory = `${sourceDirectory}/data/md`
const mdBundleDirectory = `${sourceDirectory}/bundles/md`

const mdFilenames = fs.readdirSync( mdSourceDirectory ).map( file => path.parse( file ).name );
mdFilenames.forEach( name => {
  const mdBundleContent = `require( "../../data/md/${name}.md" );`;
  fs.writeFileSync( `${mdBundleDirectory}/${name}.bundle.js`, mdBundleContent ); // Create bundle file
  bundles.push( `md/${name}` );
} );

bundles.forEach( ( name ) => {
  const scss = genScss( `../css/${name}.css` );
  const entryPath = `./src/bundles/${name}.bundle.js`;

  if ( name === "index" )
    var htmlOut = `../../${name}.html`;
  else
    var htmlOut = `../../${name}/index.html`;

  if ( name === "resume-de" || name === "resume-en" ) {
    var pugData;
    switch( name ) {
      case "resume-de":
        pugData = require( "./src/data/resume-de.json" );
        break;
      case "resume-en":
        pugData = require( "./src/data/resume-en.json" );
        break;
    }
  } else if ( name === "now" ) {
    var pugData;
    try {
      const comics = require( "./src/data/now-comics.json" );
      const manga = require( "./src/data/now-manga.json" );

      pugData = { manga, comics, lastEdit: new Date() };
    } catch(err) {
      pugData = { manga: [], comics: [], lastEdit: new Date() }; // files don't exist fallback
    }
  } else if ( name === "movies" ) {
    var pugData = require( "./src/data/movies.js" );
  }

  config.push( {
    mode  : prod ? "production" : "development",
    entry : entryPath,
    output: {
      path    : path.resolve( __dirname, "dist/js" ),
      filename: `${name}.js`,
    },
    module: {
      rules: [
        scss.rule,
        scss.font,
        {
          test: /\.pug$/,
          use : [
            `file-loader?name=${htmlOut}`,
            "extract-loader",
            "html-loader?attrs=false",
            {
              loader: "pug-html-loader",
              options: {
                data: pugData ? pugData : {},
              }
            }
          ],
        },
        md( `../../md/${name.replace( /^[^\/]+\//, "" )}.html`, null, null, true ), // "../dist/css/md/test.css"
      ],
    },
    plugins     : [ scss.plugin ],
    optimization: {
      minimize : true,
      minimizer: [ scss.minimizer ],
    },
  } );
} );

module.exports = config;

