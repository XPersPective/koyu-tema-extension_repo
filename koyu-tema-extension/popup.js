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
            
            // Aktif sekmeye tema değişikliğini bildir
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'changeTheme',
                    theme: theme
                });
            });
        });
    });
    
    // Toggle butonu
    toggleBtn.addEventListener('click', function() {
        chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
            const newState = !(result.darkThemeEnabled !== false);
            
            chrome.storage.sync.set({darkThemeEnabled: newState});
            updateStatus(newState);
            
            // Aktif sekmeye durum değişikliğini bildir
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'toggleTheme',
                    enabled: newState
                });
            });
        });
    });
    
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