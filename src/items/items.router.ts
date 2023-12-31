/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from 'express'
import * as ItemService from './items.service'
import { BaseItem, Item } from './item.interface'
import { Items } from './items.interface'
/**
 * Router Definition
 */

export const itemsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (req: Request, res: Response) => {

    try {
        const items : Items = await ItemService.findAll()

        res.status(200).send(items)
    } catch (error) {
        res.status(500).send(error)
    }

})

// GET items/:id

itemsRouter.get('/:id', async (req : Request, res : Response) => {

    const id : number = parseInt(req.params.id)

    try {
        const item :Item = await ItemService.find(id)

        if(item) {
            return res.status(200).send(item)
        }

        res.status(404).send('Item not found')

    } catch (error) {

        res.status(500).send(error)

    }
})

// POST items

itemsRouter.post('/', async (req : Request, res : Response) => {

    try {

        const item : BaseItem = req.body

        const newItem : Item = await ItemService.create(item)

        res.status(201).json(newItem)

    } catch (error) {

        res.status(500).send(error)
        
    }
})

// PUT items/:id

itemsRouter.put('/:id',  async (req : Request, res : Response)=> {

    let id : number = parseInt(req.params.id, 10)

    try {

        const item : Item = req.body

        const existingItem : Item = await ItemService.find(id)

        if(existingItem) {

            const updatedItem : Item | null = await ItemService.update(id, item)

            res.send(201).send(updatedItem)
        }

        const newItem : Item = await ItemService.create(item)

        res.status(201).json(newItem)

    } catch (error) {

    res.status(500).send(error) 

    }
    


// DELETE items/:id

itemsRouter.delete('/:id', async (req: Request, res: Response) => {
    
    const id: number = parseInt(req.params.id, 10)
    
    try {
        await ItemService.remove(id)

        res.status(201).send('Item removed succesfully')
    } catch (error) {
        
        res.status(500).send(error)

        }
    })
    

})