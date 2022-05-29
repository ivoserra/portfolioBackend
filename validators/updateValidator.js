import { body } from "express-validator"




const updateValidator = [

    body('type')
        .notEmpty()
        .withMessage('Type of Project is required'),

    body("title")
        .trim()
        .optional({checkFalsy: true})
        .isLength({max: 50})
        .withMessage('your title should not be bigger then 100 characters long')
        .matches(/^[a-zA-Z0-9äöüÄÖÜß\ ]*$/)
        .withMessage('Must contain only letters and numbers')
,


    body("year")
        .matches(/^[0-9]*$/)
        .withMessage('Only numbers are allowed'),

    body("description")
        .trim()
        .optional({checkFalsy: true})
        .bail()
        .isLength({max:5000})
        .withMessage('no more then 5000 characters including whitespace'),
        // .matches(/^[a-zA-Z0-9äöüÄÖÜß\!@#*+\-;':"\ |,.\/?]*$/)
        // .withMessage("We only accept the following special characters including whitespace: !@#*()+\"-;':,.?"),

    body('tools')
        .isArray()
        .optional({checkFalsy: true})
        .custom(value=>{ 
            const array = value
            const err= array.find(element => !element.match(/^[a-zA-Z0-9äöüÄÖÜß\ !@#*+\-;':"\ |,.\/?]*$/))
            if(err){
                return Promise.reject("We only accept the following special characters including whitespace: !@#*()+\"-;':,.?") 
            }
            return Promise.resolve()
            
            }),
       
    body("deploy")
        .trim()
        .optional({checkFalsy: true})
        .isURL({protocols:['http','https']}),

    body('repository')
        .trim()
        .optional({checkFalsy: true})
        .isURL({protocols:['http','https']}),

    body("video")
        .trim()
        .optional({checkFalsy: true})
        .isURL({protocols:['http','https']}),

    body('image')
        .trim()
        .optional({checkFalsy: true})
        .isURL({protocols:['http','https']}),

    body('author')
        .trim()
        .optional({checkFalsy: true})
        .matches(/^[a-zA-Z0-9äöüÄÖÜß\ !@#*+\-;':"\ |,.\/?]*$/)
        .withMessage("We only accept the following special characters including whitespace: !@#*()+\"-;':,.?")

   

]


export default updateValidator