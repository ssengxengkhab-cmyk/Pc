// ===== ไฟล์ตั้งค่า Firebase (โปรเจกต์ใหม่) =====
// แก้เฉพาะข้อความในเครื่องหมายคำพูด โดยเอาค่าจริงจาก Firebase > Project settings > Your apps > Config
// ห้ามลบเครื่องหมาย " หรือ , ท้ายบรรทัด (บรรทัด appId ไม่มี , ท้ายบรรทัด)
export const firebaseConfig = {
  apiKey: "AIzaSyCc7r01hqjm3pDd5HpvFfWkdp_7Y64TOqs",
  authDomain: "pohon-b6e77.firebaseapp.com",
  projectId: "pohon-b6e77",
  storageBucket: "pohon-b6e77.firebasestorage.app",
  messagingSenderId: "240959445571",
  appId: "1:240959445571:web:00b4aa93e0275a7dc192f6"
};

// (ไม่บังคับ) ลิงก์ Google Apps Script สำหรับแจ้งเตือนเข้า Telegram ถ้ายังไม่ใช้ปล่อยว่างไว้
export const telegramRelayUrl = "";
