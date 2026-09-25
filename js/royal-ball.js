// js/royal-ball.js

const RoyalBallEvent = {
    isDancing: false,
    defaultSettings: { probItem: 5, probCoin: 95, isEnabled: true, useCustomDates: false, startDate: '', endDate: '' },
    currentSettings: null,
    serverTimeOffset: 0,

    async syncServerTimeOffset() {
        try {
            const snapshot = await db
                .ref('.info/serverTimeOffset')
                .once('value');

            this.serverTimeOffset =
                Number(snapshot.val()) || 0;
        } catch (error) {
            console.warn(
                '[RoyalBall] Không đồng bộ được serverTimeOffset:',
                error
            );
        }

        return this.serverTimeOffset;
    },

    getServerNow: function () {
        return Date.now() + (Number(this.serverTimeOffset) || 0);
    },

    getVietnamDateKey: function (timestamp = this.getServerNow()) {
        return new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(timestamp));
    },

    escapeHTML: function (value) {
        return String(value ?? '').replace(
            /[&<>"']/g,
            character => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            })[character]
        );
    },

    updateStudentEventCard: function (settings) {
        const card =
            document.getElementById('royalEventCard');

        const joinButton =
            document.getElementById('btnRoyalJoin');

        const description =
            document.getElementById('royalEventDesc');

        /*
         * Trang giáo viên có thể không có các thẻ này.
         */
        if (!card || !joinButton || !description) {
            return;
        }

        const safeSettings = {
            ...this.defaultSettings,
            ...(settings || {})
        };

        this.currentSettings = safeSettings;

        const now = new Date(this.getServerNow());

        const formatDate = dateString => {
            if (!dateString) return '';

            const parts =
                String(dateString).split('-');

            if (parts.length !== 3) {
                return dateString;
            }

            return (
                `${parts[2]}/` +
                `${parts[1]}/` +
                `${parts[0]}`
            );
        };

        let eventState = 'locked';
        let ribbonText = 'ĐANG KHÓA';
        let buttonText = '🔒 Sự kiện đang khóa';
        let descriptionText =
            'Giáo viên đang tạm khóa Dạ Hội Hoàng Gia.';

        let canJoin = false;

        /*
         * Ưu tiên số 1:
         * Giáo viên đã bấm khóa thủ công.
         */
        if (safeSettings.isEnabled === false) {
            eventState = 'locked';
            ribbonText = '🔒 ĐANG KHÓA';
            buttonText = '🔒 Giáo viên đã khóa';

            descriptionText =
                'Sự kiện đang được Giáo viên tạm khóa. ' +
                'Vui lòng quay lại sau.';
        } else if (this.isEventActive()) {
            /*
             * Giáo viên bật và hiện tại đúng lịch.
             */
            eventState = 'open';
            ribbonText = '♛ ĐANG MỞ CỬA';
            buttonText = 'Tham gia ngay ➡️';
            canJoin = true;

            if (
                safeSettings.useCustomDates &&
                safeSettings.startDate &&
                safeSettings.endDate
            ) {
                descriptionText =
                    `Dạ hội đang mở từ ` +
                    `${formatDate(safeSettings.startDate)} ` +
                    `đến ` +
                    `${formatDate(safeSettings.endDate)}. ` +
                    `Khiêu vũ để nhận Coin hoặc vật phẩm ` +
                    `Truyền Thuyết.`;
            } else {
                descriptionText =
                    'Dạ hội đang mở! Khiêu vũ để nhận ' +
                    'Coin hoặc vật phẩm Truyền Thuyết. ' +
                    '(29/07 – 01/08)';
            }
        } else if (
            safeSettings.useCustomDates &&
            safeSettings.startDate &&
            safeSettings.endDate
        ) {
            /*
             * Giáo viên bật nhưng lịch tùy chỉnh
             * chưa tới hoặc đã hết.
             */
            const startDate = new Date(
                safeSettings.startDate +
                'T00:00:00'
            );

            const endDate = new Date(
                safeSettings.endDate +
                'T23:59:59'
            );

            if (now < startDate) {
                eventState = 'upcoming';
                ribbonText = '⏳ CHƯA ĐẾN LỊCH';
                buttonText = '⏳ Chưa đến ngày mở';

                descriptionText =
                    `Dạ hội sẽ mở từ ` +
                    `${formatDate(safeSettings.startDate)} ` +
                    `đến ` +
                    `${formatDate(safeSettings.endDate)}.`;
            } else if (now > endDate) {
                eventState = 'ended';
                ribbonText = '⌛ ĐÃ KẾT THÚC';
                buttonText = '⌛ Sự kiện đã kết thúc';

                descriptionText =
                    `Dạ hội đã kết thúc vào ngày ` +
                    `${formatDate(safeSettings.endDate)}.`;
            }
        } else {
            /*
             * Lịch mặc định nhưng hiện tại không nằm
             * trong ngày 29/07 – 01/08.
             */
            eventState = 'upcoming';
            ribbonText = '⏳ CHƯA ĐẾN LỊCH';
            buttonText = '⏳ Chưa đến ngày mở';

            descriptionText =
                'Sự kiện sẽ mở từ ngày 29/07 ' +
                'đến hết ngày 01/08 hằng năm.';
        }

        card.dataset.eventState = eventState;
        card.dataset.ribbonText = ribbonText;

        joinButton.disabled = !canJoin;
        joinButton.innerHTML = buttonText;

        description.textContent = descriptionText;

        joinButton.title = canJoin
            ? 'Bấm để tham gia Dạ Hội Hoàng Gia'
            : descriptionText;
    },

    uiEnhanced: false,

    formatEventDate: function (dateString) {
        if (!dateString) return '';

        const parts = String(dateString).split('-');

        if (parts.length !== 3) {
            return dateString;
        }

        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    },

    updateEventSchedule: function (settings) {
        const schedule =
            document.getElementById('royalEventSchedule');

        if (!schedule) return;

        if (
            settings &&
            settings.useCustomDates &&
            settings.startDate &&
            settings.endDate
        ) {
            schedule.innerHTML =
                `🗓️ Dạ hội mở từ ` +
                `<strong>${this.formatEventDate(settings.startDate)}</strong> ` +
                `đến ` +
                `<strong>${this.formatEventDate(settings.endDate)}</strong>`;
        } else {
            schedule.innerHTML =
                '🗓️ Lịch hoàng gia: ' +
                '<strong>29/07 – 01/08 hằng năm</strong>';
        }
    },

    enhanceUI: function () {
        const modal =
            document.getElementById('royalBallModal');

        if (!modal) return;

        const content =
            modal.querySelector('.modal-content') ||
            modal.firstElementChild;

        if (!content) return;

        modal.classList.add('royal-ball-premium');
        content.classList.add('royal-premium-shell');

        if (!content.querySelector('.royal-atmosphere')) {
            const particles = Array.from(
                { length: 20 },
                (_, index) => {
                    const x = 5 + ((index * 37) % 90);
                    const y = 8 + ((index * 53) % 82);
                    const size = 2 + (index % 4);
                    const duration = 5 + (index % 6);
                    const delay =
                        -((index * 0.47) % 5).toFixed(2);

                    const color =
                        index % 3 === 0
                            ? '#fff3b4'
                            : index % 3 === 1
                                ? '#c998ff'
                                : '#8be3ff';

                    return `
                    <span
                        class="royal-particle"
                        style="
                            --x:${x}%;
                            --y:${y}%;
                            --size:${size}px;
                            --duration:${duration}s;
                            --delay:${delay}s;
                            --color:${color};
                        "
                    ></span>
                `;
                }
            ).join('');

            content.insertAdjacentHTML(
                'afterbegin',
                `
                <div
                    class="royal-atmosphere"
                    aria-hidden="true"
                >
                    <div class="royal-light-halo"></div>

                    <div class="royal-particle-field">
                        ${particles}
                    </div>
                </div>

                <div
                    class="royal-orbit-crown"
                    aria-hidden="true"
                >
                    ♛
                </div>
            `
            );
        }

        const wrapper =
            modal.querySelector('.royal-content-wrapper') ||
            content;

        wrapper.classList.add('royal-content-wrapper');

        const firstTitle = wrapper.querySelector('h3');

        if (
            firstTitle &&
            !wrapper.querySelector('.royal-event-kicker')
        ) {
            firstTitle.insertAdjacentHTML(
                'beforebegin',
                `
                <div class="royal-event-kicker">
                    ✦ Thiệp mời độc quyền ✦
                </div>
            `
            );

            firstTitle.insertAdjacentHTML(
                'afterend',
                `
                <p class="royal-subtitle">
                    Bước vào đại sảnh ánh vàng,
                    hoàn thành điệu Waltz 10 giây
                    và nhận món quà bí mật từ Hoàng gia.
                </p>

                <div
                    class="royal-event-schedule"
                    id="royalEventSchedule"
                ></div>
            `
            );
        }

        if (firstTitle) {
            firstTitle.classList.add('royal-main-title');
        }

        const floor =
            document.getElementById('royalDanceFloor');

        if (floor) {
            floor.classList.add('royal-dance-stage');

            if (!floor.querySelector('.royal-floor-monogram')) {
                floor.insertAdjacentHTML(
                    'afterbegin',
                    `
                    <div
                        class="royal-floor-monogram"
                        aria-hidden="true"
                    >
                        R
                    </div>
                `
                );
            }
        }

        const status =
            document.getElementById('royalDanceStatus');

        if (status) {
            status.classList.add('royal-dance-status');
        }

        const resultBox =
            document.getElementById('royalBallResult');

        if (resultBox) {
            resultBox.classList.add('royal-result-box');
        }

        const button =
            document.getElementById('btnStartDance');

        if (button) {
            button.classList.add('royal-start-button');

            button.innerHTML = `
    <span class="royal-button-crown">♛</span>
    <span>Bắt đầu điệu Waltz · 5 Coin</span>
`;
        }

        if (
            !document.getElementById('royalDanceProgress')
        ) {
            const progress =
                document.createElement('div');

            progress.id = 'royalDanceProgress';
            progress.className = 'royal-progress-panel';

            progress.innerHTML = `
            <div class="royal-progress-meta">
                <span id="royalProgressLabel">
                    Sẵn sàng bước vào điệu nhảy
                </span>

                <strong id="royalProgressTime">
                    10 giây
                </strong>
            </div>

            <div class="royal-progress-track">
                <div
                    class="royal-progress-bar"
                    id="royalProgressBar"
                ></div>
            </div>
        `;

            if (button && button.parentNode) {
                button.parentNode.insertBefore(
                    progress,
                    button
                );
            } else {
                wrapper.appendChild(progress);
            }
        }

        this.uiEnhanced = true;

        this.updateEventSchedule(
            this.currentSettings || this.defaultSettings
        );
    },

    setDanceProgress: function (
        percent,
        timeLeft,
        label
    ) {
        const bar =
            document.getElementById('royalProgressBar');

        const time =
            document.getElementById('royalProgressTime');

        const text =
            document.getElementById('royalProgressLabel');

        if (bar) {
            bar.style.width =
                `${Math.max(0, Math.min(100, percent))}%`;
        }

        if (time) {
            time.textContent =
                timeLeft > 0
                    ? `${timeLeft} giây`
                    : 'Hoàn tất';
        }

        if (text && label) {
            text.textContent = label;
        }
    },

    resetDanceUI: function () {
        const modal =
            document.getElementById('royalBallModal');

        const floor =
            document.getElementById('royalDanceFloor');

        const status =
            document.getElementById('royalDanceStatus');

        const resultBox =
            document.getElementById('royalBallResult');

        const button =
            document.getElementById('btnStartDance');

        if (modal) {
            modal.classList.remove(
                'royal-is-dancing',
                'royal-reward-revealed'
            );
        }

        if (floor) {
            floor.classList.remove('dancing');
        }

        if (status) {
            status.style.display = 'none';
        }

        if (resultBox) {
            resultBox.style.display = 'none';

            resultBox
                .querySelectorAll('.royal-burst-particle')
                .forEach(node => node.remove());
        }

        if (button) {
            button.style.display = 'inline-flex';
            button.disabled = false;
        }

        this.setDanceProgress(
            0,
            10,
            'Sẵn sàng bước vào điệu nhảy'
        );
    },

    createCelebrationBurst: function (rewardType) {
        const resultBox =
            document.getElementById('royalBallResult');

        if (!resultBox) return;

        const colors =
            rewardType === 'item'
                ? [
                    '#ffe58f',
                    '#c084fc',
                    '#7dd3fc',
                    '#ffffff'
                ]
                : [
                    '#ffe58f',
                    '#fbbf24',
                    '#fff7c2',
                    '#d89b2b'
                ];

        for (let index = 0; index < 26; index++) {
            const particle =
                document.createElement('span');

            particle.className =
                'royal-burst-particle';

            particle.style.setProperty(
                '--bang',
                `${index * (360 / 26)}deg`
            );

            particle.style.setProperty(
                '--bdistance',
                `${55 + Math.random() * 105}px`
            );

            particle.style.setProperty(
                '--bsize',
                `${3 + Math.random() * 6}px`
            );

            particle.style.setProperty(
                '--bcolor',
                colors[index % colors.length]
            );

            particle.style.setProperty(
                '--bdelay',
                `${Math.random() * 0.18}s`
            );

            resultBox.appendChild(particle);

            setTimeout(
                () => particle.remove(),
                1600
            );
        }
    },

    isEventActive: function () {
        const now = new Date(this.getServerNow());

        if (this.currentSettings && this.currentSettings.useCustomDates && this.currentSettings.startDate && this.currentSettings.endDate) {
            const start = new Date(this.currentSettings.startDate + "T00:00:00");
            const end = new Date(this.currentSettings.endDate + "T23:59:59");
            return now >= start && now <= end;
        }

        // Lịch mặc định: 29/07 -> hết 01/08 hằng năm.
        const month = now.getMonth();
        const date = now.getDate();

        if (month === 6 && date >= 29) return true;
        if (month === 7 && date === 1) return true;

        return false;
    },

    buildLimitedEventAnnouncement: function (settings) {
        const safeSettings = {
            ...this.defaultSettings,
            ...(settings || {})
        };

        const eventData = {
            name: '🏰 Dạ Hội Hoàng Gia đã mở cửa!',

            desc:
                'Dạ Hội Hoàng Gia đang diễn ra. ' +
                'Hãy tham gia khiêu vũ để nhận Coin ' +
                'hoặc vật phẩm Truyền Thuyết cực hiếm!',

            targetClass: 'royal-event-card',
            targetSelector: '#royalEventCard',

            isOpen:
                safeSettings.isEnabled !== false,

            isUnlimited: false,
            announcementEnabled: true,

            priority: 100,

            updatedAt:
                firebase.database
                    .ServerValue.TIMESTAMP
        };

        if (
            safeSettings.useCustomDates &&
            safeSettings.startDate &&
            safeSettings.endDate
        ) {
            eventData.scheduleType = 'limited';

            eventData.startDate =
                safeSettings.startDate;

            eventData.endDate =
                safeSettings.endDate;
        } else {
            eventData.scheduleType = 'annual';

            eventData.startMonthDay = '07-29';
            eventData.endMonthDay = '08-01';
        }

        return eventData;
    },

    // ==========================================
    // PHẦN LOGIC DÀNH CHO HỌC SINH
    // ==========================================
    openModal: async function () {
        if (typeof window.isGameEnabled !== 'undefined' && window.isGameEnabled === false) {
            return alert("🔒 Khu vực giải trí đang bị Giáo viên tạm khóa chung!");
        }

        try {
            await this.syncServerTimeOffset();

            const snap = await db.ref('game_settings/royal_ball').once('value');
            const settings = snap.exists() ? snap.val() : this.defaultSettings;
            this.currentSettings = settings;

            if (settings.isEnabled === false) {
                return alert("🔒 Sự kiện Dạ Hội Hoàng Gia hiện đã bị Giáo viên ĐÓNG. Học sinh tạm thời không thể truy cập lúc này!");
            }

            if (!this.isEventActive()) {
                if (settings.useCustomDates) {
                    return alert(`⚠️ Sự kiện đang trong chế độ Lịch Tùy Chỉnh nhưng hiện tại không nằm trong thời gian cho phép.\n(Mở từ: ${settings.startDate} đến ${settings.endDate})`);
                } else {
                    return alert("⚠️ Sự kiện Dạ Hội Hoàng Gia chỉ mở cửa từ ngày 29/07 đến 01/08 hằng năm. Hẹn gặp lại bạn sau nhé!");
                }
            }

            const modal = document.getElementById('royalBallModal');
            if (!modal) return alert("❌ Lỗi HTML: Không tìm thấy khung giao diện sự kiện (royalBallModal)!");

            this.enhanceUI();
            this.updateEventSchedule(settings);
            this.resetDanceUI();

            modal.classList.add('active');

            document.getElementById(
                'royalBallResult'
            ).style.display = 'none';

            document.getElementById(
                'btnStartDance'
            ).style.display = 'inline-flex';

        } catch (error) {
            alert("❌ Lỗi kết nối Firebase khi tải cấu hình sự kiện: " + error.message);
        }
    },

    closeModal: function () {
        if (this.isDancing) return;

        const modal =
            document.getElementById('royalBallModal');

        if (modal) {
            modal.classList.remove(
                'active',
                'royal-is-dancing',
                'royal-reward-revealed'
            );
        }

        this.resetDanceUI();
    },

    startDance: async function () {
        if (this.isDancing) return;

        const serverOffsetSnap = await db
            .ref('.info/serverTimeOffset')
            .once('value');

        const serverOffset = Number(serverOffsetSnap.val()) || 0;
        this.serverTimeOffset = serverOffset;
        const serverNow = Date.now() + serverOffset;

        const today = this.getVietnamDateKey(serverNow);

        const limitRef = db.ref(
            `royal_ball_limits/${currentUser.username}`
        );

        try {
            let alreadyJoined = false;

            const result = await limitRef.transaction(currentData => {
                if (
                    currentData &&
                    currentData.lastDate === today
                ) {
                    alreadyJoined = true;
                    return;
                }

                return {
                    lastDate: today,
                    lastPlayedAt:
                        firebase.database.ServerValue.TIMESTAMP
                };
            });

            if (!result.committed) {
                if (alreadyJoined) {
                    alert(
                        '⏳ Bạn đã tham gia khiêu vũ hôm nay rồi! ' +
                        'Hãy quay lại vào ngày mai nhé.'
                    );
                } else {
                    alert(
                        '❌ Không thể ghi nhận lượt tham gia. ' +
                        'Vui lòng thử lại.'
                    );
                }

                return;
            }
        } catch (error) {
            console.error('Lỗi kiểm tra ngày:', error);

            if (
                error.code === 'PERMISSION_DENIED' ||
                error.code === 'permission_denied'
            ) {
                alert(
                    '❌ Firebase Rules chưa cấp quyền cho royal_ball_limits.'
                );
            } else {
                alert(
                    '❌ Lỗi kiểm tra dữ liệu máy chủ, vui lòng thử lại sau!'
                );
            }

            return;
        }

        const DANCE_ENTRY_FEE = 5;

        const danceCoinRef = db.ref(
            `student_coins/${currentUser.username}`
        );

        let currentDanceCoins = 0;

        try {
            const feeTransaction =
                await danceCoinRef.transaction(currentValue => {
                    currentDanceCoins =
                        Number(currentValue) || 0;

                    if (
                        currentDanceCoins <
                        DANCE_ENTRY_FEE
                    ) {
                        return;
                    }

                    return (
                        currentDanceCoins -
                        DANCE_ENTRY_FEE
                    );
                });

            if (!feeTransaction.committed) {
                await limitRef.remove();

                alert(
                    `🪙 Bạn cần ${DANCE_ENTRY_FEE} Coin để khiêu vũ.\n` +
                    `Số dư hiện tại: ${currentDanceCoins} Coin.`
                );

                return;
            }
        } catch (error) {
            console.error(
                'Lỗi trừ phí khiêu vũ:',
                error
            );

            try {
                await limitRef.remove();
            } catch (rollbackError) {
                console.error(
                    'Không thể hoàn lại lượt Dạ hội:',
                    rollbackError
                );
            }

            alert(
                '❌ Không thể thanh toán phí khiêu vũ. ' +
                'Vui lòng thử lại!'
            );

            return;
        }

        this.enhanceUI();
        this.isDancing = true;

        const modal =
            document.getElementById('royalBallModal');

        const btn =
            document.getElementById('btnStartDance');

        const floor =
            document.getElementById('royalDanceFloor');

        const status =
            document.getElementById('royalDanceStatus');

        if (!btn || !floor || !status) {
            this.isDancing = false;

            await limitRef.remove();

            await danceCoinRef.transaction(
                currentValue =>
                    (Number(currentValue) || 0) +
                    DANCE_ENTRY_FEE
            );

            return alert(
                '❌ Giao diện Dạ hội chưa tải đầy đủ. ' +
                'Hệ thống đã hoàn lại 5 Coin.'
            );
        }

        if (modal) {
            modal.classList.add('royal-is-dancing');
        }

        btn.disabled = true;
        btn.style.display = 'none';

        status.style.display = 'block';
        status.innerText =
            '🎼 Khúc nhạc mở màn đang vang lên...';

        floor.classList.remove('dancing');
        void floor.offsetWidth;
        floor.classList.add('dancing');

        const danceMessages = [
            'Cánh cửa đại sảnh vừa mở...',
            'Bước chân đầu tiên trên sàn gương...',
            'Hai vũ công tiến gần nhau...',
            'Điệu Waltz bắt đầu hòa nhịp...',
            'Ánh đèn vàng đang xoay theo âm nhạc...',
            'Một vòng xoay thật duyên dáng...',
            'Điệu nhảy bước vào cao trào...',
            'Khoảnh khắc hoàng gia rực sáng...',
            'Chuẩn bị cho cú chào kết thúc...',
            'Điệu Waltz đã hoàn thành!'
        ];

        let timeLeft = 10;

        this.setDanceProgress(
            0,
            timeLeft,
            danceMessages[0]
        );

        const timer = setInterval(() => {
            timeLeft--;

            const elapsed = 10 - timeLeft;
            const percent = elapsed * 10;

            const message =
                danceMessages[
                Math.min(
                    elapsed,
                    danceMessages.length - 1
                )
                ];

            status.innerText = `🎵 ${message}`;

            this.setDanceProgress(
                percent,
                timeLeft,
                message
            );
        }, 1000);

        setTimeout(async () => {
            clearInterval(timer);

            this.setDanceProgress(
                100,
                0,
                'Điệu Waltz hoàn tất — đang tạo yêu cầu xác minh...'
            );

            status.innerText =
                '✨ Điệu Waltz hoàn tất — ' +
                'đang gửi kết quả cho Giáo viên xác minh...';

            floor.classList.remove('dancing');

            try {
                await this.calculateReward(today);

                status.style.display = 'none';

                if (modal) {
                    modal.classList.remove(
                        'royal-is-dancing'
                    );

                    modal.classList.add(
                        'royal-reward-revealed'
                    );
                }
            } catch (error) {
                console.error(
                    'Lỗi tạo yêu cầu xác minh Dạ hội:',
                    error
                );

                let requestExists = false;

                try {
                    const latestLimit =
                        (await limitRef.once('value')).val();

                    requestExists = Boolean(
                        latestLimit &&
                        latestLimit.lastDate === today &&
                        latestLimit.pendingReward &&
                        latestLimit.pendingReward.requestId
                    );
                } catch (_) {}

                if (!requestExists) {
                    try {
                        await limitRef.remove();
                        await danceCoinRef.transaction(
                            currentValue =>
                                (Number(currentValue) || 0) +
                                DANCE_ENTRY_FEE
                        );
                    } catch (rollbackError) {
                        console.error(
                            'Không thể hoàn lại lượt Dạ hội:',
                            rollbackError
                        );
                    }

                    this.setDanceProgress(
                        0,
                        10,
                        'Gửi xác minh lỗi — lượt đã được hoàn lại'
                    );

                    alert(
                        '❌ Không thể tạo yêu cầu xác minh phần thưởng. ' +
                        'Hệ thống đã mở lại lượt để bạn thử lại.'
                    );
                } else {
                    alert(
                        'ℹ️ Kết quả đã được ghi nhận ở máy chủ và đang chờ Giáo viên xác minh. ' +
                        'Hệ thống không hoàn lượt để tránh nhận thưởng hai lần.'
                    );
                }
            } finally {
                this.isDancing = false;
                btn.disabled = false;
            }
        }, 10000);
    },

    calculateReward: async function (today) {
        const resultBox =
            document.getElementById('royalBallResult');

        if (!resultBox) {
            throw new Error(
                'Không tìm thấy royalBallResult'
            );
        }

        resultBox.style.display = 'block';
        resultBox.className = 'royal-reward-result';

        resultBox.innerHTML = `
        <div class="royal-reward-loading">
            <div class="royal-loading-rays"></div>
            <div class="royal-loading-crown">♛</div>
            <div class="royal-loading-chest">
                <div class="royal-loading-chest-lid"></div>
                <div class="royal-loading-chest-body"><span>R</span></div>
            </div>
            <div class="royal-loading-title">Đang mở rương Hoàng gia</div>
            <div class="royal-loading-subtitle">Kết quả sẽ được gửi Giáo viên xác minh trước khi cộng tài sản.</div>
            <div class="royal-loading-dots"><span></span><span></span><span></span></div>
        </div>
    `;

        await new Promise(resolve =>
            setTimeout(resolve, 850)
        );

        const probabilityItem =
            this.currentSettings
                ? parseFloat(
                    this.currentSettings.probItem
                )
                : this.defaultSettings.probItem;

        const randomNumber = Math.random() * 100;

        let rewardType =
            randomNumber <= probabilityItem
                ? 'item'
                : 'coin';

        let rewardTheme = 'coin';
        let rewardIcon = '🪙';
        let rewardLabel = 'Đề xuất phần thưởng';
        let rewardTitle = '';
        let rewardDetail = '';
        let rewardValueText = '';
        let wonCoins = 0;
        let itemId = '';
        let itemName = '';

        if (rewardType === 'item') {
            const legendaryItems =
                typeof StoreConfig !== 'undefined' &&
                    Array.isArray(StoreConfig.items)
                    ? StoreConfig.items.filter(item =>
                        item &&
                        item.id &&
                        item.tag &&
                        item.tag
                            .toLowerCase()
                            .trim() === 'truyền thuyết'
                    )
                    : [];

            if (legendaryItems.length > 0) {
                const inventorySnapshot =
                    await db.ref(
                        `student_inventory/${currentUser.username}`
                    ).once('value');

                const currentOwned = new Set();

                inventorySnapshot.forEach(child => {
                    const inventoryItem = child.val() || {};
                    if (child.key) currentOwned.add(String(child.key));
                    if (inventoryItem.id) currentOwned.add(String(inventoryItem.id));
                });

                const randomItem =
                    legendaryItems[
                    Math.floor(
                        Math.random() *
                        legendaryItems.length
                    )
                    ];

                itemId = String(randomItem.id);
                itemName = String(randomItem.name || randomItem.id);

                if (currentOwned.has(itemId)) {
                    rewardType = 'coin';
                    wonCoins = 500;
                    itemId = '';

                    rewardTheme = 'duplicate';
                    rewardIcon = '♻️';
                    rewardTitle = 'Quà trùng chờ xác minh';
                    rewardValueText = '+500 Coin';
                    rewardDetail =
                        `"${itemName}" đã có trong kho. ` +
                        'Đề xuất quy đổi 500 Coin đang chờ Giáo viên xác nhận.';
                } else {
                    rewardTheme = 'item';
                    rewardIcon = '💎';
                    rewardTitle = itemName;
                    rewardValueText = 'TRUYỀN THUYẾT';
                    rewardDetail =
                        'Vật phẩm chưa được cộng vào kho. ' +
                        'Yêu cầu đang chờ Giáo viên xác minh.';
                }
            } else {
                rewardType = 'coin';
                wonCoins = 500;
                rewardTheme = 'compensation';
                rewardIcon = '🎁';
                rewardTitle = 'Kho báu bí ẩn';
                rewardValueText = '+500 Coin';
                rewardDetail =
                    'Danh sách vật phẩm Truyền thuyết chưa sẵn sàng; ' +
                    'đề xuất bù 500 Coin đang chờ Giáo viên xác minh.';
            }
        } else {
            wonCoins =
                Math.floor(
                    Math.random() *
                    (1000 - 100 + 1)
                ) + 100;

            rewardTheme = 'coin';
            rewardIcon = '🪙';
            rewardTitle = 'Coin Dạ Hội';
            rewardValueText =
                `+${wonCoins.toLocaleString('vi-VN')} Coin`;
            rewardDetail =
                'Coin chưa được cộng vào số dư. ' +
                'Yêu cầu đang chờ Giáo viên xác minh.';
        }

        const requestDate =
            String(today || this.getVietnamDateKey());

        const requestId =
            `royal_ball_${requestDate.replace(/-/g, '')}`;

        const requestedAt = this.getServerNow();

        const pendingReward = {
            version: 1,
            requestId,
            source: 'royal_ball',
            status: 'pending',
            username: String(currentUser.username || ''),
            studentName: String(currentUser.name || currentUser.username || ''),
            eventDate: requestDate,
            entryFee: 5,
            rewardType,
            coinAmount: rewardType === 'coin' ? wonCoins : 0,
            itemId: rewardType === 'item' ? itemId : '',
            itemName: rewardType === 'item' ? itemName : '',
            requestedAt,
            clientProposal: true
        };

        const limitRef = db.ref(
            `royal_ball_limits/${currentUser.username}`
        );

        let existingRequest = null;

        const queueResult = await limitRef.transaction(current => {
            if (!current || current.lastDate !== requestDate) {
                return;
            }

            if (
                current.pendingReward &&
                current.pendingReward.requestId
            ) {
                existingRequest = current.pendingReward;
                return;
            }

            return {
                ...current,
                pendingReward
            };
        });

        if (!queueResult.committed && !existingRequest) {
            throw new Error(
                'Không thể lưu yêu cầu xác minh phần thưởng Dạ hội'
            );
        }

        const queued = existingRequest || pendingReward;

        rewardType = String(queued.rewardType || rewardType);
        wonCoins = Number(queued.coinAmount || 0);
        itemId = String(queued.itemId || itemId || '');
        itemName = String(queued.itemName || itemName || '');

        if (rewardType === 'item') {
            rewardTheme = 'item';
            rewardIcon = '💎';
            rewardTitle = itemName || itemId || 'Vật phẩm Truyền thuyết';
            rewardValueText = 'CHỜ DUYỆT';
            rewardDetail =
                'Kết quả đã được gửi Giáo viên. ' +
                'Chỉ sau khi được duyệt, vật phẩm mới được thêm vào kho.';
        } else {
            rewardTheme = 'coin';
            rewardIcon = '🪙';
            rewardTitle = 'Coin Dạ Hội';
            rewardValueText =
                `+${wonCoins.toLocaleString('vi-VN')} Coin · CHỜ DUYỆT`;
            rewardDetail =
                'Kết quả đã được gửi Giáo viên. ' +
                'Chỉ sau khi được duyệt, Coin mới được cộng vào số dư.';
        }

        const burstParticles =
            Array.from(
                { length: 24 },
                (_, index) => {
                    const angle = index * (360 / 24);
                    const distance = 70 + (index % 6) * 12;
                    const size = 4 + (index % 4);

                    return `
                    <i
                        style="
                            --reward-angle:${angle}deg;
                            --reward-distance:${distance}px;
                            --reward-size:${size}px;
                            --reward-delay:${(index % 5) * 0.035}s;
                        "
                    ></i>
                `;
                }
            ).join('');

        resultBox.className =
            `royal-reward-result ` +
            `royal-reward-${rewardTheme}`;

        resultBox.innerHTML = `
        <div class="royal-reward-celebration">
            ${burstParticles}
        </div>

        <div class="royal-reward-card">
            <div class="royal-reward-light"></div>
            <div class="royal-reward-top-decoration">
                <span></span><strong>♛</strong><span></span>
            </div>
            <div class="royal-open-chest">
                <div class="royal-open-chest-glow"></div>
                <div class="royal-open-chest-lid"><span></span></div>
                <div class="royal-open-chest-body"><span class="royal-chest-lock">♛</span></div>
                <div class="royal-reward-icon">${rewardIcon}</div>
            </div>
            <div class="royal-reward-label">${this.escapeHTML(rewardLabel)}</div>
            <h3 class="royal-reward-name">${this.escapeHTML(rewardTitle)}</h3>
            <div class="royal-reward-value">${this.escapeHTML(rewardValueText)}</div>
            <p class="royal-reward-description">${this.escapeHTML(rewardDetail)}</p>
            <div class="royal-reward-divider"><span></span><b>✦</b><span></span></div>
            <button
                type="button"
                class="royal-reward-claim"
                onclick="RoyalBallEvent.closeModal()"
            >
                <span>♛</span>
                Đã gửi xác minh · Rời đại sảnh
            </button>
            <div class="royal-reward-confirmed">
                ⏳ pending → Giáo viên approved/rejected
            </div>
        </div>
    `;
    },

    // ==========================================
    // XÁC MINH PHẦN THƯỞNG DẠ HỘI — GIÁO VIÊN LÀ AUTHORITY
    // ==========================================
    ensureTeacherVerificationPanel: function () {
        const manageView =
            document.getElementById('royalBallManageView');

        if (!manageView) return null;

        let panel =
            document.getElementById('royalBallVerificationPanel');

        if (panel) return panel;

        panel = document.createElement('div');
        panel.id = 'royalBallVerificationPanel';
        panel.style.cssText =
            'margin:15px 0;padding:15px;border-radius:12px;border:1px solid rgba(192,57,43,.22);background:rgba(255,255,255,.64);';

        panel.innerHTML = `
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;">
                <div>
                    <strong style="color:#9f1239;">🛡️ Xác minh phần thưởng Dạ Hội</strong>
                    <div style="font-size:.84em;color:#666;margin-top:4px;">
                        Kết quả RNG từ học sinh chỉ là proposal. Chỉ nút duyệt của Giáo viên mới cấp tài sản authoritative.
                    </div>
                </div>
                <button type="button" onclick="RoyalBallEvent.loadRewardVerificationRequests()"
                    style="width:auto;padding:8px 12px;margin:0;">↻ Làm mới</button>
            </div>
            <div id="royalBallVerificationList" style="margin-top:12px;display:grid;gap:10px;">
                <div style="color:#777;font-size:.9em;">Đang tải yêu cầu...</div>
            </div>
        `;

        manageView.insertBefore(panel, manageView.firstChild);
        return panel;
    },

    loadRewardVerificationRequests: async function () {
        let teacherRole = '';
        try {
            teacherRole = String(currentUser?.role || '');
        } catch (_) {}

        if (teacherRole !== 'teacher') return;

        this.ensureTeacherVerificationPanel();

        const list =
            document.getElementById('royalBallVerificationList');

        if (!list) return;

        list.innerHTML =
            '<div style="color:#777;font-size:.9em;">Đang tải yêu cầu...</div>';

        try {
            const usersSnapshot =
                await db.ref('users').once('value');

            const usernames = [];

            usersSnapshot.forEach(child => {
                const user = child.val() || {};
                if (
                    user.role === 'student' &&
                    user.username
                ) {
                    usernames.push(String(user.username));
                }
            });

            const records = await Promise.all(
                usernames.map(async username => {
                    const snapshot = await db
                        .ref(`royal_ball_limits/${username}`)
                        .once('value');

                    const data = snapshot.val() || {};
                    const request = data.pendingReward || null;

                    if (
                        !request ||
                        !request.requestId ||
                        !['pending', 'processing'].includes(
                            String(request.status || '')
                        )
                    ) {
                        return null;
                    }

                    return {
                        username,
                        request
                    };
                })
            );

            const pending = records
                .filter(Boolean)
                .sort((a, b) =>
                    Number(a.request.requestedAt || 0) -
                    Number(b.request.requestedAt || 0)
                );

            if (!pending.length) {
                list.innerHTML =
                    '<div style="color:#15803d;font-size:.9em;font-weight:700;">✓ Không có yêu cầu Dạ Hội đang chờ xác minh.</div>';
                return;
            }

            list.innerHTML = pending.map(({ username, request }) => {
                const type = String(request.rewardType || '');
                const rewardText = type === 'item'
                    ? `💎 ${this.escapeHTML(request.itemName || request.itemId || 'Vật phẩm')}`
                    : `🪙 ${Number(request.coinAmount || 0).toLocaleString('vi-VN')} Coin`;

                const processing = request.status === 'processing';

                return `
                    <div style="padding:12px;border-radius:10px;background:#fff;border:1px solid rgba(0,0,0,.08);">
                        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:flex-start;">
                            <div>
                                <strong>${this.escapeHTML(request.studentName || username)}</strong>
                                <span style="color:#777;"> · ${this.escapeHTML(username)}</span>
                                <div style="margin-top:5px;font-weight:800;">${rewardText}</div>
                                <div style="font-size:.82em;color:#777;margin-top:4px;">
                                    ${this.escapeHTML(request.eventDate || '')} · phí client khai báo ${Number(request.entryFee || 0)} Coin · request ${this.escapeHTML(request.requestId)}
                                </div>
                                <div style="font-size:.8em;color:#b45309;margin-top:4px;">
                                    ⚠️ Proposal do client tạo; Giáo viên phải tự xác minh trước khi duyệt.
                                </div>
                            </div>
                            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                                <button type="button" ${processing ? 'disabled' : ''}
                                    onclick="RoyalBallEvent.approveRewardRequest('${this.escapeHTML(username)}','${this.escapeHTML(request.requestId)}')"
                                    style="width:auto;margin:0;padding:8px 12px;background:#059669;color:white;">
                                    ${processing ? 'Đang xử lý...' : '✓ Duyệt'}
                                </button>
                                <button type="button" ${processing ? 'disabled' : ''}
                                    onclick="RoyalBallEvent.rejectRewardRequest('${this.escapeHTML(username)}','${this.escapeHTML(request.requestId)}')"
                                    style="width:auto;margin:0;padding:8px 12px;background:#dc2626;color:white;">
                                    ✕ Từ chối
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (error) {
            console.error(
                '[RoyalBall] Không tải được yêu cầu xác minh:',
                error
            );

            list.innerHTML =
                `<div style="color:#b91c1c;font-size:.9em;">Không tải được yêu cầu: ${this.escapeHTML(error.message)}</div>`;
        }
    },

    approveRewardRequest: async function (username, requestId) {
        let teacherRole = '';
        try {
            teacherRole = String(currentUser?.role || '');
        } catch (_) {}

        if (teacherRole !== 'teacher') {
            return alert('❌ Chỉ Giáo viên được xác minh phần thưởng Dạ Hội.');
        }

        const limitRef = db.ref(`royal_ball_limits/${username}`);
        const requestRef = limitRef.child('pendingReward');
        const now = this.getServerNow();
        const approvalToken =
            `rb_approve_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

        let requestSnapshot = null;

        const lockResult = await requestRef.transaction(current => {
            if (!current || current.requestId !== requestId) {
                return;
            }

            if (
                current.status === 'approved' ||
                current.status === 'rejected'
            ) {
                return;
            }

            if (
                current.status === 'processing' &&
                Number(current.processingAt || 0) > now - 120000
            ) {
                return;
            }

            requestSnapshot = { ...current };

            return {
                ...current,
                status: 'processing',
                approvalToken,
                processingAt: now
            };
        });

        if (!lockResult.committed || !requestSnapshot) {
            alert('ℹ️ Yêu cầu đã được xử lý ở phiên khác hoặc không còn hợp lệ.');
            await this.loadRewardVerificationRequests();
            return;
        }

        const request = requestSnapshot;

        try {
            const updates = {};
            let rewardText = '';

            if (request.rewardType === 'coin') {
                const amount = Number(request.coinAmount);

                if (
                    !Number.isInteger(amount) ||
                    amount < 100 ||
                    amount > 1000
                ) {
                    throw new Error('Số Coin proposal không hợp lệ.');
                }

                updates[`student_coins/${username}`] =
                    firebase.database.ServerValue.increment(amount);

                rewardText = `${amount} Coin (Dạ hội · Giáo viên duyệt)`;
            } else if (request.rewardType === 'item') {
                const itemId = String(request.itemId || '');
                const item =
                    typeof StoreConfig !== 'undefined' &&
                    Array.isArray(StoreConfig.items)
                        ? StoreConfig.items.find(entry =>
                            entry &&
                            String(entry.id) === itemId
                        )
                        : null;

                if (
                    !item ||
                    String(item.tag || '').trim().toLowerCase() !== 'truyền thuyết'
                ) {
                    throw new Error(
                        'Vật phẩm proposal không thuộc catalog Truyền Thuyết hiện tại.'
                    );
                }

                const inventorySnapshot = await db
                    .ref(`student_inventory/${username}/${itemId}`)
                    .once('value');

                if (inventorySnapshot.exists()) {
                    throw new Error(
                        'Học sinh đã sở hữu vật phẩm này; không tự quy đổi khi chưa có xác nhận mới.'
                    );
                }

                updates[`student_inventory/${username}/${itemId}`] = {
                    id: itemId,
                    purchaseTime:
                        firebase.database.ServerValue.TIMESTAMP,
                    isEquipped: false,
                    source: 'royal_ball_teacher_approved',
                    verificationRequestId: requestId
                };

                rewardText =
                    `Truyền thuyết: ${item.name || itemId} (Giáo viên duyệt)`;
            } else {
                throw new Error('Loại phần thưởng proposal không hợp lệ.');
            }

            const historyId =
                `royal_ball_${String(username).replace(/[^A-Za-z0-9_-]/g, '_')}_${String(requestId).replace(/[^A-Za-z0-9_-]/g, '_')}`;

            updates[`spin_history/${historyId}`] = {
                studentName: request.studentName || username,
                username,
                reward: rewardText,
                time: new Date(now).toLocaleString('vi-VN'),
                timestamp:
                    firebase.database.ServerValue.TIMESTAMP,
                source: 'royal_ball_teacher_approved',
                operationId: historyId
            };

            updates[`royal_ball_limits/${username}/pendingReward/status`] = 'approved';
            updates[`royal_ball_limits/${username}/pendingReward/approvedAt`] =
                firebase.database.ServerValue.TIMESTAMP;
            updates[`royal_ball_limits/${username}/pendingReward/approvedBy`] =
                String(currentUser.username || 'teacher');
            updates[`royal_ball_limits/${username}/pendingReward/approvalToken`] = approvalToken;

            await db.ref().update(updates);

            alert(`✅ Đã duyệt phần thưởng Dạ Hội cho ${username}.`);
        } catch (error) {
            console.error(
                '[RoyalBall] Duyệt phần thưởng thất bại:',
                error
            );

            try {
                await requestRef.transaction(current => {
                    if (
                        current &&
                        current.status === 'processing' &&
                        current.approvalToken === approvalToken
                    ) {
                        const reverted = { ...current };
                        reverted.status = 'pending';
                        delete reverted.approvalToken;
                        delete reverted.processingAt;
                        return reverted;
                    }

                    return current;
                });
            } catch (_) {}

            alert(`❌ Không thể duyệt: ${error.message}`);
        }

        await this.loadRewardVerificationRequests();
    },

    rejectRewardRequest: async function (username, requestId) {
        let teacherRole = '';
        try {
            teacherRole = String(currentUser?.role || '');
        } catch (_) {}

        if (teacherRole !== 'teacher') {
            return alert('❌ Chỉ Giáo viên được từ chối yêu cầu.');
        }

        const requestRef = db.ref(
            `royal_ball_limits/${username}/pendingReward`
        );

        const now = this.getServerNow();

        const result = await requestRef.transaction(current => {
            if (!current || current.requestId !== requestId) {
                return;
            }

            if (
                current.status === 'approved' ||
                current.status === 'rejected'
            ) {
                return;
            }

            if (
                current.status === 'processing' &&
                Number(current.processingAt || 0) > now - 120000
            ) {
                return;
            }

            return {
                ...current,
                status: 'rejected',
                rejectedAt: now,
                rejectedBy: String(currentUser.username || 'teacher')
            };
        });

        if (result.committed) {
            alert(`✅ Đã từ chối yêu cầu Dạ Hội của ${username}.`);
        } else {
            alert('ℹ️ Yêu cầu đã được xử lý ở phiên khác.');
        }

        await this.loadRewardVerificationRequests();
    },

    // ==========================================
    // PHẦN LOGIC DÀNH CHO GIÁO VIÊN
    // ==========================================
    syncTeacherUI: function (settings) {
        settings = {
            ...this.defaultSettings,
            ...(settings || {})
        };

        this.currentSettings = settings;

        this.updateStudentEventCard(settings);

        if (
            document.getElementById('probRoyalItem')
        ) {
            document.getElementById(
                'probRoyalItem'
            ).value = settings.probItem;

            document.getElementById(
                'probRoyalCoin'
            ).value = settings.probCoin;
        }

        const statusBtn = document.getElementById('btnToggleRoyalStatus');
        if (statusBtn) {
            const isEnabled = settings.isEnabled !== undefined ? settings.isEnabled : this.defaultSettings.isEnabled;
            if (isEnabled) {
                statusBtn.innerText = "🟢 Sự Kiện Đang: MỞ CHO HỌC SINH (Bấm để KHÓA)";
                statusBtn.style.background = "linear-gradient(135deg, #059669 0%, #10b981 100%)";
                statusBtn.dataset.status = "open";
            } else {
                statusBtn.innerText = "🔴 Sự Kiện Đang: ĐANG KHÓA TRUY CẬP (Bấm để MỞ)";
                statusBtn.style.background = "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)";
                statusBtn.dataset.status = "closed";
            }
        }

        const useCustomCheck = document.getElementById('useCustomDates');
        if (useCustomCheck) {
            useCustomCheck.checked = settings.useCustomDates || false;
            const area = document.getElementById('royalCustomDatesArea');
            if (area) area.style.display = useCustomCheck.checked ? 'block' : 'none';
        }
        if (document.getElementById('royalStartDate')) {
            document.getElementById('royalStartDate').value = settings.startDate || '';
        }
        if (document.getElementById('royalEndDate')) {
            document.getElementById('royalEndDate').value = settings.endDate || '';
        }
    },

    toggleStatusByTeacher: async function () {
        const statusBtn = document.getElementById('btnToggleRoyalStatus');
        if (!statusBtn) return alert("❌ Lỗi: Không tìm thấy nút Trạng thái trên giao diện!");

        const currentStatus = statusBtn.dataset.status;
        const newEnabledState = (currentStatus === "closed");

        try {
            const snap = await db.ref('game_settings/royal_ball').once('value');
            let currentData = snap.exists() ? snap.val() : { ...this.defaultSettings };

            currentData.isEnabled = newEnabledState;

            await db.ref().update({
                'game_settings/royal_ball':
                    currentData,

                'limited_events/royal_ball':
                    this.buildLimitedEventAnnouncement(
                        currentData
                    )
            });
            alert(`🔒 Hệ thống phản hồi: Đã chuyển trạng thái sự kiện thành [${newEnabledState ? "MỞ TRUY CẬP" : "KHÓA TRUY CẬP"}] thành công!`);
        } catch (error) {
            alert("❌ Lỗi kết nối Firebase: " + error.message);
        }
    },

    saveSettings: async function () {
        const errorMsg = document.getElementById('royalErrorMsg');
        if (!errorMsg) {
            alert("❌ Lỗi: Thiếu thẻ thông báo lỗi (id: royalErrorMsg) trong HTML!");
            return;
        }

        const probItemEl = document.getElementById('probRoyalItem');
        const probCoinEl = document.getElementById('probRoyalCoin');
        const itemProb = probItemEl ? parseFloat(probItemEl.value) || 0 : 5;
        const coinProb = probCoinEl ? parseFloat(probCoinEl.value) || 0 : 95;

        if ((itemProb + coinProb) !== 100) {
            errorMsg.innerText = "❌ LỖI: Tổng tỉ lệ phải đúng bằng 100%!";
            errorMsg.style.display = 'block';
            return;
        }

        const checkEl = document.getElementById('useCustomDates');
        const startEl = document.getElementById('royalStartDate');
        const endEl = document.getElementById('royalEndDate');

        const useCustomDates = checkEl ? checkEl.checked : false;
        const startDate = startEl ? startEl.value : '';
        const endDate = endEl ? endEl.value : '';

        if (useCustomDates && (!startDate || !endDate)) {
            errorMsg.innerText = "❌ LỖI: Vui lòng chọn đầy đủ Ngày bắt đầu và Ngày kết thúc tùy chỉnh!";
            errorMsg.style.display = 'block';
            return;
        }
        if (useCustomDates && (new Date(startDate) > new Date(endDate))) {
            errorMsg.innerText = "❌ LỖI: Ngày bắt đầu không được lớn hơn Ngày kết thúc!";
            errorMsg.style.display = 'block';
            return;
        }

        errorMsg.style.display = 'none';

        const statusBtn = document.getElementById('btnToggleRoyalStatus');
        const isEnabled = statusBtn ? (statusBtn.dataset.status === "open") : true;

        try {
            const savedSettings = {
                probItem: itemProb,
                probCoin: coinProb,
                isEnabled: isEnabled,
                useCustomDates: useCustomDates,
                startDate: startDate,
                endDate: endDate
            };

            await db.ref().update({
                'game_settings/royal_ball':
                    savedSettings,

                'limited_events/royal_ball':
                    this.buildLimitedEventAnnouncement(
                        savedSettings
                    )
            });
            alert('✅ Đã lưu cấu hình Dạ Hội Hoàng Gia thành công!');
        } catch (error) {
            alert('❌ Lỗi lưu Firebase: ' + error.message);
        }
    }
};

function initRoyalBallDOM() {
    if (window.__royalBallDomInitialized) {
        return;
    }

    window.__royalBallDomInitialized = true;

    RoyalBallEvent.enhanceUI();
    RoyalBallEvent.syncServerTimeOffset().then(() => {
        RoyalBallEvent.updateStudentEventCard(
            RoyalBallEvent.currentSettings ||
            RoyalBallEvent.defaultSettings
        );
    });

    const probItemInp = document.getElementById('probRoyalItem');
    const probCoinInp = document.getElementById('probRoyalCoin');
    if (probItemInp && probCoinInp) {
        probItemInp.addEventListener('input', function () {
            let val = parseFloat(this.value) || 0;
            if (val > 100) val = 100;
            probCoinInp.value = 100 - val;
        });
        probCoinInp.addEventListener('input', function () {
            let val = parseFloat(this.value) || 0;
            if (val > 100) val = 100;
            probItemInp.value = 100 - val;
        });
    }

    const useCustomCheck = document.getElementById('useCustomDates');
    if (useCustomCheck) {
        useCustomCheck.addEventListener('change', function () {
            const area = document.getElementById('royalCustomDatesArea');
            if (area) area.style.display = this.checked ? 'block' : 'none';
        });
    }

    if (typeof db !== 'undefined') {
        db.ref('game_settings/royal_ball').on('value', (snapshot) => {
            if (snapshot.exists()) {
                RoyalBallEvent.syncTeacherUI(snapshot.val());
            } else {
                RoyalBallEvent.syncTeacherUI(RoyalBallEvent.defaultSettings);
            }
        });
    }

    let role = '';
    try {
        role = String(currentUser?.role || '');
    } catch (_) {}

    if (role === 'teacher') {
        RoyalBallEvent.ensureTeacherVerificationPanel();
        RoyalBallEvent.loadRewardVerificationRequests();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        initRoyalBallDOM,
        { once: true }
    );
} else {
    initRoyalBallDOM();
}
