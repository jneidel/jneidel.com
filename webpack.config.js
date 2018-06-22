const path = require( "path" );
const { genScss, pug, babel, polyfill, md } = require( "setup-webpack" );

const prod = false;

const config = [];

[ "index" ].forEach( ( name ) => {
  const scss = genScss( `../css/${name}.css` );
  const entryPath = `./src/bundles/${name}.bundle.js`;

  const htmlOut = `../../${name}.html`;

  config.push( {
    mode  : prod ? "production" : "development",
    entry : prod ? polyfill( entryPath ) : entryPath,
    output: {
      path    : path.resolve( __dirname, "dist/js" ),
      filename: `${name}.js`,
    },
    module: {
      rules: prod ?
        [ babel, scss.rule, scss.font, pug( htmlOut ), md( htmlOut ) ] :
        [ scss.rule, scss.font, pug( htmlOut ), md( htmlOut ) ],
    },
    plugins     : [ scss.plugin ],
    optimization: {
      minimize : true,
      minimizer: [ scss.minimizer ],
    },
  } );
} );

module.exports = config;
