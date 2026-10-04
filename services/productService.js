const storage = require('../database/db')

async function getAll() {
    return await storage.readAll()
}

async function getOne(productId) {
    const list = await storage.readAll()
    const match = list.find((p) => p.id === productId)
    return match || null
}

async function create(newName, newPrice) {
    const list = await storage.readAll()

    let nextId = 1
    if (list.length > 0) {
        nextId = Math.max(...list.map((p) => p.id)) + 1
    }

    const created = { id: nextId, name: newName, price: newPrice }
    list.push(created)
    await storage.saveAll(list)
    return created
}

async function replace(productId, newName, newPrice) {
    const list = await storage.readAll()
    const pos = list.findIndex((p) => p.id === productId)
    if (pos === -1) {
        return null
    }

    list[pos] = { id: productId, name: newName, price: newPrice }
    await storage.saveAll(list)
    return list[pos]
}

async function edit(productId, newName, newPrice) {
    const list = await storage.readAll()
    const pos = list.findIndex((p) => p.id === productId)
    if (pos === -1) {
        return null
    }

    if (newName !== undefined) {
        list[pos].name = newName
    }
    if (newPrice !== undefined) {
        list[pos].price = newPrice
    }

    await storage.saveAll(list)
    return list[pos]
}

async function remove(productId) {
    const list = await storage.readAll()
    const pos = list.findIndex((p) => p.id === productId)
    if (pos === -1) {
        return false
    }

    list.splice(pos, 1)
    await storage.saveAll(list)
    return true
}

module.exports = {
    getAll,
    getOne,
    create,
    replace,
    edit,
    remove
}