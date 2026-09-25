# Post-fix whole-repository scan

Files scanned: 68

## Syntax failures
_none_

## Broad sensitive-node root reads
| file | line | node | text |
| --- | --- | --- | --- |
| js/teacher.js | 3582 | student_coins | listenFirebase(db.ref('student_coins'), 'value', debounce(loadStudentsList, 1500)); |
| js/teacher.js | 11134 | student_coins | const coinSnap = await db.ref('student_coins').once('value'); |

## Economic node callsites
| file | line | op | text |
| --- | --- | --- | --- |
| js/store-collections.js | 431 | read/unknown | updates[`student_coins/${username}`] = getServerIncrement( |
| js/store-collections.js | 620 | read | .ref(`student_inventory/${username}`) |
| js/daily-login.js | 983 | transaction | `student_coins/${username}` |
| js/daily-login.js | 1005 | transaction | `student_bonus_tickets/${username}` |
| js/daily-login.js | 1037 | transaction | `student_money_offset/${username}` |
| js/daily-login.js | 1067 | update | `student_inventory/${username}/${preparedRewardValue}` |
| js/daily-login.js | 1089 | push | .ref(`student_discounts/${username}`) |
| js/royal-ball.js | 812 | transaction | `student_coins/${currentUser.username}` |
| js/royal-ball.js | 1148 | read | `student_inventory/${currentUser.username}` |
| js/royal-ball.js | 1210 | update | `student_inventory/` + |
| js/royal-ball.js | 1293 | transaction | `student_coins/${currentUser.username}` |
| js/leaderboard.js | 2528 | read/unknown | `student_discounts/` + |
| js/leaderboard.js | 2641 | read/unknown | `student_coins/${username}` |
| js/leaderboard.js | 4291 | read/unknown | `student_coins/${username}` |
| js/leaderboard.js | 4330 | read | `student_inventory/` + |
| js/leaderboard.js | 4592 | read/unknown | `student_coins/${username}` |
| js/leaderboard.js | 4642 | read/unknown | `student_coins/${username}` |
| js/leaderboard.js | 4755 | read/unknown | `student_inventory/` + |
| js/transaction-history.js | 2273 | read/unknown | `student_coins/${username}`; |
| js/luxury-store.js | 12230 | read | `student_inventory/${user.username}` |
| js/luxury-store.js | 12738 | read | `student_inventory/${user.username}/${itemId}` |
| js/luxury-store.js | 12863 | read | `student_inventory/${username}` |
| js/teacher.js | 803 | transaction | `mid_autumn_wallets/${normalizedUsername}` |
| js/teacher.js | 888 | transaction | `mid_autumn_wallets/${username}` |
| js/teacher.js | 1019 | transaction | `mid_autumn_wallets/${username}` |
| js/teacher.js | 3582 | read/unknown | listenFirebase(db.ref('student_coins'), 'value', debounce(loadStudentsList, 1500)); |
| js/teacher.js | 7437 | read/unknown | //   student_coins có thể âm để bảo toàn sổ cái và chặn việc lợi dụng chấm lại. |
| js/teacher.js | 7864 | read | `student_coins/${username}` |
| js/teacher.js | 7884 | read | `student_inventory/${username}` |
| js/teacher.js | 8290 | transaction | `student_bonus_tickets/${username}` |
| js/teacher.js | 8293 | transaction | `student_coins/${username}` |
| js/teacher.js | 8661 | read/unknown | `student_bonus_tickets/${username}` |
| js/teacher.js | 8664 | read/unknown | `student_coins/${username}` |
| js/teacher.js | 9122 | transaction | `student_bonus_tickets/${username}` |
| js/teacher.js | 9125 | transaction | `student_coins/${username}` |
| js/teacher.js | 9203 | transaction | .ref(`student_bonus_tickets/${username}`) |
| js/teacher.js | 9848 | transaction | `student_bonus_tickets/${username}` |
| js/teacher.js | 9851 | transaction | `student_coins/${username}` |
| js/teacher.js | 10247 | transaction | `student_bonus_tickets/${username}` |
| js/teacher.js | 11134 | read | const coinSnap = await db.ref('student_coins').once('value'); |
| js/teacher.js | 11719 | read/unknown | updates[`student_coins/${username}`] = null; |
| js/teacher.js | 11720 | read/unknown | updates[`student_bonus_tickets/${username}`] = null; |
| js/teacher.js | 11721 | update | updates[`student_money_offset/${username}`] = null; |
| js/teacher.js | 11722 | update | updates[`student_inventory/${username}`] = null; |
| js/teacher.js | 11723 | update | updates[`student_discounts/${username}`] = null; |
| js/teacher.js | 11724 | update | updates[`spin_counts/${username}`] = null; |
| js/teacher.js | 11728 | update | updates[`historical_grade_tickets/${username}`] = null; |
| js/teacher.js | 15699 | set | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/teacher.js | 15711 | set | await pushDB(`student_inventory/${currentUser.username}`, { |
| js/teacher.js | 15725 | read | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/teacher.js | 15745 | update | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/teacher.js | 16798 | read | db.ref(`student_inventory/${username}`).once('value'), |
| js/teacher.js | 18569 | read | db.ref(`student_money_offset/${studentUsername}`).once('value') |
| js/teacher.js | 18600 | transaction | const offsetRef = db.ref(`student_money_offset/${studentUsername}`); |
| js/teacher.js | 18666 | update | const offsetSnap = await db.ref(`student_money_offset/${studentUsername}`).once('value'); |
| js/teacher.js | 19081 | update | .ref(`student_inventory/${student.username}`).once('value'); |
| js/teacher.js | 19084 | update | updates[`student_inventory/${student.username}/${child.key}/isEquipped`] = false; |
| js/teacher.js | 19092 | read/unknown | DBReadSingleFlight.invalidate(`student_inventory/${student.username}`); |
| js/teacher.js | 19449 | set | `historical_grade_tickets/${normalizedUsername}` |
| js/teacher.js | 19473 | read | .ref('student_bonus_tickets/' + username) |
| js/teacher.js | 19480 | read | .ref('spin_counts/' + username) |
| js/teacher.js | 19542 | set | await db.ref('student_bonus_tickets/' + username).set(newBonus); |
| js/painting.js | 1304 | transaction | `student_coins/${this.user.username}` |
| js/painting.js | 8279 | transaction | await db.ref(`student_coins/${student.studentUsername}`).transaction(current => Number(current \|\| 0) + reward.coins); |
| js/painting.js | 8292 | read/unknown | `student_inventory/${student.studentUsername}/${badgeId}` |
| js/painting.js | 8326 | read/unknown | updates[`student_inventory/${student.studentUsername}/chest_hh_${seasonId}`] = { id: 'chest_hoihoa', type: 'chest', name: 'Rương Kho Báu Hội Họa', icon: '🎁', isEquipped: false, purchaseTime: Date.now(), description: 'Phần thưởng Quán quân mùa giải Hội Họa.' }; |
| js/painting.js | 8332 | read/unknown | `student_discounts/${student.studentUsername}/hh_discount_${seasonId}` |
| js/lich-su-hao-hung.js | 1878 | transaction | const itemRef = database.ref(`student_inventory/${user.username}/${item.id}`); |
| js/mid-autumn-festival.js | 279 | read | return getDatabase().ref(`mid_autumn_wallets/${username()}`); |
| js/mid-autumn-festival.js | 971 | transaction | const coinRef = getDatabase().ref(`student_coins/${username()}`); |
| js/mid-autumn-festival.js | 997 | transaction | await getDatabase().ref(`student_coins/${username()}`).transaction(current => Number(current \|\| 0) + CONFIG.extraTicketPrice); |
| js/mid-autumn-festival.js | 1016 | read | const inventory = await getDatabase().ref(`student_inventory/${username()}`).once('value'); |
| js/mid-autumn-festival.js | 1141 | update | [`student_coins/${username()}`]: firebase.database.ServerValue.increment(amount), |
| js/mid-autumn-festival.js | 1167 | read | let inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/mid-autumn-festival.js | 1172 | read | inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/history-retention.js | 43 | read/unknown | 'birthday_coins', |
| js/history-retention.js | 49 | read/unknown | 'spin_counts', |
| js/history-retention.js | 52 | read/unknown | 'historical_grade_tickets', |
| js/history-retention.js | 53 | read/unknown | 'student_inventory', |
| js/history-retention.js | 54 | read/unknown | 'student_discounts', |
| js/history-retention.js | 56 | read/unknown | 'student_coins', |
| js/history-retention.js | 57 | read/unknown | 'student_money_offset', |
| js/history-retention.js | 63 | read/unknown | 'student_special_birthday_coins', |
| js/history-retention.js | 64 | read/unknown | 'mid_autumn_wallets', |
| js/pet-interactions.js | 1069 | set | const coinRef = db.ref(`student_coins/${user.username}`); |
| js/pet-interactions.js | 1208 | transaction | `student_coins/${user.username}` |
| js/pet-interactions.js | 2253 | read | `student_coins/${user.username}` |
| js/pet-interactions.js | 3777 | transaction | `student_coins/${user.username}` |
| js/bellum-event.js | 1360 | read | `student_inventory/${username}` |
| js/bellum-event.js | 1422 | read/unknown | `student_inventory/${username}/${rewardItem.id}` |
| js/student.js | 514 | read/unknown | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 518 | read/unknown | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 522 | read/unknown | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 528 | read/unknown | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 532 | read/unknown | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 536 | read/unknown | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 563 | read/unknown | `student_discounts/${currentUser.username}/${key}/targetItem` |
| js/student.js | 567 | update | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 2107 | read/unknown | `mid_autumn_wallets/${username}` |
| js/student.js | 2778 | read | `student_inventory/${username}/${config.itemId}` |
| js/student.js | 3397 | read/unknown | ? `mid_autumn_wallets/${username}` |
| js/student.js | 5722 | read/unknown | listenFirebase(db.ref('student_coins/' + currentUser.username), 'value', (snapshot) => { |
| js/student.js | 5742 | read/unknown | db.ref('student_bonus_tickets/' + currentUser.username), |
| js/student.js | 5833 | read/unknown | 'student_inventory/' + |
| js/student.js | 5998 | read/unknown | 'birthday_coins/' + |
| js/student.js | 6058 | read/unknown | 'student_special_birthday_coins/' + |
| js/student.js | 7359 | update | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 7373 | read | // Hàm db.ref('student_inventory/').on('value') có sẵn của bạn sẽ tự động chạy lại để gỡ trang bị ngay lập tức |
| js/student.js | 7403 | read/unknown | listenFirebase(db.ref('student_money_offset/' + currentUser.username), 'value', async () => { |
| js/student.js | 7435 | read | 'student_discounts/' + |
| js/student.js | 15526 | transaction | 'student_coins/' + currentUser.username |
| js/student.js | 15555 | transaction | 'spin_counts/' + currentUser.username |
| js/student.js | 15642 | transaction | 'spin_counts/' + currentUser.username |
| js/student.js | 15854 | read | 'historical_grade_tickets/' + currentUser.username |
| js/student.js | 15872 | read | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 15882 | read | .ref('spin_counts/' + currentUser.username) |
| js/student.js | 15980 | transaction | const coinPath = `student_coins/${username}`; |
| js/student.js | 15981 | transaction | const bonusTicketPath = `student_bonus_tickets/${username}`; |
| js/student.js | 16273 | transaction | `student_inventory/${currentUser.username}/${randomItem.id}` |
| js/student.js | 16659 | read | .ref(`student_inventory/${currentUser.username}`) |
| js/student.js | 16728 | transaction | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 17715 | read/unknown | updates[`student_inventory/${currentUser.username}/${item.id}`] = null; |
| js/student.js | 18208 | read | `student_inventory/` + |
| js/student.js | 18304 | update | `student_coins/${currentUser.username}`, |
| js/student.js | 18379 | read | `student_inventory/` + |
| js/student.js | 18425 | update | `student_inventory/` + |
| js/student.js | 18449 | update | `student_coins/${currentUser.username}`, |
| js/student.js | 18565 | read | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 18617 | read | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 18630 | read | const discSnap = await db.ref(`student_discounts/${currentUser.username}`).once('value'); |
| js/student.js | 18890 | read | `student_inventory/` + |
| js/student.js | 18992 | read | `student_discounts/` + |
| js/student.js | 19140 | update | `student_coins/${currentUser.username}`, |
| js/student.js | 19321 | read/unknown | `student_coins/${currentUser.username}`, |
| js/student.js | 19323 | read/unknown | `student_inventory/${currentUser.username}/${itemId}`, |
| js/student.js | 19381 | read/unknown | `student_coins/${currentUser.username}`, |
| js/student.js | 19534 | read | `student_inventory/${currentUser.username}/${itemId}` |
| js/student.js | 19583 | read | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19600 | transaction | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 19807 | update | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19816 | update | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 20515 | read | db.ref('student_money_offset/' + currentUser.username).once('value') |
| js/student.js | 21636 | read/unknown | `student_coins/${currentUser.username}`; |
| js/student.js | 21639 | read/unknown | `student_money_offset/${currentUser.username}`; |
| js/student.js | 22852 | transaction | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 22855 | transaction | 'student_coins/' + currentUser.username |
| js/student.js | 22974 | read/unknown | `student_bonus_tickets/${currentUser.username} + ` + |
| js/student.js | 22975 | read/unknown | `student_coins/${currentUser.username}`; |
| js/student.js | 23008 | transaction | 'student_coins/' + |
| js/student.js | 23033 | read/unknown | `student_coins/${currentUser.username}`; |
| js/student.js | 23072 | read/unknown | `mid_autumn_wallets/` + |
| js/student.js | 23105 | read/unknown | `mid_autumn_wallets/` + |
| js/student.js | 23129 | read/unknown | `mid_autumn_wallets/` + |
| js/student.js | 23167 | transaction | `birthday_coins/` + |
| js/student.js | 23209 | read/unknown | `birthday_coins/` + |
| js/student.js | 23235 | read/unknown | `birthday_coins/` + |
| js/student.js | 23297 | transaction | `student_special_birthday_coins/` + |
| js/student.js | 23340 | read/unknown | `student_special_birthday_coins/` + |
| js/student.js | 23365 | read/unknown | `student_special_birthday_coins/` + |
| js/student.js | 23421 | transaction | 'student_money_offset/' + |
| js/student.js | 23446 | read/unknown | `student_money_offset/${currentUser.username}`; |
| js/student.js | 23475 | transaction | 'student_bonus_tickets/' + |
| js/student.js | 23500 | read/unknown | `student_bonus_tickets/${currentUser.username}`; |
| js/student.js | 23509 | transaction | `student_inventory/` + |
| js/student.js | 23664 | transaction | `student_discounts/` + |
| js/student.js | 23728 | read/unknown | `student_discounts/` + |
| js/student.js | 29104 | transaction | `student_inventory/` + |
| js/student.js | 29172 | read | `student_special_birthday_coins/` + |
| js/student.js | 29285 | read | `student_inventory/` + |
| js/student.js | 29303 | read | `student_special_birthday_coins/` + |
| js/student.js | 29704 | transaction | `student_inventory/` + |
| js/student.js | 29767 | read | `birthday_coins/` + |
| js/student.js | 29907 | read/unknown | `birthday_coins/` + |
| js/student.js | 29913 | read | `student_inventory/` + |
| js/student.js | 30483 | set | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 30489 | set | await db.ref(`student_discounts/${currentUser.username}/${discountKey}`).remove(); |
| js/student.js | 30518 | read | 'student_discounts/' + |
| js/student.js | 30523 | read | 'student_inventory/' + |
| js/student.js | 30528 | read | 'birthday_coins/' + |
| js/student.js | 30534 | read | 'student_special_birthday_coins/' + |
| js/student.js | 30539 | read | 'mid_autumn_wallets/' + |
| js/student.js | 30566 | read/unknown | // Xu Trung Thu là tiền tệ sự kiện nên không ghi vào student_inventory. |
| js/student.js | 30567 | read/unknown | // Túi đồ đọc trực tiếp số dư thật từ mid_autumn_wallets. |
| js/student.js | 31058 | read | db.ref('student_money_offset/' + currentUser.username).once('value'), |
| js/student.js | 34159 | read/unknown | `student_inventory/${username}/${chestKey}` |
| js/student.js | 34182 | transaction | .ref(`student_coins/${username}`) |
| js/student.js | 34476 | read | `student_inventory/${username}` |
| js/student.js | 34514 | transaction | `student_inventory/` + |
| js/student.js | 34589 | set | `student_discounts/` + |

## Duplicate function declarations/assignments
| file | name | lines |
| --- | --- | --- |
| js/common.js | hide | 658,1271 |
| js/common.js | escapeHTML | 2007,4650 |
| js/mid-autumn-festival.js | clearQuestionTimer | 1429,1669 |
| js/mid-autumn-festival.js | next | 1457,1695 |
| js/mid-autumn-festival.js | end | 1512,1599 |
| js/store-manager.js | install | 4532,5098,5511,6018 |
| js/store-manager.js | getItem | 4666,5202,5569 |
| js/store-manager.js | isTarget | 4686,5211,5584 |
| js/store-manager.js | ensureLayer | 4726,5321,5711 |
| js/store-manager.js | repairFrame | 4869,5391,5835 |
| js/store-manager.js | clearOnlyTargetFrame | 4903,5286,5676 |
| js/store-manager.js | wrapAvatarFrameManager | 4950,5411,5881 |
| js/store-manager.js | wrapStoreManager | 4994,5457,5941 |
| js/store-manager.js | removeOwnLayers | 5237,5621 |
| js/store-manager.js | clearTargetHost | 5248,5633 |
| js/student.js | guarded | 999,1254 |
| js/student.js | onclick | 6275,26762 |
| js/student.js | onerror | 14227,17281 |

## Critical Rules summary
| node | parent_read | parent_write | child_read | child_write |
| --- | --- | --- | --- | --- |
| student_coins | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') |
| student_money_offset | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') |
| student_bonus_tickets | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') |
| historical_grade_tickets | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') |
| student_discounts | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') |
| student_inventory | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |
| store_purchase_ops | False |  | auth != null && (root.child('users').child(auth.uid).child('username').val() === $username \|\| root.child('users').child(auth.uid).child('role').val() === 'teacher') |  |
| hoihoa_vote_usage | False |  |  |  |
| hoihoa_rounds | auth != null | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  |  |
| profile_request_secrets | auth != null && root.child('users').child(auth.uid).child('role').val() === 'teacher' |  |  |  |

## Pattern: legacy_question_bank (0)
_none_

## Pattern: plaintext_user_password_write (2)
| file | line | text |
| --- | --- | --- |
| js/student.js | 5379 | // K1: Firebase Auth UID + users/<uid> là authority; password không cần ở client Học sinh. |
| functions/index.js | 61 | await db.ref(`users/${uid}/password`).remove(); |

## Pattern: stored_student_password_read (0)
_none_

## Pattern: removed_old_password_helpers (0)
_none_

## Pattern: startup_fail_call (0)
_none_

## Pattern: purchase_locks_client (2)
| file | line | text |
| --- | --- | --- |
| js/history-retention.js | 62 | 'purchase_locks', |
| functions/history-retention-function.js | 42 | // student_history_events, purchase_locks, wallet/grant/redemption, inventory, |

## Pattern: window_buyitem_override (5)
| file | line | text |
| --- | --- | --- |
| js/luxury-store.js | 12797 | typeof window.buyItem === 'function' |
| js/store-manager.js | 2885 | typeof window.buyItem === 'function' |
| js/store-manager.js | 2940 | typeof window.trialItem === 'function' |
| js/student.js | 18143 | window.trialItem = async function (itemId) { |
| js/student.js | 18545 | window.buyItem = async function (itemId, isUpgradingFromTrial = false) { |

## Pattern: store_monkey_patch (29)
| file | line | text |
| --- | --- | --- |
| js/luxury-store.js | 11402 | const originalUnapplyItem = |
| js/luxury-store.js | 11408 | StoreManager.unapplyItem = |
| js/luxury-store.js | 12473 | const originalApplyItem = |
| js/luxury-store.js | 12478 | StoreManager.applyItem = |
| js/pet-items.js | 4644 | typeof StoreManager.unapplyItem === 'function' |
| js/store-manager.js | 4961 | const originalApply = |
| js/store-manager.js | 5007 | const originalApply = |
| js/store-manager.js | 5008 | typeof StoreManager.applyItem === |
| js/store-manager.js | 5014 | const originalUnapply = |
| js/store-manager.js | 5015 | typeof StoreManager.unapplyItem === |
| js/store-manager.js | 5022 | StoreManager.applyItem = |
| js/store-manager.js | 5076 | StoreManager.unapplyItem = |
| js/store-manager.js | 5415 | const originalApply = |
| js/store-manager.js | 5463 | const originalApply = |
| js/store-manager.js | 5464 | typeof StoreManager.applyItem === 'function' |
| js/store-manager.js | 5467 | const originalUnapply = |
| js/store-manager.js | 5468 | typeof StoreManager.unapplyItem === 'function' |
| js/store-manager.js | 5473 | StoreManager.applyItem = async function (itemId) { |
| js/store-manager.js | 5494 | StoreManager.unapplyItem = async function (itemId) { |
| js/store-manager.js | 5891 | const originalApply = |
| js/store-manager.js | 5949 | const originalApply = |
| js/store-manager.js | 5950 | typeof StoreManager.applyItem === 'function' |
| js/store-manager.js | 5954 | const originalUnapply = |
| js/store-manager.js | 5955 | typeof StoreManager.unapplyItem === 'function' |
| js/store-manager.js | 5960 | StoreManager.applyItem = |
| js/store-manager.js | 5995 | StoreManager.unapplyItem = |
| js/student.js | 19345 | typeof StoreManager.applyItem === |
| js/student.js | 19519 | StoreManager.applyItem = async function (itemId) { |
| js/student.js | 19628 | StoreManager.unapplyItem = async function (itemId) { |

## Pattern: self_economic_nodes (189)
| file | line | text |
| --- | --- | --- |
| js/store-collections.js | 431 | updates[`student_coins/${username}`] = getServerIncrement( |
| js/store-collections.js | 620 | .ref(`student_inventory/${username}`) |
| js/daily-login.js | 983 | `student_coins/${username}` |
| js/daily-login.js | 1005 | `student_bonus_tickets/${username}` |
| js/daily-login.js | 1037 | `student_money_offset/${username}` |
| js/daily-login.js | 1067 | `student_inventory/${username}/${preparedRewardValue}` |
| js/daily-login.js | 1089 | .ref(`student_discounts/${username}`) |
| js/royal-ball.js | 812 | `student_coins/${currentUser.username}` |
| js/royal-ball.js | 1148 | `student_inventory/${currentUser.username}` |
| js/royal-ball.js | 1210 | `student_inventory/` + |
| js/royal-ball.js | 1293 | `student_coins/${currentUser.username}` |
| js/leaderboard.js | 2528 | `student_discounts/` + |
| js/leaderboard.js | 2641 | `student_coins/${username}` |
| js/leaderboard.js | 4291 | `student_coins/${username}` |
| js/leaderboard.js | 4330 | `student_inventory/` + |
| js/leaderboard.js | 4592 | `student_coins/${username}` |
| js/leaderboard.js | 4642 | `student_coins/${username}` |
| js/leaderboard.js | 4755 | `student_inventory/` + |
| js/transaction-history.js | 2273 | `student_coins/${username}`; |
| js/luxury-store.js | 12230 | `student_inventory/${user.username}` |
| js/luxury-store.js | 12738 | `student_inventory/${user.username}/${itemId}` |
| js/luxury-store.js | 12863 | `student_inventory/${username}` |
| js/teacher.js | 803 | `mid_autumn_wallets/${normalizedUsername}` |
| js/teacher.js | 888 | `mid_autumn_wallets/${username}` |
| js/teacher.js | 1019 | `mid_autumn_wallets/${username}` |
| js/teacher.js | 3582 | listenFirebase(db.ref('student_coins'), 'value', debounce(loadStudentsList, 1500)); |
| js/teacher.js | 7437 | //   student_coins có thể âm để bảo toàn sổ cái và chặn việc lợi dụng chấm lại. |
| js/teacher.js | 7864 | `student_coins/${username}` |
| js/teacher.js | 7884 | `student_inventory/${username}` |
| js/teacher.js | 8290 | `student_bonus_tickets/${username}` |
| js/teacher.js | 8293 | `student_coins/${username}` |
| js/teacher.js | 8661 | `student_bonus_tickets/${username}` |
| js/teacher.js | 8664 | `student_coins/${username}` |
| js/teacher.js | 9122 | `student_bonus_tickets/${username}` |
| js/teacher.js | 9125 | `student_coins/${username}` |
| js/teacher.js | 9203 | .ref(`student_bonus_tickets/${username}`) |
| js/teacher.js | 9848 | `student_bonus_tickets/${username}` |
| js/teacher.js | 9851 | `student_coins/${username}` |
| js/teacher.js | 10247 | `student_bonus_tickets/${username}` |
| js/teacher.js | 11134 | const coinSnap = await db.ref('student_coins').once('value'); |
| js/teacher.js | 11719 | updates[`student_coins/${username}`] = null; |
| js/teacher.js | 11720 | updates[`student_bonus_tickets/${username}`] = null; |
| js/teacher.js | 11721 | updates[`student_money_offset/${username}`] = null; |
| js/teacher.js | 11722 | updates[`student_inventory/${username}`] = null; |
| js/teacher.js | 11723 | updates[`student_discounts/${username}`] = null; |
| js/teacher.js | 11724 | updates[`spin_counts/${username}`] = null; |
| js/teacher.js | 11728 | updates[`historical_grade_tickets/${username}`] = null; |
| js/teacher.js | 15699 | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/teacher.js | 15711 | await pushDB(`student_inventory/${currentUser.username}`, { |
| js/teacher.js | 15725 | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/teacher.js | 15745 | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/teacher.js | 16798 | db.ref(`student_inventory/${username}`).once('value'), |
| js/teacher.js | 18569 | db.ref(`student_money_offset/${studentUsername}`).once('value') |
| js/teacher.js | 18600 | const offsetRef = db.ref(`student_money_offset/${studentUsername}`); |
| js/teacher.js | 18666 | const offsetSnap = await db.ref(`student_money_offset/${studentUsername}`).once('value'); |
| js/teacher.js | 19081 | .ref(`student_inventory/${student.username}`).once('value'); |
| js/teacher.js | 19084 | updates[`student_inventory/${student.username}/${child.key}/isEquipped`] = false; |
| js/teacher.js | 19092 | DBReadSingleFlight.invalidate(`student_inventory/${student.username}`); |
| js/teacher.js | 19449 | `historical_grade_tickets/${normalizedUsername}` |
| js/teacher.js | 19473 | .ref('student_bonus_tickets/' + username) |
| js/teacher.js | 19480 | .ref('spin_counts/' + username) |
| js/teacher.js | 19542 | await db.ref('student_bonus_tickets/' + username).set(newBonus); |
| js/painting.js | 1304 | `student_coins/${this.user.username}` |
| js/painting.js | 8279 | await db.ref(`student_coins/${student.studentUsername}`).transaction(current => Number(current \|\| 0) + reward.coins); |
| js/painting.js | 8292 | `student_inventory/${student.studentUsername}/${badgeId}` |
| js/painting.js | 8326 | updates[`student_inventory/${student.studentUsername}/chest_hh_${seasonId}`] = { id: 'chest_hoihoa', type: 'chest', name: 'Rương Kho Báu Hội Họa', icon: '🎁', isEquipped: false, purchaseTime: Date.now(), description: 'Phần thưởng Quán quân mùa giải Hội Họa.' }; |
| js/painting.js | 8332 | `student_discounts/${student.studentUsername}/hh_discount_${seasonId}` |
| js/lich-su-hao-hung.js | 1878 | const itemRef = database.ref(`student_inventory/${user.username}/${item.id}`); |
| js/mid-autumn-festival.js | 279 | return getDatabase().ref(`mid_autumn_wallets/${username()}`); |
| js/mid-autumn-festival.js | 971 | const coinRef = getDatabase().ref(`student_coins/${username()}`); |
| js/mid-autumn-festival.js | 997 | await getDatabase().ref(`student_coins/${username()}`).transaction(current => Number(current \|\| 0) + CONFIG.extraTicketPrice); |
| js/mid-autumn-festival.js | 1016 | const inventory = await getDatabase().ref(`student_inventory/${username()}`).once('value'); |
| js/mid-autumn-festival.js | 1141 | [`student_coins/${username()}`]: firebase.database.ServerValue.increment(amount), |
| js/mid-autumn-festival.js | 1167 | let inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/mid-autumn-festival.js | 1172 | inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value'); |
| js/history-retention.js | 43 | 'birthday_coins', |
| js/history-retention.js | 49 | 'spin_counts', |
| js/history-retention.js | 52 | 'historical_grade_tickets', |
| js/history-retention.js | 53 | 'student_inventory', |
| js/history-retention.js | 54 | 'student_discounts', |
| js/history-retention.js | 56 | 'student_coins', |
| js/history-retention.js | 57 | 'student_money_offset', |
| js/history-retention.js | 63 | 'student_special_birthday_coins', |
| js/history-retention.js | 64 | 'mid_autumn_wallets', |
| js/pet-interactions.js | 1069 | const coinRef = db.ref(`student_coins/${user.username}`); |
| js/pet-interactions.js | 1208 | `student_coins/${user.username}` |
| js/pet-interactions.js | 2253 | `student_coins/${user.username}` |
| js/pet-interactions.js | 3777 | `student_coins/${user.username}` |
| js/bellum-event.js | 1360 | `student_inventory/${username}` |
| js/bellum-event.js | 1422 | `student_inventory/${username}/${rewardItem.id}` |
| js/student.js | 514 | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 518 | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 522 | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 528 | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 532 | `student_discounts/${currentUser.username}/${key}/usageLimit` |
| js/student.js | 536 | `student_discounts/${currentUser.username}/${key}/maxEligiblePriceExclusive` |
| js/student.js | 563 | `student_discounts/${currentUser.username}/${key}/targetItem` |
| js/student.js | 567 | `student_discounts/${currentUser.username}/${key}/source` |
| js/student.js | 2107 | `mid_autumn_wallets/${username}` |
| js/student.js | 2778 | `student_inventory/${username}/${config.itemId}` |
| js/student.js | 3397 | ? `mid_autumn_wallets/${username}` |
| js/student.js | 5722 | listenFirebase(db.ref('student_coins/' + currentUser.username), 'value', (snapshot) => { |
| js/student.js | 5742 | db.ref('student_bonus_tickets/' + currentUser.username), |
| js/student.js | 5833 | 'student_inventory/' + |
| js/student.js | 5998 | 'birthday_coins/' + |
| js/student.js | 6058 | 'student_special_birthday_coins/' + |
| js/student.js | 7359 | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 7373 | // Hàm db.ref('student_inventory/').on('value') có sẵn của bạn sẽ tự động chạy lại để gỡ trang bị ngay lập tức |
| js/student.js | 7403 | listenFirebase(db.ref('student_money_offset/' + currentUser.username), 'value', async () => { |
| js/student.js | 7435 | 'student_discounts/' + |
| js/student.js | 15526 | 'student_coins/' + currentUser.username |
| js/student.js | 15555 | 'spin_counts/' + currentUser.username |
| js/student.js | 15642 | 'spin_counts/' + currentUser.username |
| js/student.js | 15854 | 'historical_grade_tickets/' + currentUser.username |
| js/student.js | 15872 | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 15882 | .ref('spin_counts/' + currentUser.username) |
| js/student.js | 15980 | const coinPath = `student_coins/${username}`; |
| js/student.js | 15981 | const bonusTicketPath = `student_bonus_tickets/${username}`; |
| js/student.js | 16273 | `student_inventory/${currentUser.username}/${randomItem.id}` |
| js/student.js | 16659 | .ref(`student_inventory/${currentUser.username}`) |
| js/student.js | 16728 | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 17715 | updates[`student_inventory/${currentUser.username}/${item.id}`] = null; |
| js/student.js | 18208 | `student_inventory/` + |
| js/student.js | 18304 | `student_coins/${currentUser.username}`, |
| js/student.js | 18379 | `student_inventory/` + |
| js/student.js | 18425 | `student_inventory/` + |
| js/student.js | 18449 | `student_coins/${currentUser.username}`, |
| js/student.js | 18565 | `student_inventory/${currentUser.username}/${item.id}` |
| js/student.js | 18617 | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 18630 | const discSnap = await db.ref(`student_discounts/${currentUser.username}`).once('value'); |
| js/student.js | 18890 | `student_inventory/` + |
| js/student.js | 18992 | `student_discounts/` + |
| js/student.js | 19140 | `student_coins/${currentUser.username}`, |
| js/student.js | 19321 | `student_coins/${currentUser.username}`, |
| js/student.js | 19323 | `student_inventory/${currentUser.username}/${itemId}`, |
| js/student.js | 19381 | `student_coins/${currentUser.username}`, |
| js/student.js | 19534 | `student_inventory/${currentUser.username}/${itemId}` |
| js/student.js | 19583 | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19600 | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 19807 | const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value'); |
| js/student.js | 19816 | await db.ref(`student_inventory/${currentUser.username}`).update(updates); |
| js/student.js | 20515 | db.ref('student_money_offset/' + currentUser.username).once('value') |
| js/student.js | 21636 | `student_coins/${currentUser.username}`; |
| js/student.js | 21639 | `student_money_offset/${currentUser.username}`; |
| js/student.js | 22852 | 'student_bonus_tickets/' + currentUser.username |
| js/student.js | 22855 | 'student_coins/' + currentUser.username |
| js/student.js | 22974 | `student_bonus_tickets/${currentUser.username} + ` + |
| js/student.js | 22975 | `student_coins/${currentUser.username}`; |
| js/student.js | 23008 | 'student_coins/' + |
| js/student.js | 23033 | `student_coins/${currentUser.username}`; |
| js/student.js | 23072 | `mid_autumn_wallets/` + |
| js/student.js | 23105 | `mid_autumn_wallets/` + |
| js/student.js | 23129 | `mid_autumn_wallets/` + |
| js/student.js | 23167 | `birthday_coins/` + |
| js/student.js | 23209 | `birthday_coins/` + |
| js/student.js | 23235 | `birthday_coins/` + |
| js/student.js | 23297 | `student_special_birthday_coins/` + |
| js/student.js | 23340 | `student_special_birthday_coins/` + |
| js/student.js | 23365 | `student_special_birthday_coins/` + |
| js/student.js | 23421 | 'student_money_offset/' + |
| js/student.js | 23446 | `student_money_offset/${currentUser.username}`; |
| js/student.js | 23475 | 'student_bonus_tickets/' + |
| js/student.js | 23500 | `student_bonus_tickets/${currentUser.username}`; |
| js/student.js | 23509 | `student_inventory/` + |
| js/student.js | 23664 | `student_discounts/` + |
| js/student.js | 23728 | `student_discounts/` + |
| js/student.js | 29104 | `student_inventory/` + |
| js/student.js | 29172 | `student_special_birthday_coins/` + |
| js/student.js | 29285 | `student_inventory/` + |
| js/student.js | 29303 | `student_special_birthday_coins/` + |
| js/student.js | 29704 | `student_inventory/` + |
| js/student.js | 29767 | `birthday_coins/` + |
| js/student.js | 29907 | `birthday_coins/` + |
| js/student.js | 29913 | `student_inventory/` + |
| js/student.js | 30483 | const coinRef = db.ref('student_coins/' + currentUser.username); |
| js/student.js | 30489 | await db.ref(`student_discounts/${currentUser.username}/${discountKey}`).remove(); |
| js/student.js | 30518 | 'student_discounts/' + |
| js/student.js | 30523 | 'student_inventory/' + |
| js/student.js | 30528 | 'birthday_coins/' + |
| js/student.js | 30534 | 'student_special_birthday_coins/' + |
| js/student.js | 30539 | 'mid_autumn_wallets/' + |
| js/student.js | 30566 | // Xu Trung Thu là tiền tệ sự kiện nên không ghi vào student_inventory. |
| js/student.js | 30567 | // Túi đồ đọc trực tiếp số dư thật từ mid_autumn_wallets. |
| js/student.js | 31058 | db.ref('student_money_offset/' + currentUser.username).once('value'), |
| js/student.js | 34159 | `student_inventory/${username}/${chestKey}` |
| js/student.js | 34182 | .ref(`student_coins/${username}`) |
| js/student.js | 34476 | `student_inventory/${username}` |
| js/student.js | 34514 | `student_inventory/` + |
| js/student.js | 34589 | `student_discounts/` + |

## Pattern: client_rng (393)
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
| js/effect-items.js | 2381 | `${15 + Math.random() * 90}%` |
| js/effect-items.js | 2386 | `${3 + Math.random() * 7}px` |
| js/effect-items.js | 2391 | `${-55 + Math.random() * 110}px` |
| js/effect-items.js | 2396 | `${-80 - Math.random() * 150}px` |
| js/effect-items.js | 2406 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2502 | 10 + Math.random() * 9; |
| js/effect-items.js | 2509 | `${4 + Math.random() * 92}%` |
| js/effect-items.js | 2514 | `${8 + Math.random() * 78}%` |
| js/effect-items.js | 2519 | `${5 + Math.random() * 9}px` |
| js/effect-items.js | 2531 | `${-70 + Math.random() * 140}px` |
| js/effect-items.js | 2536 | `${-28 + Math.random() * 56}px` |
| js/effect-items.js | 2546 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2569 | 7 + Math.random() * 10; |
| js/effect-items.js | 2578 | `${Math.random() * 100}%` |
| js/effect-items.js | 2583 | `${Math.random() * 100}%` |
| js/effect-items.js | 2588 | `${1.5 + Math.random() * 4.5}px` |
| js/effect-items.js | 2593 | `${-95 + Math.random() * 190}px` |
| js/effect-items.js | 2598 | `${-65 - Math.random() * 130}px` |
| js/effect-items.js | 2608 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2742 | x = 5 + Math.random() * 90; |
| js/effect-items.js | 2743 | y = 4 + Math.random() * 13; |
| js/effect-items.js | 2745 | x = 5 + Math.random() * 90; |
| js/effect-items.js | 2746 | y = 83 + Math.random() * 12; |
| js/effect-items.js | 2748 | x = 2 + Math.random() * 10; |
| js/effect-items.js | 2749 | y = 18 + Math.random() * 64; |
| js/effect-items.js | 2751 | x = 88 + Math.random() * 10; |
| js/effect-items.js | 2752 | y = 18 + Math.random() * 64; |
| js/effect-items.js | 2756 | 5 + Math.random() * 5; |
| js/effect-items.js | 2781 | `${7 + Math.random() * 8}px` |
| js/effect-items.js | 2786 | `${-18 + Math.random() * 36}px` |
| js/effect-items.js | 2791 | `${-12 - Math.random() * 25}px` |
| js/effect-items.js | 2801 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2870 | 5 + Math.random() * 7; |
| js/effect-items.js | 2877 | `${3 + Math.random() * 94}%` |
| js/effect-items.js | 2882 | `${4 + Math.random() * 78}%` |
| js/effect-items.js | 2887 | `${4 + Math.random() * 9}px` |
| js/effect-items.js | 2892 | `${18 + Math.random() * 54}px` |
| js/effect-items.js | 2902 | `${-Math.random() * duration}s` |
| js/effect-items.js | 2930 | 34 + Math.random() * 68; |
| js/effect-items.js | 2933 | 0.72 + Math.random() * 0.86; |
| js/effect-items.js | 2941 | Math.random() * viewport.width |
| js/effect-items.js | 2953 | `${1 + Math.random() * 1.4}px` |
| js/effect-items.js | 2963 | `${28 + Math.random() * 46}px` |
| js/effect-items.js | 2982 | `${0.34 + Math.random() * 0.46}` |
| js/effect-items.js | 3005 | `${6 + Math.random() * 88}%`; |
| js/effect-items.js | 3008 | `${3 + Math.random() * 17}%`; |
| js/effect-items.js | 3012 | `${42 + Math.random() * 68}px` |
| js/effect-items.js | 3017 | `${1.4 + Math.random() * 1.1}s` |
| js/effect-items.js | 3713 | Math.random() > 0.72 |
| js/effect-items.js | 3719 | `${Math.round(Math.random() * 88 + 6)}vh` |
| js/effect-items.js | 3723 | `${Math.round(Math.random() * 24 + 16)}vw` |
| js/effect-items.js | 3727 | `${(Math.random() * 0.7 + 1.1).toFixed(2)}s` |
| js/effect-items.js | 4163 | const isRune = Math.random() < 0.24; |
| js/effect-items.js | 4176 | Math.random() * viewport.width; |
| js/effect-items.js | 4187 | `${Math.round(Math.random() * 140 - 70)}px` |
| js/effect-items.js | 4192 | `${Math.round(Math.random() * 70 - 35)}deg` |
| js/effect-items.js | 4195 | const duration = Math.random() * 4 + 6; |
| js/effect-items.js | 4200 | Math.random() > 0.5 ? '☾' : '✦'; |
| js/effect-items.js | 4203 | `${Math.random() * 10 + 12}px`; |
| js/effect-items.js | 4206 | `${Math.random() * 0.28 + 0.55}`; |
| js/effect-items.js | 4208 | const size = Math.random() * 5 + 4; |
| js/effect-items.js | 4235 | `${Math.round(Math.random() * 120 + 120)}px` |
| js/effect-items.js | 4238 | const duration = Math.random() * 1.3 + 1.2; |
| js/effect-items.js | 4249 | if (Math.random() < 0.45) { |
| js/effect-items.js | 4256 | Math.round(Math.random() * 110 + 90); |
| js/effect-items.js | 4262 | Math.random() * 2 + 3.4; |
| js/store-collections.js | 336 | Math.random().toString(36).slice(2), |
| js/store-collections.js | 337 | Math.random().toString(36).slice(2) |
| js/royal-ball.js | 536 | `${55 + Math.random() * 105}px` |
| js/royal-ball.js | 541 | `${3 + Math.random() * 6}px` |
| js/royal-ball.js | 551 | `${Math.random() * 0.18}s` |
| js/royal-ball.js | 1116 | const randomNumber = Math.random() * 100; |
| js/royal-ball.js | 1173 | Math.random() * |
| js/royal-ball.js | 1265 | Math.random() * |
| js/leaderboard.js | 2376 | `${Math.random().toString(36).slice(2)}`; |
| js/leaderboard.js | 3847 | `${Math.random().toString(36).slice(2)}`; |
| js/leaderboard.js | 4266 | Math.random(); |
| js/leaderboard.js | 4273 | Math.random() * 301 |
| js/leaderboard.js | 4278 | Math.random() * 201 |
| js/leaderboard.js | 4283 | Math.random() * 301 |
| js/leaderboard.js | 4569 | Math.random(); |
| js/leaderboard.js | 4579 | Math.random() * |
| js/leaderboard.js | 4694 | Math.random() * |
| js/leaderboard.js | 4700 | Math.random() * |
| js/leaderboard.js | 4717 | Math.random() * |
| js/leaderboard.js | 4723 | Math.random() * |
| js/web-animations.js | 181 | 4 + Math.random() * 5; |
| js/web-animations.js | 184 | 8 + Math.random() * 10; |
| js/web-animations.js | 187 | -(Math.random() * duration); |
| js/web-animations.js | 190 | ((index + Math.random() * 1.6) / total) * 100; |
| js/web-animations.js | 193 | 12 + Math.random() * 86; |
| js/web-animations.js | 196 | -34 + Math.random() * 68; |
| js/common.js | 3281 | `health-${Date.now()}-${Math.random() |
| js/luxury-store.js | 271 | `${Math.random() * 100}%` |
| js/luxury-store.js | 276 | `${2 + Math.random() * 5}px` |
| js/luxury-store.js | 281 | `${7 + Math.random() * 9}s` |
| js/luxury-store.js | 286 | `${-Math.random() * 14}s` |
| js/luxury-store.js | 321 | `${5 + Math.random() * 90}%` |
| js/luxury-store.js | 326 | `${7 + Math.random() * 82}%` |
| js/luxury-store.js | 331 | `${7 + Math.random() * 13}px` |
| js/luxury-store.js | 336 | `${-Math.random() * 5}s` |
| js/luxury-store.js | 369 | `${Math.random() * 100}%` |
| js/luxury-store.js | 374 | `${Math.random() * 100}%` |
| js/luxury-store.js | 379 | `${-Math.random() * 7}s` |
| js/luxury-store.js | 681 | `${105 + Math.random() * 235}px` |
| js/luxury-store.js | 686 | `${8 + Math.random() * 15}px` |
| js/luxury-store.js | 691 | `${Math.random() * 0.22}s` |
| js/luxury-store.js | 709 | `${Math.random() * 360}deg` |
| js/luxury-store.js | 714 | `${90 + Math.random() * 280}px` |
| js/luxury-store.js | 719 | `${Math.random() * 0.26}s` |
| js/luxury-store.js | 724 | `${Math.random() * 180 - 90}deg` |
| js/luxury-store.js | 837 | `${4 + Math.random() * 92}%` |
| js/luxury-store.js | 842 | `${5 + Math.random() * 86}%` |
| js/luxury-store.js | 847 | `${6 + Math.random() * 15}px` |
| js/luxury-store.js | 852 | `${Math.random() * 0.9}s` |
| js/luxury-store.js | 865 | `${Math.random() * 100}%` |
| js/luxury-store.js | 870 | `${20 + Math.random() * 85}%` |
| js/luxury-store.js | 875 | `${2 + Math.random() * 5}px` |
| js/luxury-store.js | 880 | `${Math.random() * 1.2}s` |
| js/luxury-store.js | 1865 | const roll = Math.random(); |
| js/luxury-store.js | 1876 | trail.style.left = `${x + (Math.random() * 26 - 13)}px`; |
| js/luxury-store.js | 1877 | trail.style.top = `${y + (Math.random() * 22 - 11)}px`; |
| js/luxury-store.js | 1878 | trail.style.setProperty('--ssv2-trail-drift-x', `${Math.random() * 62 - 31}px`); |
| js/luxury-store.js | 1879 | trail.style.setProperty('--ssv2-trail-drift-y', `${18 + Math.random() * 42}px`); |
| js/luxury-store.js | 1880 | trail.style.setProperty('--ssv3-trail-turn', `${Math.random() * 120 - 60}deg`); |
| js/luxury-store.js | 2261 | if (state.moved && Math.random() < .72) { |
| js/luxury-store.js | 9373 | `${8 + Math.random() * 76}%`; |
| js/luxury-store.js | 9376 | `${34 + Math.random() * 54}%`; |
| js/luxury-store.js | 9379 | `${-Math.random() * 7}s`; |
| js/luxury-store.js | 9383 | Math.random() * 0.8 |
| js/luxury-store.js | 9517 | `${6 + Math.random() * 88}%` |
| js/luxury-store.js | 9522 | `${8 + Math.random() * 80}%` |
| js/luxury-store.js | 9527 | `${2 + Math.random() * 4}px` |
| js/luxury-store.js | 9532 | `${-Math.random() * 5}s` |
| js/luxury-store.js | 9666 | `${48 + Math.random() * 72}px` |
| js/luxury-store.js | 9835 | `${75 + Math.random() * 150}px` |
| js/luxury-store.js | 9840 | `${Math.random() * 0.18}s` |
| js/luxury-store.js | 9867 | `${Math.random() * 360}deg` |
| js/luxury-store.js | 9872 | `${70 + Math.random() * 170}px` |
| js/luxury-store.js | 9877 | `${3 + Math.random() * 5}px` |
| js/luxury-store.js | 9882 | `${Math.random() * 0.22}s` |
| js/luxury-store.js | 9917 | `${90 + Math.random() * 110}px` |
| js/luxury-store.js | 10152 | `${Math.random() * 100}%`; |
| js/luxury-store.js | 10156 | `${7 + Math.random() * 13}px` |
| js/luxury-store.js | 10161 | `${3.8 + Math.random() * 2.2}s` |
| js/luxury-store.js | 10166 | `${Math.random() * 1.6}s` |
| js/luxury-store.js | 10171 | `${-90 + Math.random() * 180}px` |
| js/luxury-store.js | 10207 | `${Math.random() * 100}%`; |
| js/luxury-store.js | 10210 | `${Math.random() * 45}%`; |
| js/luxury-store.js | 10214 | `${2 + Math.random() * 5}px` |
| js/luxury-store.js | 10219 | `${-Math.random() * 2.5}s` |
| js/luxury-store.js | 10259 | `${5 + Math.random() * 90}%` |
| js/luxury-store.js | 10264 | `${40 + Math.random() * 48}%` |
| js/luxury-store.js | 10269 | `${-140 + Math.random() * 280}px` |
| js/luxury-store.js | 10497 | `${Math.random() * 100}%` |
| js/luxury-store.js | 10502 | `${7 + Math.random() * 8}s` |
| js/luxury-store.js | 10507 | `${-Math.random() * 12}s` |
| js/luxury-store.js | 10511 | `scale(${0.55 + Math.random() * 0.85})`; |
| js/luxury-store.js | 10561 | `${Math.random() * 100}%` |
| js/luxury-store.js | 10566 | `${7 + Math.random() * 11}px` |
| js/luxury-store.js | 10571 | `${7 + Math.random() * 8}s` |
| js/luxury-store.js | 10576 | `${-Math.random() * 12}s` |
| js/luxury-store.js | 10611 | `${Math.random() * 100}%` |
| js/luxury-store.js | 10616 | `${Math.random() * 100}%` |
| js/luxury-store.js | 10621 | `${2 + Math.random() * 4}px` |
| js/luxury-store.js | 10626 | `${3 + Math.random() * 5}s` |
| js/luxury-store.js | 10631 | `${-Math.random() * 6}s` |
| js/luxury-store.js | 10669 | `${12 + Math.random() * 70}%` |
| js/luxury-store.js | 10674 | `${0.6 + Math.random() * 0.7}` |
| js/luxury-store.js | 10679 | `${12 + Math.random() * 10}s` |
| js/luxury-store.js | 10684 | `${-Math.random() * 18}s` |
| js/teacher.js | 1221 | Math.random() |
| js/teacher.js | 8163 | `${now}_${Math.random().toString(36).slice(2, 10)}`; |
| js/teacher.js | 8961 | `hold_${holdLockNow}_${Math.random().toString(36).slice(2, 10)}`; |
| js/teacher.js | 11933 | `profile_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`; |
| js/teacher.js | 13968 | let qId = Date.now() + Math.random(); |
| js/teacher.js | 15777 | flake.style.cssText = `position: absolute; width: 8px; height: 8px; background: white; border-radius: 50%; opacity: ${Math.random()}; top: -10px; left: ${Math.random() * 100}vw; animation: fall ${Math.random() * 3 + 2}s linear infinite;`; |
| js/teacher.js | 15783 | spark.style.cssText = `position: absolute; width: 4px; height: 4px; background: #ffd700; border-radius: 50%; box-shadow: 0 0 10px #ffd700; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw; animation: blink ${Math.random() * 2 + 1}s infinite alternate;`; |
| js/painting.js | 2545 | Math.random() |
| js/painting.js | 4049 | Math.random() * Math.PI * 2; |
| js/painting.js | 4052 | Math.sqrt(Math.random()) * |
| js/painting.js | 4059 | Math.random() |
| js/painting.js | 4112 | (Math.random() - 0.5) * |
| js/painting.js | 4116 | (Math.random() - 0.5) * |
| js/painting.js | 4124 | Math.random() * 0.035 |
| js/painting.js | 4132 | Math.random() * 0.65 |
| js/lich-su-hao-hung.js | 968 | const j = Math.floor(Math.random() * (i + 1)); |
| js/mid-autumn-festival.js | 251 | const j = Math.floor(Math.random() * (i + 1)); |
| js/mid-autumn-festival.js | 487 | id: `${year}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, |
| js/mid-autumn-festival.js | 1595 | target.style.left = `${8 + Math.floor(Math.random() * maxX)}px`; |
| js/mid-autumn-festival.js | 1596 | target.style.top = `${8 + Math.floor(Math.random() * maxY)}px`; |
| js/mid-autumn-festival.js | 1797 | const cells = [wanted, ...Array.from({ length: 47 }, () => distractorPool[Math.floor(Math.random() * distractorPool.length)])]; |
| js/pet-items.js | 6067 | if (narwhalPet && Math.random() < 0.45) { |
| js/pet-items.js | 6073 | const size = Math.random() * 10 + 7; |
| js/pet-items.js | 6076 | `${e.clientX + (Math.random() * 34 - 17)}px`; |
| js/pet-items.js | 6079 | `${e.clientY + (Math.random() * 26 - 6)}px`; |
| js/pet-items.js | 6088 | `${Math.random() * 44 - 22}px` |
| js/pet-items.js | 6109 | if (nyxPet && Math.random() < 0.56) { |
| js/pet-items.js | 6127 | `${e.clientX + (Math.random() * 34 - 17)}px`; |
| js/pet-items.js | 6130 | `${e.clientY + (Math.random() * 24 - 12)}px`; |
| js/pet-items.js | 6135 | ? Math.random() * 5 + 8 |
| js/pet-items.js | 6136 | : Math.random() * 3 + 5}px` |
| js/pet-items.js | 6141 | `${Math.random() * 56 - 28}px` |
| js/pet-items.js | 6146 | `${Math.random() * 45 + 25}px` |
| js/pet-items.js | 6151 | `${Math.random() * 50 - 35}deg` |
| js/pet-items.js | 6167 | if (amonPet && Math.random() < 0.72) { |
| js/pet-items.js | 6179 | Math.random() > 0.5 |
| js/pet-items.js | 6184 | `${e.clientX + (Math.random() * 42 - 21)}px`; |
| js/pet-items.js | 6187 | `${e.clientY + (Math.random() * 34 - 17)}px`; |
| js/pet-items.js | 6191 | `${Math.random() * 90 - 45}px` |
| js/pet-items.js | 6196 | `${Math.random() * 70 + 35}px` |
| js/pet-items.js | 6201 | `${Math.random() * 260 - 130}deg` |
| js/pet-items.js | 6221 | if (springVintagePet && Math.random() < 0.58) { |
| js/pet-items.js | 6222 | const trailCount = this.getQualityCount(Math.random() < 0.35 ? 2 : 1); |
| js/pet-items.js | 6226 | trail.className = Math.random() < 0.34 |
| js/pet-items.js | 6231 | `${e.clientX + (Math.random() * 34 - 17)}px`; |
| js/pet-items.js | 6233 | `${e.clientY + (Math.random() * 28 - 14)}px`; |
| js/pet-items.js | 6236 | `${Math.random() * 52 - 26}px` |
| js/pet-items.js | 6240 | `${24 + Math.random() * 44}px` |
| js/pet-items.js | 6244 | `${Math.random() * 220 - 110}deg` |
| js/pet-items.js | 6248 | `${6 + Math.random() * 7}px` |
| js/pet-items.js | 7217 | 160 + Math.random() * 310; |
| js/pet-items.js | 7231 | `${0.25 + Math.random() * 0.9}s` |
| js/pet-items.js | 7236 | `${10 + Math.random() * 17}px` |
| js/pet-items.js | 7310 | const size = Math.random() * 2.6 + 1; |
| js/pet-items.js | 7312 | star.style.left = `${Math.random() * 100}%`; |
| js/pet-items.js | 7313 | star.style.top = `${Math.random() * 100}%`; |
| js/pet-items.js | 7318 | `${Math.random() * 2.2 + 1.1}s`; |
| js/pet-items.js | 7321 | `${Math.random() * 2.4}s`; |
| js/pet-items.js | 7333 | `${Math.random() * 42 - 8}vh`; |
| js/pet-items.js | 7337 | `${Math.random() * 120 + 170}px` |
| js/pet-items.js | 7342 | `${Math.random() * 0.65 + 1.35}s` |
| js/pet-items.js | 7347 | `${0.55 + i * 0.62 + Math.random() * 0.35}s` |
| js/pet-items.js | 7426 | `${78 + Math.random() * 62}px` |
| js/pet-items.js | 7431 | `${7 + Math.random() * 13}px` |
| js/pet-items.js | 7435 | `${Math.random() * 0.18}s`; |
| js/pet-items.js | 7456 | `${95 + Math.random() * 55}px` |
| js/pet-items.js | 7460 | `${0.08 + Math.random() * 0.2}s`; |
| js/pet-interactions.js | 853 | const moveX = (Math.random() * rangeX) - (rangeX / 2); |
| js/pet-interactions.js | 854 | const moveY = (Math.random() * rangeY) - (rangeY / 2); |
| js/pet-interactions.js | 1349 | `${55 + Math.random() * 42}px` |
| js/pet-interactions.js | 4041 | Math.random() > 0.45 |
| js/pet-interactions.js | 4046 | `${15 + Math.random() * 70}%`; |
| js/pet-interactions.js | 4049 | `${20 + Math.random() * 65}%`; |
| js/pet-interactions.js | 4053 | `${Math.random() * 60 - 30}px` |
| js/pet-interactions.js | 4058 | `${1.7 + Math.random() * 1.5}s` |
| js/pet-interactions.js | 4628 | Math.random() * |
| js/pet-interactions.js | 4636 | Math.random() * |
| js/pet-interactions.js | 5088 | particle.style.setProperty('--move-x', `${(Math.random() * 40) - 20}px`); |
| js/bellum-event.js | 368 | const x = 4 + Math.random() * 92; |
| js/bellum-event.js | 369 | const y = 14 + Math.random() * 72; |
| js/bellum-event.js | 370 | const dx = -70 + Math.random() * 140; |
| js/bellum-event.js | 373 | ? 90 + Math.random() * 150 |
| js/bellum-event.js | 375 | ? -80 - Math.random() * 120 |
| js/bellum-event.js | 376 | : -30 - Math.random() * 110; |
| js/bellum-event.js | 384 | `${Math.random() * 160}ms` |
| js/bellum-event.js | 388 | `${3 + Math.random() * 8}px` |
| js/bellum-event.js | 1257 | Math.random() |
| js/bellum-event.js | 1410 | Math.random() * |
| js/student.js | 133 | `${Math.random().toString(36).slice(2, 12)}` |
| js/student.js | 2816 | `${Math.random() |
| js/student.js | 9983 | Math.random() * |
| js/student.js | 13145 | Math.random() * 1000 |
| js/student.js | 15596 | `${Math.random().toString(36).slice(2, 12)}` |
| js/student.js | 16172 | const rand = Math.random() * 100; |
| js/student.js | 16187 | const luckRand = Math.random(); |
| js/student.js | 16268 | Math.random() * cotichItems.length |
| js/student.js | 16691 | const rand = Math.random() * 100; |
| js/student.js | 16706 | Math.random() * cotichItems.length |
| js/student.js | 17810 | `${Math.random() |
| js/student.js | 20990 | Math.random().toString(36).slice(2, 12) |
| js/student.js | 21452 | Math.random().toString(36).slice(2, 12) |
| js/student.js | 34228 | return Math.random(); |
