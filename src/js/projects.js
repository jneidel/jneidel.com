[ ...document.querySelectorAll( ".project" ) ].forEach( project => {
  const children = [ ...project.children ];
  const filterByElement = element =>
    children.filter( child => child.localName === element );

  const projectName = filterByElement( "h3" )[0].textContent;
  const projectDescription = filterByElement( "desc" )[0];

  fetch( `https://api.github.com/repos/jneidel/${projectName}` )
    .then( res => res.json() )
    .then( data => data.description )
    .then(
      description =>
        projectDescription.textContent =
          description === undefined ? "" : description
    );
} );
