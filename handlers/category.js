const { query } = require('../lib/utils')
// _category

function createCategory() {

}

function getAllCategories(next) {
    query(`select * from _category`, (categories) => {
        next(JSON.parse(JSON.stringify(categories)))
    })
}

function getCategory(category_id, next) {
    query(`select * from _category where id = '${category_id}'`, (category) => {
        next(JSON.parse(JSON.stringify(category))[0])
    })
}

function updateCategory() {

}

function deleteCategory() {

}


module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}