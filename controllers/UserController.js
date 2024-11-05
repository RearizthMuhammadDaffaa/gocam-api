import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { response } from "express";

export const getUsers = async(req,res) =>{
  try {
    const response = await User.findAll({
      attributes:['id','name','email','role']
    });
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

export const getUsersById = async (req,res) =>{
  try {
    const response = await User.findOne({
      attributes:['id','name','email','role'],
      where:{
        id: req.params.id
      }
    });
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}
export const getUsersRoleUser = async (req,res) =>{
  try {
     const role = req.query.role
    const response = await User.findAll({
      where:{
        role: role
      }
    });
    res.json(response);
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

export const createUser = async (req,res) =>{
  const {name,email,password,role} = req.body;
  const userAlreadyExists = await User.findOne({ where: { email } });
  if (userAlreadyExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await User.create({
      email,
      password: hashedPassword,
      name,
      role: role || 'user', // Assign role (default is 'user')
      verificationToken,
      isVerified : 1,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    res.status(201).json({msg:'register berhasil'})
  } catch (error) {
    res.status(400).json(error)
  }

}

export const updateUser = async (req,res) =>{

  const user = await User.findOne({
    where:{
      id: req.params.id
    }
  });
 
  if(!user) return res.status(404).json({msg:"User Not Found"});
  const {name,email,password,role} = req.body;
  let hashPassword;
  if(!password || typeof password !== 'string' || password.trim() === ""){
    hashPassword = user.password
  }else{
    hashPassword =  await bcryptjs.hash(password, 10);
  }
  
  try {
    await User.update({
      email: email || user.email, // Ensure email is not undefined
        password: hashPassword,
        name: name || user.name, // Ensure name is not undefined
        role: role || user.role, // Assign role (default to current role)
        isVerified: 1, // Assuming this is meant to verify the user
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 
    },{
      where:{
        id:user.id
      }
    })
    res.status(201).json({msg:'User Updated berhasil'})
  } catch (error) {
    res.status(400).json(error)
  }

}

export const deleteUser = async (req,res) =>{
const user = await User.findOne({
  where:{
    id: req.params.id
  }
});

if(!user) return res.status(404).json({msg:"User Not Found"});
try {
  await User.destroy({
    where:{
      id:user.id
    }
  })
  res.status(201).json({msg:'User deleted berhasil'})
} catch (error) {
  res.status(400).json(error)
}
}