const {saveLimitModel,getLimitByDevice} = require('../models/limitModel')

 
const saveLimit = async (device, limit_up, limit_down) => {
    await saveLimitModel(device, limit_up, limit_down)
}



module.exports = {
    saveLimit
}