const Error = require("../api-error");
const order = require("../models/orderModel");

exports.updateMenu= async (req, res, next)=>{
    if(Object.keys(req.body).length==0){
        return next(new Error(400,"Dử liệu cập nhật không được để trống"))
    }
    
    try{
        const document = await order.findByIdAndUpdate(req.params.id, req.body)
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

exports.findAll = async (req, res, next)=>{
    let documents=[];
    try{
        const{name} = req.query;
        if(name){
            documents = await order.findByName(name);
        }
        else {
            documents = await order.find({}) 
        }
    }catch(err){
        return next(
                new Error(500,"Loi")
            );
        
    }
    res.send(documents);
}

exports.createMenu = async (req, res, next) => {
    if (!req.body?.customer) {
        return next(new Error(400, "Name can not be empty"));
    }
    try {
        const document = await order.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new Error(500, "An error occurred while creating the contact")
        );
    }
};