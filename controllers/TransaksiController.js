
import path from "path";
import fs from "fs";
import Transaksi from "../models/Transaksi.js";
import stripe from "../config/stripeConfig.js";
import Kamera from "../models/KameraModels.js";
import { Op } from "sequelize";
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
// export const saveTransaksi = async (req,res)=>{
//   const {name,noNik,startDate,endDate,hoursRent,statusPengambilan,kameraId} = req.body
   
//   try {
//     // Validasi keberadaan kamera
//     const kamera = await Kamera.findOne({
//       where: {
//         id: kameraId,
//       },
//     });

//     if (!kamera) {
//       return res.status(404).json({ msg: "Kamera tidak ditemukan." });
//     }

//     // Jika penyewaan berdasarkan jam
//     let amount = 0;
//     if (hoursRent) {
//       // Menghitung biaya berdasarkan jam
//       amount = hoursRent * kamera.hoursPrice;
//     } else {
//       // Jika tidak ada hoursRent, kita anggap penyewaan berdasarkan hari
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const differenceInTime = end.getTime() - start.getTime();
//       const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Durasi dalam hari

//       if (differenceInDays <= 0) {
//         return res.status(400).json({ msg: "Tanggal tidak valid." });
//       }

//       // Menghitung biaya berdasarkan harga per hari
//       amount = differenceInDays * kamera.daysPrice;
//     }

//     // Buat Payment Intent di Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Stripe menggunakan sen
//       currency: "idr",
//       payment_method_types: ["card"],
//       description: `Pembayaran untuk transaksi oleh ${name}`,
//     });
  

//     await Transaksi.create({
//       name:name,
//       noNik:noNik,
//       startDate:startDate,
//       endDate:endDate,
//       hoursRent:hoursRent,
//       kameraId:kameraId,
//       statusPengambilan:statusPengambilan || "Belum Diambil",
//       stripePaymentId:paymentIntent.id
//     })
//     res.status(201).json({msg:'Transaksi Created Succesfully', paymentIntent,
//       totalAmount: amount,clientSecret: paymentIntent.client_secret })
//   } catch (error) {
//     console.log(error.message);
//   }
 



// }

export const saveTransaksi = async (req, res) => {
  const { name, noNik, startDate, endDate, hoursRent, statusPengambilan, kameraId } = req.body;

  try {
    // Validasi keberadaan kamera
    const kamera = await Kamera.findOne({
      where: {
        id: kameraId,
      },
    });

    if (!kamera) {
      return res.status(404).json({ msg: "Kamera tidak ditemukan." });
    }

    // Perhitungan harga
    let amount = 0;
    if (hoursRent) {
      amount = hoursRent * kamera.hoursPrice;
    } else {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      if (differenceInDays <= 0) {
        return res.status(400).json({ msg: "Tanggal tidak valid." });
      }

      amount = differenceInDays * kamera.daysPrice;
    }

    // Buat Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: kamera.name,
              description: `Rental Kamera oleh ${name}`,
            },
            unit_amount: amount * 100, // Stripe menggunakan sen
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Simpan transaksi ke database
    await Transaksi.create({
      name,
      noNik,
      startDate,
      endDate,
      hoursRent,
      kameraId,
      statusPengambilan: statusPengambilan || "Belum Diambil",
      stripePaymentId: session.id,
    });

    res.status(201).json({
      msg: "Transaksi Created Successfully",
      sessionUrl: session.url,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const updatetTransaksi = async(req,res)=>{
  const transaksi = await Transaksi.findOne({
    where:{
      id:req.params.id
    }
  });
  const {name,noNik,startDate,endDate,hoursRent,statusPengambilan} = req.body
  try {
    await Transaksi.update({
      name:name,
      noNik:noNik,
      startDate:startDate,
      endDate:endDate,
      hoursRent:hoursRent,
      statusPengambilan:statusPengambilan
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

export const getTransaksiWithKamera = async (req, res) => {
  try {
    const { name } = req.query; // Ambil filter "name" dari query parameter

    // Query transaksi dan kamera terkait
    const response = await Transaksi.findAll({
      where: name ? { name: { [Op.like]: `%${name}%` } } : {}, // Filter berdasarkan name jika ada
      include: [
        {
          model: Kamera,
          as: "kamera", // Sesuai dengan alias di asosiasi
          attributes: ["name", "images", "url", "cinemacam", "lens", "battery", "merk", "hoursPrice", "daysPrice"], // Pilih kolom kamera
        },
      ],
    });

    // Kirimkan hasil query sebagai JSON
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Gagal mengambil data transaksi dengan kamera" });
  }
};
