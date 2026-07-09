import HttpError from "./HttpError.js";

const validate = (schema) => (req,res,next)=>{
    try{
        const {error,value} = schema.
          validate(req.body ,{

            abortEarly:true,
            allowUnknown:false

          });

          if(error){
           throw new Error(error.details[0].message,400);
          }

          next();

          return value;
    }catch(error){
        throw new Error(error.message,500);
    }
    
};

export default validate;