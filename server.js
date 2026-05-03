const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

// MongoDB ulanishi (Mahalliy yoki Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/cvbuilder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB-ga muvaffaqiyatli ulanildi"))
  .catch(err => console.error("Bazaga ulanishda xato:", err));

// CV Schema (Ma'lumotlar tuzilishi)
const CVSchema = new mongoose.Schema({
    name: String,
    job: String,
    email: String,
    phone: String,
    address: String,
    about: String,
    education: String,
    experience: String,
    skills: String,
    photo: String, // Base64 formatida
    theme: String,
    updatedAt: { type: Date, default: Date.now }
});

const CV = mongoose.model('CV', CVSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Rasm uchun limitni oshiramiz

// CV ma'lumotlarini saqlash yoki yangilash
app.post('/save-cv', [
    // Ma'lumotlarni validatsiya qilish
    body('email').isEmail().withMessage('Email manzili noto\'g\'ri'),
    body('name').notEmpty().withMessage('Ism kiritilishi shart'),
    body('phone').notEmpty().withMessage('Telefon raqami kiritilishi shart'),
], async (req, res) => {
    try {
        // Validatsiya xatolarini tekshirish
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;
        // Email orqali qidiramiz, bor bo'lsa yangilaymiz, yo'q bo'lsa yangi yaratamiz
        const updatedCV = await CV.findOneAndUpdate(
            { email: email },
            req.body,
            { upsert: true, new: true }
        );
        res.status(200).json({ message: "CV muvaffaqiyatli saqlandi!", data: updatedCV });
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
    }
});

// Ma'lumotlarni bazadan olish
app.get('/get-cv/:email', async (req, res) => {
    try {
        const cv = await CV.findOne({ email: req.params.email });
        if (cv) {
            res.status(200).json(cv);
        } else {
            res.status(404).json({ message: "Ma'lumot topilmadi" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server xatosi", error: err.message });
    }
});

// Barcha CV-larni ko'rish (Admin panel uchun foydali)
app.get('/all-cvs', async (req, res) => {
    try {
        const cvs = await CV.find().sort({ updatedAt: -1 });
        res.status(200).json(cvs);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));