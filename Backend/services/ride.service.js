const rideModel = require('../models/ride.model')
const mapService = require('../services/maps.service')
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are require');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // if(!distanceTime || !distanceTime.distance || !distanceTime.duration){
    //     throw new Error('Unable to get distance and duration');
    // }

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    }
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    }

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance / 1000) * perKmRate.auto) + ((distanceTime.duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance / 1000) * perKmRate.car) + ((distanceTime.duration/ 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance / 1000) * perKmRate.moto) + ((distanceTime.duration / 60) * perMinuteRate.moto))
    };



    // Object.keys(fare).forEach(key => {
    //     if(isNaN(fare[key])){
    //         throw new Error(`Invalid fare calculation for ${key}`);
    //     }
    // });

    return fare;
}

module.exports.getFare = getFare

function getOtp(num){
   function generateOpt(num){
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
   }
   return generateOpt(num);
}
module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!pickup || !destination || !vehicleType) {
        throw new Error('All field are required');
    }

    const fare = await getFare(pickup, destination);

    // if(!fare[vehicleType]){
    //     throw new Error(`Invalid vehicle type: ${vehicleType}. Available type:${Object.keys(fare).join(', ')} `);
    // }

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })
    
    return ride;
}

module.exports.confirmRide = async ({
    rideId,captain
})=>{
    if(!rideId){
        throw new Error('Ride id is required');
    }

   await rideModel.findByIdAndUpdate({
        _id: rideId
        
   }, {
    status: 'Confirmed',
    captain: 'captain._id'
   })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }
   
    return ride.save();
}

module.exports.startRide = async ({rideId, otp, captain}) => {
    if(!rideId || !otp){
        throw new Error('Rode id and otp are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'Confirmed'){
        throw new Error('Ride not confirmed yet')
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await rideModel.findByIdAndUpdate({
        _id: rideId
    }, {
        status: 'Ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({rideId, captain}) => {
    if(!rideId){
        throw new Error('Rode id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'Ongoing'){
        throw new Error('Ride not ongoing')
    }

    await rideModel.findByIdAndUpdate({
        _id: rideId
    }, {
        status: 'Completed'
    })

    return ride;
}
