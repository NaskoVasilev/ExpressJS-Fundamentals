const fs = require('fs')
const path = './database.json'
let storage = {};

function validateParams(key) {
    if (typeof (key) !== 'string') {
        throw new Error('Key is not string!')
    }
    if (!storage.hasOwnProperty(key)) {
        throw new Error('Key does not exists!')
    }
}

function put(key, value) {
    if (typeof (key) !== 'string') {
        throw new Error('Key must be a string!')
    }
    if (storage.hasOwnProperty(key)) {
        throw new Error('Key already exists!')
    }

    storage[key] = value;
}

function get(key) {

    return storage[key]
}

function getAll() {
    if (Object.keys(storage).length === 0) {
        return 'No data!'
    }
    return storage;
}

function update(key, value) {
    validateParams(key)
    storage[key] = value
}

function remove(key) {
    validateParams(key)
    delete storage[key]
}

function clear() {
    storage = {};
}

function save() {
    fs.writeFileSync(path, JSON.stringify(storage))
    storage = {}
}

function load() {
    storage = JSON.parse(fs.readFileSync(path))
}

function loadAsync() {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
                return;
            }

                storage = JSON.parse(data)
                resolve()
            })
    })
}

module.exports = {
    put,
    get,
    getAll,
    update,
    remove,
    clear,
    save,
    load,
    loadAsync
}

