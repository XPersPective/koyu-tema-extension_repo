document.addEventListener('DOMContentLoaded', function() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const statusDiv = document.getElementById('status');
    const toggleBtn = document.getElementById('toggle');
    
    // Mevcut durumu yükle
    chrome.storage.sync.get(['darkThemeEnabled', 'selectedTheme'], function(result) {
        const isEnabled = result.darkThemeEnabled !== false;
        const theme = result.selectedTheme || 'standard';
        
        updateStatus(isEnabled);
        updateActiveTheme(theme);
    });
    
    // Tema seçimi
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            chrome.storage.sync.set({selectedTheme: theme});
            updateActiveTheme(theme);
            
            // Aktif sekmeye tema uygula
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                // CSS ve JS'yi aktif sekmeye enjekte et
                applyThemeToActiveTab(tabs[0].id, theme, true);
            });
        });
    });
    
    // Toggle butonu
    toggleBtn.addEventListener('click', function() {
        chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
            const newState = !(result.darkThemeEnabled !== false);
            
            chrome.storage.sync.set({darkThemeEnabled: newState});
            updateStatus(newState);
            
            // Aktif sekmeye durum gönder
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.storage.sync.get(['selectedTheme'], function(themeResult) {
                    const theme = themeResult.selectedTheme || 'standard';
                    applyThemeToActiveTab(tabs[0].id, theme, newState);
                });
            });
        });
    });
    
    // Aktif sekmeye tema uygulama fonksiyonu
    function applyThemeToActiveTab(tabId, theme, enabled) {
        if (enabled) {
            // CSS dosyasını enjekte et
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['themes.css']
            });
            
            // Content script'i enjekte et
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            }, function() {
                // Script yüklendikten sonra tema mesajı gönder
                chrome.tabs.sendMessage(tabId, {
                    action: 'changeTheme',
                    theme: theme
                });
            });
        } else {
            // CSS'yi kaldır
            chrome.scripting.removeCSS({
                target: { tabId: tabId },
                files: ['themes.css']
            });
            
            chrome.tabs.sendMessage(tabId, {
                action: 'toggleTheme',
                enabled: false
            });
        }
    }
    
    function updateStatus(enabled) {
        if (enabled) {
            statusDiv.textContent = '✅ Koyu tema aktif';
            statusDiv.className = 'status enabled';
            toggleBtn.textContent = '🌞 Kapatı';
            toggleBtn.className = 'toggle-btn disable';
        } else {
            statusDiv.textContent = '❌ Koyu tema kapalı';
            statusDiv.className = 'status disabled';
            toggleBtn.textContent = '🌙 Aktif Yap';
            toggleBtn.className = 'toggle-btn enable';
        }
    }
    
    function updateActiveTheme(theme) {
        themeOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    }
});