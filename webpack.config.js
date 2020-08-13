const path = require( "path" );
const fs = require( "fs" );
const { genScss, pug, md } = require( "setup-webpack" );

const prod = false;
const config = [];
const bundles = [ "index", "resume-de", "resume-en", "now", "movies", "proposal", "md" ];

/*
 * Dynamically add files from 'src/data/md/*.md' to be compiled to 'md/*.html'
 * Also any subdirectories of 'src/data/md' and their contents to 'md/dir/*.html'
 */
const sourceDirectory = path.resolve( __dirname, "src" );
const mdSourceDirectory = `${sourceDirectory}/data/md`
const mdBundleDirectory = `${sourceDirectory}/bundles/md`

const mdFilenames =  fs.readdirSync( mdSourceDirectory )
  .map( file => path.resolve( mdSourceDirectory, file ) )
  .reduce( function reducer( acc, cur ) {
    const stat = fs.statSync( cur );
    if ( stat.isDirectory() ) {
      const subDirFiles = fs.readdirSync( cur )
        .map( file => `${path.basename( cur )}/${path.parse( file ).name}` );
      acc = acc.concat( subDirFiles );
    } else {
      acc.push( path.parse( cur ).name );
    }
    return acc;
  }, [] );

mdFilenames.forEach( name => {
  let mdBundleContent = `require( "../../data/md/${name}.md" );`;
  if ( name.match( /\// ) ) {
    const dir = path.resolve( mdBundleDirectory, path.dirname( name ) );
    if ( !fs.existsSync( dir ) ) {
      fs.mkdirSync( dir );
    }
    mdBundleContent = `require( "../../../data/md/${name}.md" );`; // extra set of ..
  }
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
        md( `../../md/${name.replace( /^[^\/]+\//, "" )}.html`,
          `${name.match( /\// ) ? "../" : ""}../dist/css/md.css`, null, false,
          `${name.match( /\// ) ? "../" : ""}../dist/js/md.js` ),
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

