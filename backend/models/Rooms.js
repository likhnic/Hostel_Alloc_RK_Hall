const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const RoomSchema=new Schema({

    roomid:{
        type:String,
        required: true
    },
    total:{
        type:Number,
        default:1,
        required: true
    },
    available:{
        type:Number,
        default:1,
        required: true
    }
})

const Room=mongoose.model('room',RoomSchema)
module.exports=Room