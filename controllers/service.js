const error_types   = require('./error_types');
const Service       = require('../Models/service');

let controller = {
    create: (req, res, next) => {
        if (req.body.name == undefined){
            throw new error_types.InfoError('Name is required');
        }else{
            let document = new Service({
                user_id:     req.user.sub,
                name:        req.body.name,
                description: req.body.description || '',
                image:       req.body.image       || ''
            }); 
            document.save().then(data => res.json({data: data})).catch(err => next(err));
        }
    },
    search: (req, res, next) => {
        Service.find({name: {$regex: req.param('name'), $options: 'i'}})
            .sort({status: 1, name: -1})
            .then(data=>res.json(data));
    },
    getAll: (req, res, next) => {
        Service.find({})
            .sort({status: 1, name: -1})
            .then(data=>res.json(data));
    },
    get: (req, res, next) => {
        Service.find({_id:req.param('id')})
            .then(data=>{res.json(data)})
            .catch(err=>{res.json(err)}) 
    },
    update: (req, res, next) => {
        Service.findOne({_id:req.param('id')})
            .then(data=>{
                data.name        = req.body.name        || data.name;
                data.description = req.body.description || data.description;
                data.image       = req.body.image       || data.image;
                data.status      = req.body.status      || data.status;
                data.alarm       = req.body.alarm       || data.alarm;
                if(req.user.sub == data.user_id){
                    data.save();
                }
                res.json(data)
            })
            .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        Service.deleteOne({_id:req.param('id')})
             .then(data=>{
                res.json(data)
             })
             .catch(err=>{res.json(err)}) 
    }
}

module.exports = controller;