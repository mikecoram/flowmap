let nodes = new NodeCollection();
let connections = new ConnectionCollection();
let partialConnection;

let n1 = new Node('n1', 100, 200);
let n2 = new Node('2', 400, 100);
let n3 = new Node('3', 500, 400);

nodes.push(n1, n2, n3); 

let c1 = new Connection(n1, n2);
let c2 = new Connection(n1, n3);
connections.push(c1, c2);
draw();