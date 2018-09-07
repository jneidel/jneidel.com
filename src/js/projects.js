Array.from( document.getElementsByClassName("project") )
  .forEach( project => {
    const children = Array.from( project.children )
    const filterType = name => children.filter( child => child.localName === name );

    const name = filterType( "h3" )[0].outerText;

    const desc = filterType("desc")[0];

    fetch( `https://api.github.com/repos/jneidel/${name}` )
      .then( res => res.json() )
      .then( data => data.description )
      .then( description => desc.innerText = description )
  } )

