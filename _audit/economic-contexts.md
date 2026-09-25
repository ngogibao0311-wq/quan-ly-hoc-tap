# Economic mutation contexts

# js/student.js

## lines 548-596
```js
00548:                 'hoihoa_runner_up' ||
00549:             discount.source ===
00550:                 'hoihoa_season';
00551: 
00552:         const isLegacyDailyLogin =
00553:             discount.source ===
00554:                 'daily_login';
00555: 
00556:         if (
00557:             !discount.isUsed &&
00558:             !isHoiHoaDiscount &&
00559:             isLegacyDailyLogin &&
00560:             targetItems.includes('all')
00561:         ) {
00562:             updates[
00563:                 `student_discounts/${currentUser.username}/${key}/targetItem`
00564:             ] = validItems;
00565: 
00566:             updates[
00567:                 `student_discounts/${currentUser.username}/${key}/source`
00568:             ] = 'daily_login';
00569:         }
00570:     });
00571: 
00572:     if (
00573:         Object.keys(updates).length > 0
00574:     ) {
00575:         await db.ref().update(updates);
00576:     }
00577: 
00578:     window.__studentDiscountMigrationDone =
00579:         true;
00580: 
00581:     window.__studentPendingDiscountMigration =
00582:         null;
00583: 
00584:     return true;
00585: }
00586: 
00587: window.syncStudentLazyStoreRuntime =
00588:     async function () {
00589:         if (
00590:             window.__studentLazyRuntimeSyncPromise
00591:         ) {
00592:             return window
00593:                 .__studentLazyRuntimeSyncPromise;
00594:         }
00595: 
00596:         window.__studentLazyRuntimeSyncPromise =
```

## lines 7344-7402
```js
07344:                         itemDef.type === 'music' &&
07345:                         typeof MusicManager !== 'undefined'
07346:                     ) {
07347:                         MusicManager.stopMusic();
07348:                     }
07349:                     if (
07350:                         itemDef?.type === 'frame' &&
07351:                         window.AvatarFrameManager
07352:                     ) {
07353:                         window.AvatarFrameManager.clearFrame();
07354:                     }
07355:                 }
07356: 
07357:                 // Xóa vật phẩm hết hạn khỏi kho
07358:                 updates[
07359:                     `student_inventory/${currentUser.username}/${item.id}`
07360:                 ] = null;
07361:             }
07362:         });
07363: 
07364:         if (hasExpired) {
07365:             try {
07366:                 await db.ref().update(updates);
07367:                 alert("⏰ Hệ thống ghi nhận có vật phẩm dùng thử của bạn đã hết hạn 24 giờ và vừa bị thu hồi!");
07368:             } catch (error) {
07369:                 // Giữ nguyên kho cục bộ để lần quét sau có thể thử lại.
07370:                 // Không báo thu hồi thành công khi Firebase chưa xác nhận.
07371:                 console.warn('[Trial Cleanup] Chưa thể thu hồi vật phẩm hết hạn:', error);
07372:             }
07373:             // Hàm db.ref('student_inventory/').on('value') có sẵn của bạn sẽ tự động chạy lại để gỡ trang bị ngay lập tức
07374:         }
07375:     }, 60000);
07376: 
07377:     // Đồng bộ nút Bật/Tắt Bảng quy đổi từ Giáo viên
07378:     listenFirebase(db.ref('system_settings/conversionTableEnabled'), 'value', (snapshot) => {
07379:         const isEnabled = snapshot.val() !== false;
07380: 
07381:         // 1. Lưu cờ trạng thái để chặn mở popup
07382:         window.isConversionEnabled = isEnabled;
07383: 
07384:         const conversionSection = document.getElementById('conversionTableSection');
07385:         if (conversionSection) {
07386:             conversionSection.style.display = isEnabled ? 'block' : 'none';
07387:         }
07388: 
07389:         // 2. Tự động đóng ngay Bảng quy đổi nếu học sinh đang mở mà giáo viên tắt
07390:         const coinModal = document.getElementById('coinConversionModal');
07391:         if (!isEnabled && coinModal && coinModal.classList.contains('active')) {
07392:             closeCoinConversionModal();
07393:             alert("🔒 Giáo viên vừa tạm khóa chức năng Bảng quy đổi!");
07394:         }
07395:         if (startupLoader) startupLoader.markReady('student-conversion-settings');
07396:     });
07397: 
07398:     // =================================================================
07399:     // ĐỒNG BỘ TIỀN TÍCH LŨY VÀ TRẠNG THÁI RÚT TIỀN THEO THỜI GIAN THỰC
07400:     // =================================================================
07401: 
07402:     // 1. Lắng nghe biến động tiền bù trừ (Giáo viên tặng/trừ tiền hoặc rút tiền)
```

## lines 15511-15584
```js
15511: 
15512: async function creditLuckyWheelCoinsReal(amount) {
15513:     const normalizedAmount = Math.max(
15514:         0,
15515:         Math.floor(Number(amount) || 0)
15516:     );
15517: 
15518:     if (normalizedAmount <= 0) {
15519:         return {
15520:             credited: 0,
15521:             balance: null
15522:         };
15523:     }
15524: 
15525:     const coinRef = db.ref(
15526:         'student_coins/' + currentUser.username
15527:     );
15528: 
15529:     const transaction = await coinRef.transaction(
15530:         currentCoins =>
15531:             (Number(currentCoins) || 0) + normalizedAmount,
15532:         undefined,
15533:         false
15534:     );
15535: 
15536:     if (!transaction.committed) {
15537:         throw new Error('LUCKY_WHEEL_COIN_TRANSACTION_NOT_COMMITTED');
15538:     }
15539: 
15540:     return {
15541:         credited: normalizedAmount,
15542:         balance: Number(transaction.snapshot.val()) || 0
15543:     };
15544: }
15545: 
15546: async function rollbackLuckyWheelSpinUsage(amount) {
15547:     const normalizedAmount = Math.max(
15548:         0,
15549:         Math.floor(Number(amount) || 0)
15550:     );
15551: 
15552:     if (normalizedAmount <= 0) return;
15553: 
15554:     const spinRef = db.ref(
15555:         'spin_counts/' + currentUser.username
15556:     );
15557: 
15558:     const rollbackTx = await spinRef.transaction(
15559:         currentData => {
15560:             const currentCount = Math.max(
15561:                 0,
15562:                 Number(currentData?.count || 0)
15563:             );
15564: 
15565:             return {
15566:                 count: Math.max(
15567:                     0,
15568:                     currentCount - normalizedAmount
15569:                 )
15570:             };
15571:         },
15572:         undefined,
15573:         false
15574:     );
15575: 
15576:     if (!rollbackTx.committed) {
15577:         throw new Error('LUCKY_WHEEL_TICKET_ROLLBACK_FAILED');
15578:     }
15579: }
15580: 
15581: // ======================================================
15582: // LUCKY WHEEL GUARD V2 · MULTI-TAB RESERVATION + SAFE AUDIT
15583: // ======================================================
15584: window.__LUCKY_WHEEL_GUARD_BUILD =
```

## lines 15627-15671
```js
15627:     }
15628: 
15629:     if (!(await getLuckyWheelServerOpenState())) {
15630:         throw new Error('GAME_DISABLED');
15631:     }
15632: 
15633:     // Đọc lại toàn bộ nguồn vé ngay trước transaction.
15634:     const ticketData = await window.calculateTotalTickets();
15635:     const totalSupply = Number(ticketData.totalTickets) || 0;
15636: 
15637:     if (ticketData.remaining < spins) {
15638:         throw new Error('INSUFFICIENT_TICKETS');
15639:     }
15640: 
15641:     const spinRef = db.ref(
15642:         'spin_counts/' + currentUser.username
15643:     );
15644: 
15645:     const tx = await spinRef.transaction(
15646:         currentData => {
15647:             const currentCount = Math.max(
15648:                 0,
15649:                 Number(currentData?.count || 0)
15650:             );
15651: 
15652:             const nextCount = currentCount + spins;
15653: 
15654:             /*
15655:              * Điểm khóa E1/E2:
15656:              * Hai tab có thể cùng đọc remaining cũ, nhưng transaction thứ hai
15657:              * luôn thấy count mới nhất. Nếu nextCount vượt nguồn vé snapshot
15658:              * vừa đọc từ Firebase, transaction bị abort và KHÔNG mất vé.
15659:              */
15660:             if (nextCount > totalSupply) {
15661:                 return;
15662:             }
15663: 
15664:             return {
15665:                 count: nextCount
15666:             };
15667:         },
15668:         undefined,
15669:         false
15670:     );
15671: 
```

## lines 15839-15901
```js
15839:         getStudentCompatSubmissionUsername(sub) ===
15840:             String(currentUser.username).trim() &&
15841:         sub.grade !== null &&
15842:         sub.grade !== undefined &&
15843:         sub.grade !== '' &&
15844:         Number(sub.gradeRewardV2Version || 0) < 2
15845:     );
15846: 
15847:     const computedLegacyTickets = myLegacySubs.reduce(
15848:         (sum, sub) =>
15849:             sum + getStudentLegacyGradeTicketValueV1(sub),
15850:         0
15851:     );
15852: 
15853:     const historicalRef = db.ref(
15854:         'historical_grade_tickets/' + currentUser.username
15855:     );
15856: 
15857:     const historicalSnap = await historicalRef.once('value');
15858:     const historicalGradeTickets =
15859:         Number(historicalSnap.val()) || 0;
15860: 
15861:     // Giữ lại toàn bộ vé điểm cũ đã từng có trước V2.
15862:     const legacyBase = Math.max(
15863:         historicalGradeTickets,
15864:         computedLegacyTickets
15865:     );
15866: 
15867:     if (legacyBase > historicalGradeTickets) {
15868:         await historicalRef.set(legacyBase);
15869:     }
15870: 
15871:     const bonusRef = db.ref(
15872:         'student_bonus_tickets/' + currentUser.username
15873:     );
15874: 
15875:     const bonusSnap = await bonusRef.once('value');
15876:     // Có thể âm do cơ chế phạt điểm mới.
15877:     const bonusTickets = Number(bonusSnap.val()) || 0;
15878: 
15879:     const totalTickets = legacyBase + bonusTickets;
15880: 
15881:     const countSnapshot = await db
15882:         .ref('spin_counts/' + currentUser.username)
15883:         .once('value');
15884: 
15885:     const spinTracking = countSnapshot.val() || { count: 0 };
15886:     const usedSpins = Number(spinTracking.count) || 0;
15887: 
15888:     return {
15889:         remaining: totalTickets - usedSpins,
15890:         totalTickets,
15891:         used: usedSpins,
15892:         spinTracking,
15893:         legacyBase,
15894:         bonus: bonusTickets
15895:     };
15896: };
15897: 
15898: // ================= CHỨC NĂNG MUA VÉ MAY MẮN =================
15899: // Hàm hỗ trợ tính mốc đầu tuần (Thứ 2) để reset lượt mua
15900: function getTicketStartOfWeek() {
15901:     const now = new Date();
```

## lines 15965-16010
```js
15965: };
15966: 
15967: // Logic xử lý trừ tiền và cộng vé
15968: window.buyLuckyTicket = async function () {
15969:     if (window.isOffline || !navigator.onLine) {
15970:         alert("❌ Mất kết nối mạng! Vui lòng kiểm tra lại đường truyền internet trước khi thực hiện giao dịch.");
15971:         return;
15972:     }
15973: 
15974:     if (!confirm("Bạn có chắc chắn muốn dùng 4 Coin để mua 1 Vé quay may mắn không?")) return;
15975: 
15976:     const username = currentUser.username;
15977:     const startOfWeek = getTicketStartOfWeek();
15978: 
15979:     const purchaseRef = db.ref(`ticket_purchases/${username}`);
15980:     const coinPath = `student_coins/${username}`;
15981:     const bonusTicketPath = `student_bonus_tickets/${username}`;
15982: 
15983:     let purchaseCountCommitted = false;
15984:     let coinDebited = false;
15985:     let bonusTicketAdded = false;
15986: 
15987:     try {
15988:         // 1. Transaction giới hạn mua tối đa 5 vé/tuần
15989:         const purchaseTx = await purchaseRef.transaction(current => {
15990:             let data = current || { count: 0, weekStart: startOfWeek };
15991: 
15992:             if (data.weekStart !== startOfWeek) {
15993:                 data = { count: 0, weekStart: startOfWeek };
15994:             }
15995: 
15996:             if ((data.count || 0) >= 5) {
15997:                 return; // abort
15998:             }
15999: 
16000:             return {
16001:                 weekStart: startOfWeek,
16002:                 count: (data.count || 0) + 1
16003:             };
16004:         });
16005: 
16006:         if (!purchaseTx.committed) {
16007:             return alert("⚠️ Bạn đã mua tối đa 5 vé trong tuần này. Hãy quay lại vào tuần sau nhé!");
16008:         }
16009: 
16010:         purchaseCountCommitted = true;
```

## lines 16258-16302
```js
16258:                             i =>
16259:                                 i.tag &&
16260:                                 i.tag.toLowerCase() === 'cổ tích'
16261:                         )
16262:                         : [];
16263: 
16264:                 if (cotichItems.length > 0) {
16265:                     const randomItem =
16266:                         cotichItems[
16267:                             Math.floor(
16268:                                 Math.random() * cotichItems.length
16269:                             )
16270:                         ];
16271: 
16272:                     const itemRef = db.ref(
16273:                         `student_inventory/${currentUser.username}/${randomItem.id}`
16274:                     );
16275: 
16276:                     const itemTx = await itemRef.transaction(
16277:                         existing => {
16278:                             if (existing && existing.id) {
16279:                                 return;
16280:                             }
16281: 
16282:                             return {
16283:                                 id: randomItem.id,
16284:                                 purchaseTime: Date.now(),
16285:                                 source: 'lucky_wheel',
16286:                                 luckyWheelOperationId: operationId,
16287:                                 isTrial: null,
16288:                                 trialExpiry: null,
16289:                                 isEquipped: false
16290:                             };
16291:                         },
16292:                         undefined,
16293:                         false
16294:                     );
16295: 
16296:                     if (itemTx.committed) {
16297:                         wonItem = randomItem;
16298:                         displayResult =
16299:                             `Vật phẩm: ${randomItem.name}`;
16300:                         actualRewardRecord =
16301:                             `Vật phẩm: ${randomItem.name}`;
16302:                     } else {
```

## lines 16713-16757
```js
16713:                 } else {
16714:                     currentOwned.push(randomItem.id);
16715:                     candidateItems.push(randomItem);
16716:                 }
16717:             } else {
16718:                 addMultiWheelCoinReward(600);
16719:             }
16720:         }
16721: 
16722:         // Chốt item bằng transaction để tab khác không làm mất phần thưởng.
16723:         const newlyWonItems = [];
16724:         const newlyWonItemNames = [];
16725: 
16726:         for (const item of candidateItems) {
16727:             const itemRef = db.ref(
16728:                 `student_inventory/${currentUser.username}/${item.id}`
16729:             );
16730: 
16731:             const itemTx = await itemRef.transaction(
16732:                 existing => {
16733:                     if (existing && existing.id) {
16734:                         return;
16735:                     }
16736: 
16737:                     return {
16738:                         id: item.id,
16739:                         purchaseTime: Date.now(),
16740:                         source: 'lucky_wheel_multi',
16741:                         luckyWheelOperationId: operationId,
16742:                         isTrial: null,
16743:                         trialExpiry: null,
16744:                         isEquipped: false
16745:                     };
16746:                 },
16747:                 undefined,
16748:                 false
16749:             );
16750: 
16751:             if (itemTx.committed) {
16752:                 newlyWonItems.push(item);
16753:                 newlyWonItemNames.push(item.name);
16754:             } else {
16755:                 addMultiWheelCoinReward(600);
16756:                 duplicateItemsCount++;
16757:             }
```

## lines 18289-18333
```js
18289:                 );
18290:         } catch (error) {
18291:             throw new Error(
18292:                 'TRIAL_RUNTIME_FAILED'
18293:             );
18294:         }
18295: 
18296:         await trialReservation.ref.update({
18297:             status:
18298:                 'debit_pending',
18299:             updatedAt:
18300:                 Date.now()
18301:         });
18302: 
18303:         await decrementNumberTx(
18304:             `student_coins/${currentUser.username}`,
18305:             trialPrice
18306:         );
18307: 
18308:         coinDebited = true;
18309: 
18310:         await trialReservation.ref.update({
18311:             status: 'debited',
18312:             coinDebited: true,
18313:             debitedAt:
18314:                 Date.now(),
18315:             updatedAt:
18316:                 Date.now()
18317:         });
18318: 
18319:         let inventoryAbortReason =
18320:             'TRIAL_ITEM_EXISTS';
18321: 
18322:         const itemTx =
18323:             await inventoryRef.transaction(
18324:                 current => {
18325:                     if (
18326:                         current &&
18327:                         current.id
18328:                     ) {
18329:                         inventoryAbortReason =
18330:                             current.isTrial
18331:                                 ? 'TRIAL_ALREADY_USED'
18332:                                 : 'ITEM_ALREADY_OWNED';
18333:                         return;
```

## lines 18364-18478
```js
18364: 
18365:         trialCreated = true;
18366: 
18367:         await trialReservation.ref.update({
18368:             status: 'active',
18369:             inventoryCreated:
18370:                 true,
18371:             activatedAt:
18372:                 Date.now(),
18373:             updatedAt:
18374:                 Date.now()
18375:         });
18376: 
18377:         const invSnap = await db
18378:             .ref(
18379:                 `student_inventory/` +
18380:                 `${currentUser.username}`
18381:             )
18382:             .once('value');
18383: 
18384:         const inventory =
18385:             invSnap.val();
18386: 
18387:         if (inventory) {
18388:             const updates = {};
18389: 
18390:             for (
18391:                 const key in inventory
18392:             ) {
18393:                 if (key === item.id) {
18394:                     continue;
18395:                 }
18396: 
18397:                 const invItem =
18398:                     inventory[key];
18399: 
18400:                 const checkTypeItem =
18401:                     StoreConfig.items.find(
18402:                         candidate =>
18403:                             candidate.id ===
18404:                             invItem.id
18405:                     );
18406: 
18407:                 if (
18408:                     checkTypeItem &&
18409:                     checkTypeItem.type ===
18410:                         item.type
18411:                 ) {
18412:                     updates[
18413:                         `${key}/isEquipped`
18414:                     ] = false;
18415:                 }
18416:             }
18417: 
18418:             if (
18419:                 Object.keys(
18420:                     updates
18421:                 ).length > 0
18422:             ) {
18423:                 await db
18424:                     .ref(
18425:                         `student_inventory/` +
18426:                         `${currentUser.username}`
18427:                     )
18428:                     .update(updates);
18429:             }
18430:         }
18431: 
18432:         alert(
18433:             `⏳ Bắt đầu dùng thử [ ${item.name} ]! ` +
18434:             '(Thời hạn: 24 giờ, mỗi vật phẩm 1 lần)'
18435:         );
18436: 
18437:     } catch (error) {
18438:         console.error(
18439:             '[Store Trial Guard]',
18440:             error
18441:         );
18442: 
18443:         if (
18444:             coinDebited &&
18445:             !trialCreated
18446:         ) {
18447:             try {
18448:                 await incrementNumberTx(
18449:                     `student_coins/${currentUser.username}`,
18450:                     Number(trialPrice || 0)
18451:                 );
18452: 
18453:                 await trialReservation
18454:                     ?.ref
18455:                     ?.update({
18456:                         status:
18457:                             'cancelled_refunded',
18458:                         coinDebited:
18459:                             false,
18460:                         refundedAt:
18461:                             Date.now(),
18462:                         updatedAt:
18463:                             Date.now()
18464:                     });
18465:             } catch (
18466:                 refundError
18467:             ) {
18468:                 console.error(
18469:                     '[Store Trial Guard] Hoàn Coin thất bại:',
18470:                     refundError
18471:                 );
18472: 
18473:                 await trialReservation
18474:                     ?.ref
18475:                     ?.update({
18476:                         status:
18477:                             'refund_pending',
18478:                         refundPendingAt:
```

## lines 19125-19169
```js
19125:             .update({
19126:                 status:
19127:                     'debit_pending',
19128:                 basePrice:
19129:                     Number(basePrice),
19130:                 finalPrice:
19131:                     Number(finalPrice),
19132:                 discountKey:
19133:                     discountKey || null,
19134:                 updatedAt:
19135:                     Date.now()
19136:             });
19137: 
19138:         if (finalPrice > 0) {
19139:             await decrementNumberTx(
19140:                 `student_coins/${currentUser.username}`,
19141:                 finalPrice
19142:             );
19143: 
19144:             coinDebited = true;
19145:         }
19146: 
19147:         await purchaseOperation.ref
19148:             .update({
19149:                 status: 'paid',
19150:                 coinDebited:
19151:                     coinDebited,
19152:                 paidAt:
19153:                     Date.now(),
19154:                 updatedAt:
19155:                     Date.now()
19156:             });
19157: 
19158:         let itemAbortReason =
19159:             'ITEM_ADD_FAILED';
19160: 
19161:         const itemTx =
19162:             await inventoryRef.transaction(
19163:                 existingItem => {
19164:                     if (
19165:                         existingItem &&
19166:                         existingItem.id
19167:                     ) {
19168:                         if (
19169:                             isUpgrade &&
```

## lines 19568-19629
```js
19568:             console.error(
19569:                 '[Store Runtime] Không chuẩn bị được runtime cho item:',
19570:                 itemId,
19571:                 error
19572:             );
19573:             window.showToast?.(
19574:                 'Không tải được hiệu ứng vật phẩm. Vui lòng thử lại.',
19575:                 'error'
19576:             );
19577:             return false;
19578:         }
19579: 
19580:         if (!canFinishEquip()) return false;
19581: 
19582:         // Chỉ ghi trạng thái trang bị sau khi quyền sở hữu Firebase đã được xác nhận.
19583:         const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value');
19584:         const inventory = invSnap.val();
19585:         if (!canFinishEquip()) return false;
19586:         if (inventory) {
19587:             let updates = {};
19588:             for (let key in inventory) {
19589:                 let invItem = inventory[key];
19590:                 const checkTypeItem = StoreConfig.items.find(i => i.id === invItem.id);
19591:                 if (checkTypeItem && checkTypeItem.type === item.type) {
19592:                     updates[`${key}/isEquipped`] = (invItem.id === itemId);
19593:                 }
19594:             }
19595:             if (!Object.keys(updates).length) {
19596:                 window.showToast?.('⛔ Không tìm thấy quyền sở hữu vật phẩm trong kho.', 'error');
19597:                 return false;
19598:             }
19599: 
19600:             await db.ref(`student_inventory/${currentUser.username}`).update(updates);
19601: 
19602:             // Quyền có thể đổi trong lúc Firebase đang xác nhận lần ghi.
19603:             if (!canFinishEquip()) {
19604:                 await ownedItemRef.transaction(value => {
19605:                     if (!value || value.isEquipped !== true) return;
19606:                     return { ...value, isEquipped: false };
19607:                 }, undefined, false);
19608:                 if (!window.isStudentStoreGameAccessEnabled()) window.clearStudentStoreEquipmentRuntime();
19609:                 return false;
19610:             }
19611: 
19612:             // Cache visual chỉ ghi SAU KHI Firebase chấp nhận equip.
19613:             try {
19614:                 if (item.type === 'frame') {
19615:                     localStorage.setItem('active_frame', String(item.id || ''));
19616:                 } else if (item.type === 'background') {
19617:                     localStorage.setItem('active_background', String(item.id || ''));
19618:                 }
19619:             } catch (_) {}
19620: 
19621:             return true;
19622:         }
19623: 
19624:         return false;
19625:     };
19626: 
19627:     // 5.5 Kết nối logic THÁO vật phẩm (Gỡ trang bị)
19628:     StoreManager.unapplyItem = async function (itemId) {
19629:         const item = StoreManager.getItemById(itemId);
```

## lines 19792-19845
```js
19792: 
19793:         if (
19794:             item.type === 'background' &&
19795:             window.WebBackgroundManager
19796:         ) {
19797:             window.WebBackgroundManager.clearBackground();
19798: 
19799:             try {
19800:                 localStorage.removeItem(
19801:                     'active_background'
19802:                 );
19803:             } catch (_) {}
19804:         }
19805: 
19806:         // 2. Lưu trạng thái "Đã tháo" lên Firebase
19807:         const invSnap = await db.ref(`student_inventory/${currentUser.username}`).once('value');
19808:         const inventory = invSnap.val();
19809:         if (inventory) {
19810:             let updates = {};
19811:             for (let key in inventory) {
19812:                 if (inventory[key].id === itemId) {
19813:                     updates[`${key}/isEquipped`] = false;
19814:                 }
19815:             }
19816:             await db.ref(`student_inventory/${currentUser.username}`).update(updates);
19817:         }
19818:     };
19819: 
19820:     StoreManager.__studentPageInventoryBridge =
19821:         '20260908.runtime-race-fix-v1';
19822: 
19823:     return true;
19824: }
19825: 
19826: // 6. Cập nhật giao diện UI & Hiệu ứng
19827: // Khi đang thi nghiêm ngặt: chỉ tạm tắt PET và EFFECT.
19828: // Theme vẫn được giữ nguyên.
19829: window.isExamVisualItemsSuspended = false;
19830: 
19831: // Tạm tắt pet và hiệu ứng khi bắt đầu thi
19832: window.suspendExamVisualItems = function () {
19833:     window.isExamVisualItemsSuspended = true;
19834: 
19835:     // Dừng toàn bộ hiệu ứng và các interval tạo hiệu ứng
19836:     if (
19837:         typeof EffectManager !== 'undefined' &&
19838:         typeof EffectManager.clearEffects === 'function'
19839:     ) {
19840:         EffectManager.clearEffects();
19841:     }
19842: 
19843:     const effectContainer =
19844:         document.getElementById('global-effect-container');
19845: 
```

## lines 22837-22884
```js
22837:                             firebase.database.ServerValue.TIMESTAMP
22838:                     });
22839:                 } catch (_) {}
22840:             };
22841: 
22842:             await touchClaimHeartbeat();
22843: 
22844:             claimHeartbeatTimer = window.setInterval(
22845:                 () => {
22846:                     touchClaimHeartbeat();
22847:                 },
22848:                 GRADE_REWARD_CLAIM_HEARTBEAT_MS
22849:             );
22850: 
22851:             const ticketRef = db.ref(
22852:                 'student_bonus_tickets/' + currentUser.username
22853:             );
22854:             const coinRef = db.ref(
22855:                 'student_coins/' + currentUser.username
22856:             );
22857: 
22858:             let ticketApplied = false;
22859:             let coinApplied = false;
22860: 
22861:             try {
22862:                 const ticketTx = await ticketRef.transaction(current =>
22863:                     Number(current || 0) + rewardTickets
22864:                 );
22865: 
22866:                 if (!ticketTx.committed) {
22867:                     throw new Error('GRADE_REWARD_TICKET_ABORTED');
22868:                 }
22869: 
22870:                 ticketApplied = true;
22871:                 await touchClaimHeartbeat();
22872: 
22873:                 if (rewardCoins > 0) {
22874:                     const coinTx = await coinRef.transaction(current =>
22875:                         Number(current || 0) + rewardCoins
22876:                     );
22877: 
22878:                     if (!coinTx.committed) {
22879:                         throw new Error('GRADE_REWARD_COIN_ABORTED');
22880:                     }
22881: 
22882:                     coinApplied = true;
22883:                     await touchClaimHeartbeat();
22884:                 }
```

## lines 22993-23037
```js
22993:         } else if (giftType === 'coin') {
22994:             const amount =
22995:                 parseInt(giftValue, 10);
22996: 
22997:             if (
22998:                 !Number.isInteger(amount) ||
22999:                 amount <= 0
23000:             ) {
23001:                 throw new Error(
23002:                     'INVALID_INBOX_COIN_QUANTITY'
23003:                 );
23004:             }
23005: 
23006:             const coinRef =
23007:                 db.ref(
23008:                     'student_coins/' +
23009:                     currentUser.username
23010:                 );
23011: 
23012:             const coinTx =
23013:                 await coinRef.transaction(
23014:                     current =>
23015:                         Number(current || 0) +
23016:                         amount
23017:                 );
23018: 
23019:             if (!coinTx.committed) {
23020:                 throw new Error(
23021:                     'INBOX_COIN_TRANSACTION_ABORTED'
23022:                 );
23023:             }
23024: 
23025:             if (inboxClaimGuard) {
23026:                 inboxClaimGuard.effectApplied =
23027:                     true;
23028:             }
23029: 
23030:             claimSucceeded = true;
23031: 
23032:             claimedPath =
23033:                 `student_coins/${currentUser.username}`;
23034: 
23035:             alert(
23036:                 `🎉 Bạn đã nhận được ` +
23037:                 `${amount.toLocaleString('vi-VN')} Coin!`
```

## lines 23406-23450
```js
23406:         } else if (giftType === 'money') {
23407:             const amount =
23408:                 parseInt(giftValue, 10);
23409: 
23410:             if (
23411:                 !Number.isInteger(amount) ||
23412:                 amount <= 0
23413:             ) {
23414:                 throw new Error(
23415:                     'INVALID_INBOX_MONEY_QUANTITY'
23416:                 );
23417:             }
23418: 
23419:             const offsetRef =
23420:                 db.ref(
23421:                     'student_money_offset/' +
23422:                     currentUser.username
23423:                 );
23424: 
23425:             const offsetTx =
23426:                 await offsetRef.transaction(
23427:                     current =>
23428:                         Number(current || 0) +
23429:                         amount
23430:                 );
23431: 
23432:             if (!offsetTx.committed) {
23433:                 throw new Error(
23434:                     'INBOX_MONEY_TRANSACTION_ABORTED'
23435:                 );
23436:             }
23437: 
23438:             if (inboxClaimGuard) {
23439:                 inboxClaimGuard.effectApplied =
23440:                     true;
23441:             }
23442: 
23443:             claimSucceeded = true;
23444: 
23445:             claimedPath =
23446:                 `student_money_offset/${currentUser.username}`;
23447: 
23448:             alert(
23449:                 `🎉 Bạn đã nhận được ` +
23450:                 `${amount.toLocaleString('vi-VN')} đ vào Tiền Lộ trình!`
```

## lines 23460-23538
```js
23460:         } else if (giftType === 'ticket') {
23461:             const amount =
23462:                 parseInt(giftValue, 10);
23463: 
23464:             if (
23465:                 !Number.isInteger(amount) ||
23466:                 amount <= 0
23467:             ) {
23468:                 throw new Error(
23469:                     'INVALID_INBOX_TICKET_QUANTITY'
23470:                 );
23471:             }
23472: 
23473:             const ticketRef =
23474:                 db.ref(
23475:                     'student_bonus_tickets/' +
23476:                     currentUser.username
23477:                 );
23478: 
23479:             const ticketTx =
23480:                 await ticketRef.transaction(
23481:                     current =>
23482:                         Number(current || 0) +
23483:                         amount
23484:                 );
23485: 
23486:             if (!ticketTx.committed) {
23487:                 throw new Error(
23488:                     'INBOX_TICKET_TRANSACTION_ABORTED'
23489:                 );
23490:             }
23491: 
23492:             if (inboxClaimGuard) {
23493:                 inboxClaimGuard.effectApplied =
23494:                     true;
23495:             }
23496: 
23497:             claimSucceeded = true;
23498: 
23499:             claimedPath =
23500:                 `student_bonus_tickets/${currentUser.username}`;
23501: 
23502:             alert(
23503:                 `🎉 Bạn đã nhận được ` +
23504:                 `${amount} Vé quay may mắn!`
23505:             );
23506: 
23507:         } else if (giftType === 'item') {
23508:             const giftItemPath =
23509:                 `student_inventory/` +
23510:                 `${currentUser.username}/` +
23511:                 `${giftValue}`;
23512: 
23513:             const giftItemRef =
23514:                 db.ref(giftItemPath);
23515: 
23516:             const giftItemTx =
23517:                 await giftItemRef.transaction(
23518:                     current => {
23519:                         /*
23520:                          * F5: nếu đã sở hữu thì KHÔNG ghi đè record cũ,
23521:                          * đặc biệt không ép isEquipped về false.
23522:                          */
23523:                         if (
23524:                             current &&
23525:                             typeof current === 'object'
23526:                         ) {
23527:                             return;
23528:                         }
23529: 
23530:                         return {
23531:                             id:
23532:                                 giftValue,
23533: 
23534:                             purchaseTime:
23535:                                 firebase.database
23536:                                     .ServerValue
23537:                                     .TIMESTAMP,
23538: 
```

## lines 23649-23693
```js
23649:                     'discount_expired'
23650:                 );
23651: 
23652:                 return;
23653:             }
23654: 
23655:             /*
23656:              * F4: key xác định theo msgKey, không dùng push().
23657:              * Một thư chỉ có thể ánh xạ tới đúng một thẻ giảm giá.
23658:              */
23659:             const discountKey =
23660:                 `inbox_${String(msgKey)}`;
23661: 
23662:             const discountRef =
23663:                 db.ref(
23664:                     `student_discounts/` +
23665:                     `${currentUser.username}/` +
23666:                     `${discountKey}`
23667:                 );
23668: 
23669:             const discountTx =
23670:                 await discountRef.transaction(
23671:                     current => {
23672:                         if (current !== null) {
23673:                             return;
23674:                         }
23675: 
23676:                         return {
23677:                             percent:
23678:                                 parseInt(
23679:                                     giftValue,
23680:                                     10
23681:                                 ),
23682: 
23683:                             dateAcquired:
23684:                                 firebase.database
23685:                                     .ServerValue
23686:                                     .TIMESTAMP,
23687: 
23688:                             isUsed:
23689:                                 false,
23690: 
23691:                             expiry:
23692:                                 expiry,
23693: 
```

## lines 29089-29133
```js
29089:             'function'
29090:         ) {
29091:             setTimeout(() => {
29092:                 window.filterStore('all');
29093:             }, 0);
29094:         }
29095:     };
29096: 
29097: async function addSpecialBirthdayItemToInventory(
29098:     username,
29099:     item,
29100:     grantId,
29101:     redemptionId
29102: ) {
29103:     const inventoryRef = db.ref(
29104:         `student_inventory/` +
29105:         `${username}/` +
29106:         `${item.id}`
29107:     );
29108: 
29109:     const inventoryTx =
29110:         await inventoryRef.transaction(
29111:             current => {
29112:                 if (current !== null) {
29113:                     return;
29114:                 }
29115: 
29116:                 return {
29117:                     id: item.id,
29118: 
29119:                     purchaseTime:
29120:                         firebase.database
29121:                             .ServerValue
29122:                             .TIMESTAMP,
29123: 
29124:                     isTrial: null,
29125:                     trialExpiry: null,
29126:                     isEquipped: false,
29127: 
29128:                     source:
29129:                         'special_birthday_coin',
29130: 
29131:                     specialCoinGrantId:
29132:                         grantId,
29133: 
```

## lines 29689-29733
```js
29689:                 ">
29690:                     ${itemButtons}
29691:                 </div>
29692:             </div>
29693:         </div>
29694:         `
29695:         );
29696:     };
29697: 
29698: async function addBirthdayItemToInventory(
29699:     username,
29700:     item,
29701:     numericYear
29702: ) {
29703:     const inventoryRef = db.ref(
29704:         `student_inventory/` +
29705:         `${username}/` +
29706:         `${item.id}`
29707:     );
29708: 
29709:     const inventoryTx =
29710:         await inventoryRef.transaction(
29711:             current => {
29712:                 if (current !== null) {
29713:                     return;
29714:                 }
29715: 
29716:                 return {
29717:                     id: item.id,
29718: 
29719:                     purchaseTime:
29720:                         firebase.database
29721:                             .ServerValue
29722:                             .TIMESTAMP,
29723: 
29724:                     isTrial: null,
29725:                     trialExpiry: null,
29726:                     isEquipped: false,
29727: 
29728:                     source:
29729:                         'birthday_coin',
29730: 
29731:                     birthdayYear:
29732:                         String(
29733:                             numericYear
```

## lines 30468-30518
```js
30468:             'Vui lòng mở mục Cửa hàng → Sang trọng.'
30469:         );
30470:     } catch (error) {
30471:         console.error(
30472:             '[Xu Trung Thu] Không thể mở Cửa hàng Sang trọng:',
30473:             error
30474:         );
30475:     }
30476: };
30477: 
30478: // Thực hiện giao dịch bán thẻ từ Popup thông tin
30479: window.sellDiscountCardFromPopup = async function (discountKey, percent, sellPrice) {
30480:     if (!confirm(`Bạn có chắc muốn thanh lý 1 tấm thẻ giảm giá ${percent}% này để lấy lại ${sellPrice} Coin không?`)) return;
30481: 
30482:     try {
30483:         const coinRef = db.ref('student_coins/' + currentUser.username);
30484:         const snap = await coinRef.once('value');
30485:         const currentCoins = snap.val() || 0;
30486: 
30487:         // Cộng coin thanh lý và gỡ thẻ khỏi cơ sở dữ liệu
30488:         await coinRef.set(currentCoins + sellPrice);
30489:         await db.ref(`student_discounts/${currentUser.username}/${discountKey}`).remove();
30490: 
30491:         alert(`🎉 Thu gom thành công! Đã quy đổi thẻ thành +${sellPrice} Coin.`);
30492:         window.closeBagItemPopup();
30493:         renderStudentBag(); // Làm tươi lại lưới túi đồ
30494:     } catch (e) {
30495:         console.error("Lỗi giao dịch bán thẻ:", e);
30496:         alert("❌ Hệ thống gặp sự cố phản hồi. Vui lòng thử lại!");
30497:     }
30498: };
30499: 
30500: // Khởi chạy quy trình gom nhóm và kết xuất túi đồ dạng lưới ô
30501: window.renderStudentBag = async function () {
30502:     const container = document.getElementById('studentBagBody');
30503:     container.innerHTML = '<div style="text-align:center; padding: 40px 10px; color: #888; font-style: italic;">⏳ Đang mở kho hành trang...</div>';
30504: 
30505:     try {
30506:         // [ĐÃ SỬA LỖI] Gọi thẳng hàm window.calculateTotalTickets() để tính chính xác Vé thưởng + Vé làm bài - Vé đã quay
30507:         const [
30508:             ticketData,
30509:             discountSnap,
30510:             invSnap,
30511:             birthdayCoinSnap,
30512:             specialBirthdayCoinSnap,
30513:             midAutumnWalletSnap
30514:         ] = await Promise.all([
30515:             window.calculateTotalTickets(),
30516: 
30517:             db.ref(
30518:                 'student_discounts/' +
```

## lines 30551-30595
```js
30551:         while (totalTickets > 0) {
30552:             let count = Math.min(50, totalTickets);
30553:             slotsData.push({
30554:                 type: 'ticket',
30555:                 name: 'Vé quay may mắn',
30556:                 icon: '🎫',
30557:                 isImg: false,
30558:                 quantity: count,
30559:                 isExpired: false,
30560:                 description: 'Vật phẩm tiêu hao dùng để tham gia lượt quay Gacha nhân phẩm tại Vòng Quay May Mắn.'
30561:             });
30562:             totalTickets -= count;
30563:         }
30564: 
30565:         // --- 2. XỬ LÝ XU TRUNG THU ---
30566:         // Xu Trung Thu là tiền tệ sự kiện nên không ghi vào student_inventory.
30567:         // Túi đồ đọc trực tiếp số dư thật từ mid_autumn_wallets.
30568:         const midAutumnWallet =
30569:             midAutumnWalletSnap.val() || {};
30570: 
30571:         const midAutumnBalance =
30572:             Math.max(
30573:                 0,
30574:                 Number(
30575:                     midAutumnWallet.balance || 0
30576:                 )
30577:             );
30578: 
30579:         window.studentMidAutumnWallet =
30580:             midAutumnWallet;
30581: 
30582:         window.studentMidAutumnCoinBalance =
30583:             midAutumnBalance;
30584: 
30585:         if (midAutumnBalance > 0) {
30586:             slotsData.push({
30587:                 type:
30588:                     'mid_autumn_coin',
30589: 
30590:                 name:
30591:                     'Xu Trung Thu',
30592: 
30593:                 icon:
30594:                     '🌕',
30595: 
```

## lines 34167-34211
```js
34167:         createStudentStoreOperationId(
34168:             'hoihoa_chest'
34169:         );
34170: 
34171:     const openedAt = Date.now();
34172:     const nextAllowedAt =
34173:         openedAt +
34174:         HOIHOA_CHEST_COOLDOWN_MS;
34175: 
34176:     let cooldownReserved = false;
34177:     let rewardApplied = false;
34178:     let chestClaimed = false;
34179: 
34180:     const addCoins = async amount => {
34181:         const tx = await db
34182:             .ref(`student_coins/${username}`)
34183:             .transaction(current => {
34184:                 return (
34185:                     Number(current || 0) +
34186:                     Number(amount || 0)
34187:                 );
34188:             });
34189: 
34190:         if (!tx.committed) {
34191:             throw new Error(
34192:                 'HOIHOA_COIN_REWARD_NOT_COMMITTED'
34193:             );
34194:         }
34195:     };
34196: 
34197:     const normalizeTag = value => {
34198:         return String(value || '')
34199:             .normalize('NFD')
34200:             .replace(/[\u0300-\u036f]/g, '')
34201:             .replace(/đ/g, 'd')
34202:             .replace(/Đ/g, 'D')
34203:             .toLowerCase()
34204:             .replace(/[^a-z0-9]+/g, '');
34205:     };
34206: 
34207:     const secureRandomUnit = () => {
34208:         try {
34209:             if (
34210:                 window.crypto &&
34211:                 typeof window.crypto.getRandomValues ===
```

## lines 34499-34543
```js
34499:                     );
34500: 
34501:                 if (alreadyOwned) {
34502:                     await addCoins(200);
34503: 
34504:                     rewardType =
34505:                         'duplicate_compensation';
34506: 
34507:                     rewardText =
34508:                         `🪙 200 Coin ` +
34509:                         `(vật phẩm “${randomItem.name}” đã có)`;
34510:                 } else {
34511:                     const rewardItemTx =
34512:                         await db
34513:                             .ref(
34514:                                 `student_inventory/` +
34515:                                 `${username}/` +
34516:                                 `${randomItem.id}`
34517:                             )
34518:                             .transaction(
34519:                                 existing => {
34520:                                     if (
34521:                                         existing &&
34522:                                         existing.id
34523:                                     ) {
34524:                                         return;
34525:                                     }
34526: 
34527:                                     return {
34528:                                         id:
34529:                                             randomItem.id,
34530:                                         purchaseTime:
34531:                                             Date.now(),
34532:                                         isEquipped:
34533:                                             false,
34534:                                         isTrial:
34535:                                             null,
34536:                                         trialExpiry:
34537:                                             null,
34538:                                         source:
34539:                                             'hoihoa_chest',
34540:                                         chestOperationId:
34541:                                             operationId
34542:                                     };
34543:                                 },
```

## lines 34574-34618
```js
34574:          * 8%: Thẻ giảm giá.
34575:          */
34576:         else if (randomValue < 0.09) {
34577:             const percent =
34578:                 Math.floor(
34579:                     secureRandomUnit() *
34580:                     26
34581:                 ) + 10;
34582: 
34583:             const discountKey =
34584:                 `hh_chest_discount_` +
34585:                 `${operationId}`;
34586: 
34587:             await db
34588:                 .ref(
34589:                     `student_discounts/` +
34590:                     `${username}/` +
34591:                     `${discountKey}`
34592:                 )
34593:                 .set({
34594:                     percent,
34595:                     isUsed: false,
34596:                     targetItem:
34597:                         ['all'],
34598:                     usageLimit: 1,
34599:                     createdAt:
34600:                         Date.now(),
34601:                     expiry:
34602:                         Date.now() +
34603:                         30 *
34604:                         24 *
34605:                         60 *
34606:                         60 *
34607:                         1000,
34608:                     source:
34609:                         'hoihoa_chest',
34610:                     rewardType:
34611:                         'hoihoa_treasure_chest',
34612:                     chestOperationId:
34613:                         operationId,
34614:                     maxEligiblePriceExclusive:
34615:                         700,
34616:                     excludesEventItems:
34617:                         true,
34618:                     excludedTags: [
```

# js/daily-login.js

## lines 968-1118
```js
00968:             if (!claimResult.committed) {
00969:                 throw new Error('REWARD_ALREADY_CLAIMED');
00970:             }
00971: 
00972:             claimCommitted = true;
00973: 
00974:             /* =====================================================
00975:                5. TRAO QUÀ TRỰC TIẾP
00976:                ===================================================== */
00977: 
00978:             btn.innerHTML = '🎁 Đang trao phần thưởng...';
00979: 
00980:             switch (reward.type) {
00981:                 case 'coin': {
00982:                     const coinRef = db.ref(
00983:                         `student_coins/${username}`
00984:                     );
00985: 
00986:                     const result =
00987:                         await coinRef.transaction(currentValue => {
00988:                             return (
00989:                                 (Number(currentValue) || 0) +
00990:                                 preparedRewardValue
00991:                             );
00992:                         });
00993: 
00994:                     if (!result.committed) {
00995:                         throw new Error(
00996:                             'COIN_TRANSACTION_FAILED'
00997:                         );
00998:                     }
00999: 
01000:                     break;
01001:                 }
01002: 
01003:                 case 'ticket': {
01004:                     const ticketRef = db.ref(
01005:                         `student_bonus_tickets/${username}`
01006:                     );
01007: 
01008:                     const result =
01009:                         await ticketRef.transaction(
01010:                             currentValue => {
01011:                                 const newValue =
01012:                                     (Number(currentValue) || 0) +
01013:                                     preparedRewardValue;
01014: 
01015:                                 /*
01016:                                  * Rules của bạn giới hạn tối đa 999 vé.
01017:                                  */
01018:                                 if (newValue > 999) {
01019:                                     return;
01020:                                 }
01021: 
01022:                                 return newValue;
01023:                             }
01024:                         );
01025: 
01026:                     if (!result.committed) {
01027:                         throw new Error(
01028:                             'TICKET_LIMIT_OR_TRANSACTION_FAILED'
01029:                         );
01030:                     }
01031: 
01032:                     break;
01033:                 }
01034: 
01035:                 case 'money': {
01036:                     const moneyRef = db.ref(
01037:                         `student_money_offset/${username}`
01038:                     );
01039: 
01040:                     const result =
01041:                         await moneyRef.transaction(
01042:                             currentValue => {
01043:                                 const newValue =
01044:                                     (Number(currentValue) || 0) +
01045:                                     preparedRewardValue;
01046: 
01047:                                 if (newValue > 9999999) {
01048:                                     return;
01049:                                 }
01050: 
01051:                                 return newValue;
01052:                             }
01053:                         );
01054: 
01055:                     if (!result.committed) {
01056:                         throw new Error(
01057:                             'MONEY_LIMIT_OR_TRANSACTION_FAILED'
01058:                         );
01059:                     }
01060: 
01061:                     break;
01062:                 }
01063: 
01064:                 case 'item': {
01065:                     await db
01066:                         .ref(
01067:                             `student_inventory/${username}/${preparedRewardValue}`
01068:                         )
01069:                         .update({
01070:                             id: preparedRewardValue,
01071:                             purchaseTime:
01072:                                 firebase.database.ServerValue
01073:                                     .TIMESTAMP,
01074:                             source: 'daily_login',
01075:                             isTrial: null,
01076:                             trialExpiry: null,
01077:                             isEquipped: false
01078:                         });
01079: 
01080:                     break;
01081:                 }
01082: 
01083:                 case 'discount': {
01084:                     const expiryTimestamp =
01085:                         serverTimestamp +
01086:                         7 * 24 * 60 * 60 * 1000;
01087: 
01088:                     await db
01089:                         .ref(`student_discounts/${username}`)
01090:                         .push({
01091:                             percent: preparedRewardValue,
01092:                             dateAcquired:
01093:                                 firebase.database.ServerValue
01094:                                     .TIMESTAMP,
01095:                             isUsed: false,
01096:                             expiry: expiryTimestamp,
01097:                             targetItem: discountTargets,
01098:                             source: 'daily_login',
01099:                             weekId: serverWeekId,
01100:                             dayId: serverDayId
01101:                         });
01102: 
01103:                     break;
01104:                 }
01105: 
01106:                 default:
01107:                     throw new Error('UNSUPPORTED_REWARD_TYPE');
01108:             }
01109: 
01110:             rewardGranted = true;
01111: 
01112:             /* =====================================================
01113:                6. CẬP NHẬT TRẠNG THÁI HOÀN THÀNH
01114:                ===================================================== */
01115: 
01116:             try {
01117:                 await loginRef.update({
01118:                     [`rewardMeta/day_${serverDayId}/status`]:
```

# js/royal-ball.js

## lines 797-841
```js
00797:                 alert(
00798:                     '❌ Lỗi kiểm tra dữ liệu máy chủ, vui lòng thử lại sau!'
00799:                 );
00800:             }
00801: 
00802:             return;
00803:         }
00804:         // --- KẾT THÚC: LOGIC KIỂM TRA ---
00805: 
00806:         // =====================================================
00807:         // PHÍ KHIÊU VŨ: 5 COIN / 1 LẦN
00808:         // =====================================================
00809:         const DANCE_ENTRY_FEE = 5;
00810: 
00811:         const danceCoinRef = db.ref(
00812:             `student_coins/${currentUser.username}`
00813:         );
00814: 
00815:         let currentDanceCoins = 0;
00816: 
00817:         try {
00818:             const feeTransaction =
00819:                 await danceCoinRef.transaction(currentValue => {
00820:                     currentDanceCoins =
00821:                         Number(currentValue) || 0;
00822: 
00823:                     // Không đủ Coin thì hủy transaction.
00824:                     if (
00825:                         currentDanceCoins <
00826:                         DANCE_ENTRY_FEE
00827:                     ) {
00828:                         return;
00829:                     }
00830: 
00831:                     return (
00832:                         currentDanceCoins -
00833:                         DANCE_ENTRY_FEE
00834:                     );
00835:                 });
00836: 
00837:             if (!feeTransaction.committed) {
00838:                 /*
00839:                  * Đã giữ lượt trong ngày nhưng không đủ Coin,
00840:                  * vì vậy phải xóa lượt để học sinh có thể
00841:                  * quay lại sau khi kiếm đủ Coin.
```

## lines 1195-1239
```js
01195:                     rewardValueText =
01196:                         '+500 Coin';
01197: 
01198:                     rewardDetail =
01199:                         `"${randomItem.name}" đã có trong kho. ` +
01200:                         `Hoàng gia đã đổi món quà thành Coin.`;
01201: 
01202:                     actualRewardRecord =
01203:                         `Trùng Truyền thuyết: ` +
01204:                         `${randomItem.name} (+500 Coin)`;
01205:                 } else {
01206:                     /*
01207:                      * Trao vật phẩm trước khi hiển thị thành công.
01208:                      */
01209:                     await db.ref(
01210:                         `student_inventory/` +
01211:                         `${currentUser.username}/` +
01212:                         `${randomItem.id}`
01213:                     ).update({
01214:                         id: randomItem.id,
01215:                         purchaseTime:
01216:                             firebase.database
01217:                                 .ServerValue.TIMESTAMP,
01218:                         isEquipped: false,
01219:                         source: 'royal_ball'
01220:                     });
01221: 
01222:                     rewardTheme = 'item';
01223:                     rewardIcon = '💎';
01224:                     rewardLabel =
01225:                         'Vật phẩm Truyền thuyết';
01226: 
01227:                     rewardTitle =
01228:                         randomItem.name;
01229: 
01230:                     rewardValueText =
01231:                         'TRUYỀN THUYẾT';
01232: 
01233:                     rewardDetail =
01234:                         'Vật phẩm đã được đưa vào kho đồ của bạn.';
01235: 
01236:                     actualRewardRecord =
01237:                         `Truyền thuyết: ${randomItem.name}`;
01238:                 }
01239:             } else {
```

## lines 1278-1322
```js
01278:                 `+${wonCoins.toLocaleString('vi-VN')} Coin`;
01279: 
01280:             rewardDetail =
01281:                 'Phần thưởng đã được cộng vào số dư của bạn.';
01282: 
01283:             actualRewardRecord =
01284:                 `${wonCoins} Coin (Dạ hội)`;
01285:         }
01286: 
01287:         /*
01288:          * Cộng Coin trước khi hiển thị thông báo thành công.
01289:          */
01290:         if (wonCoins > 0) {
01291:             const coinReference =
01292:                 db.ref(
01293:                     `student_coins/${currentUser.username}`
01294:                 );
01295: 
01296:             const coinTransaction =
01297:                 await coinReference.transaction(
01298:                     currentValue =>
01299:                         (Number(currentValue) || 0) +
01300:                         wonCoins
01301:                 );
01302: 
01303:             if (!coinTransaction.committed) {
01304:                 throw new Error(
01305:                     'Không thể cộng Coin Dạ hội'
01306:                 );
01307:             }
01308:         }
01309: 
01310:         /*
01311:          * Ghi lịch sử.
01312:          */
01313:         const recordNow = new Date();
01314: 
01315:         await pushDB('spin_history', {
01316:             studentName: currentUser.name,
01317:             username: currentUser.username,
01318:             reward: actualRewardRecord,
01319:             time:
01320:                 recordNow.toLocaleTimeString('vi-VN') +
01321:                 ' ' +
01322:                 recordNow.toLocaleDateString('vi-VN'),
```

# js/leaderboard.js

## lines 2626-2670
```js
02626:                     rank === 3
02627:                         ? 100
02628:                         : 50;
02629: 
02630:                 const amount =
02631:                     Number.isFinite(
02632:                         configuredAmount
02633:                     ) &&
02634:                     configuredAmount >= 0
02635:                         ? configuredAmount
02636:                         : fallbackAmount;
02637: 
02638:                 const rootUpdates = {};
02639: 
02640:                 rootUpdates[
02641:                     `student_coins/${username}`
02642:                 ] =
02643:                     firebase.database
02644:                         .ServerValue
02645:                         .increment(amount);
02646: 
02647:                 rootUpdates[
02648:                     getLeaderboardClaimPath(
02649:                         seasonKey,
02650:                         username
02651:                     )
02652:                 ] = {
02653:                     seasonKey,
02654:                     seasonLabel:
02655:                         display,
02656:                     username,
02657:                     rank,
02658:                     rewardType:
02659:                         'coin',
02660:                     rewardLabel:
02661:                         `${amount} Coin`,
02662:                     rewardAmount:
02663:                         amount,
02664:                     status:
02665:                         'claimed',
02666:                     claimedAt:
02667:                         firebase.database
02668:                             .ServerValue
02669:                             .TIMESTAMP
02670:                 };
```

## lines 4276-4320
```js
04276:                 amount =
04277:                     Math.floor(
04278:                         Math.random() * 201
04279:                     ) + 500;
04280:             } else {
04281:                 amount =
04282:                     Math.floor(
04283:                         Math.random() * 301
04284:                     ) + 700;
04285:             }
04286: 
04287:             rewardLabel =
04288:                 `${amount} Coin`;
04289: 
04290:             rootUpdates[
04291:                 `student_coins/${username}`
04292:             ] =
04293:                 firebase.database
04294:                     .ServerValue
04295:                     .increment(amount);
04296: 
04297:             historyPayload = {
04298:                 type:
04299:                     'leaderboard_reward',
04300:                 summary:
04301:                     `Mở Rương Hạng 1 ${display} ` +
04302:                     `và nhận ${amount} Coin`,
04303:                 source:
04304:                     'leaderboard_chest',
04305:                 targetUsername:
04306:                     username,
04307:                 targetName:
04308:                     currentUser?.name ||
04309:                     username,
04310:                 amount,
04311:                 unit:
04312:                     'Coin',
04313:                 reversible:
04314:                     false,
04315:                 nonReversibleReason:
04316:                     'Phần thưởng ngẫu nhiên từ Rương Hạng 1.',
04317:                 details: {
04318:                     seasonKey,
04319:                     rank:
04320:                         1,
```

## lines 4577-4671
```js
04577:                     ownedDuplicateCandidates[
04578:                         Math.floor(
04579:                             Math.random() *
04580:                             ownedDuplicateCandidates
04581:                                 .length
04582:                         )
04583:                     ];
04584: 
04585:                 const amount = 200;
04586: 
04587:                 rewardLabel =
04588:                     `${amount} Coin bù ` +
04589:                     `do trùng ${duplicateItem.name}`;
04590: 
04591:                 rootUpdates[
04592:                     `student_coins/${username}`
04593:                 ] =
04594:                     firebase.database
04595:                         .ServerValue
04596:                         .increment(amount);
04597: 
04598:                 historyPayload = {
04599:                     type:
04600:                         'leaderboard_reward',
04601:                     summary:
04602:                         `Rương Hạng 1 ${display}: ` +
04603:                         `trùng ${duplicateItem.name}, ` +
04604:                         `nhận bù ${amount} Coin`,
04605:                     source:
04606:                         'leaderboard_chest_duplicate',
04607:                     targetUsername:
04608:                         username,
04609:                     targetName:
04610:                         currentUser?.name ||
04611:                         username,
04612:                     amount,
04613:                     unit:
04614:                         'Coin',
04615:                     reversible:
04616:                         false,
04617:                     nonReversibleReason:
04618:                         'Coin bồi thường do vật phẩm trong rương bị trùng.',
04619:                     details: {
04620:                         seasonKey,
04621:                         rank:
04622:                             1,
04623:                         rewardType:
04624:                             'duplicate_compensation',
04625:                         itemId:
04626:                             duplicateItem.id,
04627:                         itemName:
04628:                             duplicateItem.name,
04629:                         amount
04630:                     }
04631:                 };
04632:             } else if (
04633:                 unownedItems.length === 0
04634:             ) {
04635:                 const amount = 500;
04636: 
04637:                 rewardLabel =
04638:                     `${amount} Coin bù ` +
04639:                     `do đã sở hữu toàn bộ vật phẩm`;
04640: 
04641:                 rootUpdates[
04642:                     `student_coins/${username}`
04643:                 ] =
04644:                     firebase.database
04645:                         .ServerValue
04646:                         .increment(amount);
04647: 
04648:                 historyPayload = {
04649:                     type:
04650:                         'leaderboard_reward',
04651:                     summary:
04652:                         `Rương Hạng 1 ${display}: ` +
04653:                         `nhận bù ${amount} Coin ` +
04654:                         `do đã sở hữu toàn bộ vật phẩm`,
04655:                     source:
04656:                         'leaderboard_chest_all_owned',
04657:                     targetUsername:
04658:                         username,
04659:                     targetName:
04660:                         currentUser?.name ||
04661:                         username,
04662:                     amount,
04663:                     unit:
04664:                         'Coin',
04665:                     reversible:
04666:                         false,
04667:                     nonReversibleReason:
04668:                         'Coin bồi thường từ Rương Hạng 1.',
04669:                     details: {
04670:                         seasonKey,
04671:                         rank:
```

# js/store-collections.js

## lines 416-460
```js
00416:             !reserved ||
00417:             reserved.status !== 'reserved' ||
00418:             reserved.claimToken !== claimToken
00419:         ) {
00420:             return { credited: false, coins: 0 };
00421:         }
00422: 
00423:         /*
00424:          * Bước 2: cộng Coin và đổi trạng thái sang sent trong CÙNG một update.
00425:          * ServerValue.increment tránh ghi đè khi số dư thay đổi ở tab khác.
00426:          * Hai thay đổi thành công cùng nhau hoặc thất bại cùng nhau.
00427:          */
00428:         const sentAt = getServerTimestamp();
00429:         const updates = {};
00430: 
00431:         updates[`student_coins/${username}`] = getServerIncrement(
00432:             rewardCoins
00433:         );
00434: 
00435:         updates[claimPath] = {
00436:             status: 'sent',
00437:             collectionId: collection.id,
00438:             collectionLabel: collection.label,
00439:             milestone: milestone.count,
00440:             milestoneKey,
00441:             rewardCoins: rewardCoins,
00442:             reservedAt: Number(reserved.reservedAt) || now,
00443:             sentAt,
00444:             messageKey,
00445:             rewardVersion: 1,
00446:             claimToken
00447:         };
00448: 
00449:         await database.ref().update(updates);
00450: 
00451:         setLocalRewardClaim(
00452:             collection.id,
00453:             milestone.count,
00454:             updates[claimPath]
00455:         );
00456: 
00457:         return {
00458:             credited: true,
00459:             coins: rewardCoins,
00460:             collectionLabel: collection.label,
```

# js/painting.js

## lines 1289-1333
```js
01289: 
01290:             if (nextMode === 'practice') {
01291:                 if (
01292:                     !this.user ||
01293:                     !this.user.username
01294:                 ) {
01295:                     this.toast(
01296:                         'Không xác định được tài khoản học sinh.',
01297:                         'error'
01298:                     );
01299: 
01300:                     return;
01301:                 }
01302: 
01303:                 practiceCoinRef = db.ref(
01304:                     `student_coins/${this.user.username}`
01305:                 );
01306: 
01307:                 let currentCoins = 0;
01308: 
01309:                 try {
01310:                     const feeTransaction =
01311:                         await practiceCoinRef.transaction(
01312:                             currentValue => {
01313:                                 currentCoins =
01314:                                     Number(currentValue) || 0;
01315: 
01316:                                 if (
01317:                                     currentCoins <
01318:                                     PRACTICE_ENTRY_FEE
01319:                                 ) {
01320:                                     return;
01321:                                 }
01322: 
01323:                                 return (
01324:                                     currentCoins -
01325:                                     PRACTICE_ENTRY_FEE
01326:                                 );
01327:                             }
01328:                         );
01329: 
01330:                     if (!feeTransaction.committed) {
01331:                         this.toast(
01332:                             `Bạn cần ${PRACTICE_ENTRY_FEE} Coin ` +
01333:                             `để vào Luyện tập. ` +
```

## lines 8264-8308
```js
08264:                                     : {
08265:                                         coins: 0,
08266:                                         label: `Hạng ${rank}`
08267:                                     };
08268: 
08269:                 const userLogRef = db.ref(`hoihoa_reward_logs/${seasonId}/students/${student.studentUsername}`);
08270:                 let shouldReward = false;
08271:                 const claim = await userLogRef.transaction(current => {
08272:                     if (current?.status === 'done' || current?.status === 'processing') return;
08273:                     shouldReward = true;
08274:                     return { status: 'processing', rank, startedAt: Date.now() };
08275:                 });
08276:                 if (!claim.committed || !shouldReward) continue;
08277: 
08278:                 if (reward.coins > 0) {
08279:                     await db.ref(`student_coins/${student.studentUsername}`).transaction(current => Number(current || 0) + reward.coins);
08280:                 }
08281:                 const updates = {};
08282:                 if (reward.badge) {
08283:                     const [
08284:                         badgeId,
08285:                         badgeIcon,
08286:                         badgeName,
08287:                         badgeStyle,
08288:                         badgeDescription
08289:                     ] = reward.badge;
08290: 
08291:                     updates[
08292:                         `student_inventory/${student.studentUsername}/${badgeId}`
08293:                     ] = {
08294:                         id: badgeId,
08295:                         type: 'badge',
08296:                         name: badgeName,
08297:                         icon: badgeIcon,
08298: 
08299:                         badgeStyle,
08300: 
08301:                         rarity:
08302:                             rank === 1
08303:                                 ? 'legendary'
08304:                                 : rank === 2
08305:                                     ? 'epic'
08306:                                     : 'rare',
08307: 
08308:                         visualVersion: 2,
```

# js/mid-autumn-festival.js

## lines 956-1026
```js
00956:                     'success'
00957:                 );
00958: 
00959:                 renderDashboard(status);
00960:                 return;
00961:             }
00962:             if (!status.active) throw new Error('EVENT_CLOSED');
00963:             if (!state.annual) await ensureAnnualState(status);
00964: 
00965:             if (Number(state.annual.ticketsPurchased || 0) >= CONFIG.maxExtraTickets) {
00966:                 throw new Error('PURCHASE_LIMIT');
00967:             }
00968: 
00969:             if (!confirm(`Dùng ${CONFIG.extraTicketPrice} Coin để mua 1 Vé Đại Hội Trung Thu?\nMỗi năm chỉ mua tối đa ${CONFIG.maxExtraTickets} vé.`)) return;
00970: 
00971:             const coinRef = getDatabase().ref(`student_coins/${username()}`);
00972:             const coinTx = await coinRef.transaction(current => {
00973:                 const balance = Number(current || 0);
00974:                 if (balance < CONFIG.extraTicketPrice) return;
00975:                 return balance - CONFIG.extraTicketPrice;
00976:             });
00977:             if (!coinTx.committed) throw new Error('INSUFFICIENT_COINS');
00978:             coinDebited = true;
00979: 
00980:             const eventTx = await stateRef(status.year).transaction(current => {
00981:                 if (!current || Number(current.ticketsPurchased || 0) >= CONFIG.maxExtraTickets) return;
00982:                 return {
00983:                     ...current,
00984:                     ticketsPurchased: Number(current.ticketsPurchased || 0) + 1,
00985:                     updatedAt: now()
00986:                 };
00987:             }, undefined, false);
00988: 
00989:             if (!eventTx.committed) throw new Error('PURCHASE_LIMIT');
00990:             state.annual = eventTx.snapshot.val();
00991:             coinDebited = false;
00992:             showToast(`🎟️ Mua vé thành công! Đã trừ ${CONFIG.extraTicketPrice} Coin.`, 'success');
00993:             renderDashboard(status);
00994:         } catch (error) {
00995:             if (coinDebited) {
00996:                 try {
00997:                     await getDatabase().ref(`student_coins/${username()}`).transaction(current => Number(current || 0) + CONFIG.extraTicketPrice);
00998:                 } catch (rollbackError) {
00999:                     console.error('[Đại Hội Trung Thu] Không hoàn Coin được:', rollbackError);
01000:                 }
01001:             }
01002:             const messages = {
01003:                 EVENT_CLOSED: 'Sự kiện hiện chưa mở.',
01004:                 PURCHASE_LIMIT: 'Bạn đã mua tối đa 4 vé trong sự kiện năm nay.',
01005:                 INSUFFICIENT_COINS: `Bạn không đủ ${CONFIG.extraTicketPrice} Coin để mua vé.`
01006:             };
01007:             showToast(messages[error.message] || `Không mua được vé: ${error.message}`, 'error');
01008:         } finally {
01009:             state.busy = false;
01010:             const status = await getEventStatus().catch(() => null);
01011:             if (status) renderDashboard(status);
01012:         }
01013:     }
01014: 
01015:     async function chooseBackgroundReward(year) {
01016:         const inventory = await getDatabase().ref(`student_inventory/${username()}`).once('value');
01017:         for (const itemId of CONFIG.backgroundRewards) {
01018:             if (!inventory.child(itemId).exists()) return itemId;
01019:         }
01020:         return CONFIG.backgroundRewards[(Number(year) + username().length) % CONFIG.backgroundRewards.length];
01021:     }
01022: 
01023:     function rewardPayload(year, milestone, itemId = '') {
01024:         const m = CONFIG.milestones.find(row => row.score === milestone);
01025:         if (!m) throw new Error('INVALID_MILESTONE');
01026:         const payload = {
```

## lines 1126-1170
```js
01126:         if (!tx.committed) throw new Error('WALLET_REWARD_FAILED');
01127:         window.studentMidAutumnCoinBalance = Math.max(0, Number(tx.snapshot.val()?.balance || 0));
01128:     }
01129: 
01130:     async function applyClaim(year, milestone) {
01131:         const claim = state.claims[String(milestone)] || await reserveClaim(year, milestone);
01132:         if (!claim) throw new Error('CLAIM_NOT_FOUND');
01133:         if (claim.status === 'completed') return;
01134: 
01135:         if (claim.rewardType === 'coin') {
01136:             const amount = Number(claim.amount || 0);
01137:             if (amount <= 0) throw new Error('INVALID_COIN_REWARD');
01138:             // One atomic update: the terminal claim rule rejects concurrent/replayed grants.
01139:             const completed = { ...claim, status: 'completed', completedAt: now() };
01140:             const updates = {
01141:                 [`student_coins/${username()}`]: firebase.database.ServerValue.increment(amount),
01142:                 [`student_event_rewards/${username()}/mid_autumn/${year}/${milestone}`]: completed
01143:             };
01144:             try {
01145:                 await getDatabase().ref().update(updates);
01146:                 state.claims[String(milestone)] = completed;
01147:             } catch (error) {
01148:                 const latest = await claimRef(year, milestone).once('value');
01149:                 if (latest.child('status').val() !== 'completed') throw error;
01150:                 state.claims[String(milestone)] = latest.val();
01151:             }
01152:             showToast(`🎉 Đã nhận ${amount} Coin từ Đại Hội Trung Thu!`, 'success');
01153:             return;
01154:         }
01155: 
01156:         if (claim.rewardType === 'mid_autumn_coin') {
01157:             await grantWalletEventCoin(year, milestone);
01158:             await completeClaim(year, milestone);
01159:             showToast('🌕 Đã nhận 1 Xu Trung Thu!', 'success');
01160:             return;
01161:         }
01162: 
01163:         if (claim.rewardType === 'background') {
01164:             const itemId = String(claim.itemId || '');
01165:             if (!CONFIG.backgroundRewards.includes(itemId)) throw new Error('INVALID_BACKGROUND_REWARD');
01166: 
01167:             let inventorySnap = await getDatabase().ref(`student_inventory/${username()}/${itemId}`).once('value');
01168:             if (!inventorySnap.exists()) {
01169:                 await grantWalletEventCoin(year, milestone);
01170:                 if (!window.MidAutumnCoinManager?.redeem) throw new Error('MID_AUTUMN_MANAGER_NOT_READY');
```

# js/pet-interactions.js

## lines 1054-1098
```js
01054:                     </div>
01055:                 </div>
01056:             `;
01057:             document.body.appendChild(modal);
01058:         }
01059:         this.updateHungerUI();
01060:         modal.classList.add('active');
01061:     }
01062: 
01063:     static async buyFood(price, hungerGain) {
01064:         const user = JSON.parse(localStorage.getItem('currentUser'));
01065:         if (!user) return;
01066: 
01067:         if (this.hunger >= 100) return alert("Thú cưng đang no căng bụng rồi! Không ăn thêm được đâu.");
01068: 
01069:         const coinRef = db.ref(`student_coins/${user.username}`);
01070:         const snap = await coinRef.once('value');
01071:         let currentCoins = snap.val() || 0;
01072: 
01073:         if (currentCoins < price) return alert(`❌ Không đủ Coin! Bạn còn thiếu ${price - currentCoins} 🪙.`);
01074: 
01075:         if (confirm(`Thanh toán ${price} Coin để mua món này?`)) {
01076:             await coinRef.set(currentCoins - price);
01077:             this.hunger = Math.min(100, this.hunger + hungerGain);
01078:             this.saveHungerToDB();
01079:             this.updateHungerUI();
01080:             this.resetIdle();
01081:             alert(`Ăn ngon quá! Đã hồi phục năng lượng.`);
01082: 
01083:             if (this.hunger > 50) {
01084:                 const container = document.getElementById('virtual-pet-container');
01085:                 if (container) this.spawnParticles(container, '💖');
01086:             }
01087:         }
01088:     }
01089: 
01090:     static openStellarFoodShop() {
01091:         let modal =
01092:             document.getElementById(
01093:                 'stellarFoodShopModal'
01094:             );
01095: 
01096:         if (!modal) {
01097:             modal =
01098:                 document.createElement('div');
```

## lines 1193-1237
```js
01193:                 'Kỳ Lân đang tràn đầy Tinh lực.'
01194:             );
01195: 
01196:             return;
01197:         }
01198: 
01199:         const accepted =
01200:             confirm(
01201:                 `Dùng ${price} Coin để mua ${itemName}?`
01202:             );
01203: 
01204:         if (!accepted) return;
01205: 
01206:         const coinRef =
01207:             db.ref(
01208:                 `student_coins/${user.username}`
01209:             );
01210: 
01211:         try {
01212:             const result =
01213:                 await coinRef.transaction(
01214:                     currentValue => {
01215:                         const balance =
01216:                             Number(
01217:                                 currentValue
01218:                             ) || 0;
01219: 
01220:                         if (
01221:                             balance <
01222:                             Number(price)
01223:                         ) {
01224:                             return;
01225:                         }
01226: 
01227:                         return (
01228:                             balance -
01229:                             Number(price)
01230:                         );
01231:                     }
01232:                 );
01233: 
01234:             if (!result.committed) {
01235:                 alert(
01236:                     '❌ Bạn không đủ Coin.'
01237:                 );
```

## lines 3762-3806
```js
03762:                 0,
03763:                 Math.round(
03764:                     Number(price) || 0
03765:                 )
03766:             );
03767: 
03768:         const accepted =
03769:             confirm(
03770:                 `Dùng ${safePrice} Coin để mua ${itemName}?`
03771:             );
03772: 
03773:         if (!accepted) return;
03774: 
03775:         const coinRef =
03776:             db.ref(
03777:                 `student_coins/${user.username}`
03778:             );
03779: 
03780:         try {
03781:             const result =
03782:                 await coinRef.transaction(
03783:                     currentValue => {
03784:                         const balance =
03785:                             Number(
03786:                                 currentValue
03787:                             ) || 0;
03788: 
03789:                         if (
03790:                             balance <
03791:                             safePrice
03792:                         ) {
03793:                             return;
03794:                         }
03795: 
03796:                         return (
03797:                             balance -
03798:                             safePrice
03799:                         );
03800:                     }
03801:                 );
03802: 
03803:             if (!result.committed) {
03804:                 alert(
03805:                     '❌ Bạn không đủ Coin.'
03806:                 );
```

# js/transaction-history.js

## lines 2258-2302
```js
02258:             return;
02259:         }
02260: 
02261:         if (
02262:             !confirm(
02263:                 `${delta > 0
02264:                     ? 'Cộng'
02265:                     : 'Trừ'
02266:                 } ${Math.abs(delta)} Coin cho ${targetName}?`
02267:             )
02268:         ) {
02269:             return;
02270:         }
02271: 
02272:         const coinPath =
02273:             `student_coins/${username}`;
02274: 
02275:         const logId =
02276:             newId();
02277: 
02278:         let before = 0;
02279:         let after = 0;
02280: 
02281:         try {
02282:             const tx =
02283:                 await db
02284:                     .ref(coinPath)
02285:                     .transaction(current => {
02286:                         before =
02287:                             Number(current) ||
02288:                             0;
02289: 
02290:                         after =
02291:                             before +
02292:                             delta;
02293: 
02294:                         if (after < 0) {
02295:                             return;
02296:                         }
02297: 
02298:                         return after;
02299:                     });
02300: 
02301:             if (!tx.committed) {
02302:                 throw new Error(
```

# js/lich-su-hao-hung.js

## lines 1863-1907
```js
01863:                 return grantReservedReward(item.id, tier);
01864:         }
01865: 
01866:         async function grantReservedReward(itemId, tier) {
01867:                 const user = getCurrentUserSafe();
01868:                 const database = getDbSafe();
01869:                 const ref = progressRef();
01870:                 if (!user?.username || !database || !ref) return false;
01871:                 const item = getStoreItems().find(i => String(i.id) === String(itemId));
01872:                 if (!item) {
01873:                         await ref.update({ rewardStatus: 'missing_item', rewardUpdatedAt: now() });
01874:                         await loadProgress();
01875:                         return false;
01876:                 }
01877: 
01878:                 const itemRef = database.ref(`student_inventory/${user.username}/${item.id}`);
01879:                 let alreadyOwned = false;
01880:                 const tx = await itemRef.transaction(current => {
01881:                         if (current && current.id) {
01882:                                 alreadyOwned = true;
01883:                                 return current;
01884:                         }
01885:                         return {
01886:                                 id: item.id,
01887:                                 purchaseTime: now(),
01888:                                 source: `lich_su_hao_hung_${state.currentYear}`,
01889:                                 eventId: CONFIG.id,
01890:                                 eventYear: state.currentYear,
01891:                                 isTrial: null,
01892:                                 trialExpiry: null,
01893:                                 isEquipped: false
01894:                         };
01895:                 });
01896: 
01897:                 if (!tx.committed && !tx.snapshot.exists()) throw new Error('Không thể thêm vật phẩm vào kho.');
01898: 
01899:                 await ref.update({
01900:                         rewardTier: tier,
01901:                         rewardStatus: 'granted',
01902:                         rewardItemId: item.id,
01903:                         rewardName: item.name || item.id,
01904:                         rewardGrantedAt: now(),
01905:                         rewardAlreadyOwned: Boolean(alreadyOwned),
01906:                         rewardUpdatedAt: now()
01907:                 });
```
