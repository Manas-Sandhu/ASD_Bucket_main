const service = require('../services/productService')

async function getAll(req, res) {
    try {
        const list = await service.getAll()
        res.json(list)
    } catch (error) {
        res.status(500).json({ error: 'Error in reading file' })
    }
}

async function getOne(req, res) {
    try {
        const productId = Number(req.params.id)
        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid id' })
        }

        const item = await service.getOne(productId)
        if (!item) {
            return res.status(404).json({ error: 'Element not found' })
        }
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: 'Error in reading file' })
    }
}

async function create(req, res) {
    try {
        const { name, price } = req.body
        if (!name || price === undefined) {
            return res.status(400).json({ error: 'name and price are required' })
        }

        const created = await service.create(name, price)
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({ error: 'Error in writing file' })
    }
}

async function replace(req, res) {
    try {
        const productId = Number(req.params.id)
        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid id' })
        }

        const { name, price } = req.body
        if (!name || price === undefined) {
            return res.status(400).json({ error: 'name and price are required' })
        }

        const item = await service.replace(productId, name, price)
        if (!item) {
            return res.status(404).json({ error: 'Element not found' })
        }
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: 'Error in writing file' })
    }
}

async function edit(req, res) {
    try {
        const productId = Number(req.params.id)
        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid id' })
        }

        const { name, price } = req.body
        if (name === undefined && price === undefined) {
            return res.status(400).json({ error: 'Provide name or price' })
        }

        const item = await service.edit(productId, name, price)
        if (!item) {
            return res.status(404).json({ error: 'Element not found' })
        }
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: 'Error in writing file' })
    }
}

async function remove(req, res) {
    try {
        const productId = Number(req.params.id)
        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid id' })
        }

        const removed = await service.remove(productId)
        if (!removed) {
            return res.status(404).json({ error: 'Element not found' })
        }
        res.json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Error in writing file' })
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    replace,
    edit,
    remove
}