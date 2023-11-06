import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (err) {
    //When we menually sent status code
    // console.log(err)
    // res.status(400).json({
    //   success: false,
    //   message: 'Failed to create user',
    // })

    // using global error handler
    next(err)
  }
}

export default {
  createUser,
}
