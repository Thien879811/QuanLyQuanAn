const Error = require("../api-error");
const order = require("../models/orderModel");
exports.searchOrder = async (req, res, next)=>{
    if(!req.params.id){
        res.send("message: null")
    }

    try{
        const document = await order.findOne({customer : req.params.id, status : false})
        return res.send(document);
    }catch(err){
        return next(
            new Error(500,"Loi")
        );
    }

};

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
// Kiem tr xem co ton tai order cua khach hang truoc do
    const orderData = await order.findOne({
        customer : req.body.customer,
        status : false
    })
    const product = req.body.product[0];
    
// tim thay them san pham vao
    if(orderData){
        let key = false;
        //nếu món ăn đó đã có trong order thì tăng số lượng
        orderData.product.forEach(pd => {
            if(pd._id == product._id){
                pd.quantity ++;
                return key = true;
            }
        }); 
        
        if(!key){
            orderData.product.push(...req.body.product);
        }
        // them mon an vao menu da co
       
        try{
            const document = await order.findByIdAndUpdate(orderData._id, orderData)
            res.send(document)
        }catch{
            return next(
                new Error(500, "An error occurred while creating the contact")
            ); 
        }
    }

    //khong tim thay tao order moi
    try {
        const document = await order.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new Error(500, "An error occurred while creating the contact")
        );
    }
};
