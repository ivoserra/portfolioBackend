import { body } from "express-validator"


const registerValidator=[
body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .bail()
    .isAlphanumeric()
    .withMessage('only letters or numbers are allowed'),

body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isAlphanumeric()
    .withMessage('only letters or numbers are allowed')
    .isLength({min:4, max:8})
    .withMessage('from 4 till 8 characters long. NO white spaces or special characters')


]

const userValidator=[
body('username')
    .trim()
    .matches(/^[a-zA-Z0-9äöüÄÖÜß\ ]*$/)
    .withMessage('only letters and numbers are allowed'),

body('password')
    .trim()
    .matches(/^[a-zA-Z0-9äöüÄÖÜß\ ]*$/)
    .withMessage('only letters and numbers are allowed')
    .isLength({min:4, max:8})
    .withMessage('from 4 till 8 characters long. No white spaces or special characters')

]


export { registerValidator, userValidator } 