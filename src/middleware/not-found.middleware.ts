
import { Request, Response, NextFunction } from "express";

export const notFoundhandler = (

    req : Request,

    res : Response,

    next : NextFunction

) => {

    const message = ('route not found')

    res.status(404).send(message)
    
}