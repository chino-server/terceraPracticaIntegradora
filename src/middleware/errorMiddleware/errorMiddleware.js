import { errorDictionary } from "./errorDictionary.js";

export const handleError = async (err, req, res, next)=>{
    const error = errorDictionary[err.message]
    if (error){
        res.status(error.httpStatus).json({message:error.message, status:error.httpStatus})
    } else{
        res.status(500).json({message:'Ocurrio un error inesperado'})
    }
}

