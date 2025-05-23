
# 🚜 BE_FARM – Backend for Smart Farming System

Đây là hệ thống backend hỗ trợ quản lý và điều khiển các thiết bị nông nghiệp thông minh như cảm biến nhiệt độ, độ ẩm, ánh sáng, độ ẩm đất, máy bơm và đèn LED. Dữ liệu được lấy và điều khiển thông qua **Adafruit IO** và lưu trữ trong **MySQL**.

---

## 📁 Cấu trúc `.env`

Trước khi chạy project, hãy tạo một file `.env` tại thư mục gốc với nội dung sau:

```env
# Cấu hình Database MySQL
DB_HOST=localhost
DB_USER=root
DB_PASS=12345678
DB_NAME=Farm

# Adafruit IO credentials
ADAFRUIT_USERNAME=ihabcoT
ADAFRUIT_KEY=aio_pRHS16uPS54M7XwlwDZ8t8Ltvi37

# Các feed sử dụng trong Adafruit IO
FEED_HUMID=farmgenius-grapegrow.bbc-humidity
FEED_LIGHT=farmgenius-grapegrow.bbc-light
FEED_TEMP=farmgenius-grapegrow.bbc-temp
FEED_SOIL=farmgenius-grapegrow.bbc-soil
FEED_PUMP=farmgenius-grapegrow.bbc-pump
FEED_LED=farmgenius-grapegrow.bbc-led

# JWT Secret và Port
JWT_SECRET=12345678
PORT=3000
```

---

## ⚙️ Các bước cài đặt & chạy backend

### 1. Tạo cơ sở dữ liệu MySQL

Hãy chắc rằng bạn đã cài đặt MySQL. Sau đó tạo database mới bằng code trong file database_chinh.sql

### 2. Cài đặt dependencies

Chạy lệnh sau trong thư mục backend:

```bash
npm install
```

---

### 3. Chạy ứng dụng ở chế độ development

```bash
npm run dev
```

> ⚠️ Ứng dụng sẽ chạy mặc định ở cổng `3000` hoặc cổng được định nghĩa trong biến `PORT` của `.env`.

---

## 🧪 Các chức năng chính

- Kết nối với Adafruit IO để đọc/gửi dữ liệu từ cảm biến.
- API cho Frontend giao tiếp.
- Điều khiển thiết bị: bơm nước, đèn LED qua MQTT hoặc REST API.
- Xác thực bằng JWT (Token-based).
- Swagger để giao tiếp giữa BE developer với FE developer 

---

## 📦 Công nghệ sử dụng

- **Node.js + Express**
- **MySQL**
- **Adafruit IO API**
- **JWT (JSON Web Token)**
- **Swagger**
- **dotenv** – quản lý biến môi trường

---


