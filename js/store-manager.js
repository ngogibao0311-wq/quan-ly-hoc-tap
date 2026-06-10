// js/store-manager.js

const StoreConfig = {
    items: [
        { id: 'theme_ocean', name: 'Đại Dương Xanh', type: 'theme', price: 150, isNonCoin: false, tag: 'Giao diện' },
        { id: 'effect_snow', name: 'Tuyết Mùa Đông', type: 'effect', price: 200, isNonCoin: false, tag: 'Hiệu ứng' },
        { id: 'pet_shiba', name: 'Chó Shiba', type: 'pet', price: 300, isNonCoin: false, tag: 'Thú cưng', value: '🐕', isIcon: true },
    ]
};

class StoreManager {
    static getItemsByType(type) {
        if (type === 'all') return StoreConfig.items;
        return StoreConfig.items.filter(item => item.type === type);
    }

    static getItemById(id) {
        return StoreConfig.items.find(item => item.id === id);
    }

    static applyItem(itemId) {
        const item = this.getItemById(itemId);
        if (!item) return;

        switch (item.type) {
            case 'theme':
                ThemeManager.applyTheme(item.id);
                break;
            case 'effect':
                EffectManager.applyEffect(item.id);
                break;
            case 'pet':
                PetManager.spawnPet(item);
                break;
        }
    }

    static renderStoreItem(item, isOwned = false, isEquipped = false, isTrial = false, isUpcoming = false) {
        let tagClass = item.tag === 'Tứ kị sĩ' ? 'tag-tu-ki-si' : 'tag-normal';
        let actionButton = '';
        let trialButton = '';

        // --- ĐOẠN MỚI: XỬ LÝ VẬT PHẨM CHƯA ĐẾN GIỜ MỞ BÁN ---
        if (isUpcoming) {
            trialButton = `<button class="btn-preview disabled" disabled>🔒 Chưa mở bán</button>`;
            // Cập nhật lại style: Nền xanh đen, chữ vàng, có viền chìm để dễ nhìn hơn
            actionButton = `<button class="btn-equip active" disabled id="countdown-btn-${item.id}" style="background: #2c3e50; color: #f1c40f; cursor: not-allowed; font-family: 'Courier New', Courier, monospace; font-size: 1.05em; font-weight: bold; border: 1px solid #7f8c8d; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">⏳ Đang tính toán...</button>`;
        }
        // ----------------------------------------------------
        else {
            // 1. Logic nút Hành động chính (Trang bị / Mua)
            if (isEquipped) {
                // Thay nút "Đang sử dụng" tĩnh thành nút "Tháo trang bị" có thể bấm được
                actionButton = `<button class="btn-equip active" onclick="StoreManager.unapplyItem('${item.id}')" style="background: rgba(225, 29, 72, 0.08); color: #e11d48; border: 1px dashed #e11d48; cursor: pointer; box-shadow: none;" title="Nhấn để tháo vật phẩm này">❌ Tháo trang bị</button>`;
            } else if (isOwned) {
                actionButton = `<button class="btn-equip" onclick="StoreManager.applyItem('${item.id}')">✨ Mặc ngay</button>`;
            } else {
                let priceDisplay = item.isNonCoin ? 'Sự kiện' : `${item.price}`;
                actionButton = `<button class="btn-buy" onclick="buyItem('${item.id}')">🛒 Mua đứt: ${priceDisplay} 🪙</button>`;
            }

            // 2. Logic nút Dùng thử & Nâng cấp
            if (item.isNonCoin) {
                trialButton = `<button class="btn-preview disabled" disabled title="Không khả dụng">🚫 Không hỗ trợ thử nghiệm</button>`;
            } else if (isTrial) {
                let trialPrice = item.price / 2;
                let refund = trialPrice * 0.3;
                let finalPrice = item.price - refund;

                trialButton = `<button class="btn-preview active" disabled>⏳ Đang trong 24h dùng thử</button>`;
                actionButton = `<button class="btn-buy upgrade" onclick="buyItem('${item.id}', true)">💎 Nâng cấp vĩnh viễn: ${finalPrice} 🪙</button>`;
            } else if (!isOwned) {
                let trialPrice = item.price / 2;
                trialButton = `<button class="btn-preview" onclick="trialItem('${item.id}')">⏳ Dùng thử 1 ngày: ${trialPrice} 🪙</button>`;
            }
        }

        // Ánh xạ tên tiếng Việt cho phân loại
        let typeName = item.type === 'theme' ? 'Giao diện' : (item.type === 'effect' ? 'Hiệu ứng' : 'Thú cưng ảo');

        return `
            <div class="store-item-card" data-type="${item.type}">
                <div class="card-glow"></div>
                <div class="item-tag ${tagClass}">${item.tag}</div>
                
                <div class="item-icon-wrapper">
                    <div class="item-icon">${this.getIconForType(item.type)}</div>
                </div>
                
                <div class="item-info">
                    <h4 class="item-name">${item.name}</h4>
                    <span class="item-type-label">${typeName}</span>
                </div>
                
                <div class="item-actions">
                    ${trialButton}
                    ${actionButton}
                </div>
            </div>
        `;
    }

    static getIconForType(type) {
        switch (type) {
            case 'theme': return '🎨';
            case 'effect': return '✨';
            case 'pet': return '🐾';
            default: return '📦';
        }
    }
}