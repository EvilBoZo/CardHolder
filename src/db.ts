import Dexie from 'dexie';

class MyDatabase extends Dexie {
    cards: Dexie.Table<ICardRecord, number>;

    constructor (databaseName: string) {
        super(databaseName);
        this.version(1).stores({
            cards: '++name,barcode'
        });
        this.cards = this.table('cards'); // Just informing Typescript what Dexie has already done...
    }
}

interface ICardRecord {
    name: string,
    barcode: string
}

const db = new MyDatabase('myDb');

db.open().catch(err => {
    console.error(`Open failed: ${err.stack}`);
});

export default db;