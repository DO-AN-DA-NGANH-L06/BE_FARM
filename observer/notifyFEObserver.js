let io = null;

const notifyFEObserver = {
  setIO(ioInstance) {
    io = ioInstance;
  },
  update({ feed, value }) {
    if (io) {
    io.emit('new-data', { feed, value });
    console.log(`[Socket.IO] Đã gửi 'new-data' tới FE: feed=${feed}, value=${value}`)
}
  },
};

module.exports = notifyFEObserver;
