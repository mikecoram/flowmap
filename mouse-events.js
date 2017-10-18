canvas.addEventListener('click', function (e) {

    // let node;
    // if ((node = mouseCollision(e))) {
    //     node.toggleSelected();
    // }
    // else {
    //     nodes.push(new Node(e.x, e.y));
    // }

    draw();

}, false);

function mouseCollision(e) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.inBounds(e.x, e.y)) {
            return node;
        }
    }
    return false;
}