const path = require( "path" );
const { genScss, pug, md } = require( "setup-webpack" );

const prod = false;

const config = [];

[ "index" ].forEach( ( name ) => {
  const scss = genScss( `../css/${name}.css` );
  const entryPath = `./src/bundles/${name}.bundle.js`;

  const htmlOut = `../../${name}.html`;

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
            "pug-html-loader",
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

