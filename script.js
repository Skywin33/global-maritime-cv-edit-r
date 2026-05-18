// Görseldeki gibi profesyonel veri işleme
function liveUpdate() {
    const dataMap = {
        'inName': 'outName',
        'inRank': 'outRank',
        'inExp': 'outExp',
        'inDocs': 'outDocs'
    };

    for (let key in dataMap) {
        let val = document.getElementById(key).value;
        document.getElementById(dataMap[key]).innerText = val || "...";
    }
}

// Şablon ve Tema Değiştirme
function setTheme(themeName) {
    const page = document.getElementById('a4Page');
    page.className = 'cv-document theme-' + themeName;
    
    // Aktif butonu işaretle
    document.querySelectorAll('.tpl-option').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Fotoğraf İşleme (Vesikalık standartları)
function processImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('outPhoto').src = e.target.result;
            saveCVData();
        }
        reader.readAsDataURL(input.files[0]);
    }
}
// VERİLERİ KAYDET
function saveCVData() {
    const fields = ['inName', 'inRank', 'inExp', 'inDocs'];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            localStorage.setItem(id, el.value);
        }
    });

    const photo = document.getElementById('outPhoto');
    if (photo && photo.src && !photo.src.includes('placeholder')) {
        localStorage.setItem('cvPhoto', photo.src);
    }
}

// VERİLERİ GERİ YÜKLE
function loadCVData() {
    const fields = ['inName', 'inRank', 'inExp', 'inDocs'];

    fields.forEach(id => {
        const saved = localStorage.getItem(id);
        const el = document.getElementById(id);

        if (saved && el) {
            el.value = saved;
        }
    });

    const savedPhoto = localStorage.getItem('cvPhoto');
    if (savedPhoto) {
        const photo = document.getElementById('outPhoto');
        if (photo) {
            photo.src = savedPhoto;
        }
    }

    liveUpdate();
}
// INPUT DEĞİŞİNCE OTOMATİK KAYDET
document.addEventListener('DOMContentLoaded', () => {
    loadCVData();

    const fields = ['inName', 'inRank', 'inExp', 'inDocs'];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                liveUpdate();
                saveCVData();
            });
        }
    });
});
// MANUEL KAYDET
function manualSave() {
    saveCVData();
    alert("CV bilgileri kaydedildi.");
}

// TÜM VERİLERİ TEMİZLE
function clearCV() {
    if (confirm("Tüm kayıtlı CV bilgileri silinsin mi?")) {
        const fields = ['inName', 'inRank', 'inExp', 'inDocs'];

        fields.forEach(id => {
            localStorage.removeItem(id);
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        localStorage.removeItem('cvPhoto');

        const photo = document.getElementById('outPhoto');
        if (photo) {
            photo.src = '';
        }

        liveUpdate();
        alert("Tüm bilgiler temizlendi.");
    }
}
