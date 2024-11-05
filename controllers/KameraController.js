import Kamera from "../models/KameraModels.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import cloudinary from "../config/Cloudinary.js"
import streamifier from "streamifier"

export const getKamera = async (req,res)=>{
  try {
    const response = await Kamera.findAll({
      order: [['createdAt', 'DESC']] 
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
  
}
export const getKameraById = async (req,res)=>{

  try {
    const response = await Kamera.findOne({
        where:{
          id:req.params.id
        }
      });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
  


}
// export const saveKamera = (req,res)=>{
//   if(req.files === null) return res.status(400).json({msg:"No Files Uploaded"})
//   const name = req.body.name;
//   const hoursPrice = req.body.hPrice;
//   const daysPrice = req.body.dPrice; 
//   const cinemacam = req.body.cinemacam; 
//   const battery = req.body.battery; 
//   const lens = req.body.lens; 
//   const merk = req.body.merk; 
//   const file = req.files.img;
//   const fileSize = file.data.length;
//   const ext = path.extname(file.name);
//   const uniqueFilename = uuidv4();
//   const fileName = `${uniqueFilename}${ext}`;
//   const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
//   const allowedTypes = ['.jpg','.png','.jpeg'];
//   if(!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({msg:'Invalid Images'})
//   if(fileSize > 5000000) return res.status(422).json({msg:'Image Must be Less than 5MB'})

//   file.mv(`./public/images/${fileName}`,async(err)=>{
//     if (err) res.status(500).json({msg:err.message})
//     try {
//       await Kamera.create({
//         name:name,
//         images:fileName,
//         url:url,
//         hoursPrice:hoursPrice,
//         daysPrice:daysPrice,
//         cinemacam:cinemacam,
//         lens:lens,
//         battery:battery,
//         merk:merk
//       })
//       res.status(201).json({msg:'Kamera Created Succesfully'})
//     } catch (error) {
//       console.log(error.message);
//     }
//   })



// }


function generateRandomLetter(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}


export const saveKamera = async(req,res)=>{
  if (!req.files || !req.files.file) {
    return res.status(400).json({ msg: "Tidak ada file yang diunggah." });
  }

  const name = req.body.name;
  const hoursPrice = req.body.hPrice;
  const daysPrice = req.body.dPrice; 
  const cinemacam = req.body.cinemacam; 
  const battery = req.body.battery; 
  const lens = req.body.lens; 
  const merk = req.body.merk; 
  const file = req.files.file; // Akses file yang diunggah
  const ext = path.extname(file.name);
  const fileName = generateRandomLetter(15) + ext;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Jenis file salah. Hanya menerima png, jpg, atau jpeg." });
  }

  if (file.size > 5000000) {
    return res.status(422).json({ msg: "Ukuran file terlalu besar. Maksimal 5MB." });
  }

  try {
    // Upload file langsung dari buffer
    const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.data.toString('base64')}`, {
      public_id: fileName,
      folder: "gocam", // Tentukan folder di Cloudinary
    });

    // Simpan informasi ke database
    await Kamera.create({
      name: name,
      images: result.public_id,
      url: result.secure_url,
      hoursPrice:hoursPrice,
      daysPrice:daysPrice,
      cinemacam:cinemacam,
      lens:lens,
      battery:battery,
      merk:merk
    });

    res.status(201).json({ msg: "Gambar berhasil ditambahkan." });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }


}
// export const updatetKamera = async(req,res)=>{
//   const kamera = await Kamera.findOne({
//     where:{
//       id:req.params.id
//     }
//   });
//   if(!kamera) return res.status(404).json({msg:'no data found'})
//   let fileName = "";
// if(req.files === null){
//   fileName = kamera.images;
// }else{
//   const file = req.files.img;
//   const fileSize = file.data.length;
//   const uniqueFilename = uuidv4();
//   const ext = path.extname(file.name);
//   fileName =  `${uniqueFilename}${ext}`;

//   const allowedTypes = ['.jpg','.png','.jpeg'];
//   if(!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({msg:'Invalid Images'})
//   if(fileSize > 5000000) return res.status(422).json({msg:'Image Must be Less than 5MB'})
//   const filepath = `./public/images/${kamera.images}`;
//   fs.unlinkSync(filepath)

//   file.mv(`./public/images/${fileName}`,(err)=>{
//     if (err) res.status(500).json({msg:err.message})  
//   })
  
// }
// const name = req.body.name;
//   const hoursPrice = req.body.hPrice;
//   const daysPrice = req.body.dPrice; 
//   const cinemacam = req.body.cinemacam; 
//   const battery = req.body.battery; 
//   const lens = req.body.lens; 
//   const merk = req.body.merk; 
//   const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
//   try {
//     await Kamera.update({
//       name:name,
//       images:fileName,
//       url:url,
//       hoursPrice:hoursPrice,
//       daysPrice:daysPrice,
//       cinemacam:cinemacam,
//       lens:lens,
//       battery:battery,
//       merk:merk
//     },{
//       where:{
//         id:req.params.id
//       }
//     })
//     res.status(200).json({msg:"Kamera Updated Succesfully"})
//   } catch (error) {
//     console.log(error.message);
//   }
// }
export const updatetKamera = async(req,res)=>{
  const kamera = await Kamera.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kamera) return res.status(404).json({ msg: "Gambar tidak ditemukan" });

  let fileName = kamera.images; // Menggunakan public_id dari Cloudinary
  let url = kamera.url
  if (req.files && req.files.file) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const allowedType = [".png", ".jpg", "jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res
        .status(422)
        .json({ msg: "Ekstensi gambar salah, harus png, jpg, atau jpeg" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Gambar harus kurang dari 5MB" });

    try {
      // Hapus gambar lama dari Cloudinary
      await cloudinary.uploader.destroy(kamera.images);

      // Upload gambar baru ke Cloudinary menggunakan streamifier
      const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              public_id: generateRandomLetter(15),
              folder: "gocam",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
      };

      const result = await uploadFromBuffer(file.data);
      fileName = result.public_id;
      url = cloudinary.url(fileName);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  const name = req.body.name;
  const hoursPrice = req.body.hPrice;
  const daysPrice = req.body.dPrice; 
  const cinemacam = req.body.cinemacam; 
  const battery = req.body.battery; 
  const lens = req.body.lens; 
  const merk = req.body.merk; 
  

  try {
    await Kamera.update(
      { 
        name: name, 
        images: fileName, 
        url: url ,
        hoursPrice:hoursPrice,
        daysPrice:daysPrice,
        cinemacam:cinemacam,
        lens:lens,
        battery:battery,
        merk:merk
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Gambar berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Gagal update data" });
  }
}
export const deleteKamera = async(req,res)=>{
  const merk = await Kamera.findOne({
    where:{
      id:req.params.id
    }
  });

  if(!merk) return res.status(404).json({msg:'no data found'})
    try {
      // Hapus gambar dari Cloudinary
      await cloudinary.uploader.destroy(merk.images);
  
      // Hapus entri di database
      await Kamera.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      res.status(200).json({ msg: "Gambar berhasil dihapus" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Gagal menghapus gambar" });
    }


}

export const getKameraByName = async(req,res)=>{
  try {
    const name = req.query.name;
  const response = await Kamera.findAll({where:{
    name:{
      [Op.like]: `%${name}%`, 
    }
  }})
  res.json(response)
  res.status(400).json({msg:'data ditemukan'})
  } catch (error) {
    console.log(error.message);
  }
  
} 

export const getKameraByMerk = async(req,res)=>{
  try {
    const merk = req.query.merk;
  const response = await Kamera.findAll({where:{merk:merk}})
  res.json(response)
  res.status(400).json({msg:'data ditemukan'})
  } catch (error) {
    console.log(error.message);
  }
  
} 

export const countByMerk = async (req,res)=>{
  const merk = req.query.merk
  try {
    const response = await Kamera.count({
      where:{
        merk:merk
      }
      
    })
  res.json(response)
  res.status(200).json({msg:'data berhasil didapat'})
  } catch (error) {
    console.log(error.message);
  }
}