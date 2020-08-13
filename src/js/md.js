function create(htmlStr) {
  const frag = document.createDocumentFragment();
  const temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}

const isNested = document.URL.match( /.*\/md\/.+\/.+.html$/ );
let match;
if ( isNested ) {
  match =document.URL.match( /.*\/md\/(.+\/.+)\.html$/ );
} else {
  match = document.URL.match( /.*\/(.+)\.html$/ );
}

if ( match ) {
  const file = match[1];
  console.log( match, file );
  const rawUrl = `${isNested ? "../" : ""}../src/data/md/${file}.md`;
  const htmlToBeInserted = create(`
    <div>
      <a href="${rawUrl}">Raw file</a>
    </div>
  `);

  // Insert at the top of the body
  document.body.insertBefore( htmlToBeInserted, document.body.childNodes[0] );
}
