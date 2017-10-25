class ConnectionCollection extends Array {
    constructor () {
        super();
    }

    insert (connection) {
        if (!this.exists(connection))
        this.push(connection);
    }

    exists (connection) {
        return this.find(function (e) { return e.parentNode == connection.parentNode 
            && e.childNode == connection.childNode}) != undefined;
    }

    delete (connection) {
        let i = this.indexOf(connection);
        this.splice(i, 1);
    }

    deleteRelatedToNode (node) {
        let deleteList = [];
        this.forEach(function (e) {
            if (e.parentNode == node || e.childNode == node) {
                deleteList.push(e);
            }
        });

        let collectionContext = this;
        deleteList.forEach(function (e) {
            collectionContext.delete(e);
        })
    }
}