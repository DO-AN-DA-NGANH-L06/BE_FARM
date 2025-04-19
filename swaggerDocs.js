/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Thiếu username hoặc password
 *       409:
 *         description: Username đã có rồi
 *       500:
 *         description: Lỗi trong server
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trả về token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Không khớp
 *       500:
 *         description: Lỗi trong server
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Đăng xuất
 *     responses:
 *       200:
 *         description: Đăng xuất
 */

/**
 * @swagger
 * /device/limited:
 *   post:
 *     summary: Thiết lập giới hạn cho thiết bị
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *                 enum: [soil, humid, led, pump, light, temp]
 *               limit_up:
 *                 type: number
 *               limit_down:
 *                 type: number
 *     responses:
 *       200:
 *         description: Đã lưu giới hạn
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /device/limited?device={device}:
 *   get:
 *     summary: Lấy giới hạn cho thiết bị
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: device
 *         required: true
 *         schema:
 *           type: string
 *           enum: [soil, humid, led, pump, light, temp]
 *         description: Loại thiết bị cần lấy giới hạn
 *     responses:
 *       200:
 *         description: Dữ liệu limited của cảm biến
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: object
 *                   properties:
 *                     limit_up:
 *                       type: number
 *                     limit_down:
 *                       type: number
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */


/**
 * @swagger
 * /device/graph:
 *   get:
 *     summary: Lấy dữ liệu biểu đồ
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dữ liệu cảm biến
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temp:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       value:
 *                         type: number
 *                 humid:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       value:
 *                         type: number
 *                 light:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       value:
 *                         type: number
 *                 soil:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       value:
 *                         type: number
 *       500:
 *         description: Lỗi server khi truy vấn
 */

/**
 * @swagger
 * /device/control:
 *   post:
 *     summary: Điều khiển thiết bị (led hoặc pump)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *                 enum: [led, pump]
 *               level:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       200:
 *         description: Đã gửi mức độ
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * Socket-io:
 *   get:
 *     summary: Mô tả socket emit
 *     description: |
 *       Các socket emit:
 *       - `new-data`: { feed, value }
 *       - `notification`: { feed, value } (dành cho thông báo feed có value đang vượt ra ngoài limit) hoặc { noti } (dành cho thông báo đã bật led và pump để khắc phục)
 *       - noti là : Đã tiến hành bật thiết bị trong vòng 5s để cố gắng khắc phục
 *       - Feed gồm: farmgenius-grapegrow.bbc-humidity ,farmgenius-grapegrow.bbc-light, farmgenius-grapegrow.bbc-temp, farmgenius-grapegrow.bbc-soil, farmgenius-grapegrow.bbc-pump, farmgenius-grapegrow.bbc-led
 *     responses:
 *       200:
 *         description: Mô tả thành công
 */

// 👇 dummy để tránh lỗi nếu cần export
module.exports = {};
