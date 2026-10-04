const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, '..', 'db.json')

function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000)
    })
}

async function readAll() {
    await sleep()
    const text = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(text)
}

async function saveAll(list) {
    await fs.writeFile(filePath, JSON.stringify(list, null, 2))
}

module.exports = { readAll, saveAll }