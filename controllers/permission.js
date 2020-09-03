const error_types   = require('./error_types');
const Service       = require('../Models/service');
const Permission    = require('../Models/permission');

let controller = {
    create: (req, res, next) => {
        Service.findOne({_id: req.body.service})
               .then(service=>{
                   if(service.user_id == req.user.sub){
                       let document = new Permission({
                            user_id:     req.body.user,
                            service_id:  req.body.service
                        }); 
                        document.save()
                                .then(data => res.json({data: data}))
                                .catch(err => next(err));
                   }else{
                       res.json(service);
                   }
               });
    },
    get: (req, res, next) => {
        Permission.find({service_id: req.param('id')})
            .sort({status: 1})
            .then(data=>res.json(data));
    },
    update: (req, res, next) => {
        Service.findOne({_id: req.body.service})
               .then(service=>{
                   if(service.user_id == req.user.sub){
                        Permission.findOne({_id:req.param('id')})
                                  .then(data=>{
                                    data.status = req.body.status || data.status;
                                    data.updated_at = Date.now();
                                    data.save();
                                    res.json(data)
                                  })
                                  .catch(err=>{res.json(err)}) 
                   }else{
                       res.json(service);
                   }
               });
    },
    delete: (req, res, next) => {
        Service.findOne({_id: req.body.service})
               .then(service=>{
                    if(service.user_id == req.user.sub){
                        Permission.deleteOne({_id:req.param('id')})
                                 .then(data=>{
                                    res.json(data)
                                 })
                                 .catch(err=>{res.json(err)})  
                    }else{
                       res.json(service);
                    }
                });
    }
}

module.exports = controller;