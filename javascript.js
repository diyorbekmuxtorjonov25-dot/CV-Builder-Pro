const translations = {
    uz: {
        title: "CV Builder Pro",
        btnPdf: "PDF Yuklash",
        btnWord: "Word Yuklash",
        btnSave: "Saqlash (Backend)",
        btnLoad: "Yuklash",
        tagMain: "Asosiy",
        tagSocial: "Ijtimoiy",
        tagInfo: "Ma'lumotlar",
        labelPhoto: "Profil rasmi:",
        placeholderName: "To'liq ismingiz",
        placeholderJob: "Kasbingiz",
        placeholderEmail: "Email",
        placeholderPhone: "Telefon raqami",
        placeholderLinkedin: "LinkedIn havolasi",
        placeholderGithub: "GitHub havolasi",
        placeholderAddress: "Manzilingiz",
        labelAbout: "Men haqimda",
        labelEdu: "Ta'lim",
        labelExp: "Ish tajribasi",
        labelLinkedin: "LinkedIn profili",
        labelGithub: "GitHub profili",
        labelSkills: "Ko'nikmalar (vergul bilan ajrating)",
        placeholderAbout: "O'zingiz haqingizda qisqacha...",
        placeholderEdu: "O'qish joyingiz, yillar...",
        placeholderExp: "Kompaniya nomi va vazifalaringiz...",
        placeholderSkills: "JavaScript, Python, React...",
        previewName: "Ism Familiya",
        previewJob: "Sizning Kasbingiz",
        previewAbout: "Men haqimda",
        previewAboutText: "Ma'lumotlar bu yerda ko'rinadi...",
        previewEdu: "Ta'lim",
        previewEduText: "O'qish joyingiz...",
        previewExp: "Ish tajribasi",
        previewExpText: "Kompaniya nomi va vazifalaringiz...",
        previewSkills: "Ko'nikmalar",
        previewContact: "Aloqa",
        previewEmail: "Email manzilingiz",
        previewPhone: "Telefon raqamingiz",
        previewAddress: "Manzilingiz"
    },
    ru: {
        title: "Конструктор резюме",
        btnPdf: "Скачать PDF",
        btnWord: "Скачать Word",
        btnSave: "Сохранить (Backend)",
        btnLoad: "Загрузить",
        tagMain: "Основное",
        tagSocial: "Соц. сети",
        tagInfo: "Данные",
        labelPhoto: "Фото профиля:",
        placeholderName: "Ваше полное имя",
        placeholderJob: "Профессия",
        placeholderEmail: "Электронная почта",
        placeholderPhone: "Номер телефона",
        placeholderLinkedin: "Ссылка на LinkedIn",
        placeholderGithub: "Ссылка на GitHub",
        placeholderAddress: "Ваш адрес",
        labelAbout: "Обо мне",
        labelEdu: "Образование",
        labelExp: "Опыт работы",
        labelLinkedin: "Профиль LinkedIn",
        labelGithub: "Профиль GitHub",
        labelSkills: "Навыки (через запятую)",
        placeholderAbout: "Кратко о себе...",
        placeholderEdu: "Место учебы, годы...",
        placeholderExp: "Название компании и обязанности...",
        placeholderSkills: "JavaScript, Python, React...",
        previewName: "Имя Фамилия",
        previewJob: "Ваша Профессия",
        previewAbout: "Обо мне",
        previewAboutText: "Информация появится здесь...",
        previewEdu: "Образование",
        previewEduText: "Место обучения...",
        previewExp: "Опыт работы",
        previewExpText: "Компания и обязанности...",
        previewSkills: "Навыки",
        previewContact: "Контакты",
        previewEmail: "Ваш Email",
        previewPhone: "Ваш телефон",
        previewAddress: "Ваш адрес"
    },
    en: {
        title: "CV Builder Pro",
        btnPdf: "Download PDF",
        btnWord: "Download Word",
        btnSave: "Save (Backend)",
        btnLoad: "Load",
        tagMain: "Basic",
        tagSocial: "Social",
        tagInfo: "Information",
        labelPhoto: "Profile photo:",
        placeholderName: "Full Name",
        placeholderJob: "Job Title",
        placeholderEmail: "Email",
        placeholderPhone: "Phone Number",
        placeholderLinkedin: "LinkedIn link",
        placeholderGithub: "GitHub link",
        placeholderAddress: "Address",
        labelAbout: "About Me",
        labelEdu: "Education",
        labelExp: "Experience",
        labelLinkedin: "LinkedIn Profile",
        labelGithub: "GitHub Profile",
        labelSkills: "Skills (comma separated)",
        placeholderAbout: "Briefly about yourself...",
        placeholderEdu: "Education place, years...",
        placeholderExp: "Company name and duties...",
        placeholderSkills: "JavaScript, Python, React...",
        previewName: "First Last Name",
        previewJob: "Your Profession",
        previewAbout: "About Me",
        previewAboutText: "Information will appear here...",
        previewEdu: "Education",
        previewEduText: "Your education...",
        previewExp: "Experience",
        previewExpText: "Company and duties...",
        previewSkills: "Skills",
        previewContact: "Contact",
        previewEmail: "Your Email",
        previewPhone: "Your Phone",
        previewAddress: "Your Address"
    }
};

function changeLanguage() {
    const lang = document.getElementById('lang-select').value;
    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    updateCV();
}

function updateCV() {
    const lang = document.getElementById('lang-select').value;
    const t = translations[lang];

    const fields = ['name', 'job', 'about', 'edu', 'exp', 'email', 'phone', 'address'];
    fields.forEach(f => {
        const val = document.getElementById('in-' + f)?.value;
        const out = document.getElementById('out-' + f);
        if (out) out.innerText = val || t['preview' + f.charAt(0).toUpperCase() + f.slice(1) + (f==='about'||f==='edu'||f==='exp'?'Text':'')] || "";
    });

    // Social links logic
    const socials = ['linkedin', 'github'];
    const socialOut = document.getElementById('out-socials');
    socialOut.innerHTML = '';
    socials.forEach(s => {
        const val = document.getElementById('in-' + s).value;
        if (val) {
            const link = document.createElement('a');
            link.href = val.startsWith('http') ? val : 'https://' + val;
            link.target = '_blank';
            link.innerHTML = `<i class="fab fa-${s}"></i>`;
            socialOut.appendChild(link);
        }
    });
    
    // Skills container logic
    const skillsText = document.getElementById('in-skills').value;
    const container = document.getElementById('out-skills');
    container.innerHTML = '';
    skillsText.split(',').forEach(s => {
        if (s.trim()) {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.innerText = s.trim();
            container.appendChild(span);
        }
    });
}

function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.getElementById('cv-template').className = 'cv-paper ' + theme;
}

function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Rasmni optimallashtirish (Canvas yordamida)
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400; // Profil rasmi uchun yetarli kenglik
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Hajmni kamaytirish (JPEG formatida 0.7 sifat bilan)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            document.getElementById('out-photo').src = compressedBase64;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

async function saveCV() {
    const cvData = {
        name: document.getElementById('in-name').value,
        job: document.getElementById('in-job').value,
        email: document.getElementById('in-email').value,
        phone: document.getElementById('in-phone').value,
        address: document.getElementById('in-address').value,
        about: document.getElementById('in-about').value,
        education: document.getElementById('in-edu').value,
        experience: document.getElementById('in-exp').value,
        skills: document.getElementById('in-skills').value,
        photo: document.getElementById('out-photo').src,
        theme: document.getElementById('theme-select').value
    };

    try {
        const res = await fetch('http://localhost:3000/save-cv', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(cvData)});
        const data = await res.json();
        if (res.ok) {
            alert(data.message);
        } else {
            alert("Xatolik: " + (data.errors ? data.errors.map(err => err.msg).join(", ") : data.message));
        }
    } catch (e) { alert("Serverga ulanishda xato!"); }
}

async function loadCV() {
    const email = document.getElementById('in-email').value;
    if (!email) {
        alert("Ma'lumotlarni yuklash uchun avval emailni kiriting!");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/get-cv/${email}`);
        if (res.ok) {
            const data = await res.json();
            // Inputlarni to'ldirish
            document.getElementById('in-name').value = data.name || "";
            document.getElementById('in-job').value = data.job || "";
            document.getElementById('in-phone').value = data.phone || "";
            document.getElementById('in-address').value = data.address || "";
            document.getElementById('in-about').value = data.about || "";
            document.getElementById('in-edu').value = data.education || "";
            document.getElementById('in-exp').value = data.experience || "";
            document.getElementById('in-skills').value = data.skills || "";
            document.getElementById('out-photo').src = data.photo || "https://via.placeholder.com/150";
            document.getElementById('theme-select').value = data.theme || "theme-classic";
            
            // UI-ni yangilash
            changeTheme();
            updateCV();
            alert("Ma'lumotlaringiz muvaffaqiyatli yuklandi!");
        } else {
            alert("Ushbu email bilan saqlangan CV topilmadi.");
        }
    } catch (e) { alert("Serverdan ma'lumot olishda xato!"); }
}

function downloadPDF() {
    const element = document.getElementById('cv-template');
    html2pdf().from(element).save('cv.pdf');
}

function downloadWord() {
    const content = document.getElementById('cv-template').innerHTML;
    const converted = htmlDocx.asBlob(content);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(converted);
    link.download = 'cv.docx';
    link.click();
}

// Sahifa yuklanganda saqlangan rejimni tekshirish
window.addEventListener('DOMContentLoaded', () => {
    updateCV();
});