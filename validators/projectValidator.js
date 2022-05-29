import { body } from "express-validator"
import Project from '../models/Project.js'



const projectValidator = [

    body('type')
        .notEmpty()
        .withMessage('Type of Project is required'),

    body("title")
        .trim()
        .notEmpty()
        .withMessage('A title is required')
        .isLength({max: 50})
        .withMessage('your title should not be bigger then 100 characters long')
        .matches(/^[a-zA-Z0-9äöüÄÖÜß\ ]*$/)
        .withMessage('Must contain only letters and numbers')
        .custom( value =>{
            return Project.find({title: value}).then(proj =>{
                if(proj.length !== 0){
                    return Promise.reject('Project Title already exists')
                }
            })
        }),


    body("year")
        .notEmpty()
        .withMessage('Date is required')
        .matches(/^[0-9]*$/)
        .withMessage('Only numbers are allowed'),

    body("description")
        .trim()
        .notEmpty()
        .withMessage('an initial short description is required')
        .isLength({max:5000})
        .withMessage('no more then 5000 characters including whitespace')
        .matches(/^[a-zA-Z0-9äöüÄÖÜß\ !@#*+\-;':"\ |,.\/?]*$/)
        .withMessage("We only accept the following special characters including whitespace: !@#*()+\"-;':,.?"),

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
        .notEmpty()
        .withMessage('Author is required')
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage('only alphabetic characters and white space')

   

]


export default projectValidator