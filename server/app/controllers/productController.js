const Error = require("../api-error");
const product = require("../models/productModel");

exports.searchProduct = async (req, res, next) => {
    console.log(req.body)
    const search = req.body.search;
    if (!search) {
        const result = await product.aggregate([
            {
                $group: {
                    _id: "$directory",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
    
        res.status(200).send(result);
    }
    try {
        if (search) {
            const result = await product.find({
              $or: [
                { name: { $regex: `.*${search}.*`, $options: "i" } },
                { directory: { $regex: `.*${search}.*`, $options: "i" } },
              ],
            });
          
            res.status(200).send(result);
            return;
          }
      }
    catch (error) {
      next(error);
    }
}
exports.updateMenu= async (req, res, next)=>{
    if(Object.keys(req.body).length==0){
        return next(new Error(400,"Dử liệu cập nhật không được để trống"))
    }
    try{
        const document = await product.findByIdAndUpdate(req.params.id, req.body)
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
            documents = await product.findByName(name);
        }
        else {
            documents = await product.find({}) 
        }
    }catch(err){
        return next(
            new Error(500,"Loi")
        );
        
    }
    return res.send(documents);
}

exports.createMenu = async (req, res, next) => {
    if (!req.body?.productName) {
        return next(new Error(400, "Name can not be empty"));
    }
    try {
        const document = await product.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new Error(500, "An error occurred while creating the contact")
        );
    }
};
