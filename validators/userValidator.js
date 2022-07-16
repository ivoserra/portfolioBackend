import { body } from "express-validator"


const registerValidator=[
body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .bail()
    .matches(/^[a-zA-Z0-9äöüÄÖÜß\ ]*$/)
    .withMessage('only letters and numbers are allowed'),

body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .bail()
    .matches(/^[a-zA-Z0-9äöüÄÖÜß\ ]*$/)
    .withMessage('only letters and numbers are allowed. 4 - 8 characters long')
    .bail()
    .isLength({min:4, max:8})
    .withMessage('4 - 8 characters long. NO white spaces or special characters')


]

const userValidator=[
body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required'),
    
    

body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
  

]


export { registerValidator, userValidator } 