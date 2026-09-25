# Repository integrity audit — 2026-09-25

Base SHA: `8e0f1e52c464cc0168038e543267818513a9a537`  

Text files scanned: **116**

## Syntax

JS checked: 54; failures: 0. JSON checked: 3; failures: 0.

## Economic node access (client)

| file | line | kind | text |
| --- | --- | --- | --- |
| js/store-collections.js | 310 | unknown | 'student_collection_rewards', |
| js/store-collections.js | 431 | unknown | updates[`student_coins/${username}`] = getServerIncrement( |
| js/store-collections.js | 579 | read/listen | .ref(`student_collection_rewards/${username}`) |
| js/store-collections.js | 620 | read/listen | .ref(`student_inventory/${username}`) |
| js/daily-login.js | 983 | transaction | `student_coins/${username}` |
| js/daily-login.js | 1005 | transaction | `student_bonus_tickets/${username}` |
| js/daily-login.js | 1037 | transaction | `student_money_offset/${username}` |
| js/daily-login.js | 1067 | update | `student_inventory/${username}/${preparedRewardValue}` |
| js/daily-login.js | 1089 | push | .ref(`student_discounts/${username}`) |
| js/royal-ball.js | 812 | transaction | `student_coins/${currentUser.username}` |
| js/royal-ball.js | 1148 | read/listen | `student_inventory/${currentUser.username}` |
| js/royal-ball.js | 1210 | update | `student_inventory/` + |
| js/royal-ball.js | 1293 | transaction | `student_coins/${currentUser.username}` |
| js/leaderboard.js | 1830 | unknown | 'leaderboard_reward_claims/' + |
| js/leaderboard.js | 2528 | unknown | `student_discounts/` + |
| js/leaderboard.js | 2641 | unknown | `student_coins/${username}` |
| js/leaderboard.js | 4291 | unknown | `student_coins/${username}` |
| js/leaderboard.js | 4330 | read/listen | `student_inventory/` + |
| js/leaderboard.js | 4592 | unknown | `student_coins/${username}` |
| js/leaderboard.js | 4642 | unknown | `student_coins/${username}` |
| js/leaderboard.js | 4755 | unknown | `student_inventory/` + |
| js/transaction-history.js | 2273 | unknown | `student_coins/${username}`; |
| js/luxury-store.js | 12230 | read/listen | `student_inventory/${user.username}` |
| js/luxury-store.js | 12738 | read/listen | `student_inventory/${user.username}/${itemId}` |
| js/luxury-store.js | 12863 | read/listen | `student_inventory/${username}` |
| js/teacher.js | 803 | transaction | `mid_autumn_wallets/${normalizedUsername}` |
| js/teacher.js | 888 | transaction | `mid_autumn_wallets/${username}` |
| js/teacher.js | 1019 | transaction | `mid_autumn_wallets/${username}` |
| js/teacher.js | 3582 | unknown | listenFirebase(db.ref('student_coins'), 'value', debounce(loadStudentsList, 1500)); |
| js/teacher.js | 3583 | unknown | listenFirebase(db.ref('cash_requests'), 'value', debounce(loadTeacherCashRequests, 1500)); |
| js/teacher.js | 7437 | unknown | //   student_coins có thể âm để bảo toàn sổ cái và chặn việc lợi dụng chấm lại. |
| js/teacher.js | 7864 | read/listen | `student_coins/${username}` |
| js/teacher.js | 7884 | read/listen | `student_inventory/${username}` |
| js/teacher.js | 8046 | read/listen | .ref(`grade_reward_claims/${username}/${messageId}`) |
| js/teacher.js | 8290 | unknown | `student_bonus_tickets/${username}` |
| js/teacher.js | 8293 | transaction | `student_coins/${username}` |
| js/teacher.js | 8341 | update | .ref(`grade_reward_claims/${username}/${messageId}`) |
| js/teacher.js | 8661 | unknown | `student_bonus_tickets/${username}` |
| js/teacher.js | 8664 | unknown | `student_coins/${username}` |
| js/teacher.js | 8781 | update | `grade_reward_claims/${username}/${messageId}` |
| js/teacher.js | 9122 | unknown | `student_bonus_tickets/${username}` |
| js/teacher.js | 9125 | transaction | `student_coins/${username}` |
| js/teacher.js | 9167 | update | .ref(`grade_reward_claims/${username}/${messageId}`) |
| js/teacher.js | 9203 | transaction | .ref(`student_bonus_tickets/${username}`) |
| js/teacher.js | 9611 | read/listen | .ref(`grade_reward_claims/${username}/${originalMessageId}`) |
| js/teacher.js | 9775 | read/listen | .ref(`grade_reward_claims/${username}/${heldMessageId}`) |
| js/teacher.js | 9848 | unknown | `student_bonus_tickets/${username}` |
| js/teacher.js | 9851 | transaction | `student_coins/${username}` |
| js/teacher.js | 9893 | update | .ref(`grade_reward_claims/${username}/${heldMessageId}`) |
| js/teacher.js | 9995 | read/listen | .ref(`grade_reward_claims/${username}/${heldMessageId}`) |
| js/teacher.js | 10247 | transaction | `student_bonus_tickets/${username}` |
| js/teacher.js | 11134 | read/listen | const coinSnap = await db.ref('student_coins').once('value'); |
| js/teacher.js | 11742 | unknown | updates[`student_coins/${username}`] = null; |
| js/teacher.js | 11743 | unknown | updates[`student_bonus_tickets/${username}`] = null; |
| js/teacher.js | 11744 | unknown | updates[`student_money_offset/${username}`] = null; |
| js/teacher.js | 11745 | unknown | updates[`student_inventory/${username}`] = null; |
| js/teacher.js | 11746 | unknown | updates[`student_discounts/${username}`] = null; |
| js/teacher.js | 11747 | update | updates[`spin_counts/${username}`] = null; |
| js/teacher.js | 11751 | update | updates[`historical_grade_tickets/${username}`] = null; |
| js/teacher.js | 11753 | update | updates[`grade_reward_claims/${username}`] = null; |
| js/teacher.js | 15836 | read/listen | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/teacher.js | 15848 | unknown | await pushDB(`student_inventory/${currentUser.username}`, { |
| js/teacher.js | 15862 | read/listen | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/teacher.js | 15882 | update | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/teacher.js | 16935 | read/listen | db.ref(`student_inventory/${username}`).once('value'), |
| js/teacher.js | 18316 | unknown | // Không còn cho phép đổi trạng thái cash_requests trực tiếp vì có thể bỏ qua bước trừ tiền. |
| js/teacher.js | 18559 | unknown | let requests = await getDB('cash_requests'); |
| js/teacher.js | 18569 | unknown | 'cash_requests' |
| js/teacher.js | 18650 | read/listen | const reqRef = db.ref(`cash_requests/${reqFbKey}`); |
| js/teacher.js | 18706 | read/listen | db.ref(`student_money_offset/${studentUsername}`).once('value') |
| js/teacher.js | 18737 | transaction | const offsetRef = db.ref(`student_money_offset/${studentUsername}`); |
| js/teacher.js | 18803 | update | const offsetSnap = await db.ref(`student_money_offset/${studentUsername}`).once('value'); |
| js/teacher.js | 19218 | update | .ref(`student_inventory/${student.username}`).once('value'); |
| js/teacher.js | 19221 | update | updates[`student_inventory/${student.username}/${child.key}/isEquipped`] = false; |
| js/teacher.js | 19229 | unknown | DBReadSingleFlight.invalidate(`student_inventory/${student.username}`); |
| js/teacher.js | 19586 | read/listen | `historical_grade_tickets/${normalizedUsername}` |
| js/teacher.js | 19610 | read/listen | .ref('student_bonus_tickets/' + username) |
| js/teacher.js | 19617 | read/listen | .ref('spin_counts/' + username) |
| js/teacher.js | 19679 | set | await db.ref('student_bonus_tickets/' + username).set(newBonus); |
| js/painting.js | 1304 | transaction | `student_coins/${this.user.username}` |
| js/painting.js | 8279 | transaction | await db.ref(`student_coins/${student.studentUsername}`).transaction(current => Number(current \|\| 0) + reward.coins); |
| js/painting.js | 8292 | unknown | `student_inventory/${student.studentUsername}/${badgeId}` |
| js/painting.js | 8326 | unknown | updates[`student_inventory/${student.studentUsername}/chest_hh_${seasonId}`] = { id: 'chest_hoihoa', type: 'chest', name: 'Rương Kho Báu Hội Họa', icon: '🎁', isEquipped: false, purchaseTime: Date.now(), description: 'Phần thưởng Quán quân mùa giải Hội Họa.' }; |
| js/painting.js | 8332 | unknown | `student_discounts/${student.studentUsername}/hh_discount_${seasonId}` |
| js/lich-su-hao-hung.js | 1878 | transaction | const itemRef = database.ref(`student_inventory/${user.username}/${item.id}`); |
| js/mid-autumn-festival.js | 279 | read/listen | return getDatabase().ref(`mid_autumn_wallets/${username()}`); |
| js/mid-autumn-festival.js | 971 | transaction | const coinRef = getDatabase().ref(`student_coins/${username()}`); |
| js/mid-autumn-festival.js | 997 | transaction | await getDatabase().ref(`student_coins/${username()}`).transaction(current => Number(current \|\| 0) + CONFIG.extraTicketPrice); |
| js/mid-autumn-festival.js | 1016 | read/listen | const inventory = await getDatabase().ref(`student_inventory/${username()}`).once('value'); |
| js/mid-autumn-festival.js | 1141 | update | [`student_coins/${username()}`]: firebase.database.ServerValue.increment(amount), |
| js/mid-autumn-festival.js | 1167 | read/listen | let inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/mid-autumn-festival.js | 1172 | read/listen | inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/history-retention.js | 22 | unknown | cash_requests: { |
| js/history-retention.js | 43 | unknown | 'birthday_coins', |
| js/history-retention.js | 44 | unknown | 'leaderboard_reward_claims', |
| js/history-retention.js | 49 | unknown | 'spin_counts', |
| js/history-retention.js | 52 | unknown | 'historical_grade_tickets', |
| js/history-retention.js | 53 | unknown | 'student_inventory', |
| js/history-retention.js | 54 | unknown | 'student_discounts', |
| js/history-retention.js | 55 | unknown | 'student_collection_rewards', |
| js/history-retention.js | 56 | unknown | 'student_coins', |
| js/history-retention.js | 57 | unknown | 'student_money_offset', |
| js/history-retention.js | 63 | unknown | 'student_special_birthday_coins', |
| js/history-retention.js | 64 | unknown | 'mid_autumn_wallets', |
| js/pet-interactions.js | 1069 | set | const coinRef = db.ref(`student_coins/${user.username}`); |
| js/pet-interactions.js | 1208 | transaction | `student_coins/${user.username}` |
| js/pet-interactions.js | 2253 | unknown | `student_coins/${user.username}` |
| js/pet-interactions.js | 3777 | transaction | `student_coins/${user.username}` |
| js/bellum-event.js | 1360 | read/listen | `student_inventory/${username}` |
| js/bellum-event.js | 1422 | unknown | `student_inventory/${username}/${rewardItem.id}` |
| js/student.js | 514 | unknown | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 518 | unknown | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 522 | unknown | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 528 | unknown | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 532 | unknown | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 536 | unknown | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 563 | unknown | `student_discounts/${currentUser.username}/${key}/targetItem` |
| js/student.js | 567 | update | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 2107 | unknown | `mid_autumn_wallets/${username}` |
| js/student.js | 2778 | read/listen | `student_inventory/${username}/${config.itemId}` |
| js/student.js | 3397 | unknown | ? `mid_autumn_wallets/${username}` |
| js/student.js | 4750 | read/listen | .ref(`grade_reward_claims/${normalizedUsername}`) |
| js/student.js | 5722 | unknown | listenFirebase(db.ref('student_coins/' + currentUser.username), 'value', (snapshot) => { |
| js/student.js | 5742 | unknown | db.ref('student_bonus_tickets/' + currentUser.username), |
| js/student.js | 5833 | unknown | 'student_inventory/' + |
| js/student.js | 5998 | unknown | 'birthday_coins/' + |
| js/student.js | 6058 | unknown | 'student_special_birthday_coins/' + |
| js/student.js | 7359 | update | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 7373 | read/listen | // Hàm db.ref('student_inventory/').on('value') có sẵn của bạn sẽ tự động chạy lại để gỡ trang bị ngay lập tức |
| js/student.js | 7403 | unknown | listenFirebase(db.ref('student_money_offset/' + currentUser.username), 'value', async () => { |
| js/student.js | 7416 | unknown | // SECURITY: Học sinh KHÔNG được listen toàn /cash_requests. Firebase Rules |
| js/student.js | 7435 | read/listen | 'student_discounts/' + |
| js/student.js | 15526 | transaction | 'student_coins/' + currentUser.username |
| js/student.js | 15555 | transaction | 'spin_counts/' + currentUser.username |
| js/student.js | 15642 | transaction | 'spin_counts/' + currentUser.username |
| js/student.js | 15854 | read/listen | 'historical_grade_tickets/' + currentUser.username |
| js/student.js | 15872 | read/listen | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 15882 | read/listen | .ref('spin_counts/' + currentUser.username) |
| js/student.js | 15980 | unknown | const coinPath = `student_coins/${username}`; |
| js/student.js | 15981 | transaction | const bonusTicketPath = `student_bonus_tickets/${username}`; |
| js/student.js | 16273 | transaction | `student_inventory/${currentUser.username}/${randomItem.id}` |
| js/student.js | 16659 | read/listen | .ref(`student_inventory/${currentUser.username}`) |
| js/student.js | 16728 | transaction | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 17715 | unknown | updates[`student_inventory/${currentUser.username}/${item.id}`] = null; |
| js/student.js | 17987 | transaction | `store_trial_claims/${username}/${itemId}` |
| js/student.js | 18063 | transaction | `store_purchase_ops/${username}/${itemId}` |
| js/student.js | 18208 | read/listen | `student_inventory/` + |
| js/student.js | 18304 | update | `student_coins/${currentUser.username}`, |
| js/student.js | 18379 | read/listen | `student_inventory/` + |
| js/student.js | 18425 | update | `student_inventory/` + |
| js/student.js | 18449 | update | `student_coins/${currentUser.username}`, |
| js/student.js | 18565 | read/listen | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 18617 | read/listen | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 18630 | read/listen | const discSnap = await db.ref(`student_discounts/${currentUser.username}`).once('value'); |
| js/student.js | 18890 | read/listen | `student_inventory/` + |
| js/student.js | 18992 | unknown | `student_discounts/` + |
| js/student.js | 19140 | update | `student_coins/${currentUser.username}`, |
| js/student.js | 19321 | unknown | `student_coins/${currentUser.username}`, |
| js/student.js | 19323 | unknown | `student_inventory/${currentUser.username}/${itemId}`, |
| js/student.js | 19381 | unknown | `student_coins/${currentUser.username}`, |
| js/student.js | 19534 | read/listen | `student_inventory/${currentUser.username}/${itemId}` |
| js/student.js | 19583 | read/listen | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19600 | transaction | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 19807 | read/listen | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19816 | update | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 20515 | read/listen | db.ref('student_money_offset/' + currentUser.username).once('value') |
| js/student.js | 21636 | unknown | `student_coins/${currentUser.username}`; |
| js/student.js | 21639 | unknown | `student_money_offset/${currentUser.username}`; |
| js/student.js | 22776 | transaction | `grade_reward_claims/${currentUser.username}/${msgKey}` |
| js/student.js | 22852 | unknown | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 22855 | transaction | 'student_coins/' + currentUser.username |
| js/student.js | 22974 | unknown | `student_bonus_tickets/${currentUser.username} + ` + |
| js/student.js | 22975 | unknown | `student_coins/${currentUser.username}`; |
| js/student.js | 23008 | transaction | 'student_coins/' + |
| js/student.js | 23033 | unknown | `student_coins/${currentUser.username}`; |
| js/student.js | 23072 | unknown | `mid_autumn_wallets/` + |
| js/student.js | 23105 | unknown | `mid_autumn_wallets/` + |
| js/student.js | 23129 | unknown | `mid_autumn_wallets/` + |
| js/student.js | 23167 | transaction | `birthday_coins/` + |
| js/student.js | 23209 | unknown | `birthday_coins/` + |
| js/student.js | 23235 | unknown | `birthday_coins/` + |
| js/student.js | 23297 | transaction | `student_special_birthday_coins/` + |
| js/student.js | 23340 | unknown | `student_special_birthday_coins/` + |
| js/student.js | 23365 | unknown | `student_special_birthday_coins/` + |
| js/student.js | 23421 | transaction | 'student_money_offset/' + |
| js/student.js | 23446 | unknown | `student_money_offset/${currentUser.username}`; |
| js/student.js | 23475 | transaction | 'student_bonus_tickets/' + |
| js/student.js | 23500 | unknown | `student_bonus_tickets/${currentUser.username}`; |
| js/student.js | 23509 | transaction | `student_inventory/` + |
| js/student.js | 23664 | transaction | `student_discounts/` + |
| js/student.js | 23728 | unknown | `student_discounts/` + |
| js/student.js | 29104 | transaction | `student_inventory/` + |
| js/student.js | 29172 | read/listen | `student_special_birthday_coins/` + |
| js/student.js | 29285 | read/listen | `student_inventory/` + |
| js/student.js | 29303 | read/listen | `student_special_birthday_coins/` + |
| js/student.js | 29704 | transaction | `student_inventory/` + |
| js/student.js | 29767 | read/listen | `birthday_coins/` + |
| js/student.js | 29907 | unknown | `birthday_coins/` + |
| js/student.js | 29913 | read/listen | `student_inventory/` + |
| js/student.js | 30483 | set | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 30489 | unknown | await db.ref(`student_discounts/${currentUser.username}/${discountKey}`).remove(); |
| js/student.js | 30518 | read/listen | 'student_discounts/' + |
| js/student.js | 30523 | read/listen | 'student_inventory/' + |
| js/student.js | 30528 | read/listen | 'birthday_coins/' + |
| js/student.js | 30534 | read/listen | 'student_special_birthday_coins/' + |
| js/student.js | 30539 | read/listen | 'mid_autumn_wallets/' + |
| js/student.js | 30566 | unknown | // Xu Trung Thu là tiền tệ sự kiện nên không ghi vào student_inventory. |
| js/student.js | 30567 | unknown | // Túi đồ đọc trực tiếp số dư thật từ mid_autumn_wallets. |
| js/student.js | 30952 | unknown | // Firebase Rules của /cash_requests không cho Student đọc toàn collection. |
| js/student.js | 30958 | unknown | throw new Error('Không xác định được username học sinh để đọc cash_requests an toàn.'); |
| js/student.js | 30962 | unknown | throw new Error('Trường query cash_requests không hợp lệ.'); |
| js/student.js | 30966 | unknown | .ref('cash_requests') |
| js/student.js | 30972 | read/listen | // theo Firebase key. Không có thao tác nào đọc thẳng /cash_requests. |
| js/student.js | 31058 | read/listen | db.ref('student_money_offset/' + currentUser.username).once('value'), |
| js/student.js | 31102 | unknown | window.HistoryRetention.isExpired('cash_requests', req) |
| js/student.js | 31266 | unknown | await pushDB('cash_requests', { |
| js/student.js | 31293 | unknown | alert('❌ Firebase từ chối quyền tạo yêu cầu tiền mặt. Vui lòng kiểm tra Rules của cash_requests.'); |
| js/student.js | 34159 | unknown | `student_inventory/${username}/${chestKey}` |
| js/student.js | 34182 | transaction | .ref(`student_coins/${username}`) |
| js/student.js | 34476 | read/listen | `student_inventory/${username}` |
| js/student.js | 34514 | transaction | `student_inventory/` + |
| js/student.js | 34589 | set | `student_discounts/` + |
| functions/history-retention-function.js | 23 | unknown | cash_requests: { |
| functions/history-retention-function.js | 41 | unknown | // birthday_reward_logs, leaderboard_reward_claims, hoihoa_reward_logs, |


## Inventory source cross-check

Rules source literals: `birthday_coin, hoihoa_chest, lucky_wheel, lucky_wheel_multi, mid_autumn_coin, special_birthday_coin, store_purchase, store_trial, teacher_gift`

Client inventory writer source literals: `bellum_completion_reward, birthday_coin, daily_login, hoihoa_chest, hoihoa_runner_up, hoihoa_season, leaderboard_chest, lucky_wheel, lucky_wheel_multi, royal_ball, special_birthday_coin, teacher_gift`

Missing from Rules: `bellum_completion_reward, daily_login, hoihoa_runner_up, hoihoa_season, leaderboard_chest, royal_ball`

| file | line | source | text |
| --- | --- | --- | --- |
| js/daily-login.js | 1074 | daily_login | source: 'daily_login', |
| js/daily-login.js | 1098 | daily_login | source: 'daily_login', |
| js/royal-ball.js | 1219 | royal_ball | source: 'royal_ball' |
| js/royal-ball.js | 1326 | royal_ball | source: 'royal_ball' |
| js/teacher.js | 17977 | teacher_gift | source: 'teacher_gift' |
| js/painting.js | 8313 | hoihoa_season | source: 'hoihoa_season', |
| js/painting.js | 8347 | hoihoa_runner_up | source: 'hoihoa_runner_up', |
| js/student.js | 16285 | lucky_wheel | source: 'lucky_wheel', |
| js/student.js | 16420 | lucky_wheel | source: 'lucky_wheel', |
| js/student.js | 16740 | lucky_wheel_multi | source: 'lucky_wheel_multi', |
| js/student.js | 16836 | lucky_wheel_multi | source: 'lucky_wheel_multi', |


## purchase_locks browser access

| file | line | text |
| --- | --- | --- |
| js/history-retention.js | 62 | 'purchase_locks', |
| functions/history-retention-function.js | 42 | // student_history_events, purchase_locks, wallet/grant/redemption, inventory, |


## AppStartupLoader.fail

Callsites:

_Không có._


Definitions / candidate implementations:

| file | line | text |
| --- | --- | --- |
| js/roadmap-startup-fix.js | 88 | if (typeof loader.fail === 'function') { |


## Duplicate function-name candidates

| name | count | locations |
| --- | --- | --- |
| blockEvent | 2 | js/common.js:128 function blockEvent(event, shouldNotify = true) {<br>js/store-manager.js:4320 function blockEvent(event, shouldNotify = true) { |
| boot | 3 | js/common.js:4367 function boot() {<br>js/lich-su-hao-hung.js:2000 async function boot() {<br>js/store-manager.js:4600 function boot() { |
| clamp | 2 | js/huong-dan-nguoi-moi.js:6036 function clamp(value, min, max) {<br>js/painting.js:939 clamp(value, min, max) { |
| clear | 11 | js/luxury-store.js:128 clear() {<br>js/luxury-store.js:1083 clear() {<br>js/luxury-store.js:3169 clear() {<br>js/luxury-store.js:3982 clear() {<br>js/luxury-store.js:4857 clear() {<br>js/luxury-store.js:5868 clear() {<br>js/luxury-store.js:6592 clear() {<br>js/luxury-store.js:7421 clear() {<br>js/luxury-store.js:7985 clear() {<br>js/luxury-store.js:8704 clear() {<br>js/luxury-store.js:9179 clear() { |
| clearOnlyTargetFrame | 3 | js/store-manager.js:4903 function clearOnlyTargetFrame() {<br>js/store-manager.js:5286 function clearOnlyTargetFrame() {<br>js/store-manager.js:5676 function clearOnlyTargetFrame() { |
| clearQuestionTimer | 2 | js/mid-autumn-festival.js:1429 function clearQuestionTimer() {<br>js/mid-autumn-festival.js:1669 function clearQuestionTimer() { |
| clearTargetHost | 2 | js/store-manager.js:5248 function clearTargetHost(host) {<br>js/store-manager.js:5633 function clearTargetHost(host) { |
| clearTimers | 8 | js/luxury-store.js:3157 clearTimers() {<br>js/luxury-store.js:3971 clearTimers() {<br>js/luxury-store.js:4811 clearTimers() {<br>js/luxury-store.js:5863 clearTimers() {<br>js/luxury-store.js:6585 clearTimers() {<br>js/luxury-store.js:7416 clearTimers() {<br>js/luxury-store.js:7973 clearTimers() {<br>js/mid-autumn-festival.js:1747 function clearTimers() { |
| close | 2 | js/mid-autumn-festival.js:1929 async function close() {<br>js/bellum-event.js:2525 function close() { |
| closeCollectionPage | 2 | js/store-collections.js:1830 function closeCollectionPage() {<br>js/luxury-store.js:14649 function closeCollectionPage() { |
| closeModal | 2 | js/update-manager.js:612 function closeModal() {<br>js/lich-su-hao-hung.js:1141 function closeModal() { |
| createInterface | 11 | js/luxury-store.js:405 createInterface() {<br>js/luxury-store.js:1424 createInterface() {<br>js/luxury-store.js:3362 createInterface() {<br>js/luxury-store.js:4155 createInterface() {<br>js/luxury-store.js:5097 createInterface() {<br>js/luxury-store.js:6083 createInterface() {<br>js/luxury-store.js:6830 createInterface() {<br>js/luxury-store.js:7563 createInterface() {<br>js/luxury-store.js:8129 createInterface() {<br>js/luxury-store.js:8851 createInterface() {<br>js/luxury-store.js:10756 createInterface() { |
| createPageClick | 7 | js/luxury-store.js:3576 createPageClick(x, y, strong = false) {<br>js/luxury-store.js:5233 createPageClick(x, y) {<br>js/luxury-store.js:6285 createPageClick(x, y, strong = false) {<br>js/luxury-store.js:7134 createPageClick(x, y, strong = false) {<br>js/luxury-store.js:7714 createPageClick(x, y, strong = false) {<br>js/luxury-store.js:8234 createPageClick(x, y, strong = false) {<br>js/luxury-store.js:8897 createPageClick(x, y) { |
| createPetRealm | 9 | js/luxury-store.js:1500 createPetRealm() {<br>js/luxury-store.js:3408 createPetRealm() {<br>js/luxury-store.js:4199 createPetRealm() {<br>js/luxury-store.js:5135 createPetRealm() {<br>js/luxury-store.js:6140 createPetRealm() {<br>js/luxury-store.js:6900 createPetRealm() {<br>js/luxury-store.js:7602 createPetRealm() {<br>js/luxury-store.js:8149 createPetRealm() {<br>js/luxury-store.js:9272 createPetRealm() { |
| createScreenBurst | 4 | js/luxury-store.js:610 createScreenBurst(x, y) {<br>js/luxury-store.js:1889 createScreenBurst(originX, originY) {<br>js/luxury-store.js:8971 createScreenBurst(x, y) {<br>js/luxury-store.js:9694 createScreenBurst(x, y) { |
| createUltimate | 8 | js/luxury-store.js:750 createUltimate(x, y, container) {<br>js/luxury-store.js:1969 createUltimate(originX, originY) {<br>js/luxury-store.js:3616 createUltimate(x, y) {<br>js/luxury-store.js:4383 createUltimate(x, y) {<br>js/luxury-store.js:5300 createUltimate(x, y) {<br>js/luxury-store.js:6322 createUltimate(x, y, container) {<br>js/luxury-store.js:7174 createUltimate(x, y, container) {<br>js/luxury-store.js:9952 createUltimate(x, y, container) { |
| createWorld | 11 | js/luxury-store.js:169 createWorld() {<br>js/luxury-store.js:1189 createWorld() {<br>js/luxury-store.js:3237 createWorld() {<br>js/luxury-store.js:4054 createWorld() {<br>js/luxury-store.js:4940 createWorld() {<br>js/luxury-store.js:5924 createWorld() {<br>js/luxury-store.js:6667 createWorld() {<br>js/luxury-store.js:7478 createWorld() {<br>js/luxury-store.js:8058 createWorld() {<br>js/luxury-store.js:8747 createWorld() {<br>js/luxury-store.js:10352 createWorld() { |
| end | 2 | js/mid-autumn-festival.js:1512 function end(reason) {<br>js/mid-autumn-festival.js:1599 function end() { |
| ensureLayer | 3 | js/store-manager.js:4726 function ensureLayer(host, item, variant) {<br>js/store-manager.js:5321 function ensureLayer(host, item, variant) {<br>js/store-manager.js:5711 function ensureLayer(host, item, variant) { |
| ensureModal | 3 | js/update-manager.js:465 function ensureModal() {<br>js/common.js:4890 function ensureModal() {<br>js/mid-autumn-festival.js:713 function ensureModal() { |
| escapeHTML | 7 | js/store-collections.js:214 function escapeHTML(value) {<br>js/update-manager.js:129 function escapeHTML(value) {<br>js/leaderboard.js:906 function escapeHTML(value) {<br>js/common.js:4643 function escapeHTML(value) {<br>js/luxury-store.js:13056 function escapeHTML(value) {<br>js/teacher.js:20219 function escapeHTML(value) {<br>js/painting.js:943 escapeHTML(value) { |
| escapeHtml | 2 | js/lich-su-hao-hung.js:978 function escapeHtml(value) {<br>js/mid-autumn-festival.js:239 function escapeHtml(value) { |
| function | 103 | js/leaderboard.js:2295 async function () {<br>js/common.js:1314 function () {<br>js/common.js:1416 function () {<br>js/common.js:1450 function () {<br>js/common.js:1469 function () {<br>js/common.js:1492 function (event) {<br>js/common.js:1508 function (event) {<br>js/common.js:1559 function (snapshot) {<br>js/common.js:1583 function () {<br>js/common.js:1639 function () {<br>js/common.js:1665 function () {<br>js/common.js:1676 function (error) { |
| getCurrentUser | 2 | js/web-animations.js:93 function getCurrentUser() {<br>js/pet-interactions.js:172 static getCurrentUser() { |
| getCurrentUsername | 3 | js/store-collections.js:255 function getCurrentUsername() {<br>js/leaderboard.js:916 function getCurrentUsername() {<br>js/effect-quality-manager.js:154 function getCurrentUsername() { |
| getCutoffTimestamp | 2 | js/history-retention.js:73 function getCutoffTimestamp(nowMs = Date.now()) {<br>functions/history-retention-function.js:45 function getCutoffTimestamp(nowMs = Date.now()) { |
| getDatabase | 4 | js/store-collections.js:227 function getDatabase() {<br>js/roadmap-startup-fix.js:17 function getDatabase() {<br>js/common.js:3045 function getDatabase() {<br>js/mid-autumn-festival.js:205 function getDatabase() { |
| getElement | 2 | js/common.js:27 function getElement(target) {<br>js/store-manager.js:4239 function getElement(target) { |
| getEmbedHTML | 2 | js/teacher.js:3744 function getEmbedHTML(url) {<br>js/student.js:7721 function getEmbedHTML(url) { |
| getEventStatus | 2 | js/mid-autumn-festival.js:383 async function getEventStatus() {<br>js/bellum-event.js:659 function getEventStatus(timestamp = Date.now() + serverTimeOffset) { |
| getFestivalInfo | 2 | js/teacher.js:526 function getFestivalInfo(year) {<br>js/student.js:1864 function getFestivalInfo(year) { |
| getImageElement | 2 | js/common.js:37 function getImageElement(target) {<br>js/store-manager.js:4247 function getImageElement(target) { |
| getItem | 4 | js/music-manager.js:13 static getItem(itemOrId) {<br>js/store-manager.js:4666 function getItem(itemOrId) {<br>js/store-manager.js:5202 function getItem(itemOrId) {<br>js/store-manager.js:5569 function getItem(itemOrId) { |
| getLeapMonthOffset | 2 | js/teacher.js:389 function getLeapMonthOffset(a11) {<br>js/student.js:1727 function getLeapMonthOffset(a11) { |
| getLunarMonth11 | 2 | js/teacher.js:358 function getLunarMonth11(year) {<br>js/student.js:1696 function getLunarMonth11(year) { |
| getNewMoonDay | 2 | js/teacher.js:294 function getNewMoonDay(k) {<br>js/student.js:1632 function getNewMoonDay(k) { |
| getNow | 2 | js/pet-interactions.js:8 static getNow() {<br>js/student.js:2049 function getNow() { |
| getPaginatedDB | 2 | js/teacher.js:1711 async function getPaginatedDB(path, limit = 20, cursorKey = null) {<br>js/firebase-config.js:279 async function getPaginatedDB(path, limit, lastKey = null) { |
| getPet | 5 | js/luxury-store.js:1182 getPet() {<br>js/luxury-store.js:3162 getPet() {<br>js/luxury-store.js:3976 getPet() {<br>js/luxury-store.js:4816 getPet() {<br>js/luxury-store.js:7978 getPet() { |
| getQualityCount | 2 | js/effect-items.js:108 static getQualityCount(baseCount, minimum = 1) {<br>js/pet-items.js:40 static getQualityCount(baseCount, minimum = 1) { |
| getState | 3 | js/update-manager.js:1161 getState() {<br>js/security.js:316 function getState() {<br>js/student-feature-loader.js:1330 function getState() { |
| getStorageKey | 3 | js/huong-dan-nguoi-moi.js:454 function getStorageKey() {<br>js/web-performance-optimizer.js:43 function getStorageKey() {<br>js/effect-quality-manager.js:163 function getStorageKey() { |
| getStoreItems | 2 | js/store-collections.js:712 function getStoreItems() {<br>js/lich-su-hao-hung.js:1754 function getStoreItems() { |
| getSunLongitude | 2 | js/teacher.js:346 function getSunLongitude(dayNumber) {<br>js/student.js:1684 function getSunLongitude(dayNumber) { |
| getVietnamDateKey | 2 | js/teacher.js:607 function getVietnamDateKey(<br>js/student.js:1945 function getVietnamDateKey( |
| getVietnamTodayParts | 2 | js/birthday-rewards-function.js:46 function getVietnamTodayParts(<br>js/teacher.js:10906 function getVietnamTodayParts() { |
| getVietnamYear | 3 | js/teacher.js:595 function getVietnamYear(<br>js/mid-autumn-festival.js:257 function getVietnamYear(timestamp = now()) {<br>js/student.js:1933 function getVietnamYear( |
| getYoutubeDurationCorrectly | 2 | js/teacher.js:19348 function getYoutubeDurationCorrectly(url, callback) {<br>js/teacher.js:19428 getYoutubeDurationCorrectly(url, function (durationInSeconds) { |
| handleKeyboard | 2 | js/huong-dan-nguoi-moi.js:3291 function handleKeyboard(event) {<br>js/painting.js:8376 handleKeyboard(event) { |
| hashSeed | 2 | js/teacher.js:22112 function hashSeed(value) {<br>js/student.js:35159 function hashSeed(value) { |
| hide | 2 | js/common.js:658 function hide() {<br>js/common.js:1271 function hide() { |
| init | 9 | js/daily-login.js:40 static async init() {<br>js/web-animations.js:731 function init() {<br>js/huong-dan-nguoi-moi.js:6098 async function init() {<br>js/painting.js:131 async init() {<br>js/mid-autumn-festival.js:1969 async function init() {<br>js/web-performance-optimizer.js:613 function init() {<br>js/pet-interactions.js:187 static init() {<br>js/student.js:3291 async function init() {<br>js/effect-quality-manager.js:1800 function init() { |
| injectStyles | 3 | js/huong-dan-nguoi-moi.js:1871 function injectStyles() {<br>js/web-performance-optimizer.js:144 function injectStyles() {<br>js/effect-quality-manager.js:203 function injectStyles() { |
| install | 4 | js/store-manager.js:4532 function install() {<br>js/store-manager.js:5098 function install() {<br>js/store-manager.js:5511 function install() {<br>js/store-manager.js:6018 function install() { |
| installGlobalClick | 8 | js/luxury-store.js:1821 installGlobalClick() {<br>js/luxury-store.js:3546 installGlobalClick() {<br>js/luxury-store.js:4287 installGlobalClick() {<br>js/luxury-store.js:5257 installGlobalClick() {<br>js/luxury-store.js:6258 installGlobalClick() {<br>js/luxury-store.js:7064 installGlobalClick() {<br>js/luxury-store.js:7665 installGlobalClick() {<br>js/luxury-store.js:8283 installGlobalClick() { |
| installObserver | 5 | js/luxury-store.js:2398 installObserver() {<br>js/luxury-store.js:3750 installObserver() {<br>js/luxury-store.js:4436 installObserver() {<br>js/luxury-store.js:5599 installObserver() {<br>js/effect-quality-manager.js:854 function installObserver() { |
| installPetSkill | 9 | js/luxury-store.js:526 installPetSkill() {<br>js/luxury-store.js:2211 installPetSkill() {<br>js/luxury-store.js:3502 installPetSkill(pet, container) {<br>js/luxury-store.js:5419 installPetSkill() {<br>js/luxury-store.js:6222 installPetSkill(pet, container) {<br>js/luxury-store.js:6988 installPetSkill(pet, container) {<br>js/luxury-store.js:8451 installPetSkill() {<br>js/luxury-store.js:9069 installPetSkill() {<br>js/luxury-store.js:9561 installPetSkill(pet, container) { |
| isProtectedImage | 2 | js/common.js:67 function isProtectedImage(target) {<br>js/store-manager.js:4258 function isProtectedImage(target) { |
| isStoreOpen | 2 | js/common.js:177 function isStoreOpen() {<br>js/store-manager.js:4365 function isStoreOpen() { |
| isTarget | 3 | js/store-manager.js:4686 function isTarget(itemOrId) {<br>js/store-manager.js:5211 function isTarget(itemOrId) {<br>js/store-manager.js:5584 function isTarget(itemOrId) { |
| isVerifiedTeacher | 2 | js/history-retention.js:186 async function isVerifiedTeacher() {<br>js/security.js:86 function isVerifiedTeacher() { |
| jdFromDate | 2 | js/teacher.js:146 function jdFromDate(dd, mm, yy) {<br>js/student.js:1484 function jdFromDate(dd, mm, yy) { |
| jdToDate | 2 | js/teacher.js:171 function jdToDate(jd) {<br>js/student.js:1509 function jdToDate(jd) { |
| loadScript | 2 | js/bellum-event.js:2121 function loadScript(url) {<br>js/student-feature-loader.js:492 function loadScript(url) { |
| lunarToSolar | 2 | js/teacher.js:425 function lunarToSolar(<br>js/student.js:1763 function lunarToSolar( |
| mount | 12 | js/update-manager.js:1123 function mount() {<br>js/luxury-store.js:930 mount() {<br>js/luxury-store.js:2516 mount() {<br>js/luxury-store.js:3781 mount() {<br>js/luxury-store.js:4471 mount() {<br>js/luxury-store.js:5646 mount() {<br>js/luxury-store.js:6457 mount() {<br>js/luxury-store.js:7332 mount() {<br>js/luxury-store.js:7824 mount() {<br>js/luxury-store.js:8590 mount() {<br>js/luxury-store.js:9151 mount() {<br>js/luxury-store.js:10877 mount() { |
| newMoon | 2 | js/teacher.js:208 function newMoon(k) {<br>js/student.js:1546 function newMoon(k) { |
| next | 2 | js/mid-autumn-festival.js:1457 function next() {<br>js/mid-autumn-festival.js:1695 function next() { |
| normalizeText | 2 | js/store-collections.js:204 function normalizeText(value) {<br>js/huong-dan-nguoi-moi.js:372 function normalizeText(value) { |
| normalizeWallet | 2 | js/teacher.js:637 function normalizeWallet(value) {<br>js/student.js:2058 function normalizeWallet(value) { |
| notify | 2 | js/update-manager.js:168 function notify(message, type) {<br>js/lich-su-hao-hung.js:987 function notify(message, type = 'success') { |
| now | 2 | js/lich-su-hao-hung.js:893 function now() {<br>js/mid-autumn-festival.js:235 function now() { |
| open | 2 | js/mid-autumn-festival.js:1860 async function open() {<br>js/bellum-event.js:2622 async function open() { |
| parseLegacyVietnamTime | 2 | js/history-retention.js:104 function parseLegacyVietnamTime(value) {<br>functions/history-retention-function.js:76 function parseLegacyVietnamTime(value) { |
| protectFloatingStoreItemImages | 2 | js/common.js:171 function protectFloatingStoreItemImages() {<br>js/store-manager.js:4359 function protectFloatingStoreItemImages() { |
| protectSubtree | 2 | js/common.js:160 function protectSubtree(root = document.body \|\| document.documentElement) {<br>js/store-manager.js:4335 function protectSubtree(root = document.body \|\| document.documentElement) { |
| randomFromSeed | 2 | js/teacher.js:22131 function randomFromSeed(seed) {<br>js/student.js:35180 function randomFromSeed(seed) { |
| readMultipleFiles | 2 | js/teacher.js:15100 async function readMultipleFiles(<br>js/student.js:14758 async function readMultipleFiles( |
| register | 2 | js/common.js:4423 function register(modalOrSelector, closeHandler) {<br>js/bellum-event.js:776 register(scene) { |
| removeOwnLayers | 2 | js/store-manager.js:5237 function removeOwnLayers(host) {<br>js/store-manager.js:5621 function removeOwnLayers(host) { |
| renderDashboard | 2 | js/common.js:4090 function renderDashboard(resultBox, rows, scannedAt) {<br>js/mid-autumn-festival.js:828 function renderDashboard(status) { |
| repair | 3 | js/luxury-store.js:2476 repair() {<br>js/luxury-store.js:5544 repair() {<br>js/luxury-store.js:8556 repair() { |
| repairFrame | 3 | js/store-manager.js:4869 function repairFrame(itemOrId) {<br>js/store-manager.js:5391 function repairFrame(itemOrId) {<br>js/store-manager.js:5835 function repairFrame(itemOrId) { |
| resolvePageRole | 2 | js/common.js:3009 function resolvePageRole() {<br>js/security.js:43 function resolvePageRole() { |
| resolveRole | 3 | js/web-animations.js:103 function resolveRole() {<br>js/web-performance-optimizer.js:21 function resolveRole() {<br>js/effect-quality-manager.js:134 function resolveRole() { |
| restore | 4 | js/luxury-store.js:2550 restore(attempt = 0) {<br>js/luxury-store.js:3841 restore(attempt = 0) {<br>js/luxury-store.js:4514 restore(attempt = 0) {<br>js/luxury-store.js:5674 restore(attempt = 0) { |
| run | 2 | js/roadmap-startup-fix.js:48 async function run() {<br>js/common.js:4246 async function run() { |
| selectionContainsProtectedImage | 2 | js/common.js:80 function selectionContainsProtectedImage() {<br>js/store-manager.js:4262 function selectionContainsProtectedImage() { |
| setEnabled | 3 | js/web-animations.js:787 function setEnabled(enabled) {<br>js/web-performance-optimizer.js:572 function setEnabled(enabled, persist = false) {<br>js/effect-quality-manager.js:1701 function setEnabled(enabled, options = {}) { |
| setTimer | 7 | js/luxury-store.js:3148 setTimer(callback, delay) {<br>js/luxury-store.js:3962 setTimer(callback, delay) {<br>js/luxury-store.js:4801 setTimer(callback, delay) {<br>js/luxury-store.js:5854 setTimer(callback, delay) {<br>js/luxury-store.js:6575 setTimer(callback, delay) {<br>js/luxury-store.js:7407 setTimer(callback, delay) {<br>js/luxury-store.js:7964 setTimer(callback, delay) { |
| showProtectionNotice | 2 | js/common.js:113 function showProtectionNotice() {<br>js/store-manager.js:4302 function showProtectionNotice() { |
| showToast | 2 | js/huong-dan-nguoi-moi.js:6016 function showToast(message) {<br>js/mid-autumn-festival.js:227 function showToast(message, type = 'success') { |
| shuffle | 4 | js/teacher.js:22161 function shuffle(items, seed) {<br>js/lich-su-hao-hung.js:965 function shuffle(values) {<br>js/mid-autumn-festival.js:248 function shuffle(items) {<br>js/student.js:35211 function shuffle(items, seed) { |
| sunLongitude | 2 | js/teacher.js:302 function sunLongitude(jdn) {<br>js/student.js:1640 function sunLongitude(jdn) { |
| triggerUltimate | 2 | js/luxury-store.js:7732 triggerUltimate(x, y) {<br>js/luxury-store.js:8318 triggerUltimate(x, y) { |
| undo | 2 | js/transaction-history.js:1196 async function undo(logId) {<br>js/painting.js:5123 undo() { |
| updateProfile | 2 | js/teacher.js:12236 async function updateProfile() {<br>js/student.js:13506 async function updateProfile() { |
| uploadFile | 2 | js/cloudinary-storage.js:56 async function uploadFile(<br>js/cloudflare-r2-storage.js:146 async function uploadFile( |
| uploadFiles | 2 | js/cloudinary-storage.js:157 async function uploadFiles(<br>js/cloudflare-r2-storage.js:328 async function uploadFiles( |
| versionLabel | 2 | js/teacher.js:22193 function versionLabel(index) {<br>js/student.js:35243 function versionLabel(index) { |
| wait | 2 | js/common.js:3003 function wait(ms) {<br>js/huong-dan-nguoi-moi.js:6026 function wait(milliseconds) { |
| wrapAvatarFrameManager | 3 | js/store-manager.js:4950 function wrapAvatarFrameManager() {<br>js/store-manager.js:5411 function wrapAvatarFrameManager() {<br>js/store-manager.js:5881 function wrapAvatarFrameManager() { |
| wrapStoreManager | 3 | js/store-manager.js:4994 function wrapStoreManager() {<br>js/store-manager.js:5457 function wrapStoreManager() {<br>js/store-manager.js:5941 function wrapStoreManager() { |


## Targeted pattern evidence

### `student_coins` (46 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 223 | "student_coins": { |
| js/store-collections.js | 431 | updates[`student_coins/${username}`] = getServerIncrement( |
| js/daily-login.js | 983 | `student_coins/${username}` |
| js/royal-ball.js | 812 | `student_coins/${currentUser.username}` |
| js/royal-ball.js | 1293 | `student_coins/${currentUser.username}` |
| js/leaderboard.js | 2641 | `student_coins/${username}` |
| js/leaderboard.js | 4291 | `student_coins/${username}` |
| js/leaderboard.js | 4592 | `student_coins/${username}` |
| js/leaderboard.js | 4642 | `student_coins/${username}` |
| js/transaction-history.js | 2273 | `student_coins/${username}`; |
| js/teacher.js | 3582 | listenFirebase(db.ref('student_coins'), 'value', debounce(loadStudentsList, 1500)); |
| js/teacher.js | 7437 | //   student_coins có thể âm để bảo toàn sổ cái và chặn việc lợi dụng chấm lại. |
| js/teacher.js | 7864 | `student_coins/${username}` |
| js/teacher.js | 8293 | `student_coins/${username}` |
| js/teacher.js | 8664 | `student_coins/${username}` |
| js/teacher.js | 9125 | `student_coins/${username}` |
| js/teacher.js | 9851 | `student_coins/${username}` |
| js/teacher.js | 11134 | const coinSnap = await db.ref('student_coins').once('value'); |
| js/teacher.js | 11742 | updates[`student_coins/${username}`] = null; |
| js/teacher.js | 15836 | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/painting.js | 1304 | `student_coins/${this.user.username}` |
| js/painting.js | 8279 | await db.ref(`student_coins/${student.studentUsername}`).transaction(current => Number(current \|\| 0) + reward.coins); |
| js/mid-autumn-festival.js | 971 | const coinRef = getDatabase().ref(`student_coins/${username()}`); |
| js/mid-autumn-festival.js | 997 | await getDatabase().ref(`student_coins/${username()}`).transaction(current => Number(current \|\| 0) + CONFIG.extraTicketPrice); |
| js/mid-autumn-festival.js | 1141 | [`student_coins/${username()}`]: firebase.database.ServerValue.increment(amount), |
| js/history-retention.js | 56 | 'student_coins', |
| js/pet-interactions.js | 1069 | const coinRef = db.ref(`student_coins/${user.username}`); |
| js/pet-interactions.js | 1208 | `student_coins/${user.username}` |
| js/pet-interactions.js | 2253 | `student_coins/${user.username}` |
| js/pet-interactions.js | 3777 | `student_coins/${user.username}` |
| js/student.js | 5722 | listenFirebase(db.ref('student_coins/' + currentUser.username), 'value', (snapshot) => { |
| js/student.js | 15526 | 'student_coins/' + currentUser.username |
| js/student.js | 15980 | const coinPath = `student_coins/${username}`; |
| js/student.js | 18304 | `student_coins/${currentUser.username}`, |
| js/student.js | 18449 | `student_coins/${currentUser.username}`, |
| js/student.js | 18617 | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 19140 | `student_coins/${currentUser.username}`, |
| js/student.js | 19321 | `student_coins/${currentUser.username}`, |
| js/student.js | 19381 | `student_coins/${currentUser.username}`, |
| js/student.js | 21636 | `student_coins/${currentUser.username}`; |
| js/student.js | 22855 | 'student_coins/' + currentUser.username |
| js/student.js | 22975 | `student_coins/${currentUser.username}`; |
| js/student.js | 23008 | 'student_coins/' + |
| js/student.js | 23033 | `student_coins/${currentUser.username}`; |
| js/student.js | 30483 | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 34182 | .ref(`student_coins/${username}`) |


### `student_money_offset` (13 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 392 | "student_money_offset": { |
| js/daily-login.js | 1037 | `student_money_offset/${username}` |
| js/teacher.js | 11744 | updates[`student_money_offset/${username}`] = null; |
| js/teacher.js | 18706 | db.ref(`student_money_offset/${studentUsername}`).once('value') |
| js/teacher.js | 18737 | const offsetRef = db.ref(`student_money_offset/${studentUsername}`); |
| js/teacher.js | 18803 | const offsetSnap = await db.ref(`student_money_offset/${studentUsername}`).once('value'); |
| js/history-retention.js | 57 | 'student_money_offset', |
| js/student.js | 7403 | listenFirebase(db.ref('student_money_offset/' + currentUser.username), 'value', async () => { |
| js/student.js | 20515 | db.ref('student_money_offset/' + currentUser.username).once('value') |
| js/student.js | 21639 | `student_money_offset/${currentUser.username}`; |
| js/student.js | 23421 | 'student_money_offset/' + |
| js/student.js | 23446 | `student_money_offset/${currentUser.username}`; |
| js/student.js | 31058 | db.ref('student_money_offset/' + currentUser.username).once('value'), |


### `student_bonus_tickets` (19 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 353 | "student_bonus_tickets": { |
| database.rules.patched.json | 363 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && newData.exists() && newData.child('count').isNumber() && ((data.exists() && data.child('count').isNumber() && newData.child('count').val() < data.child('count').val() && data.child('count').val() - newData.child('count').val() >= 1 && data.child('count').val() - newData.child('count').val() <= 50) \|\| (root.child('game_s |
| js/daily-login.js | 1005 | `student_bonus_tickets/${username}` |
| js/teacher.js | 8290 | `student_bonus_tickets/${username}` |
| js/teacher.js | 8661 | `student_bonus_tickets/${username}` |
| js/teacher.js | 9122 | `student_bonus_tickets/${username}` |
| js/teacher.js | 9203 | .ref(`student_bonus_tickets/${username}`) |
| js/teacher.js | 9848 | `student_bonus_tickets/${username}` |
| js/teacher.js | 10247 | `student_bonus_tickets/${username}` |
| js/teacher.js | 11743 | updates[`student_bonus_tickets/${username}`] = null; |
| js/teacher.js | 19610 | .ref('student_bonus_tickets/' + username) |
| js/teacher.js | 19679 | await db.ref('student_bonus_tickets/' + username).set(newBonus); |
| js/student.js | 5742 | db.ref('student_bonus_tickets/' + currentUser.username), |
| js/student.js | 15872 | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 15981 | const bonusTicketPath = `student_bonus_tickets/${username}`; |
| js/student.js | 22852 | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 22974 | `student_bonus_tickets/${currentUser.username} + ` + |
| js/student.js | 23475 | 'student_bonus_tickets/' + |
| js/student.js | 23500 | `student_bonus_tickets/${currentUser.username}`; |


### `historical_grade_tickets` (6 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 363 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && newData.exists() && newData.child('count').isNumber() && ((data.exists() && data.child('count').isNumber() && newData.child('count').val() < data.child('count').val() && data.child('count').val() - newData.child('count').val() >= 1 && data.child('count').val() - newData.child('count').val() <= 50) \|\| (root.child('game_s |
| database.rules.patched.json | 609 | "historical_grade_tickets": { |
| js/teacher.js | 11751 | updates[`historical_grade_tickets/${username}`] = null; |
| js/teacher.js | 19586 | `historical_grade_tickets/${normalizedUsername}` |
| js/history-retention.js | 52 | 'historical_grade_tickets', |
| js/student.js | 15854 | 'historical_grade_tickets/' + currentUser.username |


### `student_discounts` (22 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 634 | "student_discounts": { |
| js/daily-login.js | 1089 | .ref(`student_discounts/${username}`) |
| js/leaderboard.js | 2528 | `student_discounts/` + |
| js/teacher.js | 11746 | updates[`student_discounts/${username}`] = null; |
| js/painting.js | 8332 | `student_discounts/${student.studentUsername}/hh_discount_${seasonId}` |
| js/history-retention.js | 54 | 'student_discounts', |
| js/student.js | 514 | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 518 | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 522 | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 528 | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 532 | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 536 | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 563 | `student_discounts/${currentUser.username}/${key}/targetItem` |
| js/student.js | 567 | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 7435 | 'student_discounts/' + |
| js/student.js | 18630 | const discSnap = await db.ref(`student_discounts/${currentUser.username}`).once('value'); |
| js/student.js | 18992 | `student_discounts/` + |
| js/student.js | 23664 | `student_discounts/` + |
| js/student.js | 23728 | `student_discounts/` + |
| js/student.js | 30489 | await db.ref(`student_discounts/${currentUser.username}/${discountKey}`).remove(); |
| js/student.js | 30518 | 'student_discounts/' + |
| js/student.js | 34589 | `student_discounts/` + |


### `student_inventory` (57 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 297 | "student_inventory": { |
| js/store-collections.js | 620 | .ref(`student_inventory/${username}`) |
| js/daily-login.js | 1067 | `student_inventory/${username}/${preparedRewardValue}` |
| js/royal-ball.js | 1148 | `student_inventory/${currentUser.username}` |
| js/royal-ball.js | 1210 | `student_inventory/` + |
| js/leaderboard.js | 4330 | `student_inventory/` + |
| js/leaderboard.js | 4755 | `student_inventory/` + |
| js/luxury-store.js | 12230 | `student_inventory/${user.username}` |
| js/luxury-store.js | 12738 | `student_inventory/${user.username}/${itemId}` |
| js/luxury-store.js | 12863 | `student_inventory/${username}` |
| js/teacher.js | 7884 | `student_inventory/${username}` |
| js/teacher.js | 11745 | updates[`student_inventory/${username}`] = null; |
| js/teacher.js | 15848 | await pushDB(`student_inventory/${currentUser.username}`, { |
| js/teacher.js | 15862 | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/teacher.js | 15882 | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/teacher.js | 16935 | db.ref(`student_inventory/${username}`).once('value'), |
| js/teacher.js | 19218 | .ref(`student_inventory/${student.username}`).once('value'); |
| js/teacher.js | 19221 | updates[`student_inventory/${student.username}/${child.key}/isEquipped`] = false; |
| js/teacher.js | 19229 | DBReadSingleFlight.invalidate(`student_inventory/${student.username}`); |
| js/painting.js | 8292 | `student_inventory/${student.studentUsername}/${badgeId}` |
| js/painting.js | 8326 | updates[`student_inventory/${student.studentUsername}/chest_hh_${seasonId}`] = { id: 'chest_hoihoa', type: 'chest', name: 'Rương Kho Báu Hội Họa', icon: '🎁', isEquipped: false, purchaseTime: Date.now(), description: 'Phần thưởng Quán quân mùa giải Hội Họa.' }; |
| js/lich-su-hao-hung.js | 1878 | const itemRef = database.ref(`student_inventory/${user.username}/${item.id}`); |
| js/mid-autumn-festival.js | 1016 | const inventory = await getDatabase().ref(`student_inventory/${username()}`).once('value'); |
| js/mid-autumn-festival.js | 1167 | let inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/mid-autumn-festival.js | 1172 | inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/history-retention.js | 53 | 'student_inventory', |
| js/bellum-event.js | 1360 | `student_inventory/${username}` |
| js/bellum-event.js | 1422 | `student_inventory/${username}/${rewardItem.id}` |
| js/student.js | 2778 | `student_inventory/${username}/${config.itemId}` |
| js/student.js | 5833 | 'student_inventory/' + |
| js/student.js | 7359 | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 7373 | // Hàm db.ref('student_inventory/').on('value') có sẵn của bạn sẽ tự động chạy lại để gỡ trang bị ngay lập tức |
| js/student.js | 16273 | `student_inventory/${currentUser.username}/${randomItem.id}` |
| js/student.js | 16659 | .ref(`student_inventory/${currentUser.username}`) |
| js/student.js | 16728 | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 17715 | updates[`student_inventory/${currentUser.username}/${item.id}`] = null; |
| js/student.js | 18208 | `student_inventory/` + |
| js/student.js | 18379 | `student_inventory/` + |
| js/student.js | 18425 | `student_inventory/` + |
| js/student.js | 18565 | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 18890 | `student_inventory/` + |
| js/student.js | 19323 | `student_inventory/${currentUser.username}/${itemId}`, |
| js/student.js | 19534 | `student_inventory/${currentUser.username}/${itemId}` |
| js/student.js | 19583 | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19600 | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 19807 | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19816 | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 23509 | `student_inventory/` + |
| js/student.js | 29104 | `student_inventory/` + |
| js/student.js | 29285 | `student_inventory/` + |
| js/student.js | 29704 | `student_inventory/` + |
| js/student.js | 29913 | `student_inventory/` + |
| js/student.js | 30523 | 'student_inventory/' + |
| js/student.js | 30566 | // Xu Trung Thu là tiền tệ sự kiện nên không ghi vào student_inventory. |
| js/student.js | 34159 | `student_inventory/${username}/${chestKey}` |
| js/student.js | 34476 | `student_inventory/${username}` |
| js/student.js | 34514 | `student_inventory/` + |


### `cash_requests` (17 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 379 | "cash_requests": { |
| js/teacher.js | 3583 | listenFirebase(db.ref('cash_requests'), 'value', debounce(loadTeacherCashRequests, 1500)); |
| js/teacher.js | 18316 | // Không còn cho phép đổi trạng thái cash_requests trực tiếp vì có thể bỏ qua bước trừ tiền. |
| js/teacher.js | 18559 | let requests = await getDB('cash_requests'); |
| js/teacher.js | 18569 | 'cash_requests' |
| js/teacher.js | 18650 | const reqRef = db.ref(`cash_requests/${reqFbKey}`); |
| js/history-retention.js | 22 | cash_requests: { |
| js/student.js | 7416 | // SECURITY: Học sinh KHÔNG được listen toàn /cash_requests. Firebase Rules |
| js/student.js | 30952 | // Firebase Rules của /cash_requests không cho Student đọc toàn collection. |
| js/student.js | 30958 | throw new Error('Không xác định được username học sinh để đọc cash_requests an toàn.'); |
| js/student.js | 30962 | throw new Error('Trường query cash_requests không hợp lệ.'); |
| js/student.js | 30966 | .ref('cash_requests') |
| js/student.js | 30972 | // theo Firebase key. Không có thao tác nào đọc thẳng /cash_requests. |
| js/student.js | 31102 | window.HistoryRetention.isExpired('cash_requests', req) |
| js/student.js | 31266 | await pushDB('cash_requests', { |
| js/student.js | 31293 | alert('❌ Firebase từ chối quyền tạo yêu cầu tiền mặt. Vui lòng kiểm tra Rules của cash_requests.'); |
| functions/history-retention-function.js | 23 | cash_requests: { |


### `purchase_locks` (3 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 809 | "purchase_locks": { |
| js/history-retention.js | 62 | 'purchase_locks', |
| functions/history-retention-function.js | 42 | // student_history_events, purchase_locks, wallet/grant/redemption, inventory, |


### `refund_pending` (6 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 908 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 918 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| js/student.js | 18103 | 'refund_pending' |
| js/student.js | 18477 | 'refund_pending', |
| js/student.js | 19433 | ? 'refund_pending' |
| js/student.js | 19486 | ? '⚠️ Thanh toán lỗi và Coin chưa hoàn được. Giao dịch đã được đánh dấu refund_pending để giáo viên đối soát.' |


### `daily_login` (23 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 482 | "student_daily_login": { |
| database.rules.patched.json | 805 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && newData.child('id').val() === $logId && newData.child('actor').child('uid').val() === auth.uid && newData.child('actor').child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('actor').child('role').val() === root.child('users').child(auth.uid).child('role').val() && newData.child('targetUsername').val() ===  |
| js/daily-login.js | 94 | const snap = await db.ref('game_settings/daily_login_weeks').once('value'); |
| js/daily-login.js | 228 | const snap = await db.ref(`game_settings/daily_login_weeks/${weekId}`).once('value'); |
| js/daily-login.js | 241 | const snap = await db.ref(`game_settings/daily_login_weeks/${targetWeekId}`).once('value'); |
| js/daily-login.js | 349 | await db.ref(`game_settings/daily_login_weeks/${weekId}`).set(config); |
| js/daily-login.js | 359 | await db.ref(`game_settings/daily_login_weeks/${weekId}`).remove(); |
| js/daily-login.js | 377 | const weeksSnap = await db.ref(`game_settings/daily_login_weeks`).once('value'); |
| js/daily-login.js | 401 | const historySnap = await db.ref(`student_daily_login/${username}`).once('value'); |
| js/daily-login.js | 754 | `game_settings/daily_login_weeks/${serverWeekId}` |
| js/daily-login.js | 915 | `student_daily_login/${username}` |
| js/daily-login.js | 1074 | source: 'daily_login', |
| js/daily-login.js | 1098 | source: 'daily_login', |
| js/transaction-history.js | 1362 | daily_login_reward: |
| js/teacher.js | 11748 | updates[`student_daily_login/${username}`] = null; |
| js/history-retention.js | 47 | 'student_daily_login', |
| js/student.js | 554 | 'daily_login'; |
| js/student.js | 568 | ] = 'daily_login'; |
| js/student.js | 4565 | discountSource === 'daily_login'; |
| js/student.js | 18681 | : discountSource === 'daily_login' |
| js/student.js | 22311 | : messageDiscountSource === 'daily_login' |
| js/student.js | 28706 | discountSource === 'daily_login'; |
| js/student.js | 30812 | group.source === 'daily_login'; |


### `leaderboard_chest` (5 hits)

| file | line | text |
| --- | --- | --- |
| js/leaderboard.js | 4304 | 'leaderboard_chest', |
| js/leaderboard.js | 4606 | 'leaderboard_chest_duplicate', |
| js/leaderboard.js | 4656 | 'leaderboard_chest_all_owned', |
| js/leaderboard.js | 4766 | 'leaderboard_chest', |
| js/leaderboard.js | 4785 | 'leaderboard_chest', |


### `royal_ball` (13 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 488 | "royal_ball_limits": { |
| js/royal-ball.js | 672 | const snap = await db.ref('game_settings/royal_ball').once('value'); |
| js/royal-ball.js | 749 | `royal_ball_limits/${currentUser.username}` |
| js/royal-ball.js | 794 | '❌ Firebase Rules chưa cấp quyền cho royal_ball_limits.' |
| js/royal-ball.js | 1219 | source: 'royal_ball' |
| js/royal-ball.js | 1326 | source: 'royal_ball' |
| js/royal-ball.js | 1495 | const snap = await db.ref('game_settings/royal_ball').once('value'); |
| js/royal-ball.js | 1501 | 'game_settings/royal_ball': |
| js/royal-ball.js | 1504 | 'limited_events/royal_ball': |
| js/royal-ball.js | 1571 | 'game_settings/royal_ball': |
| js/royal-ball.js | 1574 | 'limited_events/royal_ball': |
| js/royal-ball.js | 1619 | db.ref('game_settings/royal_ball').on('value', (snapshot) => { |
| js/history-retention.js | 48 | 'royal_ball_limits', |


### `bellum` (910 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 246 | "bellum": { |
| student.html | 859 | <div id="bellumEventCard" class="card bellum-event-card ui-theme-immune"> |
| student.html | 860 | <div class="bellum-card-copy"> |
| student.html | 861 | <div class="bellum-card-eyebrow">⛪ SỰ KIỆN · TIỂU THUYẾT TRỰC QUAN</div> |
| student.html | 865 | <div class="bellum-card-actions"> |
| student.html | 866 | <button class="bellum-card-button bellum-card-button-info" type="button" onclick="BellumEvent.showIntroduction()">📖 Giới thiệu cốt truyện &amp; nhân vật</button> |
| student.html | 867 | <button class="bellum-card-button" type="button" onclick="BellumEvent.open()">Bước vào Bellum ➡️</button> |
| js/bellum-event.js | 7 | const SCENE_BASE_JS = 'js/bellum-scenes/'; |
| js/bellum-event.js | 8 | const SCENE_BASE_CSS = 'css/bellum-scenes/'; |
| js/bellum-event.js | 9 | const SAVE_KEY = 'bellum_visual_novel_progress_v1'; |
| js/bellum-event.js | 62 | * --bellum-scene-image được dùng bên trong scene-XX.css. |
| js/bellum-event.js | 64 | * sẽ resolve nó theo thư mục của stylesheet (css/bellum-scenes/), tạo |
| js/bellum-event.js | 65 | * đường dẫn sai css/bellum-scenes/assets/.... |
| js/bellum-event.js | 104 | const stage = byId('bellumStage'); |
| js/bellum-event.js | 120 | stage.style.getPropertyValue('--bellum-scene-image') !== |
| js/bellum-event.js | 125 | '--bellum-scene-image', |
| js/bellum-event.js | 164 | 'bellum-amb-rain', |
| js/bellum-event.js | 165 | 'bellum-amb-cold', |
| js/bellum-event.js | 166 | 'bellum-amb-forest', |
| js/bellum-event.js | 167 | 'bellum-amb-fog', |
| js/bellum-event.js | 168 | 'bellum-amb-crypt', |
| js/bellum-event.js | 169 | 'bellum-amb-gold', |
| js/bellum-event.js | 170 | 'bellum-amb-mirror', |
| js/bellum-event.js | 171 | 'bellum-amb-dust', |
| js/bellum-event.js | 172 | 'bellum-amb-memory', |
| js/bellum-event.js | 173 | 'bellum-amb-sick', |
| js/bellum-event.js | 174 | 'bellum-amb-dream', |
| js/bellum-event.js | 175 | 'bellum-amb-crimson', |
| js/bellum-event.js | 176 | 'bellum-amb-stage', |
| js/bellum-event.js | 177 | 'bellum-amb-fire', |
| js/bellum-event.js | 178 | 'bellum-amb-holy', |
| js/bellum-event.js | 179 | 'bellum-amb-ritual', |
| js/bellum-event.js | 180 | 'bellum-amb-smoke', |
| js/bellum-event.js | 181 | 'bellum-amb-storm', |
| js/bellum-event.js | 182 | 'bellum-amb-sigil', |
| js/bellum-event.js | 183 | 'bellum-amb-abyss', |
| js/bellum-event.js | 184 | 'bellum-amb-debris', |
| js/bellum-event.js | 185 | 'bellum-amb-collapse', |
| js/bellum-event.js | 186 | 'bellum-amb-dawn' |
| js/bellum-event.js | 190 | 'bellum-fx-shake-soft', |
| js/bellum-event.js | 191 | 'bellum-fx-shake-heavy', |
| js/bellum-event.js | 192 | 'bellum-fx-distort', |
| js/bellum-event.js | 193 | 'bellum-fx-dream-hit', |
| js/bellum-event.js | 194 | 'bellum-fx-heartbeat', |
| js/bellum-event.js | 195 | 'bellum-fx-memory-hit', |
| js/bellum-event.js | 196 | 'bellum-fx-abyss-hit', |
| js/bellum-event.js | 197 | 'bellum-fx-ritual-hit', |
| js/bellum-event.js | 198 | 'bellum-fx-ghost-hit' |
| js/bellum-event.js | 230 | const root = byId('bellumEvent'); |
| js/bellum-event.js | 241 | root.classList.add(`bellum-amb-${name}`) |
| js/bellum-event.js | 248 | const stage = byId('bellumStage'); |
| js/bellum-event.js | 249 | const root = byId('bellumEvent'); |
| js/bellum-event.js | 250 | const dialogue = byId('bellumDialogueBox'); |
| js/bellum-event.js | 251 | const portrait = byId('bellumPortrait'); |
| js/bellum-event.js | 252 | const flash = byId('bellumFxFlash'); |
| js/bellum-event.js | 253 | const whisper = byId('bellumFxWhisper'); |
| js/bellum-event.js | 260 | 'bellum-fx-dialogue-impact', |
| js/bellum-event.js | 261 | 'bellum-fx-dialogue-echo', |
| js/bellum-event.js | 262 | 'bellum-fx-dialogue-corrupt' |
| js/bellum-event.js | 268 | 'bellum-fx-portrait-entity', |
| js/bellum-event.js | 269 | 'bellum-fx-portrait-ghost', |
| js/bellum-event.js | 270 | 'bellum-fx-portrait-rage', |
| js/bellum-event.js | 271 | 'bellum-fx-portrait-holy' |
| js/bellum-event.js | 277 | flash.className = 'bellum-fx-flash'; |
| js/bellum-event.js | 286 | 'bellum-fx-speaker-mammon', |
| js/bellum-event.js | 287 | 'bellum-fx-speaker-leviathan', |
| js/bellum-event.js | 288 | 'bellum-fx-speaker-beelzebub', |
| js/bellum-event.js | 289 | 'bellum-fx-speaker-belphegor', |
| js/bellum-event.js | 290 | 'bellum-fx-speaker-asmodeus', |
| js/bellum-event.js | 291 | 'bellum-fx-speaker-satan', |
| js/bellum-event.js | 292 | 'bellum-fx-speaker-lucifer', |
| js/bellum-event.js | 293 | 'bellum-fx-speaker-abyssus', |
| js/bellum-event.js | 294 | 'bellum-fx-speaker-malach' |
| js/bellum-event.js | 299 | const flash = byId('bellumFxFlash'); |
| js/bellum-event.js | 311 | flash.className = `bellum-fx-flash ${className}`; |
| js/bellum-event.js | 317 | flash.className = 'bellum-fx-flash'; |
| js/bellum-event.js | 323 | const whisper = byId('bellumFxWhisper'); |
| js/bellum-event.js | 350 | const container = byId('bellumFxParticles'); |
| js/bellum-event.js | 354 | .querySelectorAll('.bellum-fx-particle') |
| js/bellum-event.js | 366 | `bellum-fx-particle is-${kind}`; |
| js/bellum-event.js | 397 | .querySelectorAll('.bellum-fx-particle') |
| js/bellum-event.js | 404 | const root = byId('bellumEvent'); |
| js/bellum-event.js | 405 | const portrait = byId('bellumPortrait'); |
| js/bellum-event.js | 406 | const dialogue = byId('bellumDialogueBox'); |
| js/bellum-event.js | 416 | root.classList.add('bellum-fx-speaker-mammon'); |
| js/bellum-event.js | 417 | portrait?.classList.add('bellum-fx-portrait-entity'); |
| js/bellum-event.js | 419 | root.classList.add('bellum-fx-speaker-leviathan'); |
| js/bellum-event.js | 420 | portrait?.classList.add('bellum-fx-portrait-entity'); |
| js/bellum-event.js | 421 | addTimedClass(dialogue, 'bellum-fx-dialogue-corrupt', 900); |
| js/bellum-event.js | 423 | root.classList.add('bellum-fx-speaker-beelzebub'); |
| js/bellum-event.js | 424 | portrait?.classList.add('bellum-fx-portrait-entity'); |
| js/bellum-event.js | 426 | root.classList.add('bellum-fx-speaker-belphegor'); |
| js/bellum-event.js | 427 | portrait?.classList.add('bellum-fx-portrait-ghost'); |
| js/bellum-event.js | 429 | root.classList.add('bellum-fx-speaker-asmodeus'); |
| js/bellum-event.js | 430 | portrait?.classList.add('bellum-fx-portrait-entity'); |
| js/bellum-event.js | 432 | root.classList.add('bellum-fx-speaker-satan'); |
| js/bellum-event.js | 433 | portrait?.classList.add('bellum-fx-portrait-rage'); |
| js/bellum-event.js | 434 | addTimedClass(dialogue, 'bellum-fx-dialogue-impact', 760); |
| js/bellum-event.js | 436 | root.classList.add('bellum-fx-speaker-lucifer'); |
| js/bellum-event.js | 437 | portrait?.classList.add('bellum-fx-portrait-holy'); |
| js/bellum-event.js | 439 | root.classList.add('bellum-fx-speaker-abyssus'); |
| js/bellum-event.js | 440 | portrait?.classList.add('bellum-fx-portrait-entity'); |
| js/bellum-event.js | 441 | addTimedClass(dialogue, 'bellum-fx-dialogue-corrupt', 980); |
| js/bellum-event.js | 443 | root.classList.add('bellum-fx-speaker-malach'); |
| js/bellum-event.js | 444 | addTimedClass(dialogue, 'bellum-fx-dialogue-echo', 1100); |
| js/bellum-event.js | 459 | const stage = byId('bellumStage'); |
| js/bellum-event.js | 460 | const dialogue = byId('bellumDialogueBox'); |
| js/bellum-event.js | 461 | const portrait = byId('bellumPortrait'); |
| js/bellum-event.js | 470 | addTimedClass(stage, 'bellum-fx-heartbeat', 700); |
| js/bellum-event.js | 475 | addTimedClass(dialogue, 'bellum-fx-dialogue-echo', 1300); |
| js/bellum-event.js | 486 | ? 'bellum-fx-shake-heavy' |
| js/bellum-event.js | 487 | : 'bellum-fx-shake-soft', |
| js/bellum-event.js | 505 | addTimedClass(stage, 'bellum-fx-memory-hit', 900); |
| js/bellum-event.js | 510 | addTimedClass(stage, 'bellum-fx-distort', 980); |
| js/bellum-event.js | 511 | addTimedClass(dialogue, 'bellum-fx-dialogue-corrupt', 900); |
| js/bellum-event.js | 528 | addTimedClass(stage, 'bellum-fx-memory-hit', 1250); |
| js/bellum-event.js | 533 | addTimedClass(stage, 'bellum-fx-dream-hit', 1250); |
| js/bellum-event.js | 538 | addTimedClass(stage, 'bellum-fx-ritual-hit', 1250); |
| js/bellum-event.js | 544 | addTimedClass(stage, 'bellum-fx-abyss-hit', 1150); |
| js/bellum-event.js | 545 | addTimedClass(stage, 'bellum-fx-distort', 900); |


### `leaderboard_reward` (11 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 599 | "leaderboard_reward_claims": { |
| js/leaderboard.js | 1830 | 'leaderboard_reward_claims/' + |
| js/leaderboard.js | 2582 | 'leaderboard_reward', |
| js/leaderboard.js | 2679 | 'leaderboard_reward', |
| js/leaderboard.js | 4299 | 'leaderboard_reward', |
| js/leaderboard.js | 4600 | 'leaderboard_reward', |
| js/leaderboard.js | 4650 | 'leaderboard_reward', |
| js/leaderboard.js | 4779 | 'leaderboard_reward', |
| js/transaction-history.js | 1359 | leaderboard_reward: |
| js/history-retention.js | 44 | 'leaderboard_reward_claims', |
| functions/history-retention-function.js | 41 | // birthday_reward_logs, leaderboard_reward_claims, hoihoa_reward_logs, |


### `question_bank` (3 hits)

| file | line | text |
| --- | --- | --- |
| js/teacher.js | 12287 | return `teacher_question_bank_shortcut_open:${username}`; |
| js/teacher.js | 20198 | // Tương thích dữ liệu từng bị lưu nhầm vào question_bank |
| js/teacher.js | 20199 | const LEGACY_QB_PATH = 'question_bank'; |


### `firebaseConfig` (3 hits)

| file | line | text |
| --- | --- | --- |
| js/teacher.js | 1198 | const secondaryApp = firebase.initializeApp(firebaseConfig, "SecondaryApp") |
| js/firebase-config.js | 2 | const firebaseConfig = { |
| js/firebase-config.js | 14 | firebase.initializeApp(firebaseConfig); |


### `renderStudentRoadmap` (21 hits)

| file | line | text |
| --- | --- | --- |
| js/teacher.js | 3510 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/teacher.js | 3520 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/teacher.js | 3526 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/teacher.js | 3552 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/teacher.js | 3565 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/teacher.js | 11768 | if (document.getElementById('studentRoadmapBody') && typeof renderStudentRoadmap === 'function') { |
| js/teacher.js | 11769 | renderStudentRoadmap(); |
| js/student.js | 5475 | renderStudentRoadmap(); |
| js/student.js | 5525 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/student.js | 5602 | renderStudentRoadmap(); |
| js/student.js | 5637 | if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap(); |
| js/student.js | 7405 | if (typeof renderStudentRoadmap === 'function' && document.getElementById('studentRoadmapBody')) { |
| js/student.js | 7406 | await renderStudentRoadmap(); |
| js/student.js | 13298 | if (typeof renderStudentRoadmap === 'function') renderStudentRoadmap(); |
| js/student.js | 20476 | async function renderStudentRoadmap() { |
| js/student.js | 20492 | await renderStudentRoadmapCore(); |
| js/student.js | 20507 | async function renderStudentRoadmapCore() { |
| js/student.js | 21894 | typeof renderStudentRoadmap === |
| js/student.js | 21898 | renderStudentRoadmap() |
| js/student.js | 23454 | typeof renderStudentRoadmap === |
| js/student.js | 23457 | renderStudentRoadmap(); |


### `StoreManager.unapplyItem` (29 hits)

| file | line | text |
| --- | --- | --- |
| js/luxury-store.js | 11378 | typeof StoreManager.unapplyItem !== 'function' |
| js/luxury-store.js | 11403 | StoreManager.unapplyItem.bind( |
| js/luxury-store.js | 11408 | StoreManager.unapplyItem = |
| js/luxury-store.js | 12150 | await StoreManager.unapplyItem( |
| js/luxury-store.js | 12447 | typeof StoreManager.unapplyItem !== |
| js/luxury-store.js | 13193 | StoreManager.unapplyItem( |
| js/luxury-store.js | 13341 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 13444 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 13550 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 13647 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 13746 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 13849 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 13960 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 14100 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 14223 | onclick="StoreManager.unapplyItem('${id}')" |
| js/luxury-store.js | 14364 | StoreManager.unapplyItem( |
| js/pet-items.js | 4644 | typeof StoreManager.unapplyItem === 'function' |
| js/pet-items.js | 4646 | StoreManager.unapplyItem(petData.id); |
| js/store-manager.js | 3140 | actionButton = `<button class="btn-equip active" onclick="StoreManager.unapplyItem('${item.id}')" style="background: rgba(225, 29, 72, 0.08); color: #e11d48; border: 1px dashed #e11d48; cursor: pointer; box-shadow: none;" title="Nhấn để tháo vật phẩm này">❌ Tháo trang bị</button>`; |
| js/store-manager.js | 5015 | typeof StoreManager.unapplyItem === |
| js/store-manager.js | 5017 | ? StoreManager.unapplyItem |
| js/store-manager.js | 5076 | StoreManager.unapplyItem = |
| js/store-manager.js | 5468 | typeof StoreManager.unapplyItem === 'function' |
| js/store-manager.js | 5469 | ? StoreManager.unapplyItem.bind(StoreManager) |
| js/store-manager.js | 5494 | StoreManager.unapplyItem = async function (itemId) { |
| js/store-manager.js | 5955 | typeof StoreManager.unapplyItem === 'function' |
| js/store-manager.js | 5956 | ? StoreManager.unapplyItem.bind(StoreManager) |
| js/store-manager.js | 5995 | StoreManager.unapplyItem = |
| js/student.js | 19628 | StoreManager.unapplyItem = async function (itemId) { |


### `MidAutumnCalendar` (17 hits)

| file | line | text |
| --- | --- | --- |
| js/teacher.js | 140 | window.MidAutumnCalendar = window.MidAutumnCalendar \|\| (() => { |
| js/teacher.js | 685 | .MidAutumnCalendar |
| js/teacher.js | 724 | .MidAutumnCalendar |
| js/teacher.js | 952 | .MidAutumnCalendar |
| js/teacher.js | 957 | .MidAutumnCalendar |
| js/mid-autumn-festival.js | 258 | if (window.MidAutumnCalendar?.getVietnamYear) { |
| js/mid-autumn-festival.js | 259 | return window.MidAutumnCalendar.getVietnamYear(timestamp); |
| js/mid-autumn-festival.js | 297 | localInfo = window.MidAutumnCalendar?.getFestivalInfo?.(year) \|\| null; |
| js/mid-autumn-festival.js | 320 | * Firebase, dùng chính kết quả 15/8 âm lịch do MidAutumnCalendar tính. |
| js/mid-autumn-festival.js | 388 | localInfo = window.MidAutumnCalendar?.getFestivalInfo?.(year) \|\| null; |
| js/student.js | 1478 | window.MidAutumnCalendar = window.MidAutumnCalendar \|\| (() => { |
| js/student.js | 2114 | .MidAutumnCalendar |
| js/student.js | 2153 | * MidAutumnCalendar đã tự đổi âm -> dương ở phía client. |
| js/student.js | 2356 | .MidAutumnCalendar |
| js/student.js | 2484 | .MidAutumnCalendar |
| js/student.js | 2745 | .MidAutumnCalendar |
| js/student-feature-loader.js | 995 | // Chỉ cần 1 JS + 1 CSS; dùng MidAutumnCalendar/MidAutumnCoinManager có sẵn trong student.js. |


### `window.buyItem` (6 hits)

| file | line | text |
| --- | --- | --- |
| js/luxury-store.js | 12797 | typeof window.buyItem === 'function' |
| js/luxury-store.js | 12799 | return window.buyItem(itemId, upgradingFromTrial); |
| js/store-manager.js | 2864 | * window.buyItem sẽ chuyển đúng sang MidAutumnCoinManager.redeem(). |
| js/store-manager.js | 2885 | typeof window.buyItem === 'function' |
| js/store-manager.js | 2886 | ? window.buyItem |
| js/student.js | 18545 | window.buyItem = async function (itemId, isUpgradingFromTrial = false) { |


### `window.trialItem` (3 hits)

| file | line | text |
| --- | --- | --- |
| js/store-manager.js | 2940 | typeof window.trialItem === 'function' |
| js/store-manager.js | 2941 | ? window.trialItem |
| js/student.js | 18143 | window.trialItem = async function (itemId) { |


### `MidAutumnCoinManager.redeem` (2 hits)

| file | line | text |
| --- | --- | --- |
| js/mid-autumn-festival.js | 1171 | await window.MidAutumnCoinManager.redeem(itemId); |
| js/store-manager.js | 2864 | * window.buyItem sẽ chuyển đúng sang MidAutumnCoinManager.redeem(). |


### `redeemBirthdayItem` (5 hits)

| file | line | text |
| --- | --- | --- |
| js/store-manager.js | 3186 | .redeemBirthdayItem === |
| js/store-manager.js | 3196 | window.redeemBirthdayItem( |
| js/student.js | 29572 | .redeemBirthdayItem( |
| js/student.js | 29604 | window.redeemBirthdayItem( |
| js/student.js | 29865 | window.redeemBirthdayItem = |


### `redeemSpecialBirthdayItem` (3 hits)

| file | line | text |
| --- | --- | --- |
| js/store-manager.js | 3230 | .redeemSpecialBirthdayItem === |
| js/store-manager.js | 3237 | window.redeemSpecialBirthdayItem( |
| js/student.js | 29256 | window.redeemSpecialBirthdayItem = |


### `studentStoreCanUseItemSync` (3 hits)

| file | line | text |
| --- | --- | --- |
| js/store-manager.js | 2965 | typeof window.studentStoreCanUseItemSync === 'function' && |
| js/store-manager.js | 2966 | window.studentStoreCanUseItemSync(itemId) !== true |
| js/student.js | 73 | window.studentStoreCanUseItemSync = function (itemId) { |


### `openHoiHoaChest` (2 hits)

| file | line | text |
| --- | --- | --- |
| js/student.js | 30421 | <button onclick="openHoiHoaChest('${item.firebaseKey}')" |
| js/student.js | 34118 | window.openHoiHoaChest = async function (chestKey) { |


### `Math.random` (393 hits)

| file | line | text |
| --- | --- | --- |
| js/effect-items.js | 39 | Math.random() * usableWidth; |
| js/effect-items.js | 63 | Math.random() * usableWidth |
| js/effect-items.js | 70 | Math.random() * usableHeight |
| js/effect-items.js | 93 | minX + Math.random() * (maxX - minX) |
| js/effect-items.js | 98 | minY + Math.random() * (maxY - minY) |
| js/effect-items.js | 404 | snowflake.style.left = Math.random() * 100 + 'vw'; |
| js/effect-items.js | 405 | snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s |
| js/effect-items.js | 406 | snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; |
| js/effect-items.js | 423 | let size = Math.random() * 7 + 5; |
| js/effect-items.js | 429 | let duration = Math.random() * 4 + 4; |
| js/effect-items.js | 448 | let size = Math.random() * 4 + 3; |
| js/effect-items.js | 453 | firefly.style.left = Math.random() * 100 + 'vw'; |
| js/effect-items.js | 456 | let duration = Math.random() * 6 + 8; |
| js/effect-items.js | 479 | const randomType = leafClasses[Math.floor(Math.random() * leafClasses.length)]; |
| js/effect-items.js | 483 | leaf.style.left = Math.random() * 100 + 'vw'; |
| js/effect-items.js | 486 | let duration = Math.random() * 4 + 5; |
| js/effect-items.js | 490 | let scale = Math.random() * 0.6 + 0.6; // Scale từ 0.6 đến 1.2 |
| js/effect-items.js | 515 | star.style.left = Math.random() * 100 + 'vw'; |
| js/effect-items.js | 516 | star.style.top = Math.random() * 100 + 'vh'; |
| js/effect-items.js | 519 | let size = Math.random() * 3 + 3; |
| js/effect-items.js | 523 | let duration = Math.random() * 3 + 3; |
| js/effect-items.js | 553 | cloud.style.top = Math.random() * 40 + 'vh'; |
| js/effect-items.js | 556 | let duration = Math.random() * 15 + 15; |
| js/effect-items.js | 560 | let scale = Math.random() * 1.5 + 1; |
| js/effect-items.js | 562 | cloud.style.opacity = Math.random() * 0.5 + 0.3; |
| js/effect-items.js | 573 | bird.style.top = Math.random() * 50 + 10 + 'vh'; |
| js/effect-items.js | 576 | let duration = Math.random() * 5 + 7; |
| js/effect-items.js | 579 | bird.style.fontSize = (Math.random() * 10 + 20) + 'px'; |
| js/effect-items.js | 606 | let size = Math.random() * 4 + 4; |
| js/effect-items.js | 611 | let duration = Math.random() * 3 + 5; |
| js/effect-items.js | 677 | let width = Math.random() * 2 + 2; |
| js/effect-items.js | 678 | let height = Math.random() * 15 + 15; |
| js/effect-items.js | 683 | let duration = Math.random() * 3 + 3; |
| js/effect-items.js | 720 | dust.style.left = Math.random() * 100 + 'vw'; |
| js/effect-items.js | 724 | const size = Math.random() * 5 + 3; |
| js/effect-items.js | 729 | const chosenColor = colors[Math.floor(Math.random() * colors.length)]; |
| js/effect-items.js | 735 | const duration = Math.random() * 4 + 5; |
| js/effect-items.js | 754 | const starDuration = Math.random() * 1 + 1; |
| js/effect-items.js | 780 | ripple.style.left = Math.random() * 100 + 'vw'; |
| js/effect-items.js | 781 | ripple.style.top = Math.random() * 100 + 'vh'; |
| js/effect-items.js | 797 | rift.style.left = (Math.random() * 80 + 10) + 'vw'; |
| js/effect-items.js | 798 | rift.style.top = (Math.random() * 80 + 10) + 'vh'; |
| js/effect-items.js | 801 | let angle = Math.random() * 180; |
| js/effect-items.js | 895 | const randomSymbol = Math.random(); |
| js/effect-items.js | 904 | second.style.left = `${Math.random() * 96 + 2}%`; |
| js/effect-items.js | 905 | second.style.top = `${Math.random() * 92 + 4}%`; |
| js/effect-items.js | 909 | `${Math.random() * 14 + 8}px` |
| js/effect-items.js | 914 | `${Math.random() * -8}s` |
| js/effect-items.js | 919 | `${Math.random() * 6 + 7}s` |
| js/effect-items.js | 938 | tendril.style.left = `${Math.random() * 90 + 5}%`; |
| js/effect-items.js | 939 | tendril.style.top = `${Math.random() * 86 + 7}%`; |
| js/effect-items.js | 943 | `${Math.random() * 360}deg` |
| js/effect-items.js | 948 | `${Math.random() * 150 + 100}px` |
| js/effect-items.js | 951 | const tendrilBend = Math.random() * 70 - 35; |
| js/effect-items.js | 964 | `${Math.random() * 1.6 + 2.4}s`; |
| js/effect-items.js | 999 | overwrite.style.left = `${Math.random() * 46 + 27}%`; |
| js/effect-items.js | 1000 | overwrite.style.top = `${Math.random() * 34 + 33}%`; |
| js/effect-items.js | 1028 | let size = Math.random() * 3 + 2; |
| js/effect-items.js | 1032 | const isPurple = Math.random() > 0.5; |
| js/effect-items.js | 1036 | let duration = Math.random() * 4 + 4; |
| js/effect-items.js | 1070 | let starDuration = Math.random() * 1.5 + 1; |
| js/effect-items.js | 1075 | star.style.animationDelay = `${Math.random() * 0.4}s`; |
| js/effect-items.js | 1109 | `${Math.random() * 92 + 4}vw`; |
| js/effect-items.js | 1114 | `${Math.random() * 70 - 35}px` |
| js/effect-items.js | 1120 | `${Math.random() * 0.22 + 0.68}` |
| js/effect-items.js | 1127 | const size = Math.random() * 3 + 5; |
| js/effect-items.js | 1134 | duration = Math.random() * 2 + 4; |
| js/effect-items.js | 1137 | const size = Math.random() * 9 + 11; |
| js/effect-items.js | 1144 | duration = Math.random() * 3 + 7; |
| js/effect-items.js | 1305 | Math.random() * |
| js/effect-items.js | 1326 | Math.random() * 5 + 8; |
| js/effect-items.js | 1329 | Math.random() * 12 + 14; |
| js/effect-items.js | 1332 | Math.random() * 92 + 4; |
| js/effect-items.js | 1343 | ? `${Math.random() * 90 + 5}%` |
| js/effect-items.js | 1344 | : `calc(100% + ${Math.random() * 35 + 20 |
| js/effect-items.js | 1354 | `${Math.random() * 120 - 60}px` |
| js/effect-items.js | 1366 | `${Math.random() * 34 - 17}deg` |
| js/effect-items.js | 1373 | Math.random() * |
| js/effect-items.js | 1384 | `${-Math.random() * duration}s`; |
| js/effect-items.js | 1409 | `${Math.random() * 84 + 8}%`; |
| js/effect-items.js | 1412 | `${Math.random() * 72 + 14}%`; |
| js/effect-items.js | 1418 | Math.random() * |
| js/effect-items.js | 1519 | Math.floor(Math.random() * palette.length); |
| js/effect-items.js | 1546 | Math.random() * extraSize + |
| js/effect-items.js | 1551 | Math.random() * 4.5 + 6.5; |
| js/effect-items.js | 1554 | `${Math.random() * 100}%`; |
| js/effect-items.js | 1557 | `${Math.random() * 100}%`; |
| js/effect-items.js | 1574 | `${Math.random() * 90 - 45}deg` |
| js/effect-items.js | 1579 | `${Math.random() * 110 - 55}px` |
| js/effect-items.js | 1584 | `${Math.random() * 90 - 45}px` |
| js/effect-items.js | 1593 | `${-Math.random() * duration}s`; |
| js/effect-items.js | 1611 | Math.random() > 0.5; |
| js/effect-items.js | 1619 | Math.random() * 2.4 + 5.6; |
| js/effect-items.js | 1622 | `${8 + Math.random() * 78}%`; |
| js/effect-items.js | 1626 | Math.random() * |
| js/effect-items.js | 1643 | `${Math.random() * 9 - 4.5}deg` |
| js/effect-items.js | 1648 | `${Math.random() * 36 - 18}px` |
| js/effect-items.js | 1673 | Math.random() * |
| js/effect-items.js | 1679 | `${10 + Math.random() * 80}%`; |
| js/effect-items.js | 1682 | `${10 + Math.random() * 80}%`; |
| js/effect-items.js | 1694 | `${Math.random() * 35 - 17.5}deg` |
| js/effect-items.js | 2139 | 7 + Math.random() * 6; |
| js/effect-items.js | 2146 | `${4 + Math.random() * 92}%` |
| js/effect-items.js | 2151 | `${80 + Math.random() * 150}px` |
| js/effect-items.js | 2156 | `${0.15 + Math.random() * 0.32}` |
| js/effect-items.js | 2166 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2191 | 7 + Math.random() * 8; |
| js/effect-items.js | 2198 | `${Math.random() * 100}%` |
| js/effect-items.js | 2203 | `${Math.random() * 100}%` |
| js/effect-items.js | 2208 | `${2 + Math.random() * 4}px` |
| js/effect-items.js | 2213 | `${-45 + Math.random() * 90}px` |
| js/effect-items.js | 2218 | `${-55 - Math.random() * 70}px` |
| js/effect-items.js | 2228 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2253 | 9 + Math.random() * 8; |
| js/effect-items.js | 2260 | `${Math.random() * 100}%` |
| js/effect-items.js | 2265 | `${5 + Math.random() * 8}px` |
| js/effect-items.js | 2270 | `${-35 + Math.random() * 70}deg` |
| js/effect-items.js | 2280 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2368 | const duration = 8 + Math.random() * 9; |
| js/effect-items.js | 2376 | `${Math.random() * 100}%` |


### `buyFood` (5 hits)

| file | line | text |
| --- | --- | --- |
| js/pet-interactions.js | 1050 | <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(10, 5)">🍰 Bánh (10 🪙) ➔ +5 No</button> |
| js/pet-interactions.js | 1051 | <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(20, 10)">🍪 Bánh quy (20 🪙) ➔ +10 No</button> |
| js/pet-interactions.js | 1052 | <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(40, 50)">🍛 Cơm thường (40 🪙) ➔ +50 No</button> |
| js/pet-interactions.js | 1053 | <button class="food-shop-btn premium" onclick="PetInteractionManager.buyFood(100, 100)">🥩 Đồ ăn xịn (100 🪙) ➔ Đầy bụng</button> |
| js/pet-interactions.js | 1063 | static async buyFood(price, hungerGain) { |


### `isLocked` (75 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 174 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| ((root.child('users').child(auth.uid).child('isLocked').val() !== true) && newData.exists() && (root.child('users').child(auth.uid).child('username').val() === newData.child('studentUsername').val() \|\| root.child('users').child(auth.uid).child('username').val() === data.child('studentUsername').val())))", |
| database.rules.patched.json | 382 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.child('studentUsername').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('status').val() === 'pending' && newData.child('requestVersion').val( |
| database.rules.patched.json | 383 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.child('studentUsername').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('status').val() === 'pending' && newData.child('requestVersion').val() === 2 && new |
| database.rules.patched.json | 710 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 818 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 867 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 907 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 908 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 917 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 918 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 926 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 927 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').val() === 'claimed' \|\| newData.child('status'). |
| database.rules.patched.json | 935 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| database.rules.patched.json | 964 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.exists()))", |
| js/store-collections.js | 989 | isLocked: false |
| js/store-collections.js | 1032 | if (item?.isLocked === true) { |
| js/store-collections.js | 1053 | available: item?.isLocked !== true, |
| js/store-collections.js | 1101 | const teacherLocked = item?.isLocked === true; |
| js/store-collections.js | 1476 | if (item.isLocked === true) { |
| js/store-collections.js | 1503 | const teacherLocked = item?.isLocked === true; |
| js/common.js | 2184 | if (user.isLocked) { |
| js/luxury-store.js | 13113 | if (item.isLocked === true) { |
| js/luxury-store.js | 14620 | if (!item \|\| item.isLocked \|\| item.eventOnly \|\| item.isNonCoin \|\| |
| js/teacher.js | 101 | // Chuẩn hóa dữ liệu isLocked từ Firebase. |
| js/teacher.js | 3671 | item.isLocked = |
| js/teacher.js | 3673 | itemSettings?.isLocked |
| js/teacher.js | 11152 | let lockBtnText = st.isLocked ? '🔓 Mở khóa' : '🔒 Khóa'; |
| js/teacher.js | 11153 | let lockBtnStyle = st.isLocked ? 'background: #10b981; color: white;' : 'background: #f59e0b; color: white;'; |
| js/teacher.js | 11154 | let statusText = st.isLocked ? '<br><span style="color: #e11d48; font-size: 0.85em; font-weight: bold;">(Đang bị khóa)</span>' : ''; |
| js/teacher.js | 11172 | html += `<tr style="border-bottom: 1px solid rgba(0,0,0,0.05); ${st.isLocked ? 'background: rgba(225, 29, 72, 0.05);' : ''}"> |
| js/teacher.js | 11204 | <button style="padding:5px 12px; font-size: 0.85em; border: none; border-radius: 6px; cursor: pointer; ${lockBtnStyle}" onclick="toggleLockStudent('${st._fbKey}', ${!!st.isLocked})">${lockBtnText}</button> |
| js/teacher.js | 11215 | await updateDB('users', userKey, { isLocked: !isCurrentlyLocked }); alert(`✅ Đã ${actionText.toLowerCase()} tài khoản thành công!`); |
| js/teacher.js | 11470 | isLocked: false, |
| js/teacher.js | 15754 | item.isLocked = |
| js/teacher.js | 15756 | itemSettings?.isLocked |
| js/teacher.js | 16014 | let isItemLocked = !!item.isLocked; |
| js/teacher.js | 16105 | isLocked: !isCurrentlyLocked |
| js/teacher.js | 16117 | // Dùng chung store_settings/<itemId>/isLocked nên không tạo logic dữ liệu mới. |
| js/teacher.js | 16138 | const isItemLocked = !!item.isLocked; |
| js/store-manager.js | 2855 | if (item.isLocked === true) { |
| js/store-manager.js | 2916 | if (item.isLocked === true) { |
| js/store-manager.js | 2974 | if (item.isLocked === true) { |
| js/store-manager.js | 3094 | if (item.isLocked === true) { |
| js/store-manager.js | 3630 | if (item.isLocked === true) { |
| js/store-manager.js | 3947 | if (item.isLocked === true) { |
| js/store-manager.js | 4021 | ${item.isLocked === true |
| js/student.js | 447 | item.isLocked = |
| js/student.js | 449 | itemSettings?.isLocked |
| js/student.js | 901 | // Chuẩn hóa dữ liệu isLocked từ Firebase. |
| js/student.js | 9536 | let isLockedByExam = window.currentActiveExamId && window.currentActiveExamId !== assign.id; |
| js/student.js | 9537 | let clickHandler = isLockedByExam ? `alert('⚠️ Bạn đang làm bài thi! Không thể xem các bài tập khác.')` : `toggleAccordion('${uniqueId}', this)`; |
| js/student.js | 9538 | let glassLockHTML = isLockedByExam ? `<div style="position: absolute; inset: 0; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(4px); z-index: 10; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: not-allowed;"><span style="background: rgba(225, 29, 72, 0.9); color: white; padding: 6px 14px; border-radius: 20px; font-weight: bold; box-shadow: 0 4px 15px rgba(225, 29, 72, 0.4);">🔒 Tạm khóa khi thi</span></div>` : ''; |
| js/student.js | 10459 | let submitBtnHTML = currentUser.isLocked |
| js/student.js | 10661 | let isLockedByExam = window.currentActiveExamId && window.currentActiveExamId !== assign.id; |
| js/student.js | 10662 | let clickHandler = isLockedByExam ? `alert('⚠️ Đang trong chế độ thi! Vui lòng tập trung hoàn thành bài thi.')` : `toggleAccordion('${uniqueId}', this)`; |
| js/student.js | 10663 | let glassLockHTML = isLockedByExam ? `<div style="position: absolute; inset: 0; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(4px); z-index: 10; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: not-allowed;"><span style="background: rgba(225, 29, 72, 0.9); color: white; padding: 6px 14px; border-radius: 20px; font-weight: bold; box-shadow: 0 4px 15px rgba(225, 29, 72, 0.4);">🔒 Tạm khóa khi thi</span></div>` : ''; |
| js/student.js | 12256 | if (currentUser.isLocked && !isAuto) return alert("🔒 LỖI: Tài khoản đang bị khóa tạm thời!"); |
| js/student.js | 13402 | if (userRecord.isLocked) { |
| js/student.js | 13507 | if (currentUser.isLocked) { |
| js/student.js | 13737 | const isLockedStoreTab = |
| js/student.js | 13745 | !isLockedStoreTab && |
| js/student.js | 13793 | if (isLockedStoreTab) { |
| js/student.js | 13950 | if (currentUser.isLocked) { |
| js/student.js | 17817 | if (currentUser?.isLocked === true) { |
| js/student.js | 17833 | .ref(`users/${uid}/isLocked`) |
| js/student.js | 18187 | if (item.isLocked === true) { |
| js/student.js | 18561 | if (item.isLocked) return alert("🔒 Vật phẩm này hiện đang bị Giáo viên khóa!"); |
| js/student.js | 18880 | paymentItem.isLocked === |
| js/student.js | 19527 | if (item.isLocked === true) { |
| js/student.js | 20035 | return itemDef?.type === 'theme' && itemDef.isLocked !== true; |
| js/student.js | 20065 | if (itemDef.isLocked === true) { |
| js/student.js | 34851 | isLocked: function () { |
| js/student.js | 34862 | isLocked: function () { |
| js/student.js | 34880 | config.isLocked() |
| js/student.js | 35941 | candidate.isLocked !== true |


### `operationId` (70 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 302 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && ((!data.exists() && newData.exists() && (newData.child('id').val() === $itemId && newData.child('source').val() === 'store_purchase' && newData.child('purchaseOperationId').isString() && root.child('store_purchase_ops').child($username).child($itemId).child('operationId').val() === newData.child('purchaseOperationId').v |
| database.rules.patched.json | 328 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.isString() && newData.val().length >= 8 && newData.val().length <= 200 && root.child('store_purchase_ops').child($username).child($itemId).child('operationId').val() === newData.val() && (root.child('store_purchase_ops').child($username).child($itemId).child('status').val() === 'paid' \|\| root.child('store_purchase_ops').child($username).child($itemId).child('status').val() === 'completed'))" |
| database.rules.patched.json | 331 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.isString() && newData.val().length >= 8 && newData.val().length <= 200 && root.child('store_trial_claims').child($username).child($itemId).child('operationId').val() === newData.val() && (root.child('store_trial_claims').child($username).child($itemId).child('status').val() === 'debited' \|\| root.child('store_trial_claims').child($username).child($itemId).child('status').val() === 'active'))" |
| database.rules.patched.json | 337 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.isString() && newData.val().length >= 8 && newData.val().length <= 200 && root.child('student_hoihoa_chest_limit').child($username).child('operationId').val() === newData.val() && (root.child('student_hoihoa_chest_limit').child($username).child('status').val() === 'reserved' \|\| root.child('student_hoihoa_chest_limit').child($username).child('status').val() === 'claimed'))" |
| database.rules.patched.json | 376 | ".validate": "!newData.exists() \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.child('username').isString() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('reward').isString() && newData.child('timestamp').isNumber() && newData.child('timestamp').val() >= now - 86400000 && newData.child('timestamp').val() <= now + 300000 && (!newData.child('operationId').exists() \|\| (newData.child('operatio |
| database.rules.patched.json | 762 | ".validate": "!newData.exists() \|\| (newData.child('type').isString() && newData.child('operationId').isString() && newData.child('amount').isNumber() && newData.child('amount').val() >= 1 && newData.child('operatedAt').isNumber())" |
| database.rules.patched.json | 764 | ".write": "(auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && newData.exists() && newData.child('lastOperation').child('type').isString() && ((newData.child('lastOperation').child('type').val() === 'auto_grant' && newData.child('lastOperation').child('amount').val() === 1 && newData.child('lastOperation').child('year').isString() && newData.child('balance').isNumber() && newData. |
| database.rules.patched.json | 908 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 918 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 927 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').val() === 'claimed' \|\| newData.child('status'). |
| database.rules.patched.json | 974 | ".validate": "!newData.exists() \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.hasChildren(['version','username','operationId','acquiredAt','expiresAt']) && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('acquiredAt').isNumber() && newData.child('acquiredAt').v |
| js/teacher.js | 857 | operationId: |
| js/teacher.js | 930 | operationId: |
| js/teacher.js | 1068 | operationId: |
| js/teacher.js | 11885 | async function releaseTeacherProfileMutation(username, operationId) { |
| js/teacher.js | 11889 | if (String(current.operationId \|\| '') !== String(operationId \|\| '')) { |
| js/teacher.js | 12026 | const operationId = |
| js/teacher.js | 12042 | operationId, |
| js/teacher.js | 12084 | processingOperationId: operationId |
| js/teacher.js | 12215 | String(current.processingOperationId \|\| '') === operationId |
| js/teacher.js | 12229 | await releaseTeacherProfileMutation(username, operationId); |
| js/mid-autumn-festival.js | 1117 | operationId: rewardId, |
| js/student.js | 2378 | const operationId = |
| js/student.js | 2428 | operationId: |
| js/student.js | 2429 | operationId, |
| js/student.js | 2684 | operationId: |
| js/student.js | 2888 | operationId: |
| js/student.js | 3259 | operationId: |
| js/student.js | 15719 | operationId, |
| js/student.js | 15722 | const safeOperationId = String(operationId \|\| '') |
| js/student.js | 15741 | operationId: safeOperationId |
| js/student.js | 15760 | operationId: safeOperationId, |
| js/student.js | 15763 | operationId: safeOperationId |
| js/student.js | 15790 | entry.operationId, |
| js/student.js | 16122 | let operationId = createLuckyWheelOperationId('wheel1'); |
| js/student.js | 16286 | luckyWheelOperationId: operationId, |
| js/student.js | 16431 | operationId, |
| js/student.js | 16456 | operationId, |
| js/student.js | 16576 | const operationId = |
| js/student.js | 16741 | luckyWheelOperationId: operationId, |
| js/student.js | 16853 | operationId, |
| js/student.js | 16900 | operationId, |
| js/student.js | 17974 | const operationId = |
| js/student.js | 18017 | operationId, |
| js/student.js | 18037 | operationId, |
| js/student.js | 18050 | const operationId = |
| js/student.js | 18115 | operationId, |
| js/student.js | 18135 | operationId, |
| js/student.js | 18344 | .operationId, |
| js/student.js | 19101 | .operationId |
| js/student.js | 19196 | .operationId, |
| js/student.js | 19251 | .operationId, |
| js/student.js | 19295 | .operationId; |
| js/student.js | 19337 | .operationId |
| js/student.js | 21460 | const operationId = |
| js/student.js | 21489 | operationId, |
| js/student.js | 21509 | operationId, |
| js/student.js | 21517 | if (!lease?.lockRef \|\| !lease.operationId) { |
| js/student.js | 21525 | currentValue.operationId !== |
| js/student.js | 21526 | lease.operationId |
| js/student.js | 34166 | const operationId = |
| js/student.js | 34287 | operationId, |
| js/student.js | 34370 | operationId |
| js/student.js | 34541 | operationId |
| js/student.js | 34585 | `${operationId}`; |
| js/student.js | 34613 | operationId, |
| js/student.js | 34685 | operationId, |
| js/student.js | 34718 | .operationId \|\| |
| js/student.js | 34721 | operationId \|\| |
| js/student.js | 34763 | operationId |


### `reservationId` (13 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 407 | ".validate": "!newData.exists() \|\| (($slot === 'slot1' \|\| $slot === 'slot2') && $periodKey.matches(/^20\\d{2}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\\d\|3[01])$/) && newData.hasChildren(['used','status','direction','amount','periodKey','periodStartAt','reservationId','createdAt']) && newData.child('used').val() === true && newData.child('direction').val() === 'M2C' && newData.child('periodKey').val() === $periodKey && newData.child('periodStartAt').isNumber() && newData.child('amount').isNumber() && newDat |
| database.rules.patched.json | 423 | "reservationId": { |
| database.rules.patched.json | 444 | ".validate": "!newData.exists() \|\| ($periodKey.matches(/^20\\d{2}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\\d\|3[01])$/) && newData.hasChildren(['used','status','direction','amount','periodKey','periodStartAt','reservationId','createdAt']) && newData.child('used').val() === true && newData.child('direction').val() === 'C2M' && newData.child('periodKey').val() === $periodKey && newData.child('periodStartAt').isNumber() && newData.child('amount').isNumber() && newData.child('amount').val() >= 1 && newData.chil |
| database.rules.patched.json | 460 | "reservationId": { |
| js/student.js | 20988 | const reservationId = [ |
| js/student.js | 21001 | reservationId: reservationId, |
| js/student.js | 21029 | reservationId: reservationId, |
| js/student.js | 21073 | reservationId: reservationId, |
| js/student.js | 21087 | currentValue.reservationId !== |
| js/student.js | 21088 | reservation.reservationId |
| js/student.js | 21113 | currentValue.reservationId !== |
| js/student.js | 21114 | reservation.reservationId |
| js/student.js | 21878 | reservation.reservationId |


### `leaseUntil` (9 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 899 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 5 && newData.child('username').val() === $username && newData.child('assignmentId').isString() && newData.child('assignmentId').val().length > 0 && newData.child('ownerTabId').isString() && newData.child('ownerTabId').val().length >= 8 && newData.child('ownerTabId').val().length <= 200 && newData.child('lockId').isString() && newData.child('lockId').val() |
| js/teacher.js | 12034 | Number(current.leaseUntil \|\| 0) > now |
| js/teacher.js | 12045 | leaseUntil: now + 120000 |
| js/student.js | 24600 | existing.leaseUntil \|\| |
| js/student.js | 24650 | leaseUntil: |
| js/student.js | 24701 | leaseUntil: |
| js/student.js | 24762 | leaseUntil: 0, |
| js/student.js | 26249 | globalLock.leaseUntil \|\| 0 |
| js/student.js | 27433 | globalLock.leaseUntil \|\| 0 |


### `heartbeatAt` (22 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 661 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 5 && newData.child('username').val() === $username && newData.child('assignmentId').val() === $assignmentId && newData.child('assignmentKey').isString() && newData.child('assignmentKey').val().length > 0 && root.child('assignments').child(newData.child('assignmentKey').val()).exists() && root.child('assignments').child(newData.child('assignmentKey').val() |
| database.rules.patched.json | 868 | ".validate": "!newData.exists() \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && newData.child('username').val() === $username && newData.child('startedAt').isNumber() && newData.child('startedAt').val() <= now + 10000 && newData.child('heartbeatAt').isNumber() && newData.child('heartbeatAt').val() <= now + 10000 && (!data.exists() \|\| newData.child('startedAt').val() === data.child('startedAt |
| database.rules.patched.json | 899 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 5 && newData.child('username').val() === $username && newData.child('assignmentId').isString() && newData.child('assignmentId').val().length > 0 && newData.child('ownerTabId').isString() && newData.child('ownerTabId').val().length >= 8 && newData.child('ownerTabId').val().length <= 200 && newData.child('lockId').isString() && newData.child('lockId').val() |
| js/teacher.js | 7456 | Number(claim?.heartbeatAt \|\| 0), |
| js/teacher.js | 13029 | heartbeatAt: |
| js/student.js | 265 | Number(claim?.heartbeatAt \|\| 0), |
| js/student.js | 22808 | heartbeatAt: claimStartedAt |
| js/student.js | 22836 | heartbeatAt: |
| js/student.js | 22935 | heartbeatAt: |
| js/student.js | 22955 | heartbeatAt: |
| js/student.js | 24653 | heartbeatAt: now, |
| js/student.js | 24713 | heartbeatAt: now, |
| js/student.js | 24763 | heartbeatAt: now, |
| js/student.js | 25121 | heartbeatAt: now, |
| js/student.js | 25166 | heartbeatAt: now, |
| js/student.js | 25261 | heartbeatAt: now, |
| js/student.js | 25567 | heartbeatAt: now, |
| js/student.js | 25690 | heartbeatAt: now, |
| js/student.js | 25850 | heartbeatAt: now, |
| js/student.js | 25994 | heartbeatAt: now, |
| js/student.js | 26120 | heartbeatAt: now, |
| js/student.js | 26324 | remoteSession.heartbeatAt \|\| |


### `profile_request` (42 hits)

| file | line | text |
| --- | --- | --- |
| teacher.html | 1549 | <option value="profile_request_decision"> |
| database.rules.patched.json | 622 | "profile_requests": { |
| database.rules.patched.json | 630 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('requestId').val() === $requestId && newData.child('status').val() === 'pending' && root.child('profile_request_active').child(newData.child('username').val()).child('requestId').val() === $requestId && root.child('profile_request_active').child(n |
| database.rules.patched.json | 940 | "profile_request_active": { |
| database.rules.patched.json | 944 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && ((!newData.exists() && data.exists() && (!root.child('profile_requests').child(data.child('requestId').val()).exists() \|\| (root.child('profile_requests').child(data.child('requestId').val()).child('status').val() !== 'pending' && root.child('profile_requests').child(data.child('requestId').val()).child('status').val() ! |
| database.rules.patched.json | 948 | "profile_request_secrets": { |
| database.rules.patched.json | 951 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && newData.child('requestId').val() === $requestId && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && root.child('profile_request_active').child(newData.child('username').val()).child('requestId').val() === $requestId && root.child('profile_request_active').child(newData.child('username').val()).child('status') |
| database.rules.patched.json | 955 | "profile_request_mutations": { |
| js/transaction-history.js | 1258 | 'profile_request_decision' |
| js/transaction-history.js | 1365 | profile_request_decision: |
| js/teacher.js | 3578 | listenFirebase(db.ref('profile_requests'), 'value', debounce(loadProfileRequests, 1500)); |
| js/teacher.js | 11818 | const requests = await getDB('profile_requests'); |
| js/teacher.js | 11886 | const ref = db.ref(`profile_request_mutations/${username}`); |
| js/teacher.js | 11897 | const ref = db.ref(`profile_request_active/${username}`); |
| js/teacher.js | 11914 | .ref('profile_requests') |
| js/teacher.js | 11926 | updates[`profile_requests/${child.key}/status`] = 'superseded'; |
| js/teacher.js | 11927 | updates[`profile_requests/${child.key}/resolvedAt`] = now; |
| js/teacher.js | 11928 | updates[`profile_requests/${child.key}/supersededBy`] = String(approvedRequestId); |
| js/teacher.js | 11929 | updates[`profile_requests/${child.key}/newPass`] = null; |
| js/teacher.js | 11930 | updates[`profile_request_secrets/${child.key}`] = null; |
| js/teacher.js | 12011 | const requestRef = db.ref(`profile_requests/${reqKey}`); |
| js/teacher.js | 12028 | const mutationRef = db.ref(`profile_request_mutations/${username}`); |
| js/teacher.js | 12059 | .ref(`profile_request_active/${username}`) |
| js/teacher.js | 12074 | await db.ref(`profile_request_secrets/${reqKey}`).remove().catch(() => {}); |
| js/teacher.js | 12102 | await db.ref(`profile_request_secrets/${reqKey}`).remove().catch(() => {}); |
| js/teacher.js | 12109 | .ref(`profile_request_secrets/${reqKey}`) |
| js/teacher.js | 12153 | await db.ref(`profile_request_secrets/${reqKey}`).remove().catch(() => {}); |
| js/teacher.js | 12184 | await db.ref(`profile_request_secrets/${reqKey}`).remove().catch(() => {}); |
| js/teacher.js | 12199 | await db.ref(`profile_request_secrets/${reqKey}`).remove().catch(() => {}); |
| js/history-retention.js | 26 | profile_requests: { |
| js/student.js | 5426 | // cho phép query profile_requests theo username của tài khoản đăng nhập. |
| js/student.js | 5428 | .ref('profile_requests') |
| js/student.js | 13460 | .ref('profile_requests') |
| js/student.js | 13480 | const lockRef = db.ref(`profile_request_active/${username}`); |
| js/student.js | 13488 | .ref(`profile_requests/${String(lock.requestId)}`) |
| js/student.js | 13539 | const requestRef = db.ref('profile_requests').push(); |
| js/student.js | 13541 | const lockRef = db.ref(`profile_request_active/${username}`); |
| js/student.js | 13601 | [`profile_requests/${requestId}`]: requestData |
| js/student.js | 13604 | // Mật khẩu KHÔNG còn nằm trong profile_requests. Node secret chỉ |
| js/student.js | 13608 | updates[`profile_request_secrets/${requestId}`] = { |
| js/student.js | 13646 | window.HistoryRetention.isExpired('profile_requests', req) |
| functions/history-retention-function.js | 27 | profile_requests: { |


### `approval` (1 hits)

| file | line | text |
| --- | --- | --- |
| js/teacher.js | 57 | window.__PROFILE_REQUEST_GUARD_TEACHER_BUILD = '20260917.v1-serial-approval-auth-conflict'; |


### `approved` (12 hits)

| file | line | text |
| --- | --- | --- |
| js/transaction-history.js | 745 | d.decision !== 'approved' |
| js/transaction-history.js | 786 | 'approved' |
| js/teacher.js | 11912 | async function supersedeOtherPendingProfileRequests(username, approvedRequestId) { |
| js/teacher.js | 11923 | if (String(child.key) === String(approvedRequestId)) return; |
| js/teacher.js | 11928 | updates[`profile_requests/${child.key}/supersededBy`] = String(approvedRequestId); |
| js/teacher.js | 12194 | status: 'approved', |
| js/teacher.js | 12204 | await resolveTeacherProfileActiveLock(username, reqKey, 'approved'); |
| js/teacher.js | 18758 | approvedAt: Date.now(), |
| js/teacher.js | 18811 | approvedAt: reqData.approvedAt \|\| Date.now(), |
| js/history-retention.js | 29 | removableStatuses: ['approved', 'rejected'] |
| js/student.js | 13665 | } else if (req.status === 'approved') { |
| functions/history-retention-function.js | 30 | removableStatuses: ['approved', 'rejected'] |


### `rejected` (18 hits)

| file | line | text |
| --- | --- | --- |
| js/transaction-history.js | 704 | d.decision === 'rejected' |
| js/transaction-history.js | 712 | 'rejected' |
| js/huong-dan-nguoi-moi.js | 2626 | .nug-submission-demo-file.is-rejected { |
| js/huong-dan-nguoi-moi.js | 3678 | <div class="nug-submission-demo-file is-rejected"> |
| js/huong-dan-nguoi-moi.js | 3682 | <div class="nug-submission-demo-file is-rejected"> |
| js/teacher.js | 12097 | status: 'rejected', |
| js/teacher.js | 12103 | await resolveTeacherProfileActiveLock(username, reqKey, 'rejected'); |
| js/teacher.js | 18327 | rejected: 'reject' |
| js/teacher.js | 18614 | } else if (req.status === 'rejected') { |
| js/teacher.js | 18846 | status: 'rejected', |
| js/history-retention.js | 23 | timestampFields: ['resolvedAt', 'completedAt', 'rejectedAt', 'timestamp'], |
| js/history-retention.js | 24 | removableStatuses: ['completed', 'rejected'] |
| js/history-retention.js | 29 | removableStatuses: ['approved', 'rejected'] |
| js/student.js | 13667 | } else if (req.status === 'rejected') { |
| js/student.js | 31128 | } else if (req.status === 'rejected') { |
| functions/history-retention-function.js | 24 | timestampFields: ['resolvedAt', 'completedAt', 'rejectedAt', 'timestamp'], |
| functions/history-retention-function.js | 25 | removableStatuses: ['completed', 'rejected'] |
| functions/history-retention-function.js | 30 | removableStatuses: ['approved', 'rejected'] |


### `pending` (171 hits)

| file | line | text |
| --- | --- | --- |
| teacher.html | 3827 | window.__teacherSecurityVerificationState \|\| 'pending'; |
| database.rules.patched.json | 382 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.child('studentUsername').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('status').val() === 'pending' && newData.child('requestVersion').val( |
| database.rules.patched.json | 383 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && root.child('users').child(auth.uid).child('isLocked').val() !== true && newData.child('studentUsername').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('status').val() === 'pending' && newData.child('requestVersion').val() === 2 && new |
| database.rules.patched.json | 630 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('requestId').val() === $requestId && newData.child('status').val() === 'pending' && root.child('profile_request_active').child(newData.child('username').val()).child('requestId').val() === $requestId && root.child('profile_request_active').child(n |
| database.rules.patched.json | 631 | ".validate": "!newData.exists() \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.hasChildren(['requestId','username','currentName','newName','hasPasswordChange','status','timestamp','time']) && newData.child('requestId').val() === $requestId && newData.child('username').isString() && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('currentName').isString() && newData.child('currentName').val().le |
| database.rules.patched.json | 868 | ".validate": "!newData.exists() \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && newData.child('username').val() === $username && newData.child('startedAt').isNumber() && newData.child('startedAt').val() <= now + 10000 && newData.child('heartbeatAt').isNumber() && newData.child('heartbeatAt').val() <= now + 10000 && (!data.exists() \|\| newData.child('startedAt').val() === data.child('startedAt |
| database.rules.patched.json | 908 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 918 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.exists() && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('itemId').val() === $itemId && newData.child('operationId').isString() && newData.child('operationId').val().length >= 8 && newData.child('operationId').val().length <= 200 && newData.child('status').isString() && (newData.child('status').val() === 'reserved' \|\| newData.child('status').va |
| database.rules.patched.json | 944 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && ((!newData.exists() && data.exists() && (!root.child('profile_requests').child(data.child('requestId').val()).exists() \|\| (root.child('profile_requests').child(data.child('requestId').val()).child('status').val() !== 'pending' && root.child('profile_requests').child(data.child('requestId').val()).child('status').val() ! |
| database.rules.patched.json | 945 | ".validate": "!newData.exists() \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (newData.hasChildren(['version','username','requestId','status','createdAt','updatedAt']) && newData.child('version').val() === 1 && newData.child('username').val() === $username && newData.child('requestId').isString() && newData.child('requestId').val().length > 0 && newData.child('requestId').val().length <= 200 && newData.child('status').val() === 'pending' && newData.child('createdAt' |
| database.rules.patched.json | 951 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && newData.child('requestId').val() === $requestId && newData.child('username').val() === root.child('users').child(auth.uid).child('username').val() && root.child('profile_request_active').child(newData.child('username').val()).child('requestId').val() === $requestId && root.child('profile_request_active').child(newData.child('username').val()).child('status') |
| js/transaction-history.js | 721 | 'pending', |
| js/transaction-history.js | 803 | 'pending'; |
| js/common.js | 405 | 'pending' |
| js/common.js | 536 | let pending = 0; |
| js/common.js | 539 | if (state === 'pending') { |
| js/common.js | 540 | pending++; |
| js/common.js | 544 | return pending; |
| js/common.js | 626 | const pending = |
| js/common.js | 634 | pending === 0 && |
| js/common.js | 3912 | animation.playState === 'pending' |
| js/common.js | 3937 | `Web/CSS animations: ${runningAnimations}/${totalAnimations} đang chạy hoặc pending`, |
| js/huong-dan-nguoi-moi.js | 1220 | const pendingStep = Math.max( |
| js/huong-dan-nguoi-moi.js | 1226 | await persistGuideProgressToFirebase(pendingStep); |
| js/huong-dan-nguoi-moi.js | 4508 | : window.pendingPracticeRedoAssignment |
| js/teacher.js | 66 | window.__teacherSecurityVerificationState \|\| 'pending'; |
| js/teacher.js | 71 | const normalized = String(state \|\| 'pending').trim().toLowerCase(); |
| js/teacher.js | 92 | window.setTeacherSecurityVerificationState('pending'); |
| js/teacher.js | 2863 | 'pending-assignment-files', |
| js/teacher.js | 2932 | `pending-teacher-grade-files-${subId}`, |
| js/teacher.js | 7053 | gradeStatus = `<span class="status-pending" style="background: rgba(59, 130, 246, 0.15); color: #2563eb;">Đang làm lại</span>`; |
| js/teacher.js | 7065 | gradeStatus = hasGrade ? `<span class="status-done">Đã chấm: ${window.escapeHTML(String(sub.grade))} điểm${regradeStatusText}</span>` : `<span class="status-pending">Chưa chấm${regradeStatusText}</span>`; |
| js/teacher.js | 7699 | status = 'pending_claim'; |
| js/teacher.js | 7701 | status = ticketDelta > 0 ? 'pending_claim' : 'processing'; |
| js/teacher.js | 9036 | 'pending_claim' |
| js/teacher.js | 9728 | status: 'pending_claim', |
| js/teacher.js | 9745 | status: 'pending_claim', |
| js/teacher.js | 10090 | ['pending_claim', 'penalty_applied', 'claimed'] |
| js/teacher.js | 10209 | status: 'pending_claim', |
| js/teacher.js | 10216 | status: 'pending_claim', |
| js/teacher.js | 10239 | status: 'pending_claim', |
| js/teacher.js | 10642 | } else if (rewardResult?.status === 'pending_claim') { |
| js/teacher.js | 11819 | const pendingReqs = requests |
| js/teacher.js | 11820 | .filter(r => r.status === 'pending' \|\| r.status === 'processing') |
| js/teacher.js | 11828 | if (pendingReqs.length === 0) { |
| js/teacher.js | 11837 | pendingReqs.forEach(req => { |
| js/teacher.js | 11925 | if (value.status === 'pending') { |
| js/teacher.js | 12019 | if (initial.status !== 'pending') { |
| js/teacher.js | 12065 | (activeLock.status === 'pending' \|\| activeLock.status === 'processing') && |
| js/teacher.js | 12079 | if (!current \|\| current.status !== 'pending') return; |
| js/teacher.js | 12211 | // Lỗi mạng/tạm thời: trả về pending nếu request vẫn thuộc operation này. |
| js/teacher.js | 12218 | next.status = 'pending'; |
| js/teacher.js | 12920 | // chặn thay vì để isRedoing=true nhưng ledger vẫn còn pending_claim. |
| js/teacher.js | 13671 | let statusClass = 'status-pending'; |
| js/teacher.js | 13699 | statusClass = 'status-pending'; |
| js/teacher.js | 13726 | statusClass = 'status-pending'; |
| js/teacher.js | 16927 | const pendingItems = new Set(); |
| js/teacher.js | 16930 | return { ownedItems, pendingItems }; |
| js/teacher.js | 16964 | pendingItems.add(String(message.giftValue)); |
| js/teacher.js | 16974 | return { ownedItems, pendingItems }; |
| js/teacher.js | 17115 | pendingItems: status.pendingItems |
| js/teacher.js | 17125 | pendingCount: 0, |
| js/teacher.js | 17142 | status.pendingItems.forEach(rawItemId => { |
| js/teacher.js | 17157 | info.pendingCount++; |
| js/teacher.js | 17219 | pendingCount: 0, |
| js/teacher.js | 17329 | info.pendingCount === 1 |
| js/teacher.js | 17340 | `${info.pendingCount} đang chờ)`; |
| js/teacher.js | 17358 | `${info.pendingCount} đang chờ)`; |
| js/teacher.js | 17882 | if (status.pendingItems.has(itemId)) { |
| js/teacher.js | 18540 | status: 'pending', |
| js/teacher.js | 18550 | console.error('Không thể trả yêu cầu về pending:', rollbackError); |
| js/teacher.js | 18587 | if (req.status === 'pending') { |
| js/teacher.js | 18668 | if (reqData.status !== 'pending') { |
| js/teacher.js | 18678 | // chuyển pending -> processing, nên double-click/tab khác không thể trừ lặp. |
| js/teacher.js | 18680 | if (!current \|\| current.status !== 'pending') return; |
| js/teacher.js | 18768 | // Không tự đưa về pending ở đây vì có thể transaction tiền đã |
| js/teacher.js | 18821 | // Tiền chưa trừ, trả lại pending. Không thực hiện debit tại recovery. |
| js/teacher.js | 18833 | if (reqData.status !== 'pending') { |
| js/teacher.js | 18843 | if (!current \|\| current.status !== 'pending') return; |
| js/lich-su-hao-hung.js | 1255 | rewardStatus: 'pending', |
| js/lich-su-hao-hung.js | 1256 | rewardTier: 'pending', |
| js/lich-su-hao-hung.js | 1961 | return '<div class="history-reward-pending">🎁 Đang xác nhận phần thưởng...</div>'; |
| js/lich-su-hao-hung.js | 1995 | if (state.progress.rewardStatus === 'missing_item' \|\| state.progress.rewardStatus === 'reserved' \|\| state.progress.rewardStatus === 'pending') { |
| js/mid-autumn-festival.js | 448 | function pendingAttemptStorageKey() { |
| js/mid-autumn-festival.js | 450 | return user ? `maf_pending_attempt_${user}` : ''; |
| js/mid-autumn-festival.js | 455 | const key = pendingAttemptStorageKey(); |
| js/mid-autumn-festival.js | 463 | const key = pendingAttemptStorageKey(); |
| js/mid-autumn-festival.js | 471 | const key = pendingAttemptStorageKey(); |
| js/mid-autumn-festival.js | 575 | const pending = readPendingAttemptStorage(); |
| js/mid-autumn-festival.js | 576 | if (!pending \|\| pending.settled) { |
| js/mid-autumn-festival.js | 582 | await consumeAbandonedTicket('reload', pending, { silent: true }); |
| js/web-performance-optimizer.js | 308 | body.perf-balanced .quill-student-editor[data-perf-quill-pending="1"] { |
| js/security.js | 82 | window.__teacherSecurityVerificationState \|\| 'pending' |
| js/security.js | 102 | verificationState === 'pending' \|\| |
| js/student.js | 96 | window.__PROFILE_REQUEST_GUARD_BUILD = '20260917.v1-single-pending-private-secret'; |
| js/student.js | 4939 | `pending-student-files-${assignId}`; |
| js/student.js | 8736 | const pendingFiles = |
| js/student.js | 8740 | if (pendingFiles > 0) { |
| js/student.js | 11535 | window.pendingPracticeRedoAssignment = |
| js/student.js | 11658 | window.pendingPracticeRedoAssignment = |
| js/student.js | 11669 | window.pendingPracticeRedoAssignment; |
| js/student.js | 11681 | window.pendingPracticeRedoAssignment = |
| js/student.js | 12247 | window.pendingPracticeRedoAssignment = |
| js/student.js | 12608 | let pendingFiles = []; |
| js/student.js | 12612 | pendingFiles = Array.from(window.studentSubmitDTs[assignId].files); |
| js/student.js | 12621 | const isDuplicate = pendingFiles.some(pFile => pFile.name === inFile.name && pFile.size === inFile.size); |
| js/student.js | 12623 | pendingFiles.push(inFile); |
| js/student.js | 12629 | if (pendingFiles.length > 0) { |
| js/student.js | 12630 | filesArray = await readMultipleFiles(pendingFiles); |
| js/student.js | 13485 | if (lock.status !== 'pending' && lock.status !== 'processing') return; |
| js/student.js | 13494 | (request.status !== 'pending' && request.status !== 'processing') |
| js/student.js | 13535 | if (before.some(req => req.status === 'pending' \|\| req.status === 'processing')) { |
| js/student.js | 13547 | (current.status === 'pending' \|\| current.status === 'processing') |
| js/student.js | 13556 | status: 'pending', |
| js/student.js | 13573 | (req.status === 'pending' \|\| req.status === 'processing') |
| js/student.js | 13592 | status: 'pending', |
| js/student.js | 13642 | // Yêu cầu pending luôn được giữ để không mất việc đang chờ giáo viên xử lý. |
| js/student.js | 13663 | if (req.status === 'pending') { |
| js/student.js | 15691 | 'lucky_wheel_pending_history_v2'; |
| js/student.js | 18103 | 'refund_pending' |


### `teacher_gift` (28 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 302 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && ((!data.exists() && newData.exists() && (newData.child('id').val() === $itemId && newData.child('source').val() === 'store_purchase' && newData.child('purchaseOperationId').isString() && root.child('store_purchase_ops').child($username).child($itemId).child('operationId').val() === newData.child('purchaseOperationId').v |
| database.rules.patched.json | 639 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| data.exists() \|\| newData.child('source').val() !== 'teacher_gift' \|\| (newData.child('originMessageKey').isString() && root.child('inbox_gift_claims').child($username).child(newData.child('originMessageKey').val()).child('status').val() === 'processing' && root.child('inbox_messages').child($username).child(newData.child('originMessageKey').val()).child('giftType').val() === 'discount' && root.child('inbox_mess |
| database.rules.patched.json | 711 | ".validate": "root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| ((!data.exists() && newData.exists() && root.child('inbox_messages').child($username).child($grantId).child('giftType').val() === 'special_birthday_coin' && root.child('inbox_messages').child($username).child($grantId).child('source').val() === 'teacher_gift' && newData.hasChildren(['id','quantity','remaining','status','claimedAt','expiresAt','source','sourceMessageId']) && newData.child('id').val() === $grant |
| database.rules.patched.json | 745 | ".validate": "!newData.exists() \|\| (newData.child('id').val() === $grantId && newData.child('amount').isNumber() && newData.child('amount').val() >= 1 && newData.child('grantedAt').isNumber() && newData.child('source').val() === 'teacher_gift')" |
| database.rules.patched.json | 751 | ".validate": "!newData.exists() \|\| (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (data.exists() && newData.child('id').val() === data.child('id').val() && newData.child('amount').val() === data.child('amount').val() && newData.child('source').val() === data.child('source').val()) \|\| (!data.exists() && newData.child('id').val() === $messageId && newData.child('amount').isNumber() && newData.child('amount').val() >= 1 && newData.child('source').val() === 'teacher_gift'  |
| database.rules.patched.json | 764 | ".write": "(auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (root.child('users').child(auth.uid).child('username').val() === $username && newData.exists() && newData.child('lastOperation').child('type').isString() && ((newData.child('lastOperation').child('type').val() === 'auto_grant' && newData.child('lastOperation').child('amount').val() === 1 && newData.child('lastOperation').child('year').isString() && newData.child('balance').isNumber() && newData. |
| js/transaction-history.js | 1124 | 'teacher_gift' |
| js/transaction-history.js | 1185 | 'teacher_gift_recalled', |
| js/teacher.js | 850 | 'teacher_gift' |
| js/teacher.js | 855 | 'teacher_gift', |
| js/teacher.js | 928 | 'teacher_gift_rollback', |
| js/teacher.js | 17977 | source: 'teacher_gift' |
| js/teacher.js | 18192 | 'teacher_gift', |
| js/student.js | 3252 | 'teacher_gift' |
| js/student.js | 4562 | discount?.source \|\| 'teacher_gift'; |
| js/student.js | 4568 | discountSource === 'teacher_gift'; |
| js/student.js | 18676 | d.source \|\| 'teacher_gift'; |
| js/student.js | 18679 | discountSource === 'teacher_gift' |
| js/student.js | 22290 | msg.source \|\| 'teacher_gift'; |
| js/student.js | 22293 | messageDiscountSource === 'teacher_gift' |
| js/student.js | 23323 | 'teacher_gift', |
| js/student.js | 23540 | 'teacher_gift', |
| js/student.js | 23707 | 'teacher_gift', |
| js/student.js | 23909 | 'teacher_gift', |
| js/student.js | 28703 | 'teacher_gift'; |
| js/student.js | 28709 | discountSource === 'teacher_gift'; |
| js/student.js | 30756 | d.source \|\| 'teacher_gift'; |
| js/student.js | 30809 | group.source === 'teacher_gift'; |


### `daily_login_reward` (2 hits)

| file | line | text |
| --- | --- | --- |
| database.rules.patched.json | 805 | ".write": "auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' \|\| (!data.exists() && newData.exists() && newData.child('id').val() === $logId && newData.child('actor').child('uid').val() === auth.uid && newData.child('actor').child('username').val() === root.child('users').child(auth.uid).child('username').val() && newData.child('actor').child('role').val() === root.child('users').child(auth.uid).child('role').val() && newData.child('targetUsername').val() ===  |
| js/transaction-history.js | 1362 | daily_login_reward: |


### `source:` (67 hits)

| file | line | text |
| --- | --- | --- |
| teacher.html | 3467 | <!-- [source: 1] --> |
| js/store-collections.js | 899 | source: 'store-renderer' |
| js/store-collections.js | 1021 | source: 'live-item-config' |
| js/store-collections.js | 1028 | source: 'live-item-config' |
| js/store-collections.js | 1037 | source: 'live-item-config' |
| js/store-collections.js | 1054 | source: 'live-item-config' |
| js/store-collections.js | 1061 | source: 'live-item-config' |
| js/store-collections.js | 1068 | source: 'live-item-config' |
| js/store-collections.js | 1075 | source: 'live-item-config' |
| js/daily-login.js | 1074 | source: 'daily_login', |
| js/daily-login.js | 1098 | source: 'daily_login', |
| js/birthday-rewards-function.js | 436 | source: |
| js/royal-ball.js | 1219 | source: 'royal_ball' |
| js/royal-ball.js | 1326 | source: 'royal_ball' |
| js/leaderboard.js | 2545 | source: |
| js/leaderboard.js | 2586 | source: |
| js/leaderboard.js | 2683 | source: |
| js/leaderboard.js | 4303 | source: |
| js/leaderboard.js | 4605 | source: |
| js/leaderboard.js | 4655 | source: |
| js/leaderboard.js | 4765 | source: |
| js/leaderboard.js | 4784 | source: |
| js/transaction-history.js | 140 | source: |
| js/transaction-history.js | 2321 | source: |
| js/teacher.js | 758 | source: |
| js/teacher.js | 849 | source: |
| js/teacher.js | 1060 | source: |
| js/teacher.js | 8016 | source: 'grade_reward_reconcile_v43', |
| js/teacher.js | 8124 | source: 'grade_reward_reconcile_v4', |
| js/teacher.js | 8445 | source: 'grade_reward_reconcile_v4', |
| js/teacher.js | 9416 | source: 'grade_reward_reconcile_v4', |
| js/teacher.js | 9921 | source: 'grade_reward_reconcile_v4', |
| js/teacher.js | 10202 | source: 'grade_reward_v4', |
| js/teacher.js | 10289 | source: 'grade_reward_v4', |
| js/teacher.js | 10594 | source: 'teacher_grading', |
| js/teacher.js | 11091 | source: 'birthday_system', |
| js/teacher.js | 17977 | source: 'teacher_gift' |
| js/teacher.js | 18191 | source: |
| js/painting.js | 8313 | source: 'hoihoa_season', |
| js/painting.js | 8347 | source: 'hoihoa_runner_up', |
| js/lich-su-hao-hung.js | 1888 | source: `lich_su_hao_hung_${state.currentYear}`, |
| js/mid-autumn-festival.js | 1033 | source: EVENT_ID, |
| js/mid-autumn-festival.js | 1112 | source: EVENT_ID, |
| js/mid-autumn-festival.js | 1207 | source: `${EVENT_ID}_test`, |
| js/bellum-event.js | 1429 | source: |
| js/student.js | 2420 | source: |
| js/student.js | 2990 | source: |
| js/student.js | 3067 | source: |
| js/student.js | 3251 | source: |
| js/student.js | 16285 | source: 'lucky_wheel', |
| js/student.js | 16420 | source: 'lucky_wheel', |
| js/student.js | 16740 | source: 'lucky_wheel_multi', |
| js/student.js | 16836 | source: 'lucky_wheel_multi', |
| js/student.js | 18340 | source: |
| js/student.js | 19176 | source: |
| js/student.js | 19231 | source: |
| js/student.js | 19306 | source: |
| js/student.js | 21850 | source: 'student_conversion', |
| js/student.js | 23322 | source: |
| js/student.js | 23539 | source: |
| js/student.js | 23705 | source: |
| js/student.js | 23907 | source: |
| js/student.js | 29128 | source: |
| js/student.js | 29728 | source: |
| js/student.js | 30770 | source: discountSource, |
| js/student.js | 34538 | source: |
| js/student.js | 34608 | source: |


### `source =` (44 hits)

| file | line | text |
| --- | --- | --- |
| teacher.html | 928 | let isCriticalLocalResource = false; |
| teacher.html | 931 | isCriticalLocalResource = |
| student.html | 630 | let isCriticalLocalResource = false; |
| student.html | 633 | isCriticalLocalResource = |
| js/store-collections.js | 1417 | const source = String(value ?? '').trim(); |
| js/leaderboard.js | 2004 | const source = |
| js/leaderboard.js | 3138 | const source = |
| js/common.js | 2027 | const source = |
| js/common.js | 5069 | typeof source === 'string' |
| js/common.js | 5088 | typeof source === 'string' |
| js/common.js | 5106 | typeof source === 'string' \|\| |
| js/luxury-store.js | 4568 | let source = String( |
| js/luxury-store.js | 4575 | source = decodeURIComponent(source); |
| js/luxury-store.js | 4578 | source = source |
| js/teacher.js | 638 | const source = |
| js/teacher.js | 2727 | const source = [ |
| js/teacher.js | 7727 | const source = eventData \|\| {}; |
| js/teacher.js | 7904 | item.source === 'store_purchase' && |
| js/teacher.js | 8168 | const source = current \|\| fallbackEvent; |
| js/teacher.js | 8516 | const source = eventData \|\| {}; |
| js/teacher.js | 8941 | let source = storedEvent \|\| fallbackEvent; |
| js/teacher.js | 8995 | source = holdLockTx.snapshot.val() \|\| source; |
| js/teacher.js | 10041 | const source = eventData \|\| {}; |
| js/teacher.js | 15159 | const source = raw && typeof raw === 'object' ? raw : {}; |
| js/painting.js | 5284 | const source = |
| js/painting.js | 7122 | const source = this.teacherRounds.find(r => r._fbKey === roundKey); |
| js/student.js | 545 | discount.source === |
| js/student.js | 547 | discount.source === |
| js/student.js | 549 | discount.source === |
| js/student.js | 553 | discount.source === |
| js/student.js | 2059 | const source = |
| js/student.js | 3575 | const source = [ |
| js/student.js | 6741 | const source = |
| js/student.js | 6749 | source === 'event' \|\| |
| js/student.js | 6750 | source === 'event_reward' \|\| |
| js/student.js | 6751 | source === 'season_reward' |
| js/student.js | 14833 | const source = |
| js/student.js | 24095 | const source = |
| js/student.js | 24999 | const source = |
| js/student.js | 30809 | group.source === 'teacher_gift'; |
| js/student.js | 30812 | group.source === 'daily_login'; |
| js/student.js | 30815 | group.source === 'hoihoa_runner_up' \|\| |
| js/student.js | 30816 | group.source === 'hoihoa_season'; |
| js/student.js | 30819 | group.source === 'hoihoa_chest'; |


### `.password` (14 hits)

| file | line | text |
| --- | --- | --- |
| js/transaction-history.js | 696 | d.passwordChanged === true |
| js/common.js | 5557 | try { const url = new URL(String(value)); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : ''; } catch { return ''; } |
| js/teacher.js | 11188 | <td style="padding:12px;">${st.password}</td> |
| js/teacher.js | 11652 | const password = student.password; |
| js/teacher.js | 11944 | let attemptedPassword = String(record.password \|\| ''); |
| js/teacher.js | 11981 | const refreshedPassword = String(refreshed?.password \|\| ''); |
| js/teacher.js | 12165 | if (newPass) updateData.password = newPass; |
| js/teacher.js | 12265 | if (newPass) updateData.password = newPass; |
| js/teacher.js | 12269 | if (newPass) currentUser.password = newPass; |
| js/teacher.js | 14910 | const oldPass = st.password; |
| js/teacher.js | 14917 | updateObj.password = password; |
| js/teacher.js | 20172 | currentUser.password = newPassword; |
| js/student.js | 47 | delete currentUser.password; |
| js/student.js | 5381 | delete currentUser.password; |


### `password:` (1 hits)

| file | line | text |
| --- | --- | --- |
| js/teacher.js | 20168 | password: newPassword |


## Targeted Firebase Rules

### `student_coins`

- `.read`: `auth != null`

- `.write`: `None`

### `student_money_offset`

- `.read`: `auth != null`

- `.write`: `None`

### `student_bonus_tickets`

- `.read`: `auth != null`

- `.write`: `None`

### `historical_grade_tickets`

- `.read`: `auth != null`

- `.write`: `None`

### `student_discounts`

- `.read`: `auth != null`

- `.write`: `None`

### `student_inventory`

- `.read`: `auth != null`

- `.write`: `None`

### `spin_counts`

- `.read`: `auth != null`

- `.write`: `None`

### `mid_autumn_wallets`

- `.read`: `False`

- `.write`: `None`

### `student_special_birthday_coins`

- `.read`: `False`

- `.write`: `None`

### `birthday_coins`

- `.read`: `False`

- `.write`: `None`

### `cash_requests`

- `.read`: `auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' || (((query.orderByChild === 'studentUsername') || (query.orderByChild === 'username')) && query.equalTo === root.child('users').child(auth.uid).child('username').val()))`

- `.write`: `None`

### `store_purchase_ops`

- `.read`: `False`

- `.write`: `None`

### `store_trial_claims`

- `.read`: `False`

- `.write`: `None`

### `student_collection_rewards`

- `.read`: `False`

- `.write`: `None`

### `leaderboard_reward_claims`

- `.read`: `False`

- `.write`: `None`

### `grade_reward_claims`

- `.read`: `False`

- `.write`: `None`

### `users`

- `.read`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

- `.write`: `None`

### `submissions`

- `.read`: `auth != null`

- `.write`: `None`

### `video_tracking`

- `.read`: `auth != null`

- `.write`: `None`

### `transaction_logs`

- `.read`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

- `.write`: `None`

### `hoihoa_rounds`

- `.read`: `auth != null`

- `.write`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

### `hoihoa_vote_usage`

- `.read`: `False`

- `.write`: `None`

### `profile_request_secrets`

- `.read`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

- `.write`: `None`

### `profile_requests`

- `.read`: `auth != null && (root.child('users').child(auth.uid).child('role').val() === 'teacher' || (query.orderByChild === 'username' && query.equalTo === root.child('users').child(auth.uid).child('username').val()))`

- `.write`: `None`

### `profile_request_active`

- `.read`: `False`

- `.write`: `None`

### `exam_sessions`

- `.read`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

- `.write`: `None`

### `exam_active_locks`

- `.read`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

- `.write`: `None`

### `store_settings`

- `.read`: `auth != null`

- `.write`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

### `game_settings`

- `.read`: `auth != null`

- `.write`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

### `global_notifications`

- `.read`: `auth != null`

- `.write`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

### `global_surveys`

- `.read`: `auth != null`

- `.write`: `auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher'`

## HTML script load order

### `offline.html`

1. `js/security.js?v=4.2.0-devtools-guard`

### `index.html`

1. `https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js`

2. `https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js`

3. `https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js`

4. `js/firebase-config.js?v=4.0.1`

5. `js/security.js?v=4.2.0-devtools-guard`

6. `js/common.js?v=4.0.4-login-layout4`

### `404.html`

1. `js/security.js?v=4.2.0-devtools-guard`

### `teacher.html`

1. `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`

2. `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`

3. `https://cdn.quilljs.com/1.3.6/quill.js`

4. `https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js`

5. `https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js`

6. `https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js`

7. `js/firebase-config.js?v=20260909.singleflight-v1`

8. `js/cloudinary-storage.js?v=4.0.0`

9. `js/cloudflare-r2-storage.js?v=4.0.0`

10. `https://cdn.jsdelivr.net/npm/dompurify@3.4.7/dist/purify.min.js`

11. `https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js`

12. `js/common.js?v=4.0.4-login-layout4`

13. `js/history-retention.js?v=1.0.0-2month-safe`

14. `js/update-manager.js?v=1.0.4-release-v4.0.3`

15. `js/web-animations.js?v=1.0`

16. `js/web-performance-optimizer.js?v=2.0.0`

17. `js/transaction-history.js?v=4.0.1-retention-2months`

18. `js/security.js?v=4.2.0-devtools-guard`

19. `js/daily-login.js?v=4.0.0`

20. `js/theme-items.js?v=4.2`

21. `js/effect-items.js?v=4.2`

22. `js/pet-items.js?v=20260919.partial-fix1`

23. `js/effect-quality-manager.js?v=20260918.fx-store-v2`

24. `js/royal-ball.js?v=4.0.0`

25. `js/music-manager.js?v=4.0.0`

26. `js/store-manager.js?v=20260919.store-access-unequip-v1`

27. `js/painting.js?v=20260908.round-query-v1`

28. `js/luxury-store.js?v=20260919.store-access-unequip-v1`

29. `js/roadmap-startup-fix.js?v=1.0`

30. `js/teacher.js?v=20260919.store-access-unequip-v1`

31. `js/huong-dan-nguoi-moi.js?v=2.14.0`

### `cloudinary-test.html`

### `student.html`

1. `js/student-feature-loader.js?v=20260919.store-access-unequip-v1`

2. `https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`

3. `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`

4. `https://cdn.quilljs.com/1.3.6/quill.js`

5. `https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js`

6. `https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js`

7. `https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js`

8. `js/firebase-config.js?v=20260909.singleflight-v1`

9. `js/cloudinary-storage.js?v=3.8`

10. `js/cloudflare-r2-storage.js?v=3.8`

11. `https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js`

12. `https://cdn.jsdelivr.net/npm/dompurify@3.4.7/dist/purify.min.js`

13. `js/common.js?v=4.0.4-login-layout4`

14. `js/history-retention.js?v=1.0.0-2month-safe`

15. `js/update-manager.js?v=1.0.4-release-v4.0.3`

16. `js/web-animations.js?v=1.0`

17. `js/web-performance-optimizer.js?v=2.0.0`

18. `js/transaction-history.js?v=4.0.1-retention-2months`

19. `js/effect-quality-manager.js?v=20260918.fx-store-v2`

20. `https://www.youtube.com/iframe_api`

21. `js/student.js?v=20260919.store-access-unequip-v1`
