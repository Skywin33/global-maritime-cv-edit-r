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
        }
        reader.readAsDataURL(input.files[0]);
    }
}