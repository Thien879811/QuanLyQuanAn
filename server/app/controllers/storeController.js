const { query } = require("express");
const Error = require("../api-error");
const table = require("../models/storeModel");

exports.update= async (req, res, next)=>{
    if(Object.keys(req.body).length==0){
        return next(new Error(400,"Dử liệu cập nhật không được để trống"))
    }
    
    try{
        const document = await table.findByIdAndUpdate(req.params.id, req.body)
        if(!document){
            return next(
                new Error(404,"Không thể cập nhật")
            )
        }
        return res.send(document);
    }catch(err){
        return next(
            new Error(500,"Loi")
        );
    }
};
exports.findDate = async (req, res, next) => {
    const result = await table.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
            $sort: {
              _id: 1,
            },
        },
      ]);
  
      res.json(result);
}
exports.findAll = async (req, res, next) => {
    let documents=[];
    if(!req.params.date){
        try{
            const{name} = req.query;
            if(name){
                documents = await table.findByName(name);
            }
            else {
                documents = await table.find({}) 
            }
        }catch(err){
            return next(
                    new Error(500,"Loi")
            );
            
        }
    }else{
        const date = new Date(req.params.date)
        try {
          let query = {};
          if (date) {
            query.createdAt = {
                $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate()+1),
              };
          }
          documents = await table.find(query);
        } catch (err) {
          return next(new Error(500, "Loi"));
        }
    }
    res.send(documents);
};

exports.create = async (req, res, next) => {
    if (!req.body?.productName) {
        return next(new Error(400, "Name can not be empty"));
    }
    try {
        const document = await table.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new Error(500, "An error occurred while creating the contact")
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const document = await table.findByIdAndDelete(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(
            new Error(500, "An error occurred while creating the contact")
        );
    }
};
