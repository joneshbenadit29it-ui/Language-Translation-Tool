const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');
const translateBtn = document.getElementById('translate-btn');
const copyBtn = document.getElementById('copy-target');
const speakSourceBtn = document.getElementById('speak-source');
const speakTargetBtn = document.getElementById('speak-target');

// 1. Translation Logic
translateBtn.addEventListener('click', () => {
    let text = sourceText.value.trim();
    if (!text) return;

    targetText.placeholder = "Translating...";
    
    // Using MyMemory Free Translation API
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang.value}|${targetLang.value}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            targetText.value = data.responseData.translatedText;
        })
        .catch(error => {
            console.error("Error with translation:", error);
            targetText.placeholder = "Error fetching translation.";
        });
});

// 2. Copy to Clipboard Feature
copyBtn.addEventListener('click', () => {
    if (targetText.value) {
        navigator.clipboard.writeText(targetText.value);
        alert("Translation copied to clipboard! 🎉");
    }
});

// 3. Text-to-Speech Feature (Source)
speakSourceBtn.addEventListener('click', () => {
    if (sourceText.value) {
        let utterance = new SpeechSynthesisUtterance(sourceText.value);
        utterance.lang = sourceLang.value;
        window.speechSynthesis.speak(utterance);
    }
});

// 4. Text-to-Speech Feature (Target)
speakTargetBtn.addEventListener('click', () => {
    if (targetText.value) {
        let utterance = new SpeechSynthesisUtterance(targetText.value);
        utterance.lang = targetLang.value;
        window.speechSynthesis.speak(utterance);
    }
});