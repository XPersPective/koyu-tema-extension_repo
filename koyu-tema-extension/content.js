// Extension başlatma
(function() {
    let currentTheme = 'standard';
    let isEnabled = true;
    
    // Ayarları yükle
    chrome.storage.sync.get(['darkThemeEnabled', 'selectedTheme'], function(result) {
        isEnabled = result.darkThemeEnabled !== false;
        currentTheme = result.selectedTheme || 'standard';
        
        if (isEnabled) {
            applyTheme(currentTheme);
        }
    });
    
    // Sistem koyu modu kontrolü
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
            if (result.darkThemeEnabled === undefined) {
                chrome.storage.sync.set({darkThemeEnabled: true});
                isEnabled = true;
                applyTheme(currentTheme);
            }
        });
    }
    
    // Mesaj dinleyicisi
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'toggleTheme') {
            isEnabled = request.enabled;
            if (isEnabled) {
                applyTheme(currentTheme);
            } else {
                removeTheme();
            }
        } else if (request.action === 'changeTheme') {
            currentTheme = request.theme;
            if (isEnabled) {
                applyTheme(currentTheme);
            }
        }
    });
    
    function applyTheme(theme) {
        removeTheme();
        
        const style = document.createElement('style');
        style.id = 'dark-theme-extension';
        style.textContent = getThemeCSS(theme);
        document.head.appendChild(style);
        
        // Body class ekle
        document.body.classList.add('dark-theme-active', `theme-${theme}`);
    }
    
    function removeTheme() {
        const existingStyle = document.getElementById('dark-theme-extension');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        document.body.classList.remove('dark-theme-active');
        ['standard', 'soft', 'high-contrast', 'blue'].forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
        });
    }
    
    function getThemeCSS(theme) {
        const baseCSS = `
            * {
                color-scheme: dark !important;
            }
        `;
        
        const themes = {
            'standard': `
                ${baseCSS}
                html, body {
                    background-color: #1a1a1a !important;
                    color: #e0e0e0 !important;
                }
                div, section, article, main, aside, nav, header, footer {
                    background-color: #2d2d2d !important;
                    color: #e0e0e0 !important;
                }
                p, span, h1, h2, h3, h4, h5, h6 {
                    color: #e0e0e0 !important;
                }
                a, a:visited {
                    color: #66b3ff !important;
                }
                input, textarea, select {
                    background-color: #333 !important;
                    color: #e0e0e0 !important;
                    border-color: #555 !important;
                }
                button {
                    background-color: #4CAF50 !important;
                    color: #000 !important;
                    border: none !important;
                }
            `,
            'soft': `
                ${baseCSS}
                html, body {
                    background-color: #2d2d2d !important;
                    color: #d0d0d0 !important;
                }
                div, section, article, main, aside, nav, header, footer {
                    background-color: #3d3d3d !important;
                    color: #d0d0d0 !important;
                }
                p, span, h1, h2, h3, h4, h5, h6 {
                    color: #d0d0d0 !important;
                }
                a, a:visited {
                    color: #87ceeb !important;
                }
                input, textarea, select {
                    background-color: #404040 !important;
                    color: #d0d0d0 !important;
                    border-color: #606060 !important;
                }
                button {
                    background-color: #5cbf60 !important;
                    color: #fff !important;
                    border: none !important;
                }
            `,
            'high-contrast': `
                ${baseCSS}
                html, body {
                    background-color: #000000 !important;
                    color: #ffffff !important;
                }
                div, section, article, main, aside, nav, header, footer {
                    background-color: #111111 !important;
                    color: #ffffff !important;
                }
                p, span, h1, h2, h3, h4, h5, h6 {
                    color: #ffffff !important;
                }
                a, a:visited {
                    color: #00ffff !important;
                }
                input, textarea, select {
                    background-color: #222 !important;
                    color: #fff !important;
                    border: 2px solid #fff !important;
                }
                button {
                    background-color: #fff !important;
                    color: #000 !important;
                    border: 2px solid #fff !important;
                }
            `,
            'blue': `
                ${baseCSS}
                html, body {
                    background-color: #1a2332 !important;
                    color: #e6f3ff !important;
                }
                div, section, article, main, aside, nav, header, footer {
                    background-color: #2d3748 !important;
                    color: #e6f3ff !important;
                }
                p, span, h1, h2, h3, h4, h5, h6 {
                    color: #e6f3ff !important;
                }
                a, a:visited {
                    color: #90cdf4 !important;
                }
                input, textarea, select {
                    background-color: #2a4365 !important;
                    color: #e6f3ff !important;
                    border-color: #4299e1 !important;
                }
                button {
                    background-color: #4299e1 !important;
                    color: #1a202c !important;
                    border: none !important;
                }
            `
        };
        
        return themes[theme] || themes['standard'];
    }
})();