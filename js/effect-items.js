// js/effect-items.js

class EffectManager {
    static container = document.getElementById('global-effect-container');
    static currentInterval = null;

    static clearEffects() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        if (this.container) this.container.innerHTML = '';
    }

    static applyEffect(effectId) {
        this.clearEffects();
        if (!this.container) return;

        switch (effectId) {
            case 'effect_snow':
                this.createSnowEffect();
                break;
            // Thêm các case hiệu ứng khác ở đây
        }
        localStorage.setItem('active_effect', effectId);
    }

    static createSnowEffect() {
        this.currentInterval = setInterval(() => {
            const snowflake = document.createElement('div');
            snowflake.classList.add('effect-snowflake');
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
            
            this.container.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, 5000);
        }, 300);
    }
}