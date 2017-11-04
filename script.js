"use strict";

document.addEventListener( "touchmove", ( e ) => {
    e.preventDefault();
} );

const canvas = document.getElementsByTagName( "canvas" )[0],
    context = canvas.getContext( "2d" ),
    pixelRatio = window.devicePixelRatio || 1,
    width = window.innerWidth,
    height = window.innerHeight,
    ran = Math.random,
    cos = Math.cos;

canvas.width = width * pixelRatio;
canvas.height = height * pixelRatio;
context.scale( pixelRatio, pixelRatio );

let dark = false;

document.getElementsByTagName( "p" )[0].addEventListener( "click", () => {
    dark = !dark;
} );

function drawCanvas( ...rest ) {
    if ( dark ) {
        document.getElementsByTagName( "body" )[0].style.color = "#fff";
        canvas.style.background = "#000";
        document.getElementsByTagName( "img" )[0].style.filter = "invert(100%)";
        context.globalAlpha = 0.5;
    } else {
        document.getElementsByTagName( "body" )[0].style.color = "#333";
        canvas.style.background = "#fff";
        document.getElementsByTagName( "img" )[0].style.filter = "invert(0%)";
        context.globalAlpha = 0.65;
    }

    let pi = Math.PI * 2,
        r = 0;

    context.clearRect( 0, 0, width, height );
    const points = [
        { x: 0, y: height * 0.7 + 90 },
        { x: 0, y: height * 0.7 - 90 },
    ];

    function draw( a, b ) {
        context.beginPath();
        context.moveTo( a.x, a.y );
        context.lineTo( b.x, b.y );
        const next = {
            x: b.x + ( ran() * 1.9 - 0.5 ) * 90,
            y: y( b.y ),
        };
        context.lineTo( next.x, next.y );
        context.closePath();
        r -= pi / -50;
        context.fillStyle = `#${(
            cos( r ) * 127 + 128 << 16 |
            cos( r + pi / 3 ) * 127 + 128 << 8 |
            cos( r + pi / 3 * 2 ) * 127 + 128
        ).toString( 16 )}`;
        context.fill();
        points[0] = points[1];
        points[1] = { x: next.x, y: next.y };
    }

    function y( p ) {
        const t = p + ( ran() * 2 - 1.1 ) * 90;
        return t > height || t < 0 ? y( p ) : t;
    }

    while ( points[1].x < width + 90 ) {
        draw( points[0], points[1] );
    }
}

document.onclick = drawCanvas;
document.ontouchstart = drawCanvas;
drawCanvas();
