# 🌙 Koyu Tema Chrome Extension

Web sayfalarını göz yormayan koyu temalara çeviren Chrome uzantısı.

## ✨ Özellikler

- 🎨 **4 Farklı Koyu Tema**
  - Standart Koyu
  - Yumuşak Koyu  
  - Yüksek Kontrast
  - Mavi Koyu

- ⚡ **Hızlı ve Kolay**
  - Tek tıkla tema değiştirme
  - Otomatik tema hatırlama
  - Tüm web siteleriyle uyumlu

- 🔒 **Gizlilik Odaklı**
  - Hiçbir veri toplama
  - Sadece yerel depolama
  - Açık kaynak kod

## 🚀 Kurulum

### Chrome Web Store'dan
1. [Chrome Web Store](https://chrome.google.com/webstore) sayfasına gidin
2. "Koyu Tema" uzantısını arayın
3. "Chrome'a Ekle" butonuna tıklayın

### Geliştirici Modunda
1. Chrome'da `chrome://extensions/` adresine gidin
2. "Geliştirici modu"nu açın
3. "Paketlenmemiş uzantı yükle" seçin
4. `koyu-tema-extension` klasörünü seçin

## 📁 Dosya Yapısı

```
koyu-tema-extension/
├── manifest.json          # Extension yapılandırması
├── popup.html             # Popup arayüzü
├── popup.js              # Popup JavaScript
├── content.js            # İçerik scripti
├── themes.css            # Tema stilleri
└── icons/                # Extension simgeleri
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🛠️ Geliştirme

### Gereksinimler
- Chrome Browser
- Temel HTML/CSS/JavaScript bilgisi

### Test Etme
1. Değişiklikleri yapın
2. Chrome'da uzantıyı yeniden yükleyin
3. Test web sayfalarında deneyin

### Yeni Tema Ekleme
1. `themes.css` dosyasına yeni tema stilleri ekleyin
2. `popup.js` dosyasında tema seçeneklerini güncelleyin
3. `popup.html` dosyasında yeni buton ekleyin

## 📊 Chrome Web Store Görselleri

Proje, Chrome Web Store için gerekli tüm görselleri otomatik oluşturan bir araç içerir:

```bash
# Görselleri oluşturmak için
open simple-image-generator.html
```

Oluşturulan görseller:
- 🎯 Store Icon (128x128)
- 📸 Screenshot (1280x800)  
- 🎨 Promo Tile (440x280)
- 🌟 Marquee (1400x560)

## 🔐 Gizlilik

Bu uzantı:
- ❌ Hiçbir kişisel veri toplamaz
- ❌ İnternet bağlantısı gerektirmez
- ❌ Üçüncü taraflarla veri paylaşmaz
- ✅ Sadece tema tercihlerini yerel olarak saklar

Detaylı bilgi için [Gizlilik Politikası](privacy-policy.html) sayfasını ziyaret edin.

## 📝 İzinler

| İzin | Amaç |
|------|------|
| `activeTab` | Aktif sekmede tema uygulama |
| `storage` | Tema tercihlerini kaydetme |
| `*://*/*` | Tüm web sitelerine erişim |

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik ekle'`)
4. Branch'inizi push edin (`git push origin yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında yayınlanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🐛 Hata Bildirimi

Hata bulduysanız veya öneriniz varsa:
- GitHub Issues sayfasını kullanın
- Chrome Web Store'da yorum bırakın

## 📞 İletişim

- GitHub: [koyu-tema-extension](https://github.com/username/koyu-tema-extension)
- Chrome Web Store: [Koyu Tema](https://chrome.google.com/webstore)

---

⭐ **Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

🌙 **Gözlerinizi koruyun, koyu tema kullanın!**
# koyu-tema-extension_repo
