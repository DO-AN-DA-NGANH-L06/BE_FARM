const {saveLimitModel,getLimitByDevice} = require('../models/limitModel')

 
const saveLimit = async (device, limit_up, limit_down) => {
    await saveLimitModel(device, limit_up, limit_down)
}

const getLimit = async (device) => {
    const limit = await getLimitByDevice(device)
    if (!limit) {
        return { error: 'Không tìm thấy giới hạn cho thiết bị này' };
    }
    return limit
}



module.exports = {
    saveLimit,
    getLimit
}