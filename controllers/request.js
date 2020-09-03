const error_types   = require('./error_types');
const Service       = require('../Models/service');
const Request       = require('../Models/request');
const Work          = require('../Models/work');

let controller = {
    create: (req, res, next) => {
      let document = new Request({
                            user_id:     req.user.sub,
                            service_id:  req.body.service,
                            from_lat:    req.body.from_lat,
                            from_lng:    req.body.from_lng,
                            to_lat:      req.body.to_lat,
                            to_lng:      req.body.to_lng,
                            from_time:   req.body.from_time,
                            status:      'pending'
                        }); 
      document.save()
              .then(data => res.json({data: data}))
              .catch(err => next(err));
    },
    getU: (req, res, next) => {
        Request.find({user_id: req.param('id')})
            .sort({status: 1, created_at: 1})
            .then(data=>res.json(data));
    },
    getS: (req, res, next) => {
        Request.find({service_id: req.param('id')})
            .sort({status: 1, created_at: 1})
            .then(data=>res.json(data));
    },
    getM: (req, res, next) => {
        Request.find({manager_id: req.param('id')})
            .sort({status: 1, created_at: 1})
            .then(data=>res.json(data));
    },
    update: (req, res, next) => {
        Request.findOne({_id:req.param('id')})
               .then(data=>{
                 if(req.user.sub == data.user_id){
                    data.from_lat = req.body.from_lat  || data.from_lat;
                    data.from_lng = req.body.from_lng  || data.from_lng;
                    data.to_lat = req.body.to_lat      || data.to_lat;
                    data.to_lng = req.body.to_lng      || data.to_lng;
                    data.from_time = req.body.from_time|| data.from_time;
                    data.qualification = req.body.qualification ||
                                         data.qualification;
                    data.msg = req.body.msg || data.msg;
                    data.save();
                  }else{
                    if(req.user.sub == data.manager_id){
                      data.status = req.body.status;
                      data.delivery_time = req.body.delivery_time || data.delivery_time;
                      data.save();
                    }else{
                      Service.findOne({_id: data.service_id})
                             .then(service =>{
                              if(service.user_id == req.user.sub){
                                data.manager_id = req.body.user;
                                data.status = 'acepted';
                                data.save();
                              }
                             });
                    }
                  }
                  res.json(data)
                 })
                .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        Request.findOne({_id: req.param('id')})
               .then(request=>{
                    if(request.user_id == req.user.sub && request.status == 'pending'){
                        Request.deleteOne({_id:req.param('id')})
                                 .then(data=>{
                                    res.json(data)
                                 })
                                 .catch(err=>{res.json(err)})  
                    }else{
                       res.json(request);
                    }
                });
    }, 
    stats: (req, res, next) =>{
      Work.aggregate([
                         {$match: {user_id: req.user.sub}}, 
                         {$group: {_id: null, total : {$sum: "$time"}}}
             ])
             .then(data=>{
                 Request.countDocuments({user_id: req.user.sub, status: 'delivered'})
                     .then(deliveries =>{
                         let stats = {
                             numberDeliveries: deliveries, 
                             TimeWork: data[0].total/60
                         };
                         res.json(stats);
                     })
                     .catch(res.json(data));
             })
             .catch(err=>{res.json(err)});
    }
}

module.exports = controller;