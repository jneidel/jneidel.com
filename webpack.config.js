const path = require( "path" );
const { genScss, pug, md } = require( "setup-webpack" );

const prod = false;

const config = [];

[ "index", "resume-de", "resume-en", "now" ].forEach( ( name ) => {
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
        }
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

