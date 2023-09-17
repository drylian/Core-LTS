import { Request, Response } from "express"

/**
 * Context principal
 */
export let context:any

/**
 * 
 * @param req Req express
 * @param res Res express
 */
export default function config(req:Request, res:Response) {
    return context = {req, res}
}