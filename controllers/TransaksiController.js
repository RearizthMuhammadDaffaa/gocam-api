
import path from "path";
import fs from "fs";
import Transaksi from "../models/Transaksi.js";

export const getTransaksi = async (req,res)=>{
  try {
    const response = await Transaksi.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
  
}
export const getTransaksiById = async (req,res)=>{

  try {
    const response = await Transaksi.findOne({
        where:{
          id:req.params.id
        }
      });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
  


}
export const saveTransaksi = async (req,res)=>{
  const {name,noNik,startDate,endDate,hoursRent} = req.body
   
  try {
    await Transaksi.create({
      name:name,
      noNik:noNik,
      startDate:startDate,
      endDate:endDate,
      hoursRent:hoursRent
    })
    res.status(201).json({msg:'Transaksi Created Succesfully'})
  } catch (error) {
    console.log(error.message);
  }
 



}
export const updatetTransaksi = async(req,res)=>{
  const transaksi = await Transaksi.findOne({
    where:{
      id:req.params.id
    }
  });
  const {name,noNik,startDate,endDate,hoursRent} = req.body
  try {
    await Transaksi.update({
      name:name,
      noNik:noNik,
      startDate:startDate,
      endDate:endDate,
      hoursRent:hoursRent
    },{
      where:{
        id:req.params.id
      }
    })
    res.status(200).json({msg:"Transaksi Updated Succesfully"})
  } catch (error) {
    console.log(error.message);
  }
}
export const deleteTransaksi = async(req,res)=>{
  const transaksi = await Transaksi.findOne({
    where:{
      id:req.params.id
    }
  });
  try {
   
    await Transaksi.destroy({
      where:{
        id:req.params.id
      }
    })
    res.status(200).json({msg:"Transaksi deleted Succesfully"})
  } catch (error) {
    console.log(error.message);
  }

}

export const getTransaksiByName = async(req,res)=>{
  try {
    const name = req.query.name;
  const response = await Transaksi.findAll({where:{name:name}})
  res.json(response)
  res.status(400).json({msg:'data ditemukan'})
  } catch (error) {
    console.log(error.message);
  }
  
} 

