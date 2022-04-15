const { query } = require('../lib/utils')
// _item

function createItem() {}

function getAllItems(next) {
    query(`select * from _item`, (items) => {
        next(JSON.stringify(JSON.parse(items)))
    })
}

function getItem(item_id, next) {
    query(`select * from _item where id = '${item_id}'`, (item) => {
        next(JSON.parse(JSON.stringify(item))[0])
    })
}

function getItemsByCategory(category_id, next) {
    query(`
    select item_id, name, size, price, description
    from _item, category_item 
    where category_item.item_id = _item.id and category_item.category_id = '${category_id}'
    `, items => {
        next(JSON.parse(JSON.stringify(items)))
    })
}

function updateItem() {}

function addToCart(email, item_id, next) {
    query(`insert into cart_item (email, item_id) values ('${email}', ${item_id})`, () => {
        next(true)
    })
}

function deleteItem() {}

module.exports = {
    createItem,
    getAllItems,
    getItem,
    getItemsByCategory,
    updateItem,
    addToCart, 
    deleteItem
}