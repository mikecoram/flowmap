function renameNode (node) {
    let i = new InputModal('Rename node', node.title);
    i.onsubmit = function (result) {
        node.title = result;
        draw();
    }
}
 
function addNode (x, y) {
    let i = new InputModal('Add node', '');
    i.onsubmit = function (result) {
        nodes.push(new Node(result, x, y));
        draw();
    }
}

function removeNode(node) {
    nodes.delete(node, connections);
    draw();
}