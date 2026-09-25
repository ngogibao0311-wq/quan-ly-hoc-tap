# js/student.js

## pattern `submissions` — 54 hits

### lines 5234-5251
```js
05234:         startupLoader.expect([
05235:             'core-runtime',
05236:             'service-worker',
05237:             'cloud-connection',
05238:             'student-auth',
05239:             'student-user',
05240:             'student-profile-requests',
05241:             'student-assignments',
05242:             'student-submissions',
05243:             'student-materials',
05244:             'student-schedule',
05245:             'student-roadmap-settings',
05246:             'student-game-settings',
05247:             'student-wheel-settings',
05248:             'student-coins',
05249:             'student-store-settings',
05250:             'student-store-items',
05251:             'student-inventory',
```

### lines 5262-5279
```js
05262:         ], {
05263:             'core-runtime': 'Thư viện và module web',
05264:             'service-worker': 'Service Worker / cache',
05265:             'cloud-connection': 'Kết nối Firebase',
05266:             'student-auth': 'Phiên đăng nhập học sinh',
05267:             'student-user': 'Hồ sơ học sinh',
05268:             'student-profile-requests': 'Yêu cầu cập nhật hồ sơ',
05269:             'student-assignments': 'Bài tập',
05270:             'student-submissions': 'Bài nộp',
05271:             'student-materials': 'Tài liệu',
05272:             'student-schedule': 'Lịch học',
05273:             'student-roadmap-settings': 'Cài đặt lộ trình',
05274:             'student-game-settings': 'Cài đặt trò chơi',
05275:             'student-wheel-settings': 'Tỉ lệ vòng quay',
05276:             'student-coins': 'Số dư Coin',
05277:             'student-store-settings': 'Cài đặt cửa hàng',
05278:             'student-store-items': 'Dữ liệu cửa hàng',
05279:             'student-inventory': 'Kho vật phẩm',
```

### lines 5528-5545
```js
05528:             startupLoader.markReady(
05529:                 'student-assignments'
05530:             );
05531:         }
05532:     });
05533: 
05534:     // 3. CHỈ LẮNG NGHE BÀI NỘP/BẢN NHÁP CỦA CHÍNH HỌC SINH NÀY
05535:     listenFirebase(
05536:         db.ref('submissions')
05537:             .orderByChild('studentUsername')
05538:             .equalTo(currentUser.username),
05539:         'value',
05540:         async (snapshot) => {
05541:             const val = snapshot.val();
05542: 
05543:             if (!isDeepEqual(val, cacheSubmissionsSt)) {
05544:                 cacheSubmissionsSt = val;
05545: 
```

### lines 5600-5617
```js
05600:                     )
05601:                 ) {
05602:                     renderStudentRoadmap();
05603:                 }
05604:             }
05605: 
05606:             if (startupLoader) {
05607:                 startupLoader.markReady(
05608:                     'student-submissions'
05609:                 );
05610:             }
05611:         }
05612:     );
05613: 
05614:     listenFirebase(
05615:         db.ref('materials'),
05616:         'value',
05617:         async (snapshot) => {
```

### lines 7852-7869
```js
07852: 
07853:     return hasGrade ? 200 : 100;
07854: }
07855: 
07856: const studentPreferredSubmissionIndexCache =
07857:     new WeakMap();
07858: 
07859: function getPreferredStudentSubmission(
07860:     submissions,
07861:     assignmentOrId,
07862:     username
07863: ) {
07864:     const rows = Array.isArray(submissions)
07865:         ? submissions
07866:         : [];
07867: 
07868:     const assignmentIds =
07869:         getStudentCompatAssignmentIds(
```

### lines 7856-7873
```js
07856: const studentPreferredSubmissionIndexCache =
07857:     new WeakMap();
07858: 
07859: function getPreferredStudentSubmission(
07860:     submissions,
07861:     assignmentOrId,
07862:     username
07863: ) {
07864:     const rows = Array.isArray(submissions)
07865:         ? submissions
07866:         : [];
07867: 
07868:     const assignmentIds =
07869:         getStudentCompatAssignmentIds(
07870:             assignmentOrId
07871:         ).map(
07872:             normalizeStudentSubmissionValue
07873:         );
```

### lines 7857-7874
```js
07857:     new WeakMap();
07858: 
07859: function getPreferredStudentSubmission(
07860:     submissions,
07861:     assignmentOrId,
07862:     username
07863: ) {
07864:     const rows = Array.isArray(submissions)
07865:         ? submissions
07866:         : [];
07867: 
07868:     const assignmentIds =
07869:         getStudentCompatAssignmentIds(
07870:             assignmentOrId
07871:         ).map(
07872:             normalizeStudentSubmissionValue
07873:         );
07874: 
```

### lines 7885-7902
```js
07885:     }
07886: 
07887:     let cache =
07888:         studentPreferredSubmissionIndexCache
07889:             .get(rows);
07890: 
07891:     /*
07892:      * Baseline nhẹ:
07893:      * Tạo index một lần cho mảng submissions hiện tại.
07894:      * Trước đây mỗi bài tập lại filter() toàn bộ submissions.
07895:      * Không đổi dữ liệu/logic chọn bản nộp ưu tiên.
07896:      */
07897:     if (
07898:         !cache ||
07899:         cache.length !== rows.length
07900:     ) {
07901:         const index = new Map();
07902: 
```

### lines 7886-7903
```js
07886: 
07887:     let cache =
07888:         studentPreferredSubmissionIndexCache
07889:             .get(rows);
07890: 
07891:     /*
07892:      * Baseline nhẹ:
07893:      * Tạo index một lần cho mảng submissions hiện tại.
07894:      * Trước đây mỗi bài tập lại filter() toàn bộ submissions.
07895:      * Không đổi dữ liệu/logic chọn bản nộp ưu tiên.
07896:      */
07897:     if (
07898:         !cache ||
07899:         cache.length !== rows.length
07900:     ) {
07901:         const index = new Map();
07902: 
07903:         rows.forEach(submission => {
```

### lines 8017-8034
```js
08017:     );
08018: 
08019:     return preferred;
08020: }
08021: 
08022: 
08023: // ==============================================================
08024: // TỐI ƯU DANH SÁCH HỌC SINH
08025: // - Firebase assignments/submissions đã được listener tải vào cache.
08026: // - Tìm kiếm chạy trực tiếp trên cache, không quét innerText DOM.
08027: // - Chỉ render một "cửa sổ" card nhỏ cho Bài tập cần làm / Kết quả học tập.
08028: // - "Tải thêm" tăng cửa sổ đúng trong tập kết quả đang tìm.
08029: // ==============================================================
08030: const STUDENT_LIST_PAGE_SIZE = 16;
08031: const STUDENT_LIST_SEARCH_DELAY = 160;
08032: 
08033: window.studentListViewState =
08034:     window.studentListViewState || {
```

### lines 8085-8102
```js
08085:             : text.replace(' ', 'T')
08086:     ).getTime();
08087: 
08088:     return Number.isFinite(parsed)
08089:         ? parsed
08090:         : null;
08091: }
08092: 
08093: function getStudentListBucket(assign, submissions, nowMs) {
08094:     const mySub =
08095:         getPreferredStudentSubmission(
08096:             submissions,
08097:             assign,
08098:             currentUser.username
08099:         );
08100: 
08101:     const endMs =
08102:         getStudentListDateMs(
```

### lines 8088-8105
```js
08088:     return Number.isFinite(parsed)
08089:         ? parsed
08090:         : null;
08091: }
08092: 
08093: function getStudentListBucket(assign, submissions, nowMs) {
08094:     const mySub =
08095:         getPreferredStudentSubmission(
08096:             submissions,
08097:             assign,
08098:             currentUser.username
08099:         );
08100: 
08101:     const endMs =
08102:         getStudentListDateMs(
08103:             assign?.endDate
08104:         );
08105: 
```

### lines 8164-8181
```js
08164: 
08165:     return normalizeStudentListSearchText(
08166:         base.filter(Boolean).join(' ')
08167:     );
08168: }
08169: 
08170: function buildStudentListSelection(
08171:     assignments,
08172:     submissions,
08173:     nowMs
08174: ) {
08175:     const state =
08176:         window.studentListViewState;
08177: 
08178:     const todoQuery =
08179:         normalizeStudentListSearchText(
08180:             state.todoQuery
08181:         );
```

### lines 8197-8214
```js
08197:             return;
08198:         }
08199: 
08200:         const {
08201:             bucket,
08202:             submission
08203:         } = getStudentListBucket(
08204:             assign,
08205:             submissions,
08206:             nowMs
08207:         );
08208: 
08209:         const haystack =
08210:             getStudentListSearchHaystack(
08211:                 assign,
08212:                 submission,
08213:                 bucket
08214:             );
```

### lines 8622-8639
```js
08622: 
08623:     // Sắp xếp trên bản sao, không thay đổi cache Firebase gốc.
08624:     const assignments = Array.isArray(assignmentSource)
08625:         ? [...assignmentSource]
08626:         : [];
08627: 
08628:     /*
08629:      * Cache [] cũng là trạng thái hợp lệ (học sinh chưa từng nộp bài).
08630:      * Không được vì length === 0 mà tải toàn bộ submissions của hệ thống.
08631:      */
08632:     const submissions =
08633:         Array.isArray(
08634:             window.cachedSubmissions
08635:         )
08636:             ? window.cachedSubmissions
08637:             : await getDB('submissions');
08638:     const list = document.getElementById('assignmentsList');
08639: 
```

### lines 8624-8641
```js
08624:     const assignments = Array.isArray(assignmentSource)
08625:         ? [...assignmentSource]
08626:         : [];
08627: 
08628:     /*
08629:      * Cache [] cũng là trạng thái hợp lệ (học sinh chưa từng nộp bài).
08630:      * Không được vì length === 0 mà tải toàn bộ submissions của hệ thống.
08631:      */
08632:     const submissions =
08633:         Array.isArray(
08634:             window.cachedSubmissions
08635:         )
08636:             ? window.cachedSubmissions
08637:             : await getDB('submissions');
08638:     const list = document.getElementById('assignmentsList');
08639: 
08640:     // Tiến độ video sẽ chỉ tải cho các card thực sự cần render.
08641:     let trackingData = {};
```

### lines 8629-8646
```js
08629:      * Cache [] cũng là trạng thái hợp lệ (học sinh chưa từng nộp bài).
08630:      * Không được vì length === 0 mà tải toàn bộ submissions của hệ thống.
08631:      */
08632:     const submissions =
08633:         Array.isArray(
08634:             window.cachedSubmissions
08635:         )
08636:             ? window.cachedSubmissions
08637:             : await getDB('submissions');
08638:     const list = document.getElementById('assignmentsList');
08639: 
08640:     // Tiến độ video sẽ chỉ tải cho các card thực sự cần render.
08641:     let trackingData = {};
08642:     const grades = document.getElementById('gradesList');
08643: 
08644:     // Dọn dẹp trình phát Video cũ (giữ nguyên các đoạn if typeof ytPlayers...)
08645:     if (typeof ytPlayers !== 'undefined') { /*...*/ }
08646:     if (typeof watchTimers !== 'undefined') { /*...*/ }
```

### lines 8791-8808
```js
08791:      * Tính nhóm ưu tiên cho từng bài.
08792:      */
08793:     assignments.forEach(assign => {
08794:         const isTargeted =
08795:             isAssignmentForCurrentStudent(assign);
08796: 
08797:         const mySub = isTargeted
08798:             ? getPreferredStudentSubmission(
08799:                 submissions,
08800:                 assign,
08801:                 currentUser.username
08802:             )
08803:             : null;
08804: 
08805:         const startMs =
08806:             parseAssignmentDateMs(assign.startDate);
08807: 
08808:         const endMs =
```

### lines 9224-9241
```js
09224:     }
09225: 
09226:     // --- KẾT THÚC LOGIC SẮP XẾP ---
09227: 
09228:     // Chọn đúng các bài cần render theo trang/từ khóa trước khi dựng DOM nặng.
09229:     const studentListSelection =
09230:         buildStudentListSelection(
09231:             assignments,
09232:             submissions,
09233:             nowSortMs
09234:         );
09235: 
09236:     pruneStudentListContainer(
09237:         list,
09238:         studentListSelection.todoIds
09239:     );
09240: 
09241:     pruneStudentListContainer(
```

### lines 9264-9281
```js
09264:         );
09265: 
09266:     assignments.forEach(assign => {
09267:         // [THÊM MỚI] Xử lý mảng đối tượng học sinh
09268:         const targetArr = Array.isArray(assign.targetStudent) ? assign.targetStudent : [assign.targetStudent || 'all'];
09269:         if (!targetArr.includes('all') && !targetArr.includes(currentUser.username)) return;
09270: 
09271:         const mySub = getPreferredStudentSubmission(
09272:             submissions,
09273:             assign,
09274:             currentUser.username
09275:         );
09276: 
09277:         const now = new Date();
09278:         const startTime = assign.startDate ? new Date(assign.startDate.replace(" ", "T")) : new Date(0);
09279:         const endTime = assign.endDate ? new Date(assign.endDate.replace(" ", "T")) : new Date("2100-01-01");
09280:         const isRedoing = mySub && mySub.isRedoing;
09281: 
```

### lines 9815-9832
```js
09815:                                 isLateComplete:
09816:                                     isLateCompleteAuto,
09817:                                 isEssayMissing:
09818:                                     isEssayMissingAuto
09819:                             };
09820: 
09821:                             const latestSubmissions =
09822:                                 await getDB(
09823:                                     'submissions'
09824:                                 );
09825: 
09826:                             let existingSubmission =
09827:                                 getPreferredStudentSubmission(
09828:                                     latestSubmissions,
09829:                                     assign,
09830:                                     currentUser
09831:                                         .username
09832:                                 );
```

### lines 9956-9973
```js
09956:                                 autoSubmissionPersisted =
09957:                                     true;
09958:                             } else if (
09959:                                 existingSubmission &&
09960:                                 existingSubmission
09961:                                     ._fbKey
09962:                             ) {
09963:                                 await updateDB(
09964:                                     'submissions',
09965:                                     existingSubmission
09966:                                         ._fbKey,
09967:                                     autoPayload
09968:                                 );
09969: 
09970:                                 autoSavedSubmissionKey =
09971:                                     String(
09972:                                         existingSubmission
09973:                                             ._fbKey
```

### lines 9980-9997
```js
09980:                                     saveTime
09981:                                         .toString() +
09982:                                     Math.floor(
09983:                                         Math.random() *
09984:                                         1000
09985:                                     );
09986: 
09987:                                 await pushDB(
09988:                                     'submissions',
09989:                                     autoPayload
09990:                                 );
09991: 
09992:                                 autoSubmissionPersisted =
09993:                                     true;
09994:                             }
09995: 
09996:                             if (
09997:                                 assign.assessmentType ===
```

### lines 11189-11206
```js
11189:         alert(
11190:             'Không tìm thấy bài tập này. ' +
11191:             'Vui lòng tải lại trang!'
11192:         );
11193: 
11194:         return;
11195:     }
11196: 
11197:     const submissions =
11198:         await getDB('submissions');
11199: 
11200:     const mySubmission =
11201:         getPreferredStudentSubmission(
11202:             submissions,
11203:             assign,
11204:             currentUser.username
11205:         );
11206: 
```

### lines 11190-11207
```js
11190:             'Không tìm thấy bài tập này. ' +
11191:             'Vui lòng tải lại trang!'
11192:         );
11193: 
11194:         return;
11195:     }
11196: 
11197:     const submissions =
11198:         await getDB('submissions');
11199: 
11200:     const mySubmission =
11201:         getPreferredStudentSubmission(
11202:             submissions,
11203:             assign,
11204:             currentUser.username
11205:         );
11206: 
11207:     const fallbackExamSet =
```

### lines 11194-11211
```js
11194:         return;
11195:     }
11196: 
11197:     const submissions =
11198:         await getDB('submissions');
11199: 
11200:     const mySubmission =
11201:         getPreferredStudentSubmission(
11202:             submissions,
11203:             assign,
11204:             currentUser.username
11205:         );
11206: 
11207:     const fallbackExamSet =
11208:         window.getStudentExamQuestions(assign);
11209: 
11210:     const reviewQuestions =
11211:         Array.isArray(
```

### lines 12263-12280
```js
12263:     const assign = assignments.find(
12264:         assignment =>
12265:             getStudentCompatAssignmentIds(
12266:                 assignment
12267:             ).includes(normalizedAssignId)
12268:     );
12269:     if (!assign) return;
12270: 
12271:     const submissions = await getDB('submissions');
12272:     const mySub = getPreferredStudentSubmission(
12273:         submissions,
12274:         assign,
12275:         currentUser.username
12276:     );
12277:     const isRedoing = mySub && mySub.isRedoing;
12278: 
12279:     const now = new Date();
12280:     const startTime = assign.startDate ? new Date(assign.startDate.replace(" ", "T")) : new Date(0);
```

### lines 12265-12282
```js
12265:             getStudentCompatAssignmentIds(
12266:                 assignment
12267:             ).includes(normalizedAssignId)
12268:     );
12269:     if (!assign) return;
12270: 
12271:     const submissions = await getDB('submissions');
12272:     const mySub = getPreferredStudentSubmission(
12273:         submissions,
12274:         assign,
12275:         currentUser.username
12276:     );
12277:     const isRedoing = mySub && mySub.isRedoing;
12278: 
12279:     const now = new Date();
12280:     const startTime = assign.startDate ? new Date(assign.startDate.replace(" ", "T")) : new Date(0);
12281:     const endTime = assign.endDate ? new Date(assign.endDate.replace(" ", "T")) : new Date("2100-01-01");
12282: 
```

### lines 12825-12842
```js
12825:         }
12826: 
12827:         window[saveLockKey] = true;
12828: 
12829:         try {
12830:             // Đọc lại dữ liệu mới nhất ngay trước khi lưu,
12831:             // không phụ thuộc dữ liệu đã tải từ trước.
12832:             const latestSubmissions =
12833:                 await getDB('submissions');
12834: 
12835:             let latestSubmission =
12836:                 getPreferredStudentSubmission(
12837:                     latestSubmissions,
12838:                     assign,
12839:                     currentUser.username
12840:                 );
12841: 
12842:             if (
```

### lines 13122-13139
```js
13122:                  * Bước 1: Lưu Firebase trước.
13123:                  * Không xóa file cũ trước bước này.
13124:                  */
13125:                 if (
13126:                     latestSubmission &&
13127:                     latestSubmission._fbKey
13128:                 ) {
13129:                     await updateDB(
13130:                         'submissions',
13131:                         latestSubmission._fbKey,
13132:                         payload
13133:                     );
13134: 
13135:                     savedSubmissionKey =
13136:                         String(
13137:                             latestSubmission._fbKey
13138:                         );
13139: 
```

### lines 13141-13158
```js
13141:                 } else {
13142:                     payload.id =
13143:                         Date.now().toString() +
13144:                         Math.floor(
13145:                             Math.random() * 1000
13146:                         );
13147: 
13148:                     await pushDB(
13149:                         'submissions',
13150:                         payload
13151:                     );
13152: 
13153:                     submissionPersisted = true;
13154:                 }
13155:             } catch (saveError) {
13156:                 /*
13157:                  * File mới đã được upload lên R2 nhưng
13158:                  * Firebase lưu thất bại.
```

### lines 14773-14790
```js
14773:     return window.CloudflareR2Storage.uploadFiles(
14774:         files,
14775:         {
14776:             maxSizeBytes: 10 * 1024 * 1024,
14777: 
14778:             audioMaxSizeBytes:
14779:                 30 * 1024 * 1024,
14780: 
14781:             folder: options.folder || 'submissions'
14782:         }
14783:     );
14784: }
14785: 
14786: // THAY THẾ TOÀN BỘ HÀM spinWheel CŨ Ở CUỐI FILE STUDENT.JS BẰNG ĐOẠN NÀY
14787: // ================= HỆ THỐNG VÒNG QUAY MAY MẮN =================
14788: let isSpinning = false;
14789: 
14790: // ======================================================
```

### lines 15828-15845
```js
15828:     ) {
15829:         tickets -= 1;
15830:     }
15831: 
15832:     return tickets;
15833: }
15834: 
15835: window.calculateTotalTickets = async function () {
15836:     const submissions = await getDB('submissions');
15837: 
15838:     const myLegacySubs = submissions.filter(sub =>
15839:         getStudentCompatSubmissionUsername(sub) ===
15840:             String(currentUser.username).trim() &&
15841:         sub.grade !== null &&
15842:         sub.grade !== undefined &&
15843:         sub.grade !== '' &&
15844:         Number(sub.gradeRewardV2Version || 0) < 2
15845:     );
```

### lines 15830-15847
```js
15830:     }
15831: 
15832:     return tickets;
15833: }
15834: 
15835: window.calculateTotalTickets = async function () {
15836:     const submissions = await getDB('submissions');
15837: 
15838:     const myLegacySubs = submissions.filter(sub =>
15839:         getStudentCompatSubmissionUsername(sub) ===
15840:             String(currentUser.username).trim() &&
15841:         sub.grade !== null &&
15842:         sub.grade !== undefined &&
15843:         sub.grade !== '' &&
15844:         Number(sub.gradeRewardV2Version || 0) < 2
15845:     );
15846: 
15847:     const computedLegacyTickets = myLegacySubs.reduce(
```

### lines 17842-17859
```js
17842:             currentUser?.username || ''
17843:         ).trim();
17844: 
17845:     if (!username) {
17846:         return false;
17847:     }
17848: 
17849:     const snapshot = await db
17850:         .ref('submissions')
17851:         .once('value');
17852: 
17853:     let blocked = false;
17854: 
17855:     snapshot.forEach(child => {
17856:         if (blocked) return true;
17857: 
17858:         const submission =
17859:             child.val() || {};
```

### lines 20318-20335
```js
20318:         history.autoSubmitted ||
20319:         history.late ||
20320:         history.cheat ||
20321:         history.essayMissing
20322:     );
20323: }
20324: 
20325: // Lấy đúng bài nộp có kết quả hợp lệ nhất
20326: function getRoadmapSubmission(assign, submissions, username) {
20327:     const passingGrade = getRoadmapPassingGrade(assign);
20328: 
20329:     const matchedSubmissions = (submissions || []).filter(sub =>
20330:         isSameRoadmapValue(sub.assignmentId, assign.id) &&
20331:         isSameRoadmapValue(sub.studentUsername, username)
20332:     );
20333: 
20334:     if (matchedSubmissions.length === 0) {
20335:         return null;
```

### lines 20321-20338
```js
20321:         history.essayMissing
20322:     );
20323: }
20324: 
20325: // Lấy đúng bài nộp có kết quả hợp lệ nhất
20326: function getRoadmapSubmission(assign, submissions, username) {
20327:     const passingGrade = getRoadmapPassingGrade(assign);
20328: 
20329:     const matchedSubmissions = (submissions || []).filter(sub =>
20330:         isSameRoadmapValue(sub.assignmentId, assign.id) &&
20331:         isSameRoadmapValue(sub.studentUsername, username)
20332:     );
20333: 
20334:     if (matchedSubmissions.length === 0) {
20335:         return null;
20336:     }
20337: 
20338:     function getSubmissionPriority(sub) {
```

### lines 20441-20458
```js
20441:     return (
20442:         targetStudents.includes('all') ||
20443:         targetStudents.includes(normalizedUsername)
20444:     );
20445: }
20446: 
20447: function calculateRoadmapBaseMoney(
20448:     assignments,
20449:     submissions,
20450:     username
20451: ) {
20452:     return (assignments || []).reduce((total, assign) => {
20453:         if (!isRoadmapAssignmentForStudent(assign, username)) {
20454:             return total;
20455:         }
20456: 
20457:         const sub = getRoadmapSubmission(
20458:             assign,
```

### lines 20451-20468
```js
20451: ) {
20452:     return (assignments || []).reduce((total, assign) => {
20453:         if (!isRoadmapAssignmentForStudent(assign, username)) {
20454:             return total;
20455:         }
20456: 
20457:         const sub = getRoadmapSubmission(
20458:             assign,
20459:             submissions,
20460:             username
20461:         );
20462: 
20463:         if (isRoadmapSubmissionPassed(assign, sub)) {
20464:             return total + getRoadmapMoney(assign);
20465:         }
20466: 
20467:         return total;
20468:     }, 0);
```

### lines 20504-20521
```js
20504:     return studentRoadmapRenderPromise;
20505: }
20506: 
20507: async function renderStudentRoadmapCore() {
20508:     const body = document.getElementById('studentRoadmapBody');
20509:     if (!body) return;
20510:     body.innerHTML = '';
20511: 
20512:     const [assignments, submissions, offsetSnap] = await Promise.all([
20513:         getDB('assignments'),
20514:         getDB('submissions'),
20515:         db.ref('student_money_offset/' + currentUser.username).once('value')
20516:     ]);
20517: 
20518:     // KIỂM TRA TRẠNG THÁI THAM GIA LỘ TRÌNH CỦA HỌC SINH
20519:     const isParticipating = currentUser.isParticipatingRoadmap !== false;
20520: 
20521:     // ẨN/HIỆN TIÊU ĐỀ CỘT TRONG THEAD CỦA HỌC SINH
```

### lines 20506-20523
```js
20506: 
20507: async function renderStudentRoadmapCore() {
20508:     const body = document.getElementById('studentRoadmapBody');
20509:     if (!body) return;
20510:     body.innerHTML = '';
20511: 
20512:     const [assignments, submissions, offsetSnap] = await Promise.all([
20513:         getDB('assignments'),
20514:         getDB('submissions'),
20515:         db.ref('student_money_offset/' + currentUser.username).once('value')
20516:     ]);
20517: 
20518:     // KIỂM TRA TRẠNG THÁI THAM GIA LỘ TRÌNH CỦA HỌC SINH
20519:     const isParticipating = currentUser.isParticipatingRoadmap !== false;
20520: 
20521:     // ẨN/HIỆN TIÊU ĐỀ CỘT TRONG THEAD CỦA HỌC SINH
20522:     const table = body.parentElement;
20523:     if (table) {
```

### lines 20560-20577
```js
20560:     let totalMoney = 0; // Biến lưu tổng số tiền tích lũy
20561: 
20562:     sortedAssignments.forEach(assign => {
20563:         // Lấy điểm chuẩn riêng của từng bài do Giáo viên đã thiết lập
20564:         const passingGrade = getRoadmapPassingGrade(assign);
20565: 
20566:         const sub = getRoadmapSubmission(
20567:             assign,
20568:             submissions,
20569:             currentUser.username
20570:         );
20571: 
20572:         let studentScore = '-';
20573:         let statusText = 'Chưa nộp';
20574:         let statusClass = 'status-pending';
20575:         let cellBgStyle = '';
20576: 
20577:         // Đưa việc khai báo tiền lên trước để có thể ghi đè nếu học sinh bị loại do nộp trễ hoặc điểm thấp
```

### lines 20651-20668
```js
20651:         `;
20652:         body.appendChild(tr);
20653:     });
20654: 
20655:     // Tổng hiển thị phải dùng đúng cùng thuật toán với bảng quy đổi/rút tiền.
20656:     // totalMoney ở trên chỉ phục vụ dựng trạng thái từng dòng; không dùng làm nguồn tổng cuối.
20657:     const baseMoney = calculateRoadmapBaseMoney(
20658:         assignments,
20659:         submissions,
20660:         currentUser.username
20661:     );
20662:     const moneyOffset = Number(offsetSnap.val()) || 0;
20663:     const finalMoney = Math.max(0, baseMoney + moneyOffset);
20664: 
20665:     // Cập nhật hiển thị số tiền cuối cùng lên ô tổng
20666:     const totalMoneyEl = document.getElementById('totalRoadmapMoney');
20667:     if (totalMoneyEl) {
20668:         totalMoneyEl.innerText = finalMoney.toLocaleString('vi-VN');
```

### lines 21644-21661
```js
21644:     // Khi hoàn tác thất bại thì không xóa lượt,
21645:     // tránh học sinh thực hiện lại và bị cộng/trừ hai lần.
21646:     let mayReleaseReservation = true;
21647: 
21648:     try {
21649:         const [
21650:             coinSnapshot,
21651:             assignments,
21652:             submissions,
21653:             offsetSnapshot,
21654:             cashRequests,
21655:             serverNow
21656:         ] = await Promise.all([
21657:             db.ref(coinPath).once('value'),
21658:             getDB('assignments'),
21659:             getDB('submissions'),
21660:             db.ref(offsetPath).once('value'),
21661:             getCurrentStudentCashRequests(),
```

### lines 21651-21668
```js
21651:             assignments,
21652:             submissions,
21653:             offsetSnapshot,
21654:             cashRequests,
21655:             serverNow
21656:         ] = await Promise.all([
21657:             db.ref(coinPath).once('value'),
21658:             getDB('assignments'),
21659:             getDB('submissions'),
21660:             db.ref(offsetPath).once('value'),
21661:             getCurrentStudentCashRequests(),
21662:             getStudentConversionServerNow()
21663:         ]);
21664: 
21665:         const currentCoins =
21666:             Number(coinSnapshot.val()) || 0;
21667: 
21668:         const baseRoadmapMoney =
```

### lines 21663-21680
```js
21663:         ]);
21664: 
21665:         const currentCoins =
21666:             Number(coinSnapshot.val()) || 0;
21667: 
21668:         const baseRoadmapMoney =
21669:             calculateRoadmapBaseMoney(
21670:                 assignments,
21671:                 submissions,
21672:                 currentUser.username
21673:             );
21674: 
21675:         const currentOffset =
21676:             Number(offsetSnapshot.val()) || 0;
21677: 
21678:         const currentMoney = Math.max(
21679:             0,
21680:             baseRoadmapMoney + currentOffset
```

### lines 22629-22646
```js
22629:             );
22630: 
22631:             // V4.2 REDO GUARD:
22632:             // Không chỉ tin vào grade_reward_events. Nếu giáo viên đã cho
22633:             // làm lại, reward của lần chấm trước phải bị vô hiệu hóa ngay.
22634:             // redoStartedAt còn được giữ sau khi HS nộp lại, nhờ đó thư cũ
22635:             // vẫn bị chặn kể cả isRedoing đã trở về false.
22636:             const submissionRef = db.ref(
22637:                 `submissions/${submissionKey}`
22638:             );
22639:             const submissionSnap = await submissionRef.once('value');
22640:             const liveSubmission = submissionSnap.val() || null;
22641: 
22642:             /*
22643:              * F3: thư thưởng điểm số chỉ hợp lệ khi submission hiện tại
22644:              * thực sự đã có điểm. Không coi null/'' là 0.
22645:              */
22646:             const liveGradeRaw =
```

### lines 24487-24504
```js
24487: // =============================================================
24488: window.getLiveStudentExamSubmission =
24489:     async function (assignId) {
24490:         const key = String(assignId || '');
24491: 
24492:         if (!key) return null;
24493: 
24494:         const snapshot = await db
24495:             .ref('submissions')
24496:             .orderByChild('studentUsername')
24497:             .equalTo(String(currentUser.username))
24498:             .once('value');
24499: 
24500:         const matches = [];
24501: 
24502:         snapshot.forEach(child => {
24503:             const value = child.val() || {};
24504: 
```

### lines 31047-31064
```js
31047:                 return sum + amount;
31048:             }
31049: 
31050:             return sum;
31051:         }, 0);
31052: }
31053: 
31054: async function getCurrentRoadmapMoneyState() {
31055:     const [assignments, submissions, offsetSnap, cashRequests] = await Promise.all([
31056:         getDB('assignments'),
31057:         getDB('submissions'),
31058:         db.ref('student_money_offset/' + currentUser.username).once('value'),
31059:         getCurrentStudentCashRequests()
31060:     ]);
31061: 
31062:     const baseMoney = calculateRoadmapBaseMoney(
31063:         assignments,
31064:         submissions,
```

### lines 31049-31066
```js
31049: 
31050:             return sum;
31051:         }, 0);
31052: }
31053: 
31054: async function getCurrentRoadmapMoneyState() {
31055:     const [assignments, submissions, offsetSnap, cashRequests] = await Promise.all([
31056:         getDB('assignments'),
31057:         getDB('submissions'),
31058:         db.ref('student_money_offset/' + currentUser.username).once('value'),
31059:         getCurrentStudentCashRequests()
31060:     ]);
31061: 
31062:     const baseMoney = calculateRoadmapBaseMoney(
31063:         assignments,
31064:         submissions,
31065:         currentUser.username
31066:     );
```

### lines 31056-31073
```js
31056:         getDB('assignments'),
31057:         getDB('submissions'),
31058:         db.ref('student_money_offset/' + currentUser.username).once('value'),
31059:         getCurrentStudentCashRequests()
31060:     ]);
31061: 
31062:     const baseMoney = calculateRoadmapBaseMoney(
31063:         assignments,
31064:         submissions,
31065:         currentUser.username
31066:     );
31067: 
31068:     const moneyOffset = Number(offsetSnap.val()) || 0;
31069:     const totalMoney = Math.max(0, baseMoney + moneyOffset);
31070:     const reservedAmount = getReservedCashRequestAmount(
31071:         cashRequests,
31072:         moneyOffset
31073:     );
```

### lines 31070-31087
```js
31070:     const reservedAmount = getReservedCashRequestAmount(
31071:         cashRequests,
31072:         moneyOffset
31073:     );
31074:     const availableMoney = Math.max(0, totalMoney - reservedAmount);
31075: 
31076:     return {
31077:         assignments,
31078:         submissions,
31079:         cashRequests,
31080:         baseMoney,
31081:         moneyOffset,
31082:         totalMoney,
31083:         reservedAmount,
31084:         availableMoney
31085:     };
31086: }
31087: 
```

### lines 35515-35532
```js
35515: 
35516: // =========================================================================
35517: // HỆ THỐNG XUẤT PDF BẢNG ĐIỂM LỘ TRÌNH (PHÍA HỌC SINH)
35518: // =========================================================================
35519: 
35520: window.downloadStudentRoadmapPDF = async function () {
35521:     // Dùng đúng cùng thuật toán với bảng lộ trình trên màn hình.
35522:     const assignments = await getDB('assignments');
35523:     const submissions = await getDB('submissions');
35524: 
35525:     const username = String(currentUser?.username || '').trim();
35526:     const stName = currentUser?.name || username || 'HocSinh';
35527: 
35528:     // Chỉ lấy những bài thực sự giao cho học sinh này.
35529:     const myAssignments = (assignments || []).filter(assign =>
35530:         isRoadmapAssignmentForStudent(assign, username)
35531:     );
35532: 
```

### lines 35563-35580
```js
35563:                 <tbody>
35564:     `;
35565: 
35566:     sortedAssignments.forEach(assign => {
35567:         // Chính helper này cũng được dùng khi tính tiền lộ trình:
35568:         // lỗi hiện tại/lịch sử -> forcePass sạch -> bài đạt -> bài có điểm -> chấm lại.
35569:         const bestSub = getRoadmapSubmission(
35570:             assign,
35571:             submissions,
35572:             username
35573:         );
35574: 
35575:         let studentScore = '-';
35576:         let statusText = 'Chưa nộp';
35577: 
35578:         if (bestSub) {
35579:             const parsedGrade = parseRoadmapNumber(
35580:                 bestSub.grade,
```

## pattern `cash_requests` — 9 hits

### lines 7408-7425
```js
07408:         // Cập nhật luôn màn hình "Yêu cầu rút tiền mặt" nếu đang mở bảng quy đổi
07409:         if (typeof window.initCashWithdrawInterface === 'function' && document.getElementById('displayRouteMoney')) {
07410:             await window.initCashWithdrawInterface();
07411:         }
07412:         if (startupLoader) startupLoader.markReady('student-money-offset');
07413:     });
07414: 
07415:     // 2. Lắng nghe trạng thái duyệt/từ chối rút tiền mặt từ Giáo viên.
07416:     // SECURITY: Học sinh KHÔNG được listen toàn /cash_requests. Firebase Rules
07417:     // chỉ cho phép query theo username của chính tài khoản đang đăng nhập.
07418:     const studentCashRequestsRealtimeQuery = getStudentCashRequestsQuery('studentUsername');
07419:     listenFirebase(studentCashRequestsRealtimeQuery, 'value', async () => {
07420:         // Khi trạng thái yêu cầu đổi, cập nhật cả lịch sử lẫn số tiền còn có thể yêu cầu.
07421:         if (typeof window.initCashWithdrawInterface === 'function' && document.getElementById('displayRouteMoney')) {
07422:             await window.initCashWithdrawInterface();
07423:         } else if (typeof renderCashRequestHistory === 'function' && document.getElementById('cashRequestHistoryContainer')) {
07424:             await renderCashRequestHistory();
07425:         }
```

### lines 30944-30961
```js
30944:     }
30945: };
30946: 
30947: // =========================================================================
30948: // HỆ THỐNG YÊU CẦU LẤY TIỀN MẶT - PHÍA HỌC SINH (BẢN HỢP NHẤT / AN TOÀN)
30949: // =========================================================================
30950: 
30951: // CASH REQUEST QUERY GUARD v1
30952: // Firebase Rules của /cash_requests không cho Student đọc toàn collection.
30953: // Mọi read/listen phía Student phải mang orderByChild + equalTo(username hiện tại).
30954: function getStudentCashRequestsQuery(field = 'studentUsername') {
30955:     const username = String(currentUser?.username || '').trim();
30956: 
30957:     if (!username) {
30958:         throw new Error('Không xác định được username học sinh để đọc cash_requests an toàn.');
30959:     }
30960: 
30961:     if (field !== 'studentUsername' && field !== 'username') {
```

### lines 30950-30967
```js
30950: 
30951: // CASH REQUEST QUERY GUARD v1
30952: // Firebase Rules của /cash_requests không cho Student đọc toàn collection.
30953: // Mọi read/listen phía Student phải mang orderByChild + equalTo(username hiện tại).
30954: function getStudentCashRequestsQuery(field = 'studentUsername') {
30955:     const username = String(currentUser?.username || '').trim();
30956: 
30957:     if (!username) {
30958:         throw new Error('Không xác định được username học sinh để đọc cash_requests an toàn.');
30959:     }
30960: 
30961:     if (field !== 'studentUsername' && field !== 'username') {
30962:         throw new Error('Trường query cash_requests không hợp lệ.');
30963:     }
30964: 
30965:     return db
30966:         .ref('cash_requests')
30967:         .orderByChild(field)
```

### lines 30954-30971
```js
30954: function getStudentCashRequestsQuery(field = 'studentUsername') {
30955:     const username = String(currentUser?.username || '').trim();
30956: 
30957:     if (!username) {
30958:         throw new Error('Không xác định được username học sinh để đọc cash_requests an toàn.');
30959:     }
30960: 
30961:     if (field !== 'studentUsername' && field !== 'username') {
30962:         throw new Error('Trường query cash_requests không hợp lệ.');
30963:     }
30964: 
30965:     return db
30966:         .ref('cash_requests')
30967:         .orderByChild(field)
30968:         .equalTo(username);
30969: }
30970: 
30971: // Đọc cả schema mới (studentUsername) và schema cũ (username), sau đó gộp
```

### lines 30958-30975
```js
30958:         throw new Error('Không xác định được username học sinh để đọc cash_requests an toàn.');
30959:     }
30960: 
30961:     if (field !== 'studentUsername' && field !== 'username') {
30962:         throw new Error('Trường query cash_requests không hợp lệ.');
30963:     }
30964: 
30965:     return db
30966:         .ref('cash_requests')
30967:         .orderByChild(field)
30968:         .equalTo(username);
30969: }
30970: 
30971: // Đọc cả schema mới (studentUsername) và schema cũ (username), sau đó gộp
30972: // theo Firebase key. Không có thao tác nào đọc thẳng /cash_requests.
30973: async function getCurrentStudentCashRequests() {
30974:     const [studentUsernameSnap, legacyUsernameSnap] = await Promise.all([
30975:         getStudentCashRequestsQuery('studentUsername').once('value'),
```

### lines 30964-30981
```js
30964: 
30965:     return db
30966:         .ref('cash_requests')
30967:         .orderByChild(field)
30968:         .equalTo(username);
30969: }
30970: 
30971: // Đọc cả schema mới (studentUsername) và schema cũ (username), sau đó gộp
30972: // theo Firebase key. Không có thao tác nào đọc thẳng /cash_requests.
30973: async function getCurrentStudentCashRequests() {
30974:     const [studentUsernameSnap, legacyUsernameSnap] = await Promise.all([
30975:         getStudentCashRequestsQuery('studentUsername').once('value'),
30976:         getStudentCashRequestsQuery('username').once('value')
30977:     ]);
30978: 
30979:     const byKey = new Map();
30980: 
30981:     const collect = snapshot => {
```

### lines 31094-31111
```js
31094:     try {
31095:         const allRequests = await getCurrentStudentCashRequests();
31096: 
31097:         const myRequests = (allRequests || [])
31098:             .filter(isCashRequestOwnedByCurrentStudent)
31099:             .filter(req => !(
31100:                 window.HistoryRetention &&
31101:                 typeof window.HistoryRetention.isExpired === 'function' &&
31102:                 window.HistoryRetention.isExpired('cash_requests', req)
31103:             ));
31104: 
31105:         if (myRequests.length === 0) {
31106:             container.innerHTML = '<p style="color: #94a3b8; font-size: 0.9em; margin: 0; text-align: center; padding: 10px;">Chưa có yêu cầu lấy tiền mặt nào.</p>';
31107:             return;
31108:         }
31109: 
31110:         let html = '';
31111: 
```

### lines 31258-31275
```js
31258:             alert(
31259:                 `⚠️ Số dư khả dụng vừa thay đổi. Hiện chỉ còn ` +
31260:                 `${state.availableMoney.toLocaleString('vi-VN')} VNĐ có thể yêu cầu.`
31261:             );
31262:             await window.initCashWithdrawInterface();
31263:             return;
31264:         }
31265: 
31266:         await pushDB('cash_requests', {
31267:             // Tương thích cả Firebase Rules cũ và luồng duyệt tiền hiện tại.
31268:             username: currentUser.username,
31269:             studentUsername: currentUser.username,
31270:             studentName: currentUser.name,
31271:             amount: amount,
31272:             status: 'pending',
31273:             requestVersion: 2,
31274:             timestamp: Date.now()
31275:         });
```

### lines 31285-31302
```js
31285:         const errorMessage = String(error?.message || '').toLowerCase();
31286: 
31287:         if (
31288:             errorCode.includes('permission-denied') ||
31289:             errorCode.includes('permission_denied') ||
31290:             errorMessage.includes('permission_denied') ||
31291:             errorMessage.includes('permission denied')
31292:         ) {
31293:             alert('❌ Firebase từ chối quyền tạo yêu cầu tiền mặt. Vui lòng kiểm tra Rules của cash_requests.');
31294:         } else {
31295:             alert('❌ Không thể gửi yêu cầu tiền mặt. Vui lòng kiểm tra kết nối rồi thử lại.');
31296:         }
31297:     } finally {
31298:         window.cashRequestSubmitInFlight = false;
31299:     }
31300: }
31301: 
31302: window.handleRequestCashSubmit = function () {
```

## pattern `refund_pending` — 4 hits

### lines 18095-18112
```js
18095:                         currentExpiresAt > 0 &&
18096:                         currentExpiresAt <=
18097:                             startedAt
18098:                     );
18099: 
18100:                 if (!mayReplace) {
18101:                     rejectReason =
18102:                         status ===
18103:                             'refund_pending'
18104:                             ? 'PURCHASE_REFUND_PENDING'
18105:                             : 'PURCHASE_IN_PROGRESS';
18106:                     return;
18107:                 }
18108:             }
18109: 
18110:             return {
18111:                 version: 1,
18112:                 username,
```

### lines 18469-18486
```js
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
18479:                             Date.now(),
18480:                         updatedAt:
18481:                             Date.now()
18482:                     })
18483:                     .catch(() => {});
18484:             }
18485:         } else if (
18486:             trialReservation &&
```

### lines 19425-19442
```js
19425:             purchaseOperation &&
19426:             !itemAdded
19427:         ) {
19428:             await purchaseOperation.ref
19429:                 .update({
19430:                     status:
19431:                         coinDebited &&
19432:                         !refundSucceeded
19433:                             ? 'refund_pending'
19434:                             : 'failed_refunded',
19435:                     refundPending:
19436:                         coinDebited &&
19437:                         !refundSucceeded,
19438:                     failedAt:
19439:                         Date.now(),
19440:                     updatedAt:
19441:                         Date.now()
19442:                 })
```

### lines 19478-19495
```js
19478: 
19479:         alert(
19480:             knownMessages[
19481:                 message
19482:             ] ||
19483:             (
19484:                 coinDebited &&
19485:                 !refundSucceeded
19486:                     ? '⚠️ Thanh toán lỗi và Coin chưa hoàn được. Giao dịch đã được đánh dấu refund_pending để giáo viên đối soát.'
19487:                     : '❌ Thanh toán thất bại. Hệ thống đã hoàn tác các bước đã thực hiện.'
19488:             )
19489:         );
19490: 
19491:         if (btn) {
19492:             btn.disabled =
19493:                 false;
19494:             btn.innerText =
19495:                 '💳 Xác nhận mua';
```

## pattern `student_coins` — 16 hits

### lines 5714-5731
```js
05714: 
05715:     // Cấu hình Giờ Vàng: dùng listener Firebase trực tiếp để học sinh
05716:     // nhận thay đổi của giáo viên ngay lập tức, không cần F5.
05717:     startLuckyWheelGoldenHourRealtimeSync();
05718: 
05719:     // ==========================================
05720:     // DÁN ĐOẠN LẮNG NGHE COIN VÀO ĐÂY LÀ HẾT LỖI
05721:     // ==========================================
05722:     listenFirebase(db.ref('student_coins/' + currentUser.username), 'value', (snapshot) => {
05723:         const coins = snapshot.val() || 0;
05724:         const coinEl = document.getElementById('studentCoinBalance');
05725:         if (coinEl) {
05726:             coinEl.style.transform = 'scale(1.5)';
05727:             coinEl.style.color = '#ff9f43';
05728:             coinEl.innerText = coins.toLocaleString('vi-VN');
05729: 
05730:             setTimeout(() => {
05731:                 coinEl.style.transform = 'scale(1)';
```

### lines 15518-15535
```js
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
```

### lines 15972-15989
```js
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
```

### lines 18296-18313
```js
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
```

### lines 18441-18458
```js
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
```

### lines 18609-18626
```js
18609:     ) {
18610:         return window
18611:             .MidAutumnCoinManager
18612:             .redeem(itemId);
18613:     }
18614: 
18615:     if (item.isNonCoin && (!item.price || item.price <= 0)) return alert(`🎁 Vật phẩm sự kiện!`);
18616: 
18617:     const coinRef = db.ref('student_coins/' + currentUser.username);
18618:     const snap = await coinRef.once('value');
18619:     let currentCoins = snap.val() || 0;
18620: 
18621:     let finalPrice = item.price;
18622:     let isUpgrade = false;
18623:     if (isUpgradingFromTrial) {
18624:         const trialPrice = item.price / 2;
18625:         const refund = trialPrice * 0.3;
18626:         finalPrice = Math.floor(item.price - refund);
```

### lines 19132-19149
```js
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
```

### lines 19313-19330
```js
19313:                         amount:
19314:                             -finalPrice,
19315:                         unit:
19316:                             'Coin',
19317:                         reversible:
19318:                             true,
19319:                         details: {
19320:                             coinPath:
19321:                                 `student_coins/${currentUser.username}`,
19322:                             itemPath:
19323:                                 `student_inventory/${currentUser.username}/${itemId}`,
19324:                             itemId,
19325:                             itemName:
19326:                                 paymentItem.name ||
19327:                                 itemId,
19328:                             basePrice,
19329:                             finalPrice,
19330:                             discountKey:
```

### lines 19373-19390
```js
19373: 
19374:         if (
19375:             coinDebited &&
19376:             !itemAdded &&
19377:             finalPrice > 0
19378:         ) {
19379:             try {
19380:                 await incrementNumberTx(
19381:                     `student_coins/${currentUser.username}`,
19382:                     finalPrice
19383:                 );
19384: 
19385:                 refundSucceeded =
19386:                     true;
19387:             } catch (
19388:                 refundError
19389:             ) {
19390:                 console.error(
```

### lines 21628-21645
```js
21628:     ) {
21629:         alert(
21630:             '❌ Mỗi tuần chỉ được đổi tối đa 500 Coin sang Tiền lộ trình.'
21631:         );
21632:         return;
21633:     }
21634: 
21635:     const coinPath =
21636:         `student_coins/${currentUser.username}`;
21637: 
21638:     const offsetPath =
21639:         `student_money_offset/${currentUser.username}`;
21640: 
21641:     let reservation = null;
21642:     let conversionSucceeded = false;
21643: 
21644:     // Khi hoàn tác thất bại thì không xóa lượt,
21645:     // tránh học sinh thực hiện lại và bị cộng/trừ hai lần.
```

### lines 22847-22864
```js
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
```

### lines 22967-22984
```js
22967:             if (claimHeartbeatTimer) {
22968:                 window.clearInterval(claimHeartbeatTimer);
22969:                 claimHeartbeatTimer = null;
22970:             }
22971: 
22972:             claimSucceeded = true;
22973:             claimedPath =
22974:                 `student_bonus_tickets/${currentUser.username} + ` +
22975:                 `student_coins/${currentUser.username}`;
22976: 
22977:             claimedExtra = {
22978:                 tickets: rewardTickets,
22979:                 coins: rewardCoins,
22980:                 grade: Number.isFinite(rewardScore)
22981:                     ? rewardScore
22982:                     : null,
22983:                 rewardVersion: Number(msgData.rewardVersion || 3)
22984:             };
```

### lines 23000-23017
```js
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
```

### lines 23025-23042
```js
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
23038:             );
23039: 
23040:         } else if (
23041:             giftType === 'mid_autumn_coin'
23042:         ) {
```

### lines 30475-30492
```js
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
```

### lines 34174-34191
```js
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
```

## pattern `student_money_offset` — 6 hits

### lines 7395-7412
```js
07395:         if (startupLoader) startupLoader.markReady('student-conversion-settings');
07396:     });
07397: 
07398:     // =================================================================
07399:     // ĐỒNG BỘ TIỀN TÍCH LŨY VÀ TRẠNG THÁI RÚT TIỀN THEO THỜI GIAN THỰC
07400:     // =================================================================
07401: 
07402:     // 1. Lắng nghe biến động tiền bù trừ (Giáo viên tặng/trừ tiền hoặc rút tiền)
07403:     listenFirebase(db.ref('student_money_offset/' + currentUser.username), 'value', async () => {
07404:         // Cập nhật bảng lộ trình & Tổng tiền bên ngoài
07405:         if (typeof renderStudentRoadmap === 'function' && document.getElementById('studentRoadmapBody')) {
07406:             await renderStudentRoadmap();
07407:         }
07408:         // Cập nhật luôn màn hình "Yêu cầu rút tiền mặt" nếu đang mở bảng quy đổi
07409:         if (typeof window.initCashWithdrawInterface === 'function' && document.getElementById('displayRouteMoney')) {
07410:             await window.initCashWithdrawInterface();
07411:         }
07412:         if (startupLoader) startupLoader.markReady('student-money-offset');
```

### lines 20507-20524
```js
20507: async function renderStudentRoadmapCore() {
20508:     const body = document.getElementById('studentRoadmapBody');
20509:     if (!body) return;
20510:     body.innerHTML = '';
20511: 
20512:     const [assignments, submissions, offsetSnap] = await Promise.all([
20513:         getDB('assignments'),
20514:         getDB('submissions'),
20515:         db.ref('student_money_offset/' + currentUser.username).once('value')
20516:     ]);
20517: 
20518:     // KIỂM TRA TRẠNG THÁI THAM GIA LỘ TRÌNH CỦA HỌC SINH
20519:     const isParticipating = currentUser.isParticipatingRoadmap !== false;
20520: 
20521:     // ẨN/HIỆN TIÊU ĐỀ CỘT TRONG THEAD CỦA HỌC SINH
20522:     const table = body.parentElement;
20523:     if (table) {
20524:         const ths = table.querySelectorAll('thead th');
```

### lines 21631-21648
```js
21631:         );
21632:         return;
21633:     }
21634: 
21635:     const coinPath =
21636:         `student_coins/${currentUser.username}`;
21637: 
21638:     const offsetPath =
21639:         `student_money_offset/${currentUser.username}`;
21640: 
21641:     let reservation = null;
21642:     let conversionSucceeded = false;
21643: 
21644:     // Khi hoàn tác thất bại thì không xóa lượt,
21645:     // tránh học sinh thực hiện lại và bị cộng/trừ hai lần.
21646:     let mayReleaseReservation = true;
21647: 
21648:     try {
```

### lines 23413-23430
```js
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
```

### lines 23438-23455
```js
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
23451:             );
23452: 
23453:             if (
23454:                 typeof renderStudentRoadmap ===
23455:                 'function'
```

### lines 31050-31067
```js
31050:             return sum;
31051:         }, 0);
31052: }
31053: 
31054: async function getCurrentRoadmapMoneyState() {
31055:     const [assignments, submissions, offsetSnap, cashRequests] = await Promise.all([
31056:         getDB('assignments'),
31057:         getDB('submissions'),
31058:         db.ref('student_money_offset/' + currentUser.username).once('value'),
31059:         getCurrentStudentCashRequests()
31060:     ]);
31061: 
31062:     const baseMoney = calculateRoadmapBaseMoney(
31063:         assignments,
31064:         submissions,
31065:         currentUser.username
31066:     );
31067: 
```

## pattern `student_bonus_tickets` — 7 hits

### lines 5734-5751
```js
05734:         }
05735:         if (startupLoader) startupLoader.markReady('student-coins');
05736:     });
05737: 
05738: 
05739:     // Grade Reward Guard v3.1: cập nhật số Vé trên vòng quay ngay khi
05740:     // giáo viên thu hồi thưởng / hoàn án phạt, không cần F5 hoặc đóng mở game.
05741:     listenFirebase(
05742:         db.ref('student_bonus_tickets/' + currentUser.username),
05743:         'value',
05744:         () => {
05745:             window.setTimeout(async () => {
05746:                 if (typeof window.calculateTotalTickets !== 'function') {
05747:                     return;
05748:                 }
05749: 
05750:                 try {
05751:                     const ticketData = await window.calculateTotalTickets();
```

### lines 15864-15881
```js
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
```

### lines 15973-15990
```js
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
```

### lines 22844-22861
```js
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
```

### lines 22966-22983
```js
22966: 
22967:             if (claimHeartbeatTimer) {
22968:                 window.clearInterval(claimHeartbeatTimer);
22969:                 claimHeartbeatTimer = null;
22970:             }
22971: 
22972:             claimSucceeded = true;
22973:             claimedPath =
22974:                 `student_bonus_tickets/${currentUser.username} + ` +
22975:                 `student_coins/${currentUser.username}`;
22976: 
22977:             claimedExtra = {
22978:                 tickets: rewardTickets,
22979:                 coins: rewardCoins,
22980:                 grade: Number.isFinite(rewardScore)
22981:                     ? rewardScore
22982:                     : null,
22983:                 rewardVersion: Number(msgData.rewardVersion || 3)
```

### lines 23467-23484
```js
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
```

### lines 23492-23509
```js
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
```

## pattern `question_bank` — 0 hits

## pattern `password` — 15 hits

### lines 36-53
```js
00036: const currentUser = JSON.parse(localStorage.getItem('currentUser'));
00037: 
00038: // ======================================================
00039: // SECURITY GUARD K · AUTHORITY / OWNERSHIP / PASSWORD POLICY
00040: // ======================================================
00041: window.__SECURITY_GUARD_BUILD = '20260918.v1-K1-K7';
00042: console.info('[Security Guard]', window.__SECURITY_GUARD_BUILD);
00043: 
00044: // K1: currentUser chỉ là cache UI. Không giữ password plaintext ở localStorage Học sinh.
00045: if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
00046:     try {
00047:         delete currentUser.password;
00048:         localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
00049:     } catch (_) {}
00050: }
00051: 
00052: function getStudentPasswordPolicyError(password, username = '') {
00053:     const value = String(password ?? '');
```

### lines 37-54
```js
00037: 
00038: // ======================================================
00039: // SECURITY GUARD K · AUTHORITY / OWNERSHIP / PASSWORD POLICY
00040: // ======================================================
00041: window.__SECURITY_GUARD_BUILD = '20260918.v1-K1-K7';
00042: console.info('[Security Guard]', window.__SECURITY_GUARD_BUILD);
00043: 
00044: // K1: currentUser chỉ là cache UI. Không giữ password plaintext ở localStorage Học sinh.
00045: if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
00046:     try {
00047:         delete currentUser.password;
00048:         localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
00049:     } catch (_) {}
00050: }
00051: 
00052: function getStudentPasswordPolicyError(password, username = '') {
00053:     const value = String(password ?? '');
00054:     const normalizedUsername = String(username || '').trim().toLowerCase();
```

### lines 39-56
```js
00039: // SECURITY GUARD K · AUTHORITY / OWNERSHIP / PASSWORD POLICY
00040: // ======================================================
00041: window.__SECURITY_GUARD_BUILD = '20260918.v1-K1-K7';
00042: console.info('[Security Guard]', window.__SECURITY_GUARD_BUILD);
00043: 
00044: // K1: currentUser chỉ là cache UI. Không giữ password plaintext ở localStorage Học sinh.
00045: if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
00046:     try {
00047:         delete currentUser.password;
00048:         localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
00049:     } catch (_) {}
00050: }
00051: 
00052: function getStudentPasswordPolicyError(password, username = '') {
00053:     const value = String(password ?? '');
00054:     const normalizedUsername = String(username || '').trim().toLowerCase();
00055: 
00056:     if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
```

### lines 40-57
```js
00040: // ======================================================
00041: window.__SECURITY_GUARD_BUILD = '20260918.v1-K1-K7';
00042: console.info('[Security Guard]', window.__SECURITY_GUARD_BUILD);
00043: 
00044: // K1: currentUser chỉ là cache UI. Không giữ password plaintext ở localStorage Học sinh.
00045: if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
00046:     try {
00047:         delete currentUser.password;
00048:         localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
00049:     } catch (_) {}
00050: }
00051: 
00052: function getStudentPasswordPolicyError(password, username = '') {
00053:     const value = String(password ?? '');
00054:     const normalizedUsername = String(username || '').trim().toLowerCase();
00055: 
00056:     if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
00057:     if (value.length > 128) return 'Mật khẩu tối đa 128 ký tự.';
```

### lines 44-61
```js
00044: // K1: currentUser chỉ là cache UI. Không giữ password plaintext ở localStorage Học sinh.
00045: if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
00046:     try {
00047:         delete currentUser.password;
00048:         localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
00049:     } catch (_) {}
00050: }
00051: 
00052: function getStudentPasswordPolicyError(password, username = '') {
00053:     const value = String(password ?? '');
00054:     const normalizedUsername = String(username || '').trim().toLowerCase();
00055: 
00056:     if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
00057:     if (value.length > 128) return 'Mật khẩu tối đa 128 ký tự.';
00058:     if (/\\s/.test(value)) return 'Mật khẩu không được chứa khoảng trắng.';
00059:     if (!/[a-z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường.';
00060:     if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
00061:     if (!/\\d/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số.';
```

### lines 45-62
```js
00045: if (currentUser && Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
00046:     try {
00047:         delete currentUser.password;
00048:         localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
00049:     } catch (_) {}
00050: }
00051: 
00052: function getStudentPasswordPolicyError(password, username = '') {
00053:     const value = String(password ?? '');
00054:     const normalizedUsername = String(username || '').trim().toLowerCase();
00055: 
00056:     if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
00057:     if (value.length > 128) return 'Mật khẩu tối đa 128 ký tự.';
00058:     if (/\\s/.test(value)) return 'Mật khẩu không được chứa khoảng trắng.';
00059:     if (!/[a-z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường.';
00060:     if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
00061:     if (!/\\d/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số.';
00062:     if (!/[^A-Za-z0-9]/.test(value)) return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt.';
```

### lines 5371-5388
```js
05371:         window.location.replace('index.html');
05372:         return;
05373:     }
05374: 
05375:     Object.assign(currentUser, realUser);
05376: 
05377:     window.applyStudentStoreGameAccessState(realUser.storeGameAccessEnabled);
05378: 
05379:     // K1: Firebase Auth UID + users/<uid> là authority; password không cần ở client Học sinh.
05380:     if (Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
05381:         delete currentUser.password;
05382:     }
05383: 
05384:     localStorage.setItem(
05385:         'currentUser',
05386:         JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key))))
05387:     );
05388:     // === TỐI ƯU HÓA HIỆU SUẤT (BỘ ĐỆM CACHE) ===
```

### lines 5372-5389
```js
05372:         return;
05373:     }
05374: 
05375:     Object.assign(currentUser, realUser);
05376: 
05377:     window.applyStudentStoreGameAccessState(realUser.storeGameAccessEnabled);
05378: 
05379:     // K1: Firebase Auth UID + users/<uid> là authority; password không cần ở client Học sinh.
05380:     if (Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
05381:         delete currentUser.password;
05382:     }
05383: 
05384:     localStorage.setItem(
05385:         'currentUser',
05386:         JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key))))
05387:     );
05388:     // === TỐI ƯU HÓA HIỆU SUẤT (BỘ ĐỆM CACHE) ===
05389:     // Thay đổi từ chuỗi rỗng "" sang null để lưu trữ Object trực tiếp
```

### lines 5373-5390
```js
05373:     }
05374: 
05375:     Object.assign(currentUser, realUser);
05376: 
05377:     window.applyStudentStoreGameAccessState(realUser.storeGameAccessEnabled);
05378: 
05379:     // K1: Firebase Auth UID + users/<uid> là authority; password không cần ở client Học sinh.
05380:     if (Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
05381:         delete currentUser.password;
05382:     }
05383: 
05384:     localStorage.setItem(
05385:         'currentUser',
05386:         JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key))))
05387:     );
05388:     // === TỐI ƯU HÓA HIỆU SUẤT (BỘ ĐỆM CACHE) ===
05389:     // Thay đổi từ chuỗi rỗng "" sang null để lưu trữ Object trực tiếp
05390:     let cacheProfileSt = null, cacheUsersSt = null, cacheAssignmentsSt = null, cacheSubmissionsSt = null, cacheMaterialsSt = null;
```

### lines 5378-5395
```js
05378: 
05379:     // K1: Firebase Auth UID + users/<uid> là authority; password không cần ở client Học sinh.
05380:     if (Object.prototype.hasOwnProperty.call(currentUser, 'password')) {
05381:         delete currentUser.password;
05382:     }
05383: 
05384:     localStorage.setItem(
05385:         'currentUser',
05386:         JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key))))
05387:     );
05388:     // === TỐI ƯU HÓA HIỆU SUẤT (BỘ ĐỆM CACHE) ===
05389:     // Thay đổi từ chuỗi rỗng "" sang null để lưu trữ Object trực tiếp
05390:     let cacheProfileSt = null, cacheUsersSt = null, cacheAssignmentsSt = null, cacheSubmissionsSt = null, cacheMaterialsSt = null;
05391: 
05392:     // Hàm so sánh sâu hiệu năng cao: Không sinh rác bộ nhớ (RAM), thoát sớm ngay khi có khác biệt (CPU)
05393:     function isDeepEqual(a, b) {
05394:         if (a === b) return true;
05395:         if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') return false;
```

### lines 13423-13440
```js
13423:     // Nhận quyền Cửa hàng & Trò chơi theo từng tài khoản ngay khi
13424:     // users/<uid> thay đổi. Trường chưa tồn tại => mặc định mở.
13425:     window.applyStudentStoreGameAccessState?.(
13426:         userRecord.storeGameAccessEnabled
13427:     );
13428: 
13429:     localStorage.setItem(
13430:         'currentUser',
13431:         JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key))))
13432:     );
13433: 
13434:     const studentNameEl =
13435:         document.getElementById('studentName');
13436: 
13437:     if (studentNameEl) {
13438:         // Không dùng innerHTML với tên người dùng.
13439:         studentNameEl.textContent =
13440:             currentUser.name ||
```

### lines 13511-13528
```js
13511:     const username = String(currentUser.username || '').trim();
13512:     const newName = document.getElementById('settingName').value.trim();
13513:     const newPass = document.getElementById('settingPass').value.trim();
13514: 
13515:     if (!username) return alert('❌ Không xác định được tài khoản học sinh.');
13516:     if (!newName) return alert('Tên hiển thị trống!');
13517:     if (newName.length > 100) return alert('Tên hiển thị tối đa 100 ký tự.');
13518:     if (newPass) {
13519:         const passwordPolicyError =
13520:             getStudentPasswordPolicyError(newPass, username);
13521: 
13522:         if (passwordPolicyError) {
13523:             return alert('🔒 ' + passwordPolicyError);
13524:         }
13525:     }
13526:     if (newName === currentUser.name && !newPass) {
13527:         return alert('Chưa đổi thông tin!');
13528:     }
```

### lines 13514-13531
```js
13514: 
13515:     if (!username) return alert('❌ Không xác định được tài khoản học sinh.');
13516:     if (!newName) return alert('Tên hiển thị trống!');
13517:     if (newName.length > 100) return alert('Tên hiển thị tối đa 100 ký tự.');
13518:     if (newPass) {
13519:         const passwordPolicyError =
13520:             getStudentPasswordPolicyError(newPass, username);
13521: 
13522:         if (passwordPolicyError) {
13523:             return alert('🔒 ' + passwordPolicyError);
13524:         }
13525:     }
13526:     if (newName === currentUser.name && !newPass) {
13527:         return alert('Chưa đổi thông tin!');
13528:     }
13529: 
13530:     await cleanupStudentStaleProfileRequestLock();
13531: 
```

### lines 13515-13532
```js
13515:     if (!username) return alert('❌ Không xác định được tài khoản học sinh.');
13516:     if (!newName) return alert('Tên hiển thị trống!');
13517:     if (newName.length > 100) return alert('Tên hiển thị tối đa 100 ký tự.');
13518:     if (newPass) {
13519:         const passwordPolicyError =
13520:             getStudentPasswordPolicyError(newPass, username);
13521: 
13522:         if (passwordPolicyError) {
13523:             return alert('🔒 ' + passwordPolicyError);
13524:         }
13525:     }
13526:     if (newName === currentUser.name && !newPass) {
13527:         return alert('Chưa đổi thông tin!');
13528:     }
13529: 
13530:     await cleanupStudentStaleProfileRequestLock();
13531: 
13532:     // Kiểm tra request legacy trước khi chiếm lock để không tạo request mới
```

### lines 14052-14069
```js
14052:                 transaction.snapshot.val() || {
14053:                     date: birthDate,
14054:                     enteredBy: 'student',
14055:                     enteredAt: Date.now()
14056:                 };
14057: 
14058:             localStorage.setItem(
14059:                 'currentUser',
14060:                 JSON.stringify(Object.fromEntries(Object.entries(currentUser).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key))))
14061:             );
14062: 
14063:             window
14064:                 .renderStudentBirthdayProfile();
14065: 
14066:             alert(
14067:                 `✅ Đã lưu ngày sinh ${formatted}.\n` +
14068:                 'Đến đúng ngày sinh, hệ thống sẽ gửi ' +
14069:                 '1 Xu Sinh Nhật của năm đó qua Hộp thư.'
```

# js/teacher.js

## pattern `password` — 39 hits

### lines 1-18
```js
00001: const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
00002: 
00003: // ======================================================
00004: // SECURITY GUARD K · DANGEROUS ACTION REAUTH + PASSWORD POLICY
00005: // ======================================================
00006: window.__SECURITY_GUARD_TEACHER_BUILD = '20260918.v1-K6-K7';
00007: console.info('[Security Guard Teacher]', window.__SECURITY_GUARD_TEACHER_BUILD);
00008: 
00009: function getTeacherManagedPasswordPolicyError(password, username = '') {
00010:     const value = String(password ?? '');
00011:     const normalizedUsername = String(username || '').trim().toLowerCase();
00012: 
00013:     if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
00014:     if (value.length > 128) return 'Mật khẩu tối đa 128 ký tự.';
00015:     if (/\\s/.test(value)) return 'Mật khẩu không được chứa khoảng trắng.';
00016:     if (!/[a-z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường.';
00017:     if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
00018:     if (!/\\d/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số.';
```

### lines 2-19
```js
00002: 
00003: // ======================================================
00004: // SECURITY GUARD K · DANGEROUS ACTION REAUTH + PASSWORD POLICY
00005: // ======================================================
00006: window.__SECURITY_GUARD_TEACHER_BUILD = '20260918.v1-K6-K7';
00007: console.info('[Security Guard Teacher]', window.__SECURITY_GUARD_TEACHER_BUILD);
00008: 
00009: function getTeacherManagedPasswordPolicyError(password, username = '') {
00010:     const value = String(password ?? '');
00011:     const normalizedUsername = String(username || '').trim().toLowerCase();
00012: 
00013:     if (value.length < 10) return 'Mật khẩu phải có ít nhất 10 ký tự.';
00014:     if (value.length > 128) return 'Mật khẩu tối đa 128 ký tự.';
00015:     if (/\\s/.test(value)) return 'Mật khẩu không được chứa khoảng trắng.';
00016:     if (!/[a-z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường.';
00017:     if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa.';
00018:     if (!/\\d/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số.';
00019:     if (!/[^A-Za-z0-9]/.test(value)) return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt.';
```

### lines 11180-11197
```js
11180:                     </label>
11181:                     <label class="student-account-checkbox student-account-checkbox--store-game" title="Tắt để ẩn Cửa hàng và Trò chơi ở tài khoản học sinh này" style="display:inline-flex !important; flex-direction:row !important; align-items:center !important; gap:7px !important; width:auto !important; margin:0 !important; color:#6d28d9; font-size:.85em; font-weight:800; white-space:nowrap; cursor:pointer;">
11182:                         <input type="checkbox" ${storeGameAccessChecked} onchange="toggleStudentStoreGameAccess('${st._fbKey}', this.checked, this)" style="appearance:auto !important; -webkit-appearance:checkbox !important; display:inline-block !important; position:static !important; flex:0 0 17px !important; width:17px !important; min-width:17px !important; max-width:17px !important; height:17px !important; min-height:17px !important; max-height:17px !important; margin:0 !important; padding:0 !important; accent-color:#7c3aed !important; transform:none !important;">
11183:                         <span style="display:inline !important; width:auto !important; margin:0 !important; padding:0 !important;">🛒🎮 Cửa hàng &amp; Trò chơi</span>
11184:                     </label>
11185:                 </div>
11186:             </td>
11187:             <td style="padding:12px;">${st.username}</td>
11188:             <td style="padding:12px;">${st.password}</td>
11189: 
11190:             <td style="
11191:     padding:12px;
11192:     white-space:nowrap;
11193:     color:${birthDate ? '#be185d' : '#94a3b8'};
11194:     font-weight:${birthDate ? '700' : '400'};
11195: ">
11196:     ${birthDate ? '🎂 ' : ''}${birthDateDisplay}
11197: </td>
```

### lines 11212-11229
```js
11212: 
11213: window.toggleLockStudent = async function (userKey, isCurrentlyLocked) {
11214:     const actionText = isCurrentlyLocked ? "MỞ KHÓA" : "KHÓA TẠM THỜI"; if (!confirm(`Bạn có chắc chắn muốn ${actionText} tài khoản này không?`)) return;
11215:     await updateDB('users', userKey, { isLocked: !isCurrentlyLocked }); alert(`✅ Đã ${actionText.toLowerCase()} tài khoản thành công!`);
11216: }
11217: 
11218: async function tryDeleteGhostStudentAuth(
11219:     email,
11220:     password
11221: ) {
11222:     const secondaryAuth =
11223:         secondaryApp.auth();
11224: 
11225:     try {
11226:         await secondaryAuth
11227:             .signOut()
11228:             .catch(() => { });
11229: 
```

### lines 11226-11243
```js
11226:         await secondaryAuth
11227:             .signOut()
11228:             .catch(() => { });
11229: 
11230:         const credential =
11231:             await secondaryAuth
11232:                 .signInWithEmailAndPassword(
11233:                     email,
11234:                     password
11235:                 );
11236: 
11237:         /*
11238:          * Cực kỳ quan trọng:
11239:          * Chỉ coi là "bóng ma" khi UID Auth
11240:          * thực sự KHÔNG còn tồn tại trong users/.
11241:          */
11242:         const userSnap =
11243:             await db
```

### lines 11281-11298
```js
11281:     }
11282: }
11283: 
11284: async function createStudent() {
11285:     const username = document
11286:         .getElementById('newStudentUsername')
11287:         .value.trim();
11288: 
11289:     const password = document
11290:         .getElementById('newStudentPassword')
11291:         .value.trim();
11292: 
11293:     const name = document
11294:         .getElementById('newStudentName')
11295:         .value.trim();
11296: 
11297:     const classInfo = document
11298:         .getElementById('newStudentClass')
```

### lines 11309-11326
```js
11309:     const motto = document
11310:         .getElementById('newStudentMotto')
11311:         .value.trim();
11312: 
11313:     // ==========================================
11314:     // KIỂM TRA DỮ LIỆU ĐẦU VÀO
11315:     // ==========================================
11316: 
11317:     if (!username || !password || !name) {
11318:         return alert(
11319:             '⚠️ Vui lòng điền đủ Tên đăng nhập, Mật khẩu và Họ tên!'
11320:         );
11321:     }
11322: 
11323:     // Kiểm tra tên đăng nhập
11324:     const usernameRegex = /^[a-zA-Z0-9_]+$/;
11325: 
11326:     if (!usernameRegex.test(username)) {
```

### lines 11333-11350
```js
11333: 
11334:     if (username.length < 2) {
11335:         return alert(
11336:             '⚠️ Tên đăng nhập phải có ít nhất 2 ký tự!'
11337:         );
11338:     }
11339: 
11340:     // K7: chính sách mật khẩu mạnh cho tài khoản mới.
11341:     const passwordPolicyError =
11342:         getTeacherManagedPasswordPolicyError(password, username);
11343: 
11344:     if (passwordPolicyError) {
11345:         return alert('🔒 ' + passwordPolicyError);
11346:     }
11347: 
11348:     // Kiểm tra họ tên
11349:     const nameHasNumbers = /\d/.test(name);
11350: 
```

### lines 11334-11351
```js
11334:     if (username.length < 2) {
11335:         return alert(
11336:             '⚠️ Tên đăng nhập phải có ít nhất 2 ký tự!'
11337:         );
11338:     }
11339: 
11340:     // K7: chính sách mật khẩu mạnh cho tài khoản mới.
11341:     const passwordPolicyError =
11342:         getTeacherManagedPasswordPolicyError(password, username);
11343: 
11344:     if (passwordPolicyError) {
11345:         return alert('🔒 ' + passwordPolicyError);
11346:     }
11347: 
11348:     // Kiểm tra họ tên
11349:     const nameHasNumbers = /\d/.test(name);
11350: 
11351:     if (nameHasNumbers) {
```

### lines 11336-11353
```js
11336:             '⚠️ Tên đăng nhập phải có ít nhất 2 ký tự!'
11337:         );
11338:     }
11339: 
11340:     // K7: chính sách mật khẩu mạnh cho tài khoản mới.
11341:     const passwordPolicyError =
11342:         getTeacherManagedPasswordPolicyError(password, username);
11343: 
11344:     if (passwordPolicyError) {
11345:         return alert('🔒 ' + passwordPolicyError);
11346:     }
11347: 
11348:     // Kiểm tra họ tên
11349:     const nameHasNumbers = /\d/.test(name);
11350: 
11351:     if (nameHasNumbers) {
11352:         return alert(
11353:             '⚠️ Họ tên học sinh không được chứa chữ số!'
```

### lines 11337-11354
```js
11337:         );
11338:     }
11339: 
11340:     // K7: chính sách mật khẩu mạnh cho tài khoản mới.
11341:     const passwordPolicyError =
11342:         getTeacherManagedPasswordPolicyError(password, username);
11343: 
11344:     if (passwordPolicyError) {
11345:         return alert('🔒 ' + passwordPolicyError);
11346:     }
11347: 
11348:     // Kiểm tra họ tên
11349:     const nameHasNumbers = /\d/.test(name);
11350: 
11351:     if (nameHasNumbers) {
11352:         return alert(
11353:             '⚠️ Họ tên học sinh không được chứa chữ số!'
11354:         );
```

### lines 11386-11403
```js
11386:         let userCredential;
11387: 
11388:         try {
11389:             userCredential =
11390:                 await secondaryApp
11391:                     .auth()
11392:                     .createUserWithEmailAndPassword(
11393:                         fakeEmail,
11394:                         password
11395:                     );
11396: 
11397:         } catch (authError) {
11398: 
11399:             if (
11400:                 authError.code ===
11401:                 'auth/email-already-in-use'
11402:             ) {
11403:                 /*
```

### lines 11404-11421
```js
11404:                  * Có Auth nhưng Database bên trên vừa kiểm tra
11405:                  * không có username này.
11406:                  *
11407:                  * Thử xác định và dọn Auth bóng ma.
11408:                  */
11409:                 const cleanupResult =
11410:                     await tryDeleteGhostStudentAuth(
11411:                         fakeEmail,
11412:                         password
11413:                     );
11414: 
11415:                 if (cleanupResult.deleted) {
11416:                     console.log(
11417:                         '✅ Đã tự động xóa tài khoản Auth bóng ma:',
11418:                         fakeEmail
11419:                     );
11420: 
11421:                     // Tạo lại Auth sạch
```

### lines 11419-11436
```js
11419:                     );
11420: 
11421:                     // Tạo lại Auth sạch
11422:                     userCredential =
11423:                         await secondaryApp
11424:                             .auth()
11425:                             .createUserWithEmailAndPassword(
11426:                                 fakeEmail,
11427:                                 password
11428:                             );
11429: 
11430:                 } else if (
11431:                     cleanupResult.code ===
11432:                     'AUTH_HAS_DATABASE_USER'
11433:                 ) {
11434:                     throw new Error(
11435:                         'Tài khoản Authentication này vẫn có dữ liệu người dùng trong hệ thống.'
11436:                     );
```

### lines 11432-11449
```js
11432:                     'AUTH_HAS_DATABASE_USER'
11433:                 ) {
11434:                     throw new Error(
11435:                         'Tài khoản Authentication này vẫn có dữ liệu người dùng trong hệ thống.'
11436:                     );
11437: 
11438:                 } else if (
11439:                     cleanupResult.code ===
11440:                     'auth/wrong-password' ||
11441:                     cleanupResult.code ===
11442:                     'auth/invalid-credential' ||
11443:                     cleanupResult.code ===
11444:                     'auth/invalid-login-credentials'
11445:                 ) {
11446:                     throw new Error(
11447:                         'Phát hiện tài khoản Auth bóng ma nhưng mật khẩu hiện tại không khớp. ' +
11448:                         'Không thể tự động xóa tài khoản Auth này từ trình duyệt.'
11449:                     );
```

### lines 11459-11476
```js
11459:         }
11460: 
11461:         const newUid =
11462:             userCredential.user.uid;
11463: 
11464:         // Dữ liệu học sinh cần lưu
11465:         const studentData = {
11466:             username,
11467:             password,
11468:             name,
11469:             role: 'student',
11470:             isLocked: false,
11471:             // Mặc định cho phép học sinh sử dụng Cửa hàng và Trò chơi.
11472:             storeGameAccessEnabled: true,
11473:             classInfo,
11474:             hobbies,
11475:             motto
11476:         };
```

### lines 11644-11661
```js
11644:         const studentSnap = await db.ref(`users/${uid}`).once('value');
11645: 
11646:         if (!studentSnap.exists()) {
11647:             throw new Error("Không tìm thấy dữ liệu học sinh trên hệ thống.");
11648:         }
11649: 
11650:         const student = studentSnap.val();
11651:         const username = student.username;
11652:         const password = student.password;
11653:         const email = `${username}@hethong.edu.vn`;
11654: 
11655:         if (!username) {
11656:             throw new Error("Dữ liệu học sinh bị lỗi (Thiếu tên đăng nhập).");
11657:         }
11658: 
11659:         const confirmed = confirm(
11660:             `⚠️ Bạn có chắc chắn muốn xóa TẬN GỐC học sinh [${username}] không?\n` +
11661:             `Hành động này không thể hoàn tác.`
```

### lines 11675-11692
```js
11675:         const [assignmentsSnap, submissionsSnap] = await Promise.all([
11676:             db.ref('assignments').once('value'),
11677:             db.ref('submissions').orderByChild('studentUsername').equalTo(username).once('value')
11678:         ]);
11679: 
11680:         let authDeleteSuccess = false;
11681: 
11682:         // 3. Xóa Auth trước. Nếu thất bại thì hủy toàn bộ bước xóa Database.
11683:         if (!password) {
11684:             throw new Error(
11685:                 'Không có mật khẩu học sinh trong dữ liệu legacy để xác thực Auth. Dữ liệu chưa bị xóa.'
11686:             );
11687:         }
11688: 
11689:         try {
11690:             const secondaryAuth = secondaryApp.auth();
11691:             await secondaryAuth.signOut().catch(() => {});
11692: 
```

### lines 11685-11702
```js
11685:                 'Không có mật khẩu học sinh trong dữ liệu legacy để xác thực Auth. Dữ liệu chưa bị xóa.'
11686:             );
11687:         }
11688: 
11689:         try {
11690:             const secondaryAuth = secondaryApp.auth();
11691:             await secondaryAuth.signOut().catch(() => {});
11692: 
11693:             const credential = await secondaryAuth.signInWithEmailAndPassword(email, password);
11694:             if (!credential.user || credential.user.uid !== uid) {
11695:                 await secondaryAuth.signOut().catch(() => {});
11696:                 throw new Error('UID tài khoản Auth không khớp.');
11697:             }
11698: 
11699:             await credential.user.delete();
11700:             authDeleteSuccess = true;
11701:         } catch (authError) {
11702:             await secondaryApp.auth().signOut().catch(() => {});
```

### lines 11936-11953
```js
11936:     }
11937: }
11938: 
11939: async function changeStudentPasswordWithCurrentCredential(username, newPass) {
11940:     let record = await getTeacherProfileUserRecord(username);
11941:     if (!record) throw new Error('PROFILE_USER_NOT_FOUND');
11942: 
11943:     const fakeEmail = `${username}@hethong.edu.vn`;
11944:     let attemptedPassword = String(record.password || '');
11945: 
11946:     if (!attemptedPassword) {
11947:         const error = new Error('PROFILE_CURRENT_PASSWORD_MISSING');
11948:         error.code = 'profile/current-password-missing';
11949:         throw error;
11950:     }
11951: 
11952:     const tryChange = async oldPass => {
11953:         await secondaryApp.auth().signOut().catch(() => {});
```

### lines 11940-11957
```js
11940:     let record = await getTeacherProfileUserRecord(username);
11941:     if (!record) throw new Error('PROFILE_USER_NOT_FOUND');
11942: 
11943:     const fakeEmail = `${username}@hethong.edu.vn`;
11944:     let attemptedPassword = String(record.password || '');
11945: 
11946:     if (!attemptedPassword) {
11947:         const error = new Error('PROFILE_CURRENT_PASSWORD_MISSING');
11948:         error.code = 'profile/current-password-missing';
11949:         throw error;
11950:     }
11951: 
11952:     const tryChange = async oldPass => {
11953:         await secondaryApp.auth().signOut().catch(() => {});
11954:         const credential = await secondaryApp.auth()
11955:             .signInWithEmailAndPassword(fakeEmail, oldPass);
11956:         try {
11957:             await credential.user.updatePassword(newPass);
```

### lines 11961-11978
```js
11961:         return oldPass;
11962:     };
11963: 
11964:     try {
11965:         const oldPassword = await tryChange(attemptedPassword);
11966:         return { oldPassword, userRecord: record };
11967:     } catch (firstError) {
11968:         const retryCodes = new Set([
11969:             'auth/wrong-password',
11970:             'auth/invalid-credential',
11971:             'auth/user-mismatch'
11972:         ]);
11973: 
11974:         if (!retryCodes.has(String(firstError?.code || ''))) {
11975:             throw firstError;
11976:         }
11977: 
11978:         // Có thể một request cũ vừa đổi Auth/DB. Đọc lại record MỚI NHẤT
```

### lines 11973-11990
```js
11973: 
11974:         if (!retryCodes.has(String(firstError?.code || ''))) {
11975:             throw firstError;
11976:         }
11977: 
11978:         // Có thể một request cũ vừa đổi Auth/DB. Đọc lại record MỚI NHẤT
11979:         // rồi thử đúng một lần nữa.
11980:         const refreshed = await getTeacherProfileUserRecord(username);
11981:         const refreshedPassword = String(refreshed?.password || '');
11982: 
11983:         if (!refreshed || !refreshedPassword || refreshedPassword === attemptedPassword) {
11984:             throw firstError;
11985:         }
11986: 
11987:         const oldPassword = await tryChange(refreshedPassword);
11988:         return { oldPassword, userRecord: refreshed };
11989:     }
11990: }
```

### lines 12113-12130
```js
12113:         // Tương thích request legacy: nếu chưa có secret thì đọc newPass cũ.
12114:         const newPass = String(
12115:             secret.newPass || request.newPass || ''
12116:         );
12117:         const newName = String(request.newName || '').trim();
12118: 
12119:         if (!newName) throw new Error('PROFILE_NEW_NAME_EMPTY');
12120:         if (newPass) {
12121:             const passwordPolicyError =
12122:                 getTeacherManagedPasswordPolicyError(newPass, username);
12123:             if (passwordPolicyError) {
12124:                 throw new Error('PROFILE_NEW_PASSWORD_WEAK: ' + passwordPolicyError);
12125:             }
12126:         }
12127: 
12128:         let latestUser = await getTeacherProfileUserRecord(username);
12129:         if (!latestUser) throw new Error('PROFILE_USER_NOT_FOUND');
12130: 
```

### lines 12115-12132
```js
12115:             secret.newPass || request.newPass || ''
12116:         );
12117:         const newName = String(request.newName || '').trim();
12118: 
12119:         if (!newName) throw new Error('PROFILE_NEW_NAME_EMPTY');
12120:         if (newPass) {
12121:             const passwordPolicyError =
12122:                 getTeacherManagedPasswordPolicyError(newPass, username);
12123:             if (passwordPolicyError) {
12124:                 throw new Error('PROFILE_NEW_PASSWORD_WEAK: ' + passwordPolicyError);
12125:             }
12126:         }
12127: 
12128:         let latestUser = await getTeacherProfileUserRecord(username);
12129:         if (!latestUser) throw new Error('PROFILE_USER_NOT_FOUND');
12130: 
12131:         let authChanged = false;
12132:         let authOldPassword = '';
```

### lines 12116-12133
```js
12116:         );
12117:         const newName = String(request.newName || '').trim();
12118: 
12119:         if (!newName) throw new Error('PROFILE_NEW_NAME_EMPTY');
12120:         if (newPass) {
12121:             const passwordPolicyError =
12122:                 getTeacherManagedPasswordPolicyError(newPass, username);
12123:             if (passwordPolicyError) {
12124:                 throw new Error('PROFILE_NEW_PASSWORD_WEAK: ' + passwordPolicyError);
12125:             }
12126:         }
12127: 
12128:         let latestUser = await getTeacherProfileUserRecord(username);
12129:         if (!latestUser) throw new Error('PROFILE_USER_NOT_FOUND');
12130: 
12131:         let authChanged = false;
12132:         let authOldPassword = '';
12133: 
```

### lines 12157-12174
```js
12157:                     '⚠️ Mật khẩu Auth hiện tại không còn khớp dữ liệu hệ thống. ' +
12158:                     'Request đã được đánh dấu xung đột; học sinh cần đăng nhập lại và gửi yêu cầu mới.'
12159:                 );
12160:             }
12161:         }
12162: 
12163:         try {
12164:             const updateData = { name: newName };
12165:             if (newPass) updateData.password = newPass;
12166: 
12167:             await db.ref(`users/${latestUser._fbKey}`).update(updateData);
12168:         } catch (dbError) {
12169:             if (authChanged) {
12170:                 const rolledBack = await rollbackStudentAuthPassword(
12171:                     username,
12172:                     newPass,
12173:                     authOldPassword
12174:                 );
```

### lines 12257-12274
```js
12257:                     return alert("⚠️ Bảo mật Firebase yêu cầu: Bạn cần đăng xuất và đăng nhập lại trước khi đổi mật khẩu!");
12258:                 }
12259:                 return alert("❌ Lỗi cập nhật Auth: " + error.message);
12260:             }
12261:         }
12262: 
12263:         // 2. KHI AUTH THÀNH CÔNG, LƯU VÀO DATABASE
12264:         const updateData = { name: newName };
12265:         if (newPass) updateData.password = newPass;
12266:         await updateDB('users', userRecord._fbKey, updateData);
12267: 
12268:         currentUser.name = newName;
12269:         if (newPass) currentUser.password = newPass;
12270:         localStorage.setItem('currentUser', JSON.stringify(currentUser));
12271: 
12272:         alert("✅ Cập nhật thông tin thành công!");
12273:         document.getElementById('settingPass').value = '';
12274:     }
```

### lines 12261-12278
```js
12261:         }
12262: 
12263:         // 2. KHI AUTH THÀNH CÔNG, LƯU VÀO DATABASE
12264:         const updateData = { name: newName };
12265:         if (newPass) updateData.password = newPass;
12266:         await updateDB('users', userRecord._fbKey, updateData);
12267: 
12268:         currentUser.name = newName;
12269:         if (newPass) currentUser.password = newPass;
12270:         localStorage.setItem('currentUser', JSON.stringify(currentUser));
12271: 
12272:         alert("✅ Cập nhật thông tin thành công!");
12273:         document.getElementById('settingPass').value = '';
12274:     }
12275: }
12276: 
12277: // ======================================================
12278: // THU GỌN / MỞ RỘNG THẺ NGÂN HÀNG CÂU HỎI
```

### lines 14833-14850
```js
14833: 
14834:     document.getElementById('editStudentModal').classList.add('active');
14835: };
14836: window.closeEditStudentModal = function () { document.getElementById('editStudentModal').classList.remove('active'); };
14837: 
14838: window.saveStudentEdit = async function () {
14839:     const fbKey = document.getElementById('editStudentKey').value;
14840:     const name = document.getElementById('editStudentName').value.trim();
14841:     const password = document.getElementById('editStudentPassword').value.trim();
14842:     const classInfo = document.getElementById('editStudentClass').value.trim();
14843:     const birthDate = document
14844:         .getElementById('editStudentBirthDate')
14845:         .value.trim();
14846:     const hobbies = document.getElementById('editStudentHobbies').value.trim();
14847:     const motto = document.getElementById('editStudentMotto').value.trim();
14848: 
14849:     if (!name) return alert('Họ tên không được để trống!');
14850: 
```

### lines 14895-14912
```js
14895:         // Xóa trường ngày sinh kiểu cũ.
14896:         updateObj.birthDate = null;
14897:     } else {
14898:         updateObj.birthdayProfile = null;
14899:         updateObj.birthDate = null;
14900:     }
14901: 
14902:     // NẾU GIÁO VIÊN CÓ NHẬP MẬT KHẨU MỚI
14903:     if (password) {
14904:         try {
14905:             const users = await getDB('users');
14906:             const st = users.find(u => u._fbKey === fbKey);
14907: 
14908:             if (st) {
14909:                 const fakeEmail = st.username + "@hethong.edu.vn";
14910:                 const oldPass = st.password;
14911: 
14912:                 // Đăng nhập ngầm và đổi pass
```

### lines 14902-14919
```js
14902:     // NẾU GIÁO VIÊN CÓ NHẬP MẬT KHẨU MỚI
14903:     if (password) {
14904:         try {
14905:             const users = await getDB('users');
14906:             const st = users.find(u => u._fbKey === fbKey);
14907: 
14908:             if (st) {
14909:                 const fakeEmail = st.username + "@hethong.edu.vn";
14910:                 const oldPass = st.password;
14911: 
14912:                 // Đăng nhập ngầm và đổi pass
14913:                 const userCredential = await secondaryApp.auth().signInWithEmailAndPassword(fakeEmail, oldPass);
14914:                 await userCredential.user.updatePassword(password);
14915:                 await secondaryApp.auth().signOut();
14916: 
14917:                 updateObj.password = password;
14918:             }
14919:         } catch (error) {
```

### lines 14906-14923
```js
14906:             const st = users.find(u => u._fbKey === fbKey);
14907: 
14908:             if (st) {
14909:                 const fakeEmail = st.username + "@hethong.edu.vn";
14910:                 const oldPass = st.password;
14911: 
14912:                 // Đăng nhập ngầm và đổi pass
14913:                 const userCredential = await secondaryApp.auth().signInWithEmailAndPassword(fakeEmail, oldPass);
14914:                 await userCredential.user.updatePassword(password);
14915:                 await secondaryApp.auth().signOut();
14916: 
14917:                 updateObj.password = password;
14918:             }
14919:         } catch (error) {
14920:             console.error("Lỗi Auth phụ khi sửa HS:", error);
14921:             return alert("❌ Lỗi khi đổi mật khẩu trên hệ thống Auth: " + error.message);
14922:         }
14923:     }
```

### lines 14909-14926
```js
14909:                 const fakeEmail = st.username + "@hethong.edu.vn";
14910:                 const oldPass = st.password;
14911: 
14912:                 // Đăng nhập ngầm và đổi pass
14913:                 const userCredential = await secondaryApp.auth().signInWithEmailAndPassword(fakeEmail, oldPass);
14914:                 await userCredential.user.updatePassword(password);
14915:                 await secondaryApp.auth().signOut();
14916: 
14917:                 updateObj.password = password;
14918:             }
14919:         } catch (error) {
14920:             console.error("Lỗi Auth phụ khi sửa HS:", error);
14921:             return alert("❌ Lỗi khi đổi mật khẩu trên hệ thống Auth: " + error.message);
14922:         }
14923:     }
14924: 
14925:     await updateDB('users', fbKey, updateObj);
14926:     closeEditStudentModal();
```

### lines 20137-20154
```js
20137:         alert('❌ Không thể xóa lịch mùa giải.');
20138:     }
20139: };
20140: 
20141: window.changeTeacherPassword = async function () {
20142:     const newPassword = document.getElementById('newPasswordInput').value.trim();
20143:     const confirmPassword = document.getElementById('confirmPasswordInput').value.trim();
20144: 
20145:     const passwordPolicyError =
20146:         getTeacherManagedPasswordPolicyError(
20147:             newPassword,
20148:             currentUser.username || ''
20149:         );
20150: 
20151:     if (!newPassword || passwordPolicyError) {
20152:         return alert(
20153:             '⚠️ ' + (passwordPolicyError || 'Vui lòng nhập mật khẩu mới.')
20154:         );
```

### lines 20143-20160
```js
20143:     const confirmPassword = document.getElementById('confirmPasswordInput').value.trim();
20144: 
20145:     const passwordPolicyError =
20146:         getTeacherManagedPasswordPolicyError(
20147:             newPassword,
20148:             currentUser.username || ''
20149:         );
20150: 
20151:     if (!newPassword || passwordPolicyError) {
20152:         return alert(
20153:             '⚠️ ' + (passwordPolicyError || 'Vui lòng nhập mật khẩu mới.')
20154:         );
20155:     }
20156:     if (newPassword !== confirmPassword) {
20157:         return alert("❌ Mật khẩu xác nhận không khớp!");
20158:     }
20159: 
20160:     try {
```

### lines 20145-20162
```js
20145:     const passwordPolicyError =
20146:         getTeacherManagedPasswordPolicyError(
20147:             newPassword,
20148:             currentUser.username || ''
20149:         );
20150: 
20151:     if (!newPassword || passwordPolicyError) {
20152:         return alert(
20153:             '⚠️ ' + (passwordPolicyError || 'Vui lòng nhập mật khẩu mới.')
20154:         );
20155:     }
20156:     if (newPassword !== confirmPassword) {
20157:         return alert("❌ Mật khẩu xác nhận không khớp!");
20158:     }
20159: 
20160:     try {
20161:         const user = firebase.auth().currentUser;
20162:         if (user) {
```

### lines 20160-20177
```js
20160:     try {
20161:         const user = firebase.auth().currentUser;
20162:         if (user) {
20163:             // 1. Cập nhật trên Firebase Authentication
20164:             await user.updatePassword(newPassword);
20165: 
20166:             // 2. Cập nhật vào Realtime Database để đồng bộ với dữ liệu cũ của bạn
20167:             await db.ref('users/' + currentUser._fbKey).update({
20168:                 password: newPassword
20169:             });
20170: 
20171:             // 3. Cập nhật lại localStorage để tránh bị lỗi khi tải lại trang
20172:             currentUser.password = newPassword;
20173:             localStorage.setItem('currentUser', JSON.stringify(currentUser));
20174: 
20175:             alert("✅ Đổi mật khẩu thành công! Hãy nhớ mật khẩu mới của bạn.");
20176:             // Reset ô nhập
20177:             document.getElementById('newPasswordInput').value = '';
```

### lines 20164-20181
```js
20164:             await user.updatePassword(newPassword);
20165: 
20166:             // 2. Cập nhật vào Realtime Database để đồng bộ với dữ liệu cũ của bạn
20167:             await db.ref('users/' + currentUser._fbKey).update({
20168:                 password: newPassword
20169:             });
20170: 
20171:             // 3. Cập nhật lại localStorage để tránh bị lỗi khi tải lại trang
20172:             currentUser.password = newPassword;
20173:             localStorage.setItem('currentUser', JSON.stringify(currentUser));
20174: 
20175:             alert("✅ Đổi mật khẩu thành công! Hãy nhớ mật khẩu mới của bạn.");
20176:             // Reset ô nhập
20177:             document.getElementById('newPasswordInput').value = '';
20178:             document.getElementById('confirmPasswordInput').value = '';
20179:         } else {
20180:             alert("❌ Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại!");
20181:         }
```

## pattern `question_bank` — 3 hits

### lines 12279-12296
```js
12279: // Hoạt động độc lập với biểu mẫu Giao bài tập mới.
12280: // ======================================================
12281: 
12282: function getTeacherQuestionBankShortcutStorageKey() {
12283:     const username = String(
12284:         currentUser?.username || 'teacher'
12285:     ).trim();
12286: 
12287:     return `teacher_question_bank_shortcut_open:${username}`;
12288: }
12289: 
12290: window.setTeacherQuestionBankShortcutOpen = function (
12291:     isOpen,
12292:     shouldPersist = true
12293: ) {
12294:     const panel = document.getElementById(
12295:         'teacherQuestionBankShortcutPanel'
12296:     );
```

### lines 20190-20207
```js
20190: 
20191: // ==========================================================
20192: // NGÂN HÀNG CÂU HỎI VÀ ĐỀ NGẪU NHIÊN
20193: // ==========================================================
20194: (function initQuestionBankModule() {
20195:     // Đường dẫn chuẩn của Ngân hàng câu hỏi
20196:     const QB_PATH = 'questionBank';
20197: 
20198:     // Tương thích dữ liệu từng bị lưu nhầm vào question_bank
20199:     const LEGACY_QB_PATH = 'question_bank';
20200: 
20201:     const LETTERS = ['A', 'B', 'C', 'D'];
20202: 
20203:     window.questionBankCache =
20204:         window.questionBankCache || [];
20205: 
20206:     window.questionBankPage =
20207:         window.questionBankPage || 1;
```

### lines 20191-20208
```js
20191: // ==========================================================
20192: // NGÂN HÀNG CÂU HỎI VÀ ĐỀ NGẪU NHIÊN
20193: // ==========================================================
20194: (function initQuestionBankModule() {
20195:     // Đường dẫn chuẩn của Ngân hàng câu hỏi
20196:     const QB_PATH = 'questionBank';
20197: 
20198:     // Tương thích dữ liệu từng bị lưu nhầm vào question_bank
20199:     const LEGACY_QB_PATH = 'question_bank';
20200: 
20201:     const LETTERS = ['A', 'B', 'C', 'D'];
20202: 
20203:     window.questionBankCache =
20204:         window.questionBankCache || [];
20205: 
20206:     window.questionBankPage =
20207:         window.questionBankPage || 1;
20208: 
```

## pattern `renderStudentRoadmap` — 7 hits

### lines 3502-3519
```js
03502:         runTeacherStartupStage('teacher-cash-requests', 'Yêu cầu rút tiền', () => typeof loadTeacherCashRequests === 'function' ? loadTeacherCashRequests() : Promise.resolve())
03503:     ]);
03504:     await populateStudentDropdown();
03505:     await populateRoadmapStudentDropdown();
03506:     if (startupLoader) startupLoader.markReady('teacher-dropdowns');
03507:     if (typeof initTicketManagement === 'function') await initTicketManagement();
03508:     if (startupLoader) startupLoader.markReady('teacher-ticket-management');
03509:     if (document.getElementById('teacherRoadmapBody')) renderTeacherRoadmap();
03510:     if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03511: 
03512:     // ==========================================
03513:     // PHẦN 2: LẮNG NGHE DỮ LIỆU NẶNG BẰNG DEBOUNCE
03514:     // Gom các thay đổi liên tục trong 1.5 giây thành 1 lần render duy nhất
03515:     // Bỏ hoàn toàn JSON.stringify cache vì nó ngốn quá nhiều CPU
03516:     // ==========================================
03517:     const renderSubmissions = debounce(async () => {
03518:         // Không getDB('submissions') toàn bộ nữa; loadSubmissions tự phân trang 20 bài/lần.
03519:         await loadSubmissions(false);
```

### lines 3512-3529
```js
03512:     // ==========================================
03513:     // PHẦN 2: LẮNG NGHE DỮ LIỆU NẶNG BẰNG DEBOUNCE
03514:     // Gom các thay đổi liên tục trong 1.5 giây thành 1 lần render duy nhất
03515:     // Bỏ hoàn toàn JSON.stringify cache vì nó ngốn quá nhiều CPU
03516:     // ==========================================
03517:     const renderSubmissions = debounce(async () => {
03518:         // Không getDB('submissions') toàn bộ nữa; loadSubmissions tự phân trang 20 bài/lần.
03519:         await loadSubmissions(false);
03520:         if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03521:     }, 1500);
03522: 
03523:     const renderAssignments = debounce(async () => {
03524:         // Không getDB('assignments') toàn bộ nữa; loadAssignedList tự phân trang 20 bài/lần.
03525:         await loadAssignedList(false);
03526:         if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03527:     }, 1500);
03528: 
03529:     const renderUsers = debounce(async () => {
```

### lines 3518-3535
```js
03518:         // Không getDB('submissions') toàn bộ nữa; loadSubmissions tự phân trang 20 bài/lần.
03519:         await loadSubmissions(false);
03520:         if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03521:     }, 1500);
03522: 
03523:     const renderAssignments = debounce(async () => {
03524:         // Không getDB('assignments') toàn bộ nữa; loadAssignedList tự phân trang 20 bài/lần.
03525:         await loadAssignedList(false);
03526:         if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03527:     }, 1500);
03528: 
03529:     const renderUsers = debounce(async () => {
03530:         await loadStudentsList();
03531:         await populateStudentDropdown();
03532:         await populateRoadmapStudentDropdown();
03533:         if (document.getElementById('teacherRoadmapBody')) renderTeacherRoadmap();
03534:     }, 1500);
03535: 
```

### lines 3544-3561
```js
03544:         if (window.cachedSubmissions) {
03545:             const idx = window.cachedSubmissions.findIndex(s => s._fbKey === updatedSub._fbKey || s.id === updatedSub.id);
03546:             if (idx !== -1) {
03547:                 window.cachedSubmissions[idx] = updatedSub;
03548:             }
03549:         }
03550: 
03551:         // Chỉ cập nhật giao diện nhỏ của Lộ trình học tập (Roadmap) nếu đang mở
03552:         if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03553:         if (document.getElementById('teacherRoadmapBody')) renderTeacherRoadmap();
03554:         if (startupLoader) startupLoader.markReady('teacher-roadmap-settings');
03555:     });
03556: 
03557:     // 2. Chỉ lắng nghe khi bài tập có sự thay đổi cấu hình
03558:     listenFirebase(db.ref('assignments'), 'child_changed', async (snapshot) => {
03559:         window.invalidateTeacherListSearchCache?.('assignments');
03560:         const updatedAssign = { _fbKey: snapshot.key, ...snapshot.val() };
03561:         if (window.cachedAssignments) {
```

### lines 3557-3574
```js
03557:     // 2. Chỉ lắng nghe khi bài tập có sự thay đổi cấu hình
03558:     listenFirebase(db.ref('assignments'), 'child_changed', async (snapshot) => {
03559:         window.invalidateTeacherListSearchCache?.('assignments');
03560:         const updatedAssign = { _fbKey: snapshot.key, ...snapshot.val() };
03561:         if (window.cachedAssignments) {
03562:             const idx = window.cachedAssignments.findIndex(a => a._fbKey === updatedAssign._fbKey || a.id === updatedAssign.id);
03563:             if (idx !== -1) window.cachedAssignments[idx] = updatedAssign;
03564:         }
03565:         if (document.getElementById('studentRoadmapBody')) renderStudentRoadmap();
03566:     });
03567: 
03568:     // 3. Khi có bài nộp hoàn toàn MỚI, ta không tải lại toàn bộ mà chỉ cần thông báo hoặc tải lại trang đầu
03569:     listenFirebase(db.ref('submissions').limitToLast(1), 'child_added', (snapshot) => {
03570:         window.invalidateTeacherListSearchCache?.('submissions');
03571:         // Chỉ xử lý nếu đây là bài nộp mới phát sinh sau khi trang đã tải xong
03572:         if (window.cachedSubmissions && !window.cachedSubmissions.some(s => s._fbKey === snapshot.key)) {
03573:             // Gọi load lại trang đầu tiên để cập nhật bài mới lên trên cùng
03574:             loadSubmissions(false);
```

### lines 11760-11777
```js
11760:                 submission => submission.studentUsername !== username
11761:             );
11762:         }
11763: 
11764:         if (typeof loadSubmissions === 'function') {
11765:             await loadSubmissions(false);
11766:         }
11767: 
11768:         if (document.getElementById('studentRoadmapBody') && typeof renderStudentRoadmap === 'function') {
11769:             renderStudentRoadmap();
11770:         }
11771: 
11772:         if (document.getElementById('teacherRoadmapBody') && typeof renderTeacherRoadmap === 'function') {
11773:             renderTeacherRoadmap();
11774:         }
11775: 
11776:         // Làm mới lại bảng danh sách học sinh
11777:         if (typeof loadStudentsList === 'function') {
```

### lines 11761-11778
```js
11761:             );
11762:         }
11763: 
11764:         if (typeof loadSubmissions === 'function') {
11765:             await loadSubmissions(false);
11766:         }
11767: 
11768:         if (document.getElementById('studentRoadmapBody') && typeof renderStudentRoadmap === 'function') {
11769:             renderStudentRoadmap();
11770:         }
11771: 
11772:         if (document.getElementById('teacherRoadmapBody') && typeof renderTeacherRoadmap === 'function') {
11773:             renderTeacherRoadmap();
11774:         }
11775: 
11776:         // Làm mới lại bảng danh sách học sinh
11777:         if (typeof loadStudentsList === 'function') {
11778:             loadStudentsList();
```

## pattern `cash_requests` — 5 hits

### lines 3575-3592
```js
03575:         }
03576:     });
03577:     listenFirebase(db.ref('users'), 'value', renderUsers);
03578:     listenFirebase(db.ref('profile_requests'), 'value', debounce(loadProfileRequests, 1500));
03579:     listenFirebase(db.ref('materials'), 'value', debounce(loadMaterialsListTeacher, 1500));
03580:     listenFirebase(db.ref('schedule'), 'value', debounce(loadScheduleTeacher, 1500));
03581:     listenFirebase(db.ref('spin_history'), 'value', debounce(loadSpinHistory, 1500));
03582:     listenFirebase(db.ref('student_coins'), 'value', debounce(loadStudentsList, 1500));
03583:     listenFirebase(db.ref('cash_requests'), 'value', debounce(loadTeacherCashRequests, 1500));
03584: 
03585:     // ==========================================
03586:     // PHẦN 3: LẮNG NGHE SETTINGS (Dữ liệu nhỏ, giữ nguyên real-time)
03587:     // ==========================================
03588:     listenFirebase(db.ref('roadmap_settings/passingGrade'), 'value', (snapshot) => {
03589:         const val = snapshot.val() ?? 7;
03590:         if (document.getElementById('passingGradeSetting')) document.getElementById('passingGradeSetting').value = val;
03591:         window.currentPassingGrade = parseFloat(val);
03592:         if (document.getElementById('teacherRoadmapBody')) renderTeacherRoadmap();
```

### lines 18308-18325
```js
18308: 
18309: // Hàm bật tắt Bảng quy đổi
18310: window.toggleConversionSettings = async function (isChecked) {
18311:     await db.ref('system_settings').update({ conversionTableEnabled: isChecked });
18312:     alert("Đã " + (isChecked ? "MỞ" : "ĐÓNG") + " chức năng Bảng quy đổi tiền của học sinh!");
18313: };
18314: 
18315: // Tương thích hàm cũ: chỉ chuyển tiếp sang luồng kiểm duyệt an toàn hiện tại.
18316: // Không còn cho phép đổi trạng thái cash_requests trực tiếp vì có thể bỏ qua bước trừ tiền.
18317: async function loadCashRequestsForTeacher() {
18318:     if (typeof window.loadTeacherCashRequests === 'function') {
18319:         return window.loadTeacherCashRequests();
18320:     }
18321: }
18322: 
18323: async function updateRequestStatus(requestId, newStatus) {
18324:     const actionMap = {
18325:         transferring: 'approve',
```

### lines 18551-18568
```js
18551:     }
18552: }
18553: 
18554: window.loadTeacherCashRequests = async function () {
18555:     const container = document.getElementById('teacherCashRequestsListContainer');
18556:     if (!container) return;
18557: 
18558:     try {
18559:         let requests = await getDB('cash_requests');
18560: 
18561:         // Chỉ ẩn/xóa bản ghi đã hoàn tất hoặc từ chối sau 2 tháng.
18562:         // Pending/processing/transferring không bao giờ bị retention xóa.
18563:         if (
18564:             window.HistoryRetention &&
18565:             typeof window.HistoryRetention.filterRecent === 'function'
18566:         ) {
18567:             requests = window.HistoryRetention.filterRecent(
18568:                 requests || [],
```

### lines 18561-18578
```js
18561:         // Chỉ ẩn/xóa bản ghi đã hoàn tất hoặc từ chối sau 2 tháng.
18562:         // Pending/processing/transferring không bao giờ bị retention xóa.
18563:         if (
18564:             window.HistoryRetention &&
18565:             typeof window.HistoryRetention.filterRecent === 'function'
18566:         ) {
18567:             requests = window.HistoryRetention.filterRecent(
18568:                 requests || [],
18569:                 'cash_requests'
18570:             );
18571:         }
18572: 
18573:         if (!requests.length) {
18574:             container.innerHTML = '<p style="color: #64748b; font-size: 0.95em; text-align: center; padding: 20px; margin: 0;">Hiện tại chưa có yêu cầu nhận tiền mặt nào.</p>';
18575:             return;
18576:         }
18577: 
18578:         let html = '';
```

### lines 18642-18659
```js
18642:         container.innerHTML = html;
18643:     } catch (error) {
18644:         console.error('Lỗi hiển thị yêu cầu phía giáo viên:', error);
18645:         container.innerHTML = '<p style="color: #ef4444; font-size: 0.9em; text-align: center;">Không thể tải dữ liệu kiểm duyệt từ Firebase!</p>';
18646:     }
18647: };
18648: 
18649: window.handleTeacherProcessCash = async function (reqFbKey, action) {
18650:     const reqRef = db.ref(`cash_requests/${reqFbKey}`);
18651: 
18652:     try {
18653:         const reqSnapshot = await reqRef.once('value');
18654:         let reqData = reqSnapshot.val();
18655: 
18656:         if (!reqData) {
18657:             alert('⚠️ Yêu cầu kiểm duyệt không tồn tại trên hệ thống!');
18658:             return;
18659:         }
```

## pattern `refund_pending` — 0 hits

# js/common.js

## pattern `firebaseConfig` — 0 hits

## pattern `password` — 7 hits

### lines 2112-2129
```js
02112:     document.cookie =
02113:         '_sys_dl=; max-age=0; path=/';
02114: }
02115: 
02116: if (loginForm) {
02117:     loginForm.addEventListener('submit', async function (e) {
02118:         e.preventDefault();
02119:         const usernameInput = document.getElementById('username');
02120:         const passwordInput = document.getElementById('password');
02121:         const errorMsg = document.getElementById('errorMsg');
02122: 
02123:         if (!usernameInput || !passwordInput || !errorMsg) {
02124:             console.error('Không tìm thấy thành phần của form đăng nhập.');
02125:             return;
02126:         }
02127: 
02128:         const userVal = usernameInput.value.trim();
02129:         const passVal = passwordInput.value;
```

### lines 2115-2132
```js
02115: 
02116: if (loginForm) {
02117:     loginForm.addEventListener('submit', async function (e) {
02118:         e.preventDefault();
02119:         const usernameInput = document.getElementById('username');
02120:         const passwordInput = document.getElementById('password');
02121:         const errorMsg = document.getElementById('errorMsg');
02122: 
02123:         if (!usernameInput || !passwordInput || !errorMsg) {
02124:             console.error('Không tìm thấy thành phần của form đăng nhập.');
02125:             return;
02126:         }
02127: 
02128:         const userVal = usernameInput.value.trim();
02129:         const passVal = passwordInput.value;
02130: 
02131:         // Dùng \s để chặn cả dấu cách, tab và xuống dòng.
02132:         if (/\s/.test(userVal)) {
```

### lines 2121-2138
```js
02121:         const errorMsg = document.getElementById('errorMsg');
02122: 
02123:         if (!usernameInput || !passwordInput || !errorMsg) {
02124:             console.error('Không tìm thấy thành phần của form đăng nhập.');
02125:             return;
02126:         }
02127: 
02128:         const userVal = usernameInput.value.trim();
02129:         const passVal = passwordInput.value;
02130: 
02131:         // Dùng \s để chặn cả dấu cách, tab và xuống dòng.
02132:         if (/\s/.test(userVal)) {
02133:             errorMsg.textContent =
02134:                 '❌ Tên đăng nhập không được chứa khoảng trắng!';
02135:             errorMsg.style.color = 'red';
02136:             return;
02137:         }
02138: 
```

### lines 2187-2204
```js
02187:                 await firebase.auth().signOut();
02188:                 return;
02189:             }
02190: 
02191:             // Đăng nhập thành công -> Gỡ bỏ hoàn toàn mọi án phạt
02192:             await clearAllLockouts();
02193: 
02194:             user._fbKey = uid;
02195:             localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(user).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
02196: 
02197:             if (user.role === 'teacher') {
02198:                 window.location.href = 'teacher.html';
02199:             } else {
02200:                 window.location.href = 'student.html';
02201:             }
02202: 
02203:         } catch (error) {
02204:             let errorCode =
```

### lines 2260-2277
```js
02260:                     'Tên đăng nhập hoặc mật khẩu không chính xác.',
02261: 
02262:                 'auth/invalid-login-credentials':
02263:                     'Tên đăng nhập hoặc mật khẩu không chính xác.',
02264: 
02265:                 'auth/user-not-found':
02266:                     'Tài khoản chưa tồn tại trong Firebase Authentication.',
02267: 
02268:                 'auth/wrong-password':
02269:                     'Mật khẩu không chính xác.',
02270: 
02271:                 'auth/invalid-email':
02272:                     'Tên đăng nhập tạo ra email không hợp lệ.',
02273: 
02274:                 'auth/user-disabled':
02275:                     'Tài khoản đã bị vô hiệu hóa.',
02276: 
02277:                 'auth/operation-not-allowed':
```

### lines 2293-2310
```js
02293:             const displayMessage =
02294:                 messages[errorCode] ||
02295:                 `Đăng nhập thất bại: ${errorCode}`;
02296: 
02297:             const credentialErrors = new Set([
02298:                 'auth/invalid-credential',
02299:                 'auth/invalid-login-credentials',
02300:                 'auth/user-not-found',
02301:                 'auth/wrong-password'
02302:             ]);
02303: 
02304:             const forceLock =
02305:                 errorCode === 'auth/too-many-requests';
02306: 
02307:             // Không tính lỗi mạng/cấu hình là nhập sai mật khẩu.
02308:             if (
02309:                 !credentialErrors.has(errorCode) &&
02310:                 !forceLock
```

### lines 5549-5559
```js
05549:             }
05550:         }
05551:     );
05552: })();
05553: // Security hotfix: distinct encoders for text and inline JavaScript arguments.
05554: window.securityHotfix = Object.freeze({
05555:   inline(value) { return window.escapeHTML(JSON.stringify(String(value ?? ''))); },
05556:   remoteURL(value) {
05557:     try { const url = new URL(String(value)); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : ''; } catch { return ''; }
05558:   }
05559: });
```

## pattern `role` — 15 hits

### lines 2189-2206
```js
02189:             }
02190: 
02191:             // Đăng nhập thành công -> Gỡ bỏ hoàn toàn mọi án phạt
02192:             await clearAllLockouts();
02193: 
02194:             user._fbKey = uid;
02195:             localStorage.setItem('currentUser', JSON.stringify(Object.fromEntries(Object.entries(user).filter(([key]) => !['password', 'newPass', 'oldPass'].includes(key)))));
02196: 
02197:             if (user.role === 'teacher') {
02198:                 window.location.href = 'teacher.html';
02199:             } else {
02200:                 window.location.href = 'student.html';
02201:             }
02202: 
02203:         } catch (error) {
02204:             let errorCode =
02205:                 error && error.code
02206:                     ? String(error.code)
```

### lines 3642-3659
```js
03642:                         return src.split(/[/?#]/).filter(Boolean).pop() || '';
03643:                     }
03644:                 })
03645:                 .filter(Boolean)
03646:         );
03647:     }
03648: 
03649:     function checkModules() {
03650:         const role = resolvePageRole();
03651:         const scripts = scriptBasenames();
03652: 
03653:         const checks = [
03654:             {
03655:                 name: 'firebase-config.js',
03656:                 required: true,
03657:                 ready: () =>
03658:                     typeof firebase !== 'undefined' &&
03659:                     typeof firebase.auth === 'function' &&
```

### lines 3691-3708
```js
03691:             },
03692:             {
03693:                 name: 'effect-quality-manager.js',
03694:                 required: true,
03695:                 ready: () => Boolean(window.EffectQualityManager)
03696:             },
03697:             {
03698:                 name: 'student-feature-loader.js',
03699:                 required: role === 'student',
03700:                 ready: () => Boolean(window.StudentFeatureLoader)
03701:             },
03702:             {
03703:                 name: 'daily-login.js',
03704:                 required: role === 'teacher',
03705:                 ready: () => typeof DailyLoginManager !== 'undefined'
03706:             },
03707:             {
03708:                 name: 'theme-items.js',
```

### lines 3696-3713
```js
03696:             },
03697:             {
03698:                 name: 'student-feature-loader.js',
03699:                 required: role === 'student',
03700:                 ready: () => Boolean(window.StudentFeatureLoader)
03701:             },
03702:             {
03703:                 name: 'daily-login.js',
03704:                 required: role === 'teacher',
03705:                 ready: () => typeof DailyLoginManager !== 'undefined'
03706:             },
03707:             {
03708:                 name: 'theme-items.js',
03709:                 required: role === 'teacher',
03710:                 ready: () => typeof ThemeManager !== 'undefined'
03711:             },
03712:             {
03713:                 name: 'effect-items.js',
```

### lines 3701-3718
```js
03701:             },
03702:             {
03703:                 name: 'daily-login.js',
03704:                 required: role === 'teacher',
03705:                 ready: () => typeof DailyLoginManager !== 'undefined'
03706:             },
03707:             {
03708:                 name: 'theme-items.js',
03709:                 required: role === 'teacher',
03710:                 ready: () => typeof ThemeManager !== 'undefined'
03711:             },
03712:             {
03713:                 name: 'effect-items.js',
03714:                 required: role === 'teacher',
03715:                 ready: () => typeof EffectManager !== 'undefined'
03716:             },
03717:             {
03718:                 name: 'pet-items.js',
```

### lines 3706-3723
```js
03706:             },
03707:             {
03708:                 name: 'theme-items.js',
03709:                 required: role === 'teacher',
03710:                 ready: () => typeof ThemeManager !== 'undefined'
03711:             },
03712:             {
03713:                 name: 'effect-items.js',
03714:                 required: role === 'teacher',
03715:                 ready: () => typeof EffectManager !== 'undefined'
03716:             },
03717:             {
03718:                 name: 'pet-items.js',
03719:                 required: role === 'teacher',
03720:                 ready: () => typeof PetManager !== 'undefined'
03721:             },
03722:             {
03723:                 name: 'royal-ball.js',
```

### lines 3711-3728
```js
03711:             },
03712:             {
03713:                 name: 'effect-items.js',
03714:                 required: role === 'teacher',
03715:                 ready: () => typeof EffectManager !== 'undefined'
03716:             },
03717:             {
03718:                 name: 'pet-items.js',
03719:                 required: role === 'teacher',
03720:                 ready: () => typeof PetManager !== 'undefined'
03721:             },
03722:             {
03723:                 name: 'royal-ball.js',
03724:                 required: role === 'teacher',
03725:                 ready: () => typeof RoyalBallEvent !== 'undefined'
03726:             },
03727:             {
03728:                 name: 'music-manager.js',
```

### lines 3716-3733
```js
03716:             },
03717:             {
03718:                 name: 'pet-items.js',
03719:                 required: role === 'teacher',
03720:                 ready: () => typeof PetManager !== 'undefined'
03721:             },
03722:             {
03723:                 name: 'royal-ball.js',
03724:                 required: role === 'teacher',
03725:                 ready: () => typeof RoyalBallEvent !== 'undefined'
03726:             },
03727:             {
03728:                 name: 'music-manager.js',
03729:                 required: role === 'teacher',
03730:                 ready: () => Boolean(window.MusicManager)
03731:             },
03732:             {
03733:                 name: 'store-manager.js',
```

### lines 3721-3738
```js
03721:             },
03722:             {
03723:                 name: 'royal-ball.js',
03724:                 required: role === 'teacher',
03725:                 ready: () => typeof RoyalBallEvent !== 'undefined'
03726:             },
03727:             {
03728:                 name: 'music-manager.js',
03729:                 required: role === 'teacher',
03730:                 ready: () => Boolean(window.MusicManager)
03731:             },
03732:             {
03733:                 name: 'store-manager.js',
03734:                 required: role === 'teacher',
03735:                 ready: () =>
03736:                     typeof StoreManager !== 'undefined' &&
03737:                     typeof StoreConfig !== 'undefined'
03738:             },
```

### lines 3726-3743
```js
03726:             },
03727:             {
03728:                 name: 'music-manager.js',
03729:                 required: role === 'teacher',
03730:                 ready: () => Boolean(window.MusicManager)
03731:             },
03732:             {
03733:                 name: 'store-manager.js',
03734:                 required: role === 'teacher',
03735:                 ready: () =>
03736:                     typeof StoreManager !== 'undefined' &&
03737:                     typeof StoreConfig !== 'undefined'
03738:             },
03739:             {
03740:                 name: 'painting.js',
03741:                 required: role === 'teacher',
03742:                 ready: () => Boolean(window.HoiHoaSystem)
03743:             },
```

### lines 3733-3750
```js
03733:                 name: 'store-manager.js',
03734:                 required: role === 'teacher',
03735:                 ready: () =>
03736:                     typeof StoreManager !== 'undefined' &&
03737:                     typeof StoreConfig !== 'undefined'
03738:             },
03739:             {
03740:                 name: 'painting.js',
03741:                 required: role === 'teacher',
03742:                 ready: () => Boolean(window.HoiHoaSystem)
03743:             },
03744:             {
03745:                 name: 'luxury-store.js',
03746:                 required: role === 'teacher',
03747:                 ready: () => Boolean(window.LuxuryStore)
03748:             }
03749:         ];
03750: 
```

### lines 3738-3755
```js
03738:             },
03739:             {
03740:                 name: 'painting.js',
03741:                 required: role === 'teacher',
03742:                 ready: () => Boolean(window.HoiHoaSystem)
03743:             },
03744:             {
03745:                 name: 'luxury-store.js',
03746:                 required: role === 'teacher',
03747:                 ready: () => Boolean(window.LuxuryStore)
03748:             }
03749:         ];
03750: 
03751:         const relevant = checks.filter(check => check.required);
03752:         const missing = [];
03753:         const healthy = [];
03754: 
03755:         relevant.forEach(check => {
```

### lines 3771-3788
```js
03771:                     }`
03772:                 );
03773:             } else {
03774:                 healthy.push(check.name);
03775:             }
03776:         });
03777: 
03778:         const lazyState =
03779:             role === 'student'
03780:                 ? window.StudentFeatureLoader?.getState?.()
03781:                 : null;
03782: 
03783:         const details = [
03784:             `Đã xác minh: ${healthy.length}/${relevant.length} module bắt buộc.`,
03785:             ...missing.map(value => `Thiếu: ${value}`)
03786:         ];
03787: 
03788:         if (lazyState) {
```

### lines 4323-4340
```js
04323:                 counts.errorCount > 0
04324:                     ? '#b91c1c'
04325:                     : counts.warningCount > 0
04326:                         ? '#b45309'
04327:                         : '#047857';
04328: 
04329:             const result = {
04330:                 version: VERSION,
04331:                 role: resolvePageRole(),
04332:                 readOnly: true,
04333:                 rows,
04334:                 ...counts,
04335:                 scannedAt
04336:             };
04337: 
04338:             state.lastResult = result;
04339:             return result;
04340:         } catch (error) {
```

### lines 4901-4918
```js
04901:         modal.id = 'universalFilePreviewModal';
04902: 
04903:         modal.className =
04904:             'modal-overlay universal-preview-overlay';
04905: 
04906:         modal.innerHTML = `
04907:             <div
04908:                 class="universal-preview-modal"
04909:                 role="dialog"
04910:                 aria-modal="true"
04911:                 aria-labelledby="universalPreviewTitle"
04912:             >
04913:                 <div class="universal-preview-header">
04914:                     <div>
04915:                         <p class="universal-preview-kicker">
04916:                             XEM TRỰC TIẾP TRÊN WEB
04917:                         </p>
04918: 
```

# js/firebase-config.js

## pattern `firebaseConfig` — 2 hits

### lines 1-11
```js
00001: // 1. DÁN ĐOẠN CODE BẠN LẤY ĐƯỢC TỪ FIREBASE VÀO ĐÂY
00002: const firebaseConfig = {
00003:     apiKey: "AIzaSyAnxiZEjEFUNoXnPFZR2GJh9mJ9KKYsPqI",
00004:     authDomain: "quan-ly-bai-tap-online.firebaseapp.com",
00005:     databaseURL: "https://quan-ly-bai-tap-online-default-rtdb.asia-southeast1.firebasedatabase.app",
00006:     projectId: "quan-ly-bai-tap-online",
00007:     storageBucket: "quan-ly-bai-tap-online.firebasestorage.app",
00008:     messagingSenderId: "1045476145868",
00009:     appId: "1:1045476145868:web:2019476c328a8b52e1e069",
00010:     measurementId: "G-8MJZ8D9EK1"
00011: };
```

### lines 6-23
```js
00006:     projectId: "quan-ly-bai-tap-online",
00007:     storageBucket: "quan-ly-bai-tap-online.firebasestorage.app",
00008:     messagingSenderId: "1045476145868",
00009:     appId: "1:1045476145868:web:2019476c328a8b52e1e069",
00010:     measurementId: "G-8MJZ8D9EK1"
00011: };
00012: 
00013: // 2. Khởi tạo kết nối
00014: firebase.initializeApp(firebaseConfig);
00015: const db = firebase.database();
00016: 
00017: // =============================================================================
00018: // REQUEST SINGLE-FLIGHT v1.0.0
00019: // - Các getDB()/getDBStrict() cùng path trong cửa sổ 800ms dùng chung 1 Promise .once().
00020: // - Chỉ tối ưu đọc one-shot; KHÔNG can thiệp listener realtime .on()/off().
00021: // - Khi có push/update/remove, cache liên quan bị hủy ngay để lần đọc sau lấy dữ liệu mới.
00022: // =============================================================================
00023: const DB_SINGLE_FLIGHT_TTL_MS = 800;
```

# js/store-manager.js

## pattern `unapplyItem` — 11 hits

### lines 3132-3149
```js
03132: 
03133:         else if (isUpcoming) {
03134:             trialButton = `<button class="btn-preview disabled" disabled>🔒 Chưa mở bán</button>`;
03135:             actionButton = `<button class="btn-equip active" disabled id="countdown-btn-${item.id}" style="background: #2c3e50; color: #f1c40f; cursor: not-allowed; font-family: 'Courier New', Courier, monospace; font-size: 1.05em; font-weight: bold; border: 1px solid #7f8c8d; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">⏳ Đang tính toán...</button>`;
03136:         }
03137:         // --- LOGIC LUỒNG HOẠT ĐỘNG BÌNH THƯỜNG ---
03138:         else {
03139:             if (isEquipped) {
03140:                 actionButton = `<button class="btn-equip active" onclick="StoreManager.unapplyItem('${item.id}')" style="background: rgba(225, 29, 72, 0.08); color: #e11d48; border: 1px dashed #e11d48; cursor: pointer; box-shadow: none;" title="Nhấn để tháo vật phẩm này">❌ Tháo trang bị</button>`;
03141:             } else if (isOwned) {
03142:                 actionButton = `<button class="btn-equip" onclick="StoreManager.applyItem('${item.id}')">✨ Mặc ngay</button>`;
03143:             } else {
03144:                 if (isMidAutumnCoinItem) {
03145:                     actionButton = `
03146:             <button
03147:                 class="btn-buy midautumn-coin-buy"
03148:                 onclick="StoreManager.buyItemSafely('${item.id}')"
03149:                 title="Thanh toán bằng Xu Trung Thu"
```

### lines 5007-5024
```js
05007:         const originalApply =
05008:             typeof StoreManager.applyItem ===
05009:                 'function'
05010:                 ? StoreManager.applyItem
05011:                     .bind(StoreManager)
05012:                 : null;
05013: 
05014:         const originalUnapply =
05015:             typeof StoreManager.unapplyItem ===
05016:                 'function'
05017:                 ? StoreManager.unapplyItem
05018:                     .bind(StoreManager)
05019:                 : null;
05020: 
05021:         if (originalApply) {
05022:             StoreManager.applyItem =
05023:                 async function (itemId) {
05024:                     const result =
```

### lines 5009-5026
```js
05009:                 'function'
05010:                 ? StoreManager.applyItem
05011:                     .bind(StoreManager)
05012:                 : null;
05013: 
05014:         const originalUnapply =
05015:             typeof StoreManager.unapplyItem ===
05016:                 'function'
05017:                 ? StoreManager.unapplyItem
05018:                     .bind(StoreManager)
05019:                 : null;
05020: 
05021:         if (originalApply) {
05022:             StoreManager.applyItem =
05023:                 async function (itemId) {
05024:                     const result =
05025:                         await originalApply(
05026:                             itemId
```

### lines 5068-5085
```js
05068:                         );
05069:                     }
05070: 
05071:                     return result;
05072:                 };
05073:         }
05074: 
05075:         if (originalUnapply) {
05076:             StoreManager.unapplyItem =
05077:                 async function (itemId) {
05078:                     const result =
05079:                         await originalUnapply(
05080:                             itemId
05081:                         );
05082: 
05083:                     if (isTarget(itemId)) {
05084:                         clearOnlyTargetFrame();
05085:                     }
```

### lines 5110-5127
```js
05110:         ) {
05111:             installed = true;
05112:         }
05113:     }
05114: 
05115:     /*
05116:      * store-manager.js chạy trước student.js trong student.html.
05117:      * setTimeout đưa việc patch sang cuối task, khi student.js
05118:      * đã override StoreManager.applyItem / unapplyItem xong.
05119:      */
05120:     setTimeout(install, 0);
05121: 
05122:     let tries = 0;
05123: 
05124:     const retryTimer =
05125:         setInterval(() => {
05126:             tries += 1;
05127: 
```

### lines 5460-5477
```js
05460:             StoreManager.__ha2fSummerFrameStoreBridgeR2
05461:         ) return typeof StoreManager !== 'undefined';
05462: 
05463:         const originalApply =
05464:             typeof StoreManager.applyItem === 'function'
05465:                 ? StoreManager.applyItem.bind(StoreManager)
05466:                 : null;
05467:         const originalUnapply =
05468:             typeof StoreManager.unapplyItem === 'function'
05469:                 ? StoreManager.unapplyItem.bind(StoreManager)
05470:                 : null;
05471: 
05472:         if (originalApply) {
05473:             StoreManager.applyItem = async function (itemId) {
05474:                 const result = await originalApply(itemId);
05475:                 if (result === false || window.isStudentStoreGameAccessEnabled?.() === false) return false;
05476:                 if (isTarget(itemId)) {
05477:                     const item = getItem(itemId);
```

### lines 5461-5478
```js
05461:         ) return typeof StoreManager !== 'undefined';
05462: 
05463:         const originalApply =
05464:             typeof StoreManager.applyItem === 'function'
05465:                 ? StoreManager.applyItem.bind(StoreManager)
05466:                 : null;
05467:         const originalUnapply =
05468:             typeof StoreManager.unapplyItem === 'function'
05469:                 ? StoreManager.unapplyItem.bind(StoreManager)
05470:                 : null;
05471: 
05472:         if (originalApply) {
05473:             StoreManager.applyItem = async function (itemId) {
05474:                 const result = await originalApply(itemId);
05475:                 if (result === false || window.isStudentStoreGameAccessEnabled?.() === false) return false;
05476:                 if (isTarget(itemId)) {
05477:                     const item = getItem(itemId);
05478:                     if (
```

### lines 5486-5503
```js
05486:                     setTimeout(() => repairFrame(item), 80);
05487:                     setTimeout(() => repairFrame(item), 350);
05488:                 }
05489:                 return result;
05490:             };
05491:         }
05492: 
05493:         if (originalUnapply) {
05494:             StoreManager.unapplyItem = async function (itemId) {
05495:                 if (isTarget(itemId)) clearOnlyTargetFrame();
05496:                 const result = await originalUnapply(itemId);
05497:                 if (isTarget(itemId)) {
05498:                     clearOnlyTargetFrame();
05499:                     requestAnimationFrame(clearOnlyTargetFrame);
05500:                     setTimeout(clearOnlyTargetFrame, 80);
05501:                 }
05502:                 return result;
05503:             };
```

### lines 5947-5964
```js
05947:         }
05948: 
05949:         const originalApply =
05950:             typeof StoreManager.applyItem === 'function'
05951:                 ? StoreManager.applyItem.bind(StoreManager)
05952:                 : null;
05953: 
05954:         const originalUnapply =
05955:             typeof StoreManager.unapplyItem === 'function'
05956:                 ? StoreManager.unapplyItem.bind(StoreManager)
05957:                 : null;
05958: 
05959:         if (originalApply) {
05960:             StoreManager.applyItem =
05961:                 async function (itemId) {
05962:                     const result =
05963:                         await originalApply(itemId);
05964:                     if (result === false || window.isStudentStoreGameAccessEnabled?.() === false) return false;
```

### lines 5948-5965
```js
05948: 
05949:         const originalApply =
05950:             typeof StoreManager.applyItem === 'function'
05951:                 ? StoreManager.applyItem.bind(StoreManager)
05952:                 : null;
05953: 
05954:         const originalUnapply =
05955:             typeof StoreManager.unapplyItem === 'function'
05956:                 ? StoreManager.unapplyItem.bind(StoreManager)
05957:                 : null;
05958: 
05959:         if (originalApply) {
05960:             StoreManager.applyItem =
05961:                 async function (itemId) {
05962:                     const result =
05963:                         await originalApply(itemId);
05964:                     if (result === false || window.isStudentStoreGameAccessEnabled?.() === false) return false;
05965: 
```

### lines 5987-6004
```js
05987:                         );
05988:                     }
05989: 
05990:                     return result;
05991:                 };
05992:         }
05993: 
05994:         if (originalUnapply) {
05995:             StoreManager.unapplyItem =
05996:                 async function (itemId) {
05997:                     if (isTarget(itemId)) {
05998:                         clearOnlyTargetFrame();
05999:                     }
06000: 
06001:                     const result =
06002:                         await originalUnapply(itemId);
06003: 
06004:                     if (isTarget(itemId)) {
```

## pattern `refund_pending` — 0 hits

## pattern `student_coins` — 0 hits

## pattern `student_inventory` — 0 hits

# js/luxury-store.js

## pattern `unapplyItem` — 18 hits

### lines 11370-11387
```js
11370:     // ========================================================
11371: 
11372:     function installLuxurySpringUnapplyHook(
11373:         attempt = 0
11374:     ) {
11375: 
11376:         if (
11377:             typeof StoreManager === 'undefined' ||
11378:             typeof StoreManager.unapplyItem !== 'function'
11379:         ) {
11380: 
11381:             if (attempt < 100) {
11382:                 setTimeout(
11383:                     () =>
11384:                         installLuxurySpringUnapplyHook(
11385:                             attempt + 1
11386:                         ),
11387:                     100
```

### lines 11395-11412
```js
11395:         if (
11396:             StoreManager.__luxurySpringUnapplyHookInstalled
11397:         ) {
11398:             return;
11399:         }
11400: 
11401: 
11402:         const originalUnapplyItem =
11403:             StoreManager.unapplyItem.bind(
11404:                 StoreManager
11405:             );
11406: 
11407: 
11408:         StoreManager.unapplyItem =
11409:             async function (itemId) {
11410: 
11411:                 const isLuxurySpring =
11412:                     String(itemId) ===
```

### lines 11400-11417
```js
11400: 
11401: 
11402:         const originalUnapplyItem =
11403:             StoreManager.unapplyItem.bind(
11404:                 StoreManager
11405:             );
11406: 
11407: 
11408:         StoreManager.unapplyItem =
11409:             async function (itemId) {
11410: 
11411:                 const isLuxurySpring =
11412:                     String(itemId) ===
11413:                     'pet_luxury_mua_xuan';
11414: 
11415:                 const isLuxurySummer =
11416:                     String(itemId) ===
11417:                     'pet_luxury_mua_ha';
```

### lines 12142-12159
```js
12142:                 ]
12143:                     .filter(Boolean)
12144:                     .map(String)
12145:             )
12146:         );
12147: 
12148:         for (const conflictItemId of uniqueIds) {
12149:             try {
12150:                 await StoreManager.unapplyItem(
12151:                     conflictItemId
12152:                 );
12153:             } catch (error) {
12154:                 /*
12155:                  * Không dừng toàn bộ quá trình chỉ vì một món gỡ lỗi.
12156:                  * Phần fallback phía dưới vẫn tiếp tục dọn runtime
12157:                  * và ép Firebase về trạng thái đúng.
12158:                  */
12159:                 console.error(
```

### lines 12169-12186
```js
12169:          * chỉ dọn những gì thuộc cửa hàng đối diện với món sắp mặc.
12170:          */
12171:         clearOppositeStoreBrowserRuntime(
12172:             targetIsLuxury
12173:         );
12174: 
12175:         /*
12176:          * 3) Firebase là lớp chốt cuối cùng.
12177:          * Dù unapplyItem() đã cập nhật, update lại false là idempotent
12178:          * và bảo đảm không còn món đối diện nào mang isEquipped=true.
12179:          */
12180:         const updates = {};
12181: 
12182:         conflicts.forEach(conflict => {
12183:             updates[
12184:                 `${conflict.firebaseKey}/isEquipped`
12185:             ] = false;
12186:         });
```

### lines 12433-12450
```js
12433:     // BỌC StoreManager.applyItem()
12434:     // ========================================================
12435: 
12436:     function installStoreBoundaryEquipGuard(
12437:         attempt = 0
12438:     ) {
12439:         /*
12440:          * Chờ student.js tạo xong
12441:          * applyItem + unapplyItem cuối cùng.
12442:          */
12443:         if (
12444:             typeof StoreManager === 'undefined' ||
12445:             typeof StoreManager.applyItem !==
12446:             'function' ||
12447:             typeof StoreManager.unapplyItem !==
12448:             'function'
12449:         ) {
12450:             if (attempt < 100) {
```

### lines 12439-12456
```js
12439:         /*
12440:          * Chờ student.js tạo xong
12441:          * applyItem + unapplyItem cuối cùng.
12442:          */
12443:         if (
12444:             typeof StoreManager === 'undefined' ||
12445:             typeof StoreManager.applyItem !==
12446:             'function' ||
12447:             typeof StoreManager.unapplyItem !==
12448:             'function'
12449:         ) {
12450:             if (attempt < 100) {
12451:                 setTimeout(
12452:                     () =>
12453:                         installStoreBoundaryEquipGuard(
12454:                             attempt + 1
12455:                         ),
12456:                     100
```

### lines 13185-13202
```js
13185:                 actionHTML = `
13186:             <button
13187:                 type="button"
13188:                 class="
13189:                     national-day-premium-use-button
13190:                     is-equipped
13191:                 "
13192:                 onclick="
13193:                     StoreManager.unapplyItem(
13194:                         '${id}'
13195:                     )
13196:                 "
13197:             >
13198:                 ✕ Gỡ
13199:             </button>
13200:         `;
13201:             } else {
13202:                 actionHTML = `
```

### lines 13333-13350
```js
13333:                         🎁 Nhận từ sự kiện
13334:                     </button>
13335:                 `;
13336:             } else if (isEquipped) {
13337:                 actionHTML = `
13338:                     <button
13339:                         type="button"
13340:                         class="lotm-klein-card-action is-equipped"
13341:                         onclick="StoreManager.unapplyItem('${id}')"
13342:                     >
13343:                         ✕ Gỡ
13344:                     </button>
13345:                 `;
13346:             } else {
13347:                 actionHTML = `
13348:                     <button
13349:                         type="button"
13350:                         class="lotm-klein-card-action"
```

### lines 13436-13453
```js
13436:                         🪙 Mua ${formattedPrice} Coin
13437:                     </button>
13438:                 `;
13439:             } else if (isEquipped) {
13440:                 actionHTML = `
13441:                     <button
13442:                         type="button"
13443:                         class="cam-co-cam-mong-action is-equipped"
13444:                         onclick="StoreManager.unapplyItem('${id}')"
13445:                     >
13446:                         ✕ Gỡ
13447:                     </button>
13448:                 `;
13449:             } else {
13450:                 actionHTML = `
13451:                     <button
13452:                         type="button"
13453:                         class="cam-co-cam-mong-action"
```

### lines 13542-13559
```js
13542:                         🪙 Mua ${formattedPrice} Coin
13543:                     </button>
13544:                 `;
13545:             } else if (isEquipped) {
13546:                 actionHTML = `
13547:                     <button
13548:                         type="button"
13549:                         class="tamon-bside-card-action is-equipped"
13550:                         onclick="StoreManager.unapplyItem('${id}')"
13551:                     >
13552:                         ✕ Gỡ
13553:                     </button>
13554:                 `;
13555:             } else {
13556:                 actionHTML = `
13557:                     <button
13558:                         type="button"
13559:                         class="tamon-bside-card-action"
```

### lines 13639-13656
```js
13639:                         🎁 Nhận từ sự kiện
13640:                     </button>
13641:                 `;
13642:             } else if (isEquipped) {
13643:                 actionHTML = `
13644:                     <button
13645:                         type="button"
13646:                         class="tamon-pinkstatic-card-action is-equipped"
13647:                         onclick="StoreManager.unapplyItem('${id}')"
13648:                     >
13649:                         ✕ Gỡ
13650:                     </button>
13651:                 `;
13652:             } else {
13653:                 actionHTML = `
13654:                     <button
13655:                         type="button"
13656:                         class="tamon-pinkstatic-card-action"
```

### lines 13738-13755
```js
13738:                         🪙 Mua ${formattedPrice} Coin
13739:                     </button>
13740:                 `;
13741:             } else if (isEquipped) {
13742:                 actionHTML = `
13743:                     <button
13744:                         type="button"
13745:                         class="aether-mythic-action is-equipped"
13746:                         onclick="StoreManager.unapplyItem('${id}')"
13747:                     >
13748:                         ✕ Gỡ
13749:                     </button>
13750:                 `;
13751:             } else {
13752:                 actionHTML = `
13753:                     <button
13754:                         type="button"
13755:                         class="aether-mythic-action"
```

### lines 13841-13858
```js
13841:                         🪙 Mua 12.000 Coin
13842:                     </button>
13843:                 `;
13844:             } else if (isEquipped) {
13845:                 actionHTML = `
13846:                     <button
13847:                         type="button"
13848:                         class="nyx-mythic-action is-equipped"
13849:                         onclick="StoreManager.unapplyItem('${id}')"
13850:                     >
13851:                         ✕ Gỡ
13852:                     </button>
13853:                 `;
13854:             } else {
13855:                 actionHTML = `
13856:                     <button
13857:                         type="button"
13858:                         class="nyx-mythic-action"
```

### lines 13952-13969
```js
13952:                         🪙 Mua ${formattedPrice} Coin
13953:                     </button>
13954:                 `;
13955:             } else if (isEquipped) {
13956:                 actionHTML = `
13957:                     <button
13958:                         type="button"
13959:                         class="linkclick-card-action is-equipped"
13960:                         onclick="StoreManager.unapplyItem('${id}')"
13961:                     >
13962:                         ✕ Gỡ
13963:                     </button>
13964:                 `;
13965:             } else {
13966:                 actionHTML = `
13967:                     <button
13968:                         type="button"
13969:                         class="linkclick-card-action"
```

### lines 14092-14109
```js
14092:                         🌕 Đổi ${midAutumnCoinPrice} Xu Trung Thu
14093:                     </button>
14094:                 `;
14095:             } else if (isEquipped) {
14096:                 actionHTML = `
14097:                     <button
14098:                         type="button"
14099:                         class="midautumn-card-action is-equipped"
14100:                         onclick="StoreManager.unapplyItem('${id}')"
14101:                     >
14102:                         ✕ Gỡ
14103:                     </button>
14104:                 `;
14105:             } else {
14106:                 actionHTML = `
14107:                     <button
14108:                         type="button"
14109:                         class="midautumn-card-action"
```

### lines 14215-14232
```js
14215:                         🪙 Mua ${formattedPrice} Coin
14216:                     </button>
14217:                 `;
14218:             } else if (isEquipped) {
14219:                 actionHTML = `
14220:                     <button
14221:                         type="button"
14222:                         class="summer-premium-card-action is-equipped"
14223:                         onclick="StoreManager.unapplyItem('${id}')"
14224:                     >
14225:                         ✕ Gỡ
14226:                     </button>
14227:                 `;
14228:             } else {
14229:                 actionHTML = `
14230:                     <button
14231:                         type="button"
14232:                         class="summer-premium-card-action"
```

### lines 14356-14373
```js
14356:                 actionHTML = `
14357:         <button
14358:             type="button"
14359:             class="
14360:                 spring-premium-use-button
14361:                 is-equipped
14362:             "
14363:             onclick="
14364:                 StoreManager.unapplyItem(
14365:                     '${id}'
14366:                 )
14367:             "
14368:         >
14369:             ✕ Gỡ
14370:         </button>
14371:     `;
14372: 
14373:             } else {
```

## pattern `refund_pending` — 0 hits

## pattern `student_coins` — 0 hits

## pattern `student_inventory` — 3 hits

### lines 12222-12239
```js
12222:             typeof db === 'undefined' ||
12223:             !user?.username
12224:         ) {
12225:             return true;
12226:         }
12227: 
12228:         const inventoryRef =
12229:             db.ref(
12230:                 `student_inventory/${user.username}`
12231:             );
12232: 
12233:         const snapshot =
12234:             await inventoryRef.once('value');
12235: 
12236:         const inventory =
12237:             snapshot.val() || {};
12238: 
12239:         const entries =
```

### lines 12730-12747
```js
12730:          */
12731:         if (
12732:             typeof db !== 'undefined' &&
12733:             user?.username
12734:         ) {
12735:             try {
12736:                 const itemRef =
12737:                     db.ref(
12738:                         `student_inventory/${user.username}/${itemId}`
12739:                     );
12740: 
12741:                 const snapshot =
12742:                     await itemRef.once('value');
12743: 
12744:                 const existingItem =
12745:                     snapshot.val();
12746: 
12747:                 if (existingItem?.isTrial === true) {
```

### lines 12855-12872
```js
12855:             return;
12856:         }
12857: 
12858:         window.__luxuryInventoryListeningUser =
12859:             username;
12860: 
12861:         const inventoryRef =
12862:             db.ref(
12863:                 `student_inventory/${username}`
12864:             );
12865: 
12866:         inventoryRef.on(
12867:             'value',
12868:             snapshot => {
12869: 
12870:                 luxuryInventoryState =
12871:                     snapshot.val() || {};
12872: 
```

# js/leaderboard.js

## pattern `leaderboard_reward` — 7 hits

### lines 1822-1839
```js
01822: }
01823: 
01824: 
01825: function getLeaderboardClaimPath(
01826:     seasonKey,
01827:     username
01828: ) {
01829:     return (
01830:         'leaderboard_reward_claims/' +
01831:         `${seasonKey}/` +
01832:         `${username}`
01833:     );
01834: }
01835: 
01836: 
01837: function getLeaderboardRewardTypeForRank(
01838:     rank
01839: ) {
```

### lines 2574-2591
```js
02574: 
02575:                 await db.ref()
02576:                     .update(rootUpdates);
02577: 
02578:                 rewardFinalized = true;
02579: 
02580:                 await recordLeaderboardRewardHistory({
02581:                     type:
02582:                         'leaderboard_reward',
02583:                     summary:
02584:                         `Nhận Thẻ giảm giá ${percent}% ` +
02585:                         `do xếp hạng 2 BXH ${display}`,
02586:                     source:
02587:                         'leaderboard_rank_reward',
02588:                     targetUsername:
02589:                         username,
02590:                     targetName:
02591:                         currentUser?.name ||
```

### lines 2671-2688
```js
02671: 
02672:                 await db.ref()
02673:                     .update(rootUpdates);
02674: 
02675:                 rewardFinalized = true;
02676: 
02677:                 await recordLeaderboardRewardHistory({
02678:                     type:
02679:                         'leaderboard_reward',
02680:                     summary:
02681:                         `Nhận ${amount} Coin ` +
02682:                         `do xếp hạng #${rank} BXH ${display}`,
02683:                     source:
02684:                         'leaderboard_rank_reward',
02685:                     targetUsername:
02686:                         username,
02687:                     targetName:
02688:                         currentUser?.name ||
```

### lines 4291-4308
```js
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
```

### lines 4592-4609
```js
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
```

### lines 4642-4659
```js
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
```

### lines 4771-4788
```js
04771:                     trialExpiry:
04772:                         null,
04773:                     isEquipped:
04774:                         false
04775:                 };
04776: 
04777:                 historyPayload = {
04778:                     type:
04779:                         'leaderboard_reward',
04780:                     summary:
04781:                         `Mở Rương Hạng 1 ${display} ` +
04782:                         `và nhận vật phẩm ` +
04783:                         `${selectedItem.name}`,
04784:                     source:
04785:                         'leaderboard_chest',
04786:                     targetUsername:
04787:                         username,
04788:                     targetName:
```

## pattern `leaderboard_chest` — 5 hits

### lines 4296-4313
```js
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
```

### lines 4598-4615
```js
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
```

### lines 4648-4665
```js
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
```

### lines 4758-4775
```js
04758:                 ] = {
04759:                     id:
04760:                         selectedItem.id,
04761:                     purchaseTime:
04762:                         firebase.database
04763:                             .ServerValue
04764:                             .TIMESTAMP,
04765:                     source:
04766:                         'leaderboard_chest',
04767:                     leaderboardSeason:
04768:                         seasonKey,
04769:                     isTrial:
04770:                         null,
04771:                     trialExpiry:
04772:                         null,
04773:                     isEquipped:
04774:                         false
04775:                 };
```

### lines 4777-4794
```js
04777:                 historyPayload = {
04778:                     type:
04779:                         'leaderboard_reward',
04780:                     summary:
04781:                         `Mở Rương Hạng 1 ${display} ` +
04782:                         `và nhận vật phẩm ` +
04783:                         `${selectedItem.name}`,
04784:                     source:
04785:                         'leaderboard_chest',
04786:                     targetUsername:
04787:                         username,
04788:                     targetName:
04789:                         currentUser?.name ||
04790:                         username,
04791:                     amount:
04792:                         null,
04793:                     unit:
04794:                         '',
```

## pattern `Math.random` — 12 hits

### lines 2368-2385
```js
02368: 
02369:             /*
02370:              * Firebase có thể chạy transaction callback nhiều lần.
02371:              * Token giúp callback nhận ra trạng thái processing do
02372:              * CHÍNH transaction hiện tại tạo ra, thay vì tự abort.
02373:              */
02374:             const claimLockToken =
02375:                 `${Date.now()}_` +
02376:                 `${Math.random().toString(36).slice(2)}`;
02377: 
02378:             lockedClaimToken =
02379:                 claimLockToken;
02380: 
02381:             const lockResult =
02382:                 await claimRef.transaction(
02383:                     current => {
02384:                         if (current) {
02385:                             const currentStatus =
```

### lines 3839-3856
```js
03839:     let awardCommitted = false;
03840: 
03841:     /*
03842:      * Giữ nguyên token trong toàn bộ vòng đời của MỘT lần bấm nhận.
03843:      * Transaction callback có thể bị Firebase gọi lại nhiều lần.
03844:      */
03845:     const chestLockToken =
03846:         `${Date.now()}_` +
03847:         `${Math.random().toString(36).slice(2)}`;
03848: 
03849:     try {
03850:         if (
03851:             choiceType !== 'coin' &&
03852:             choiceType !== 'item'
03853:         ) {
03854:             throw new Error(
03855:                 'INVALID_CHEST_CHOICE'
03856:             );
```

### lines 4258-4275
```js
04258:             );
04259: 
04260:         let rewardLabel = '';
04261:         let historyPayload = null;
04262:         const rootUpdates = {};
04263: 
04264:         if (choiceType === 'coin') {
04265:             const rand =
04266:                 Math.random();
04267: 
04268:             let amount = 0;
04269: 
04270:             if (rand < 0.70) {
04271:                 amount =
04272:                     Math.floor(
04273:                         Math.random() * 301
04274:                     ) + 200;
04275:             } else if (rand < 0.90) {
```

### lines 4265-4282
```js
04265:             const rand =
04266:                 Math.random();
04267: 
04268:             let amount = 0;
04269: 
04270:             if (rand < 0.70) {
04271:                 amount =
04272:                     Math.floor(
04273:                         Math.random() * 301
04274:                     ) + 200;
04275:             } else if (rand < 0.90) {
04276:                 amount =
04277:                     Math.floor(
04278:                         Math.random() * 201
04279:                     ) + 500;
04280:             } else {
04281:                 amount =
04282:                     Math.floor(
```

### lines 4270-4287
```js
04270:             if (rand < 0.70) {
04271:                 amount =
04272:                     Math.floor(
04273:                         Math.random() * 301
04274:                     ) + 200;
04275:             } else if (rand < 0.90) {
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
```

### lines 4275-4292
```js
04275:             } else if (rand < 0.90) {
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
```

### lines 4561-4578
```js
04561:                             String(item.id)
04562:                         ) &&
04563:                         !isPaintingItem(
04564:                             item
04565:                         )
04566:                 );
04567: 
04568:             const rand =
04569:                 Math.random();
04570: 
04571:             if (
04572:                 rand < dupThreshold &&
04573:                 ownedDuplicateCandidates
04574:                     .length > 0
04575:             ) {
04576:                 const duplicateItem =
04577:                     ownedDuplicateCandidates[
04578:                         Math.floor(
```

### lines 4571-4588
```js
04571:             if (
04572:                 rand < dupThreshold &&
04573:                 ownedDuplicateCandidates
04574:                     .length > 0
04575:             ) {
04576:                 const duplicateItem =
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
```

### lines 4686-4703
```js
04686:                                     item
04687:                                 )
04688:                         );
04689: 
04690:                     selectedItem =
04691:                         normalItems.length
04692:                             ? normalItems[
04693:                                 Math.floor(
04694:                                     Math.random() *
04695:                                     normalItems.length
04696:                                 )
04697:                             ]
04698:                             : unownedItems[
04699:                                 Math.floor(
04700:                                     Math.random() *
04701:                                     unownedItems.length
04702:                                 )
04703:                             ];
```

### lines 4692-4709
```js
04692:                             ? normalItems[
04693:                                 Math.floor(
04694:                                     Math.random() *
04695:                                     normalItems.length
04696:                                 )
04697:                             ]
04698:                             : unownedItems[
04699:                                 Math.floor(
04700:                                     Math.random() *
04701:                                     unownedItems.length
04702:                                 )
04703:                             ];
04704:                 } else {
04705:                     const rareItems =
04706:                         unownedItems.filter(
04707:                             item =>
04708:                                 isRareItem(
04709:                                     item
```

### lines 4709-4726
```js
04709:                                     item
04710:                                 )
04711:                         );
04712: 
04713:                     selectedItem =
04714:                         rareItems.length
04715:                             ? rareItems[
04716:                                 Math.floor(
04717:                                     Math.random() *
04718:                                     rareItems.length
04719:                                 )
04720:                             ]
04721:                             : unownedItems[
04722:                                 Math.floor(
04723:                                     Math.random() *
04724:                                     unownedItems.length
04725:                                 )
04726:                             ];
```

### lines 4715-4732
```js
04715:                             ? rareItems[
04716:                                 Math.floor(
04717:                                     Math.random() *
04718:                                     rareItems.length
04719:                                 )
04720:                             ]
04721:                             : unownedItems[
04722:                                 Math.floor(
04723:                                     Math.random() *
04724:                                     unownedItems.length
04725:                                 )
04726:                             ];
04727:                 }
04728: 
04729:                 if (!selectedItem) {
04730:                     throw new Error(
04731:                         'NO_SELECTED_ITEM'
04732:                     );
```

## pattern `leaderboard_reward_claims` — 1 hits

# js/royal-ball.js

## pattern `royal_ball` — 11 hits

### lines 664-681
```js
00664:     // PHẦN LOGIC DÀNH CHO HỌC SINH
00665:     // ==========================================
00666:     openModal: async function () {
00667:         if (typeof window.isGameEnabled !== 'undefined' && window.isGameEnabled === false) {
00668:             return alert("🔒 Khu vực giải trí đang bị Giáo viên tạm khóa chung!");
00669:         }
00670: 
00671:         try {
00672:             const snap = await db.ref('game_settings/royal_ball').once('value');
00673:             const settings = snap.exists() ? snap.val() : this.defaultSettings;
00674:             this.currentSettings = settings;
00675: 
00676:             // 1. Kiểm tra lệnh Khóa/Mở thủ công của giáo viên (Nút đỏ/xanh)
00677:             if (settings.isEnabled === false) {
00678:                 return alert("🔒 Sự kiện Dạ Hội Hoàng Gia hiện đã bị Giáo viên ĐÓNG. Học sinh tạm thời không thể truy cập lúc này!");
00679:             }
00680: 
00681:             // 2. Kiểm tra điều kiện thời gian
```

### lines 741-758
```js
00741:         const today = new Intl.DateTimeFormat('en-CA', {
00742:             timeZone: 'Asia/Ho_Chi_Minh',
00743:             year: 'numeric',
00744:             month: '2-digit',
00745:             day: '2-digit'
00746:         }).format(new Date(serverNow));
00747: 
00748:         const limitRef = db.ref(
00749:             `royal_ball_limits/${currentUser.username}`
00750:         );
00751: 
00752:         try {
00753:             let alreadyJoined = false;
00754: 
00755:             const result = await limitRef.transaction(currentData => {
00756:                 if (
00757:                     currentData &&
00758:                     currentData.lastDate === today
```

### lines 786-803
```js
00786:         } catch (error) {
00787:             console.error('Lỗi kiểm tra ngày:', error);
00788: 
00789:             if (
00790:                 error.code === 'PERMISSION_DENIED' ||
00791:                 error.code === 'permission_denied'
00792:             ) {
00793:                 alert(
00794:                     '❌ Firebase Rules chưa cấp quyền cho royal_ball_limits.'
00795:                 );
00796:             } else {
00797:                 alert(
00798:                     '❌ Lỗi kiểm tra dữ liệu máy chủ, vui lòng thử lại sau!'
00799:                 );
00800:             }
00801: 
00802:             return;
00803:         }
```

### lines 1211-1228
```js
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
```

### lines 1318-1335
```js
01318:             reward: actualRewardRecord,
01319:             time:
01320:                 recordNow.toLocaleTimeString('vi-VN') +
01321:                 ' ' +
01322:                 recordNow.toLocaleDateString('vi-VN'),
01323:             timestamp:
01324:                 firebase.database
01325:                     .ServerValue.TIMESTAMP,
01326:             source: 'royal_ball'
01327:         });
01328: 
01329:         const burstParticles =
01330:             Array.from(
01331:                 { length: 24 },
01332:                 (_, index) => {
01333:                     const angle =
01334:                         index * (360 / 24);
01335: 
```

### lines 1487-1504
```js
01487:     toggleStatusByTeacher: async function () {
01488:         const statusBtn = document.getElementById('btnToggleRoyalStatus');
01489:         if (!statusBtn) return alert("❌ Lỗi: Không tìm thấy nút Trạng thái trên giao diện!");
01490: 
01491:         const currentStatus = statusBtn.dataset.status;
01492:         const newEnabledState = (currentStatus === "closed");
01493: 
01494:         try {
01495:             const snap = await db.ref('game_settings/royal_ball').once('value');
01496:             let currentData = snap.exists() ? snap.val() : { ...this.defaultSettings };
01497: 
01498:             currentData.isEnabled = newEnabledState;
01499: 
01500:             await db.ref().update({
01501:                 'game_settings/royal_ball':
01502:                     currentData,
01503: 
01504:                 'limited_events/royal_ball':
```

### lines 1493-1510
```js
01493: 
01494:         try {
01495:             const snap = await db.ref('game_settings/royal_ball').once('value');
01496:             let currentData = snap.exists() ? snap.val() : { ...this.defaultSettings };
01497: 
01498:             currentData.isEnabled = newEnabledState;
01499: 
01500:             await db.ref().update({
01501:                 'game_settings/royal_ball':
01502:                     currentData,
01503: 
01504:                 'limited_events/royal_ball':
01505:                     this.buildLimitedEventAnnouncement(
01506:                         currentData
01507:                     )
01508:             });
01509:             alert(`🔒 Hệ thống phản hồi: Đã chuyển trạng thái sự kiện thành [${newEnabledState ? "MỞ TRUY CẬP" : "KHÓA TRUY CẬP"}] thành công!`);
01510:         } catch (error) {
```

### lines 1496-1513
```js
01496:             let currentData = snap.exists() ? snap.val() : { ...this.defaultSettings };
01497: 
01498:             currentData.isEnabled = newEnabledState;
01499: 
01500:             await db.ref().update({
01501:                 'game_settings/royal_ball':
01502:                     currentData,
01503: 
01504:                 'limited_events/royal_ball':
01505:                     this.buildLimitedEventAnnouncement(
01506:                         currentData
01507:                     )
01508:             });
01509:             alert(`🔒 Hệ thống phản hồi: Đã chuyển trạng thái sự kiện thành [${newEnabledState ? "MỞ TRUY CẬP" : "KHÓA TRUY CẬP"}] thành công!`);
01510:         } catch (error) {
01511:             alert("❌ Lỗi kết nối Firebase: " + error.message);
01512:         }
01513:     },
```

### lines 1563-1580
```js
01563:                 probCoin: coinProb,
01564:                 isEnabled: isEnabled,
01565:                 useCustomDates: useCustomDates,
01566:                 startDate: startDate,
01567:                 endDate: endDate
01568:             };
01569: 
01570:             await db.ref().update({
01571:                 'game_settings/royal_ball':
01572:                     savedSettings,
01573: 
01574:                 'limited_events/royal_ball':
01575:                     this.buildLimitedEventAnnouncement(
01576:                         savedSettings
01577:                     )
01578:             });
01579:             alert('✅ Đã lưu cấu hình Dạ Hội Hoàng Gia thành công!');
01580:         } catch (error) {
```

### lines 1566-1583
```js
01566:                 startDate: startDate,
01567:                 endDate: endDate
01568:             };
01569: 
01570:             await db.ref().update({
01571:                 'game_settings/royal_ball':
01572:                     savedSettings,
01573: 
01574:                 'limited_events/royal_ball':
01575:                     this.buildLimitedEventAnnouncement(
01576:                         savedSettings
01577:                     )
01578:             });
01579:             alert('✅ Đã lưu cấu hình Dạ Hội Hoàng Gia thành công!');
01580:         } catch (error) {
01581:             alert('❌ Lỗi lưu Firebase: ' + error.message);
01582:         }
01583:     }
```

### lines 1611-1628
```js
01611:     if (useCustomCheck) {
01612:         useCustomCheck.addEventListener('change', function () {
01613:             const area = document.getElementById('royalCustomDatesArea');
01614:             if (area) area.style.display = this.checked ? 'block' : 'none';
01615:         });
01616:     }
01617: 
01618:     if (typeof db !== 'undefined') {
01619:         db.ref('game_settings/royal_ball').on('value', (snapshot) => {
01620:             if (snapshot.exists()) {
01621:                 RoyalBallEvent.syncTeacherUI(snapshot.val());
01622:             } else {
01623:                 RoyalBallEvent.syncTeacherUI(RoyalBallEvent.defaultSettings);
01624:             }
01625:         });
01626:     }
01627: 
01628: }
```

## pattern `Math.random` — 6 hits

### lines 528-545
```js
00528: 
00529:             particle.style.setProperty(
00530:                 '--bang',
00531:                 `${index * (360 / 26)}deg`
00532:             );
00533: 
00534:             particle.style.setProperty(
00535:                 '--bdistance',
00536:                 `${55 + Math.random() * 105}px`
00537:             );
00538: 
00539:             particle.style.setProperty(
00540:                 '--bsize',
00541:                 `${3 + Math.random() * 6}px`
00542:             );
00543: 
00544:             particle.style.setProperty(
00545:                 '--bcolor',
```

### lines 533-550
```js
00533: 
00534:             particle.style.setProperty(
00535:                 '--bdistance',
00536:                 `${55 + Math.random() * 105}px`
00537:             );
00538: 
00539:             particle.style.setProperty(
00540:                 '--bsize',
00541:                 `${3 + Math.random() * 6}px`
00542:             );
00543: 
00544:             particle.style.setProperty(
00545:                 '--bcolor',
00546:                 colors[index % colors.length]
00547:             );
00548: 
00549:             particle.style.setProperty(
00550:                 '--bdelay',
```

### lines 543-560
```js
00543: 
00544:             particle.style.setProperty(
00545:                 '--bcolor',
00546:                 colors[index % colors.length]
00547:             );
00548: 
00549:             particle.style.setProperty(
00550:                 '--bdelay',
00551:                 `${Math.random() * 0.18}s`
00552:             );
00553: 
00554:             resultBox.appendChild(particle);
00555: 
00556:             setTimeout(
00557:                 () => particle.remove(),
00558:                 1600
00559:             );
00560:         }
```

### lines 1108-1125
```js
01108: 
01109:         const probabilityItem =
01110:             this.currentSettings
01111:                 ? parseFloat(
01112:                     this.currentSettings.probItem
01113:                 )
01114:                 : this.defaultSettings.probItem;
01115: 
01116:         const randomNumber = Math.random() * 100;
01117: 
01118:         let rewardType =
01119:             randomNumber <= probabilityItem
01120:                 ? 'item'
01121:                 : 'coin';
01122: 
01123:         let rewardTheme = 'coin';
01124:         let rewardIcon = '🪙';
01125:         let rewardLabel = 'Kho báu Hoàng gia';
```

### lines 1165-1182
```js
01165:                             String(inventoryItem.id)
01166:                         );
01167:                     }
01168:                 });
01169: 
01170:                 const randomItem =
01171:                     legendaryItems[
01172:                     Math.floor(
01173:                         Math.random() *
01174:                         legendaryItems.length
01175:                     )
01176:                     ];
01177: 
01178:                 const itemId = String(randomItem.id);
01179: 
01180:                 if (currentOwned.has(itemId)) {
01181:                     /*
01182:                      * Vật phẩm bị trùng:
```

### lines 1257-1274
```js
01257:                     'Danh sách vật phẩm Truyền thuyết đang được cập nhật.';
01258: 
01259:                 actualRewardRecord =
01260:                     '500 Coin bù vật phẩm Dạ hội';
01261:             }
01262:         } else {
01263:             wonCoins =
01264:                 Math.floor(
01265:                     Math.random() *
01266:                     (1000 - 100 + 1)
01267:                 ) + 100;
01268: 
01269:             rewardTheme = 'coin';
01270:             rewardIcon = '🪙';
01271:             rewardLabel =
01272:                 'Kho báu Hoàng gia';
01273: 
01274:             rewardTitle =
```

## pattern `spin_history` — 1 hits

### lines 1307-1324
```js
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
01323:             timestamp:
01324:                 firebase.database
```

## pattern `student_coins` — 2 hits

### lines 804-821
```js
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
```

### lines 1285-1302
```js
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
```

## pattern `student_inventory` — 2 hits

### lines 1140-1157
```js
01140:                             .toLowerCase()
01141:                             .trim() === 'truyền thuyết'
01142:                     )
01143:                     : [];
01144: 
01145:             if (legendaryItems.length > 0) {
01146:                 const inventorySnapshot =
01147:                     await db.ref(
01148:                         `student_inventory/${currentUser.username}`
01149:                     ).once('value');
01150: 
01151:                 const currentOwned = new Set();
01152: 
01153:                 inventorySnapshot.forEach(child => {
01154:                     const inventoryItem =
01155:                         child.val() || {};
01156: 
01157:                     if (child.key) {
```

### lines 1202-1219
```js
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
```

# js/bellum-event.js

## pattern `bellum_completion_reward` — 1 hits

### lines 1422-1439
```js
01422:                 `student_inventory/${username}/${rewardItem.id}`
01423:             ] = {
01424:                 id: rewardItem.id,
01425:                 purchaseTime: claimedAt,
01426:                 isEquipped: false,
01427:                 isTrial: null,
01428:                 trialExpiry: null,
01429:                 source:
01430:                     'bellum_completion_reward',
01431:                 sourceEvent:
01432:                     'that_dai_toi_tu_vien_bellum',
01433:                 sourceYear:
01434:                     status.year
01435:             };
01436: 
01437:             updates[rewardPath] = {
01438:                 claimed: true,
01439:                 status: 'claimed',
```

## pattern `Thất Đại Tội` — 14 hits

### lines 7-24
```js
00007:     const SCENE_BASE_JS = 'js/bellum-scenes/';
00008:     const SCENE_BASE_CSS = 'css/bellum-scenes/';
00009:     const SAVE_KEY = 'bellum_visual_novel_progress_v1';
00010:     const AUTO_DELAY = 4200;
00011: 
00012:     // PHẦN THƯỞNG HOÀN THÀNH BELLUM
00013:     // Chỉ lấy vật phẩm từ StoreConfig.items (cửa hàng thường),
00014:     // không đọc LuxuryStore / cửa hàng Sang trọng.
00015:     const COMPLETION_REWARD_TAG = 'Thất Đại Tội';
00016:     const COMPLETION_REWARD_ROOT = 'student_event_rewards';
00017: 
00018:     // SỰ KIỆN HẰNG NĂM · THÁNG 11
00019:     // Cảnh 01→20 lần lượt mở vào các ngày:
00020:     // 01, 03, 05, 07, 09, 11, 13, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30/11.
00021:     const EVENT_MONTH = 11;
00022:     const EVENT_START_DAY = 1;
00023:     const EVENT_END_DAY = 30;
00024:     const EVENT_TIME_ZONE = 'Asia/Ho_Chi_Minh';
```

### lines 32-49
```js
00032:     const sceneMeta = [{"number": 1, "title": "NGÔI LÀNG KHÔNG CÒN NGƯỜI SỐNG", "act": "HỒI I: CÁNH CỬA DƯỚI LÒNG ĐẤT"}, {"number": 2, "title": "KHU RỪNG CẤM", "act": "HỒI I: CÁNH CỬA DƯỚI LÒNG ĐẤT"}, {"number": 3, "title": "ĐẠI SẢNH CỦA BẢY BỨC TƯỢNG", "act": "HỒI I: CÁNH CỬA DƯỚI LÒNG ĐẤT"}, {"number": 4, "title": "THAM LAM – KHO BÁU KHÔNG THUỘC VỀ AI", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 5, "title": "ĐỐ KỊ – HÀNH LANG CỦA NHỮNG CUỘC ĐỜI KHÁC", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 6, "title": "PHÒNG NHẬT KÝ", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 7, "title": "THAM ĂN – BỮA TIỆC KHÔNG KẾT THÚC", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 8, "title": "LƯỜI BIẾNG – NGÔI NHÀ CỦA NGÀY HÔM QUA", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 9, "title": "CĂN PHÒNG CỦA NHỮNG NGƯỜI BỊ HIẾN TẾ", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 10, "title": "DỤC VỌNG – NHÀ HÁT MẶT NẠ", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 11, "title": "THỊNH NỘ – CHIẾN TRƯỜNG TRO TÀN", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 12, "title": "KIÊU NGẠO – NGÔI ĐỀN TRÊN CAO", "act": "HỒI II: BẢY CĂN PHÒNG"}, {"number": 13, "title": "KÝ ỨC CỦA CHA MALACH", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 14, "title": "NGHI LỄ ĐẦU TIÊN", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 15, "title": "SỰ RA ĐỜI CỦA BẢY THỰC THỂ", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 16, "title": "VẬT CHỨA MỚI", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 17, "title": "CÂU ĐỐ CUỐI CÙNG", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 18, "title": "TRẬN CHIẾN VỚI VỰC THẲM", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 19, "title": "LỰA CHỌN CỦA LYRA", "act": "HỒI III: NGUỒN GỐC CỦA BẢY TỘI LỖI"}, {"number": 20, "title": "BÌNH MINH TẠI EDEVANE", "act": "KẾT"}];
00033:     const introCharacters = [
00034:         { name: 'KAEL', role: 'Thợ săn thực thể siêu nhiên', image: 'Kael.png', text: 'Một thợ săn khoảng hai mươi tám tuổi, dũng cảm và quyết đoán. Anh mang cảm giác tội lỗi vì đã không cứu được em gái Mira mười năm trước.' },
00035:         { name: 'LYRA MALACH', role: 'Nữ tu của Bellum', image: 'Lyra Malach.png', text: 'Một nữ tu trẻ hiểu rõ cấu trúc tu viện và luôn né tránh quá khứ của mình. Cô đã mắc kẹt tại Bellum hơn ba trăm năm.' },
00036:         { name: 'MIRA', role: 'Em gái của Kael', image: 'Mira.png', text: 'Mira qua đời khi mới mười hai tuổi. Hình bóng của cô liên tục xuất hiện trong những ảo giác và ký ức ám ảnh Kael.' },
00037:         { name: 'CHA MALACH', role: 'Người sáng lập Tu viện Bellum', image: 'Cha Malach.png', text: 'Một học giả và giáo sĩ tin rằng tội lỗi là căn nguyên của mọi đau khổ. Ông thực hiện nghi lễ nhằm tách bảy ham muốn đen tối khỏi con người.' },
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
```

### lines 33-50
```js
00033:     const introCharacters = [
00034:         { name: 'KAEL', role: 'Thợ săn thực thể siêu nhiên', image: 'Kael.png', text: 'Một thợ săn khoảng hai mươi tám tuổi, dũng cảm và quyết đoán. Anh mang cảm giác tội lỗi vì đã không cứu được em gái Mira mười năm trước.' },
00035:         { name: 'LYRA MALACH', role: 'Nữ tu của Bellum', image: 'Lyra Malach.png', text: 'Một nữ tu trẻ hiểu rõ cấu trúc tu viện và luôn né tránh quá khứ của mình. Cô đã mắc kẹt tại Bellum hơn ba trăm năm.' },
00036:         { name: 'MIRA', role: 'Em gái của Kael', image: 'Mira.png', text: 'Mira qua đời khi mới mười hai tuổi. Hình bóng của cô liên tục xuất hiện trong những ảo giác và ký ức ám ảnh Kael.' },
00037:         { name: 'CHA MALACH', role: 'Người sáng lập Tu viện Bellum', image: 'Cha Malach.png', text: 'Một học giả và giáo sĩ tin rằng tội lỗi là căn nguyên của mọi đau khổ. Ông thực hiện nghi lễ nhằm tách bảy ham muốn đen tối khỏi con người.' },
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
00050:     const loadedScripts = new Map();
```

### lines 34-51
```js
00034:         { name: 'KAEL', role: 'Thợ săn thực thể siêu nhiên', image: 'Kael.png', text: 'Một thợ săn khoảng hai mươi tám tuổi, dũng cảm và quyết đoán. Anh mang cảm giác tội lỗi vì đã không cứu được em gái Mira mười năm trước.' },
00035:         { name: 'LYRA MALACH', role: 'Nữ tu của Bellum', image: 'Lyra Malach.png', text: 'Một nữ tu trẻ hiểu rõ cấu trúc tu viện và luôn né tránh quá khứ của mình. Cô đã mắc kẹt tại Bellum hơn ba trăm năm.' },
00036:         { name: 'MIRA', role: 'Em gái của Kael', image: 'Mira.png', text: 'Mira qua đời khi mới mười hai tuổi. Hình bóng của cô liên tục xuất hiện trong những ảo giác và ký ức ám ảnh Kael.' },
00037:         { name: 'CHA MALACH', role: 'Người sáng lập Tu viện Bellum', image: 'Cha Malach.png', text: 'Một học giả và giáo sĩ tin rằng tội lỗi là căn nguyên của mọi đau khổ. Ông thực hiện nghi lễ nhằm tách bảy ham muốn đen tối khỏi con người.' },
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
00050:     const loadedScripts = new Map();
00051:     const loadedStyles = new Map();
```

### lines 35-52
```js
00035:         { name: 'LYRA MALACH', role: 'Nữ tu của Bellum', image: 'Lyra Malach.png', text: 'Một nữ tu trẻ hiểu rõ cấu trúc tu viện và luôn né tránh quá khứ của mình. Cô đã mắc kẹt tại Bellum hơn ba trăm năm.' },
00036:         { name: 'MIRA', role: 'Em gái của Kael', image: 'Mira.png', text: 'Mira qua đời khi mới mười hai tuổi. Hình bóng của cô liên tục xuất hiện trong những ảo giác và ký ức ám ảnh Kael.' },
00037:         { name: 'CHA MALACH', role: 'Người sáng lập Tu viện Bellum', image: 'Cha Malach.png', text: 'Một học giả và giáo sĩ tin rằng tội lỗi là căn nguyên của mọi đau khổ. Ông thực hiện nghi lễ nhằm tách bảy ham muốn đen tối khỏi con người.' },
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
00050:     const loadedScripts = new Map();
00051:     const loadedStyles = new Map();
00052: 
```

### lines 36-53
```js
00036:         { name: 'MIRA', role: 'Em gái của Kael', image: 'Mira.png', text: 'Mira qua đời khi mới mười hai tuổi. Hình bóng của cô liên tục xuất hiện trong những ảo giác và ký ức ám ảnh Kael.' },
00037:         { name: 'CHA MALACH', role: 'Người sáng lập Tu viện Bellum', image: 'Cha Malach.png', text: 'Một học giả và giáo sĩ tin rằng tội lỗi là căn nguyên của mọi đau khổ. Ông thực hiện nghi lễ nhằm tách bảy ham muốn đen tối khỏi con người.' },
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
00050:     const loadedScripts = new Map();
00051:     const loadedStyles = new Map();
00052: 
00053:     function pad(n) { return String(Number(n) || 0).padStart(2, '0'); }
```

### lines 37-54
```js
00037:         { name: 'CHA MALACH', role: 'Người sáng lập Tu viện Bellum', image: 'Cha Malach.png', text: 'Một học giả và giáo sĩ tin rằng tội lỗi là căn nguyên của mọi đau khổ. Ông thực hiện nghi lễ nhằm tách bảy ham muốn đen tối khỏi con người.' },
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
00050:     const loadedScripts = new Map();
00051:     const loadedStyles = new Map();
00052: 
00053:     function pad(n) { return String(Number(n) || 0).padStart(2, '0'); }
00054:     function clampScene(n) { return Math.max(1, Math.min(sceneMeta.length, Number(n) || 1)); }
```

### lines 38-55
```js
00038:         { name: 'LUCIEN ARMAND', role: 'Học giả trẻ', image: 'Lucien Armand.png', text: 'Từng phục vụ Cha Malach, để lại nhiều nhật ký và ký hiệu bí mật. Lucien đã cố ngăn nghi lễ nhưng thất bại; số phận của anh vẫn là bí ẩn.' },
00039:         { name: 'ARON', role: 'Người lính trẻ của Edevane', image: 'Aron.png', text: 'Một trong số ít người còn sống tại làng Edevane. Aron là người đầu tiên kể cho Kael về những cái chết kỳ lạ và tiếng chuông trong rừng.' },
00040:         { name: 'MAMMON · THAM LAM', role: 'Thất Đại Tội', image: 'Mammon – Tham Lam.png', text: 'Không chỉ đại diện cho tiền bạc, Mammon là ham muốn sở hữu con người, ký ức, tình yêu và cả sự sống.' },
00041:         { name: 'LEVIATHAN · ĐỐ KỊ', role: 'Thất Đại Tội', image: 'Leviathan – Đố Kị.png', text: 'Một con rắn biển khổng lồ phủ đầy mắt, khiến con người nhìn thấy những cuộc đời hoàn hảo mà họ không có.' },
00042:         { name: 'BEELZEBUB · THAM ĂN', role: 'Thất Đại Tội', image: 'Beelzebub – Tham Ăn.png', text: 'Một sinh vật có chiếc miệng không đáy. Nó không chỉ ăn thức ăn mà còn nuốt ký ức, cảm xúc và linh hồn.' },
00043:         { name: 'BELPHEGOR · LƯỜI BIẾNG', role: 'Thất Đại Tội', image: 'Belphegor – Lười Biếng.png', text: 'Hiện thân của sự buông xuôi: cảm giác muốn từ bỏ vì tin rằng mọi cố gắng cuối cùng đều vô nghĩa.' },
00044:         { name: 'ASMODEUS · DỤC VỌNG', role: 'Thất Đại Tội', image: 'Asmodeus – Dục Vọng.png', text: 'Có thể mang khuôn mặt của bất kỳ người nào đối phương khao khát; đại diện cho chiếm hữu, ám ảnh và biến người khác thành công cụ.' },
00045:         { name: 'SATAN · THỊNH NỘ', role: 'Thất Đại Tội', image: 'Satan – Thịnh Nộ.png', text: 'Sinh ra từ cơn giận bị dồn nén, nỗi đau không được thừa nhận và mong muốn khiến người khác cũng phải đau khổ.' },
00046:         { name: 'LUCIFER · KIÊU NGẠO', role: 'Thất Đại Tội', image: 'Lucifer – Kiêu Ngạo.png', text: 'Thực thể cuối cùng và mạnh nhất. Lucifer không cần hét hay đe dọa; nó khiến con người tự nguyện quỳ xuống.' }
00047:     ];
00048: 
00049:     const registry = new Map();
00050:     const loadedScripts = new Map();
00051:     const loadedStyles = new Map();
00052: 
00053:     function pad(n) { return String(Number(n) || 0).padStart(2, '0'); }
00054:     function clampScene(n) { return Math.max(1, Math.min(sceneMeta.length, Number(n) || 1)); }
00055:     function asset(file) {
```

### lines 1042-1059
```js
01042: 
01043:         return {
01044:             claimed: false,
01045:             unlocked: true,
01046:             claimable: true,
01047:             stateClass: 'is-reward-ready',
01048:             label: 'NHẬN QUÀ',
01049:             reason:
01050:                 'Nhấn để nhận ngẫu nhiên 1 vật phẩm tag Thất Đại Tội.'
01051:         };
01052:     }
01053: 
01054:     function renderCompletionRewardCard(
01055:         save,
01056:         status
01057:     ) {
01058:         const reward =
01059:             getCompletionRewardUiState(
```

### lines 1214-1231
```js
01214:             return false;
01215:         }
01216: 
01217:         const allRewardItems =
01218:             getRegularSevenSinsItems();
01219: 
01220:         if (!allRewardItems.length) {
01221:             notifySchedule(
01222:                 'Cửa hàng thường hiện chưa có vật phẩm tag Thất Đại Tội.',
01223:                 'warning'
01224:             );
01225:             return false;
01226:         }
01227: 
01228:         const database =
01229:             getBellumDatabase();
01230: 
01231:         const username =
```

### lines 1382-1399
```js
01382:                         .hasOwnProperty.call(
01383:                             inventory,
01384:                             item.id
01385:                         )
01386:                 );
01387: 
01388:             /*
01389:              * Không tiêu hao lượt thưởng nếu người dùng đã sở hữu
01390:              * toàn bộ vật phẩm Thất Đại Tội của Cửa hàng thường.
01391:              * Khi cửa hàng có vật phẩm mới, người dùng có thể quay lại nhận.
01392:              */
01393:             if (!unownedItems.length) {
01394:                 await releaseCompletionRewardReservation(
01395:                     rewardRef,
01396:                     claimToken
01397:                 );
01398: 
01399:                 notifySchedule(
```

### lines 1392-1409
```js
01392:              */
01393:             if (!unownedItems.length) {
01394:                 await releaseCompletionRewardReservation(
01395:                     rewardRef,
01396:                     claimToken
01397:                 );
01398: 
01399:                 notifySchedule(
01400:                     'Bạn đã sở hữu toàn bộ vật phẩm Thất Đại Tội hiện có trong Cửa hàng thường. Phần thưởng chưa bị tiêu hao.',
01401:                     'warning'
01402:                 );
01403: 
01404:                 return false;
01405:             }
01406: 
01407:             const rewardItem =
01408:                 unownedItems[
01409:                     Math.floor(
```

### lines 1738-1755
```js
01738:                 )
01739:                 : '';
01740: 
01741:         screen.innerHTML = `
01742:             <div class="bellum-menu-card">
01743:                 <div>
01744:                     <div class="bellum-menu-kicker">Visual Novel · Kinh dị · Bí ẩn · Giải đố</div>
01745:                     <h1 class="bellum-menu-title">THẤT ĐẠI TỘI:<br>TU VIỆN BELLUM</h1>
01746:                     <p class="bellum-menu-subtitle">Tu viện Bellum đã bị chôn dưới lòng đất hơn ba trăm năm. Kael bước vào nơi ấy để săn những thực thể mang tên Thất Đại Tội — và phải đối mặt với phần bóng tối mà con người luôn muốn chối bỏ.</p>
01747: 
01748:                     ${seasonNotice}
01749:                     ${waitingText}
01750: 
01751:                     <div class="bellum-menu-actions">
01752:                         ${
01753:                             continueAllowed
01754:                                 ? '<button class="bellum-menu-btn primary" data-action="continue">▶ Tiếp tục</button>'
01755:                                 : ''
```

### lines 1859-1876
```js
01859:                     </div>
01860:                     <button type="button" class="bellum-icon-btn bellum-intro-close" data-intro-close>ĐÓNG</button>
01861:                 </div>
01862: 
01863:                 <section class="bellum-story-panel">
01864:                     <div class="bellum-story-copy">
01865:                         <span class="bellum-intro-label">CỐT TRUYỆN</span>
01866:                         <h3>Tiếng chuông dưới lòng đất</h3>
01867:                         <p>Ba trăm năm trước, Cha Malach xây dựng Tu viện Bellum với tham vọng loại bỏ tội lỗi khỏi con người. Một nghi lễ nhằm tách bảy ham muốn đen tối đã thất bại, tạo ra những thực thể được gọi là <strong>Thất Đại Tội</strong> và biến Bellum thành một nơi bị chôn vùi khỏi thế giới.</p>
01868:                         <p>Ở hiện tại, ngôi làng Edevane liên tiếp xuất hiện những cái chết kỳ lạ. Khi tiếng chuông vang lên từ khu rừng không hề có nhà thờ, thợ săn Kael lần theo dấu vết và tìm thấy cánh cửa dẫn xuống Bellum.</p>
01869:                         <p>Bên trong tu viện, Kael gặp Lyra Malach và phải vượt qua bảy căn phòng. Mỗi căn phòng không chỉ là một cuộc đối đầu với quái vật, mà còn buộc anh nhìn thẳng vào tội lỗi, ký ức và phần bóng tối của chính mình.</p>
01870:                     </div>
01871:                     <div class="bellum-story-art" aria-hidden="true">
01872:                         <img src="${asset('Kael.png')}" alt="">
01873:                         <img src="${asset('Lyra Malach.png')}" alt="">
01874:                     </div>
01875:                 </section>
01876: 
```

## pattern `student_event_rewards` — 1 hits

### lines 8-25
```js
00008:     const SCENE_BASE_CSS = 'css/bellum-scenes/';
00009:     const SAVE_KEY = 'bellum_visual_novel_progress_v1';
00010:     const AUTO_DELAY = 4200;
00011: 
00012:     // PHẦN THƯỞNG HOÀN THÀNH BELLUM
00013:     // Chỉ lấy vật phẩm từ StoreConfig.items (cửa hàng thường),
00014:     // không đọc LuxuryStore / cửa hàng Sang trọng.
00015:     const COMPLETION_REWARD_TAG = 'Thất Đại Tội';
00016:     const COMPLETION_REWARD_ROOT = 'student_event_rewards';
00017: 
00018:     // SỰ KIỆN HẰNG NĂM · THÁNG 11
00019:     // Cảnh 01→20 lần lượt mở vào các ngày:
00020:     // 01, 03, 05, 07, 09, 11, 13, 15, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30/11.
00021:     const EVENT_MONTH = 11;
00022:     const EVENT_START_DAY = 1;
00023:     const EVENT_END_DAY = 30;
00024:     const EVENT_TIME_ZONE = 'Asia/Ho_Chi_Minh';
00025:     const SCENE_RELEASE_DAYS = Object.freeze([
```

## pattern `student_inventory` — 2 hits

### lines 1352-1369
```js
01352: 
01353:             return false;
01354:         }
01355: 
01356:         try {
01357:             const inventorySnapshot =
01358:                 await database
01359:                     .ref(
01360:                         `student_inventory/${username}`
01361:                     )
01362:                     .once('value');
01363: 
01364:             const inventory =
01365:                 inventorySnapshot.val() || {};
01366: 
01367:             const ownedIds =
01368:                 new Set(
01369:                     Object.values(inventory)
```

### lines 1414-1431
```js
01414: 
01415:             const claimedAt =
01416:                 Date.now() +
01417:                 serverTimeOffset;
01418: 
01419:             const updates = {};
01420: 
01421:             updates[
01422:                 `student_inventory/${username}/${rewardItem.id}`
01423:             ] = {
01424:                 id: rewardItem.id,
01425:                 purchaseTime: claimedAt,
01426:                 isEquipped: false,
01427:                 isTrial: null,
01428:                 trialExpiry: null,
01429:                 source:
01430:                     'bellum_completion_reward',
01431:                 sourceEvent:
```

# js/painting.js

## pattern `hoihoa_season` — 1 hits

### lines 8305-8322
```js
08305:                                     ? 'epic'
08306:                                     : 'rare',
08307: 
08308:                         visualVersion: 2,
08309: 
08310:                         isEquipped: false,
08311:                         purchaseTime: Date.now(),
08312: 
08313:                         source: 'hoihoa_season',
08314:                         seasonId,
08315:                         rank,
08316: 
08317:                         description:
08318:                             badgeDescription ||
08319:                             (
08320:                                 `Huy hiệu ${reward.label} ` +
08321:                                 `mùa giải Hội Họa.`
08322:                             )
```

## pattern `hoihoa_runner_up` — 1 hits

### lines 8339-8356
```js
08339:                         usageLimit: 1,
08340: 
08341:                         createdAt: discountCreatedAt,
08342: 
08343:                         expiry:
08344:                             discountCreatedAt +
08345:                             30 * 24 * 60 * 60 * 1000,
08346: 
08347:                         source: 'hoihoa_runner_up',
08348:                         rewardType: 'season_runner_up',
08349: 
08350:                         maxEligiblePriceExclusive: 600,
08351:                         excludesEventItems: true,
08352: 
08353:                         excludedTags: [
08354:                             'Doraemon',
08355:                             'Truyền thuyết'
08356:                         ]
```

## pattern `student_inventory` — 2 hits

### lines 8284-8301
```js
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
```

### lines 8318-8335
```js
08318:                             badgeDescription ||
08319:                             (
08320:                                 `Huy hiệu ${reward.label} ` +
08321:                                 `mùa giải Hội Họa.`
08322:                             )
08323:                     };
08324:                 }
08325:                 if (reward.chest) {
08326:                     updates[`student_inventory/${student.studentUsername}/chest_hh_${seasonId}`] = { id: 'chest_hoihoa', type: 'chest', name: 'Rương Kho Báu Hội Họa', icon: '🎁', isEquipped: false, purchaseTime: Date.now(), description: 'Phần thưởng Quán quân mùa giải Hội Họa.' };
08327:                 }
08328:                 if (reward.discount) {
08329:                     const discountCreatedAt = Date.now();
08330: 
08331:                     updates[
08332:                         `student_discounts/${student.studentUsername}/hh_discount_${seasonId}`
08333:                     ] = {
08334:                         percent: reward.discount,
08335:                         isUsed: false,
```

## pattern `student_coins` — 2 hits

### lines 1296-1313
```js
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
```

### lines 8271-8288
```js
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
```

# js/pet-interactions.js

## pattern `buyFood` — 5 hits

### lines 1042-1059
```js
01042:             modal.style.zIndex = '999999';
01043:             modal.innerHTML = `
01044:                 <div class="modal-content form-container" style="max-width: 360px; text-align: center; border-top: 6px solid #f39c12;">
01045:                     <button class="close-btn" onclick="document.getElementById('foodShopModal').classList.remove('active')">✖</button>
01046:                     <h3 style="color: #f39c12; margin-bottom: 5px;">🍖 Cửa Hàng Thú Cưng</h3>
01047:                     <p style="margin-bottom: 20px; font-size: 0.95em; color: #666;">Độ no hiện tại: <strong id="shopHungerText" style="color: #2ecc71;">0</strong> / 100</p>
01048:                     
01049:                     <div style="display: flex; flex-direction: column; gap: 0;">
01050:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(10, 5)">🍰 Bánh (10 🪙) ➔ +5 No</button>
01051:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(20, 10)">🍪 Bánh quy (20 🪙) ➔ +10 No</button>
01052:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(40, 50)">🍛 Cơm thường (40 🪙) ➔ +50 No</button>
01053:                         <button class="food-shop-btn premium" onclick="PetInteractionManager.buyFood(100, 100)">🥩 Đồ ăn xịn (100 🪙) ➔ Đầy bụng</button>
01054:                     </div>
01055:                 </div>
01056:             `;
01057:             document.body.appendChild(modal);
01058:         }
01059:         this.updateHungerUI();
```

### lines 1043-1060
```js
01043:             modal.innerHTML = `
01044:                 <div class="modal-content form-container" style="max-width: 360px; text-align: center; border-top: 6px solid #f39c12;">
01045:                     <button class="close-btn" onclick="document.getElementById('foodShopModal').classList.remove('active')">✖</button>
01046:                     <h3 style="color: #f39c12; margin-bottom: 5px;">🍖 Cửa Hàng Thú Cưng</h3>
01047:                     <p style="margin-bottom: 20px; font-size: 0.95em; color: #666;">Độ no hiện tại: <strong id="shopHungerText" style="color: #2ecc71;">0</strong> / 100</p>
01048:                     
01049:                     <div style="display: flex; flex-direction: column; gap: 0;">
01050:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(10, 5)">🍰 Bánh (10 🪙) ➔ +5 No</button>
01051:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(20, 10)">🍪 Bánh quy (20 🪙) ➔ +10 No</button>
01052:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(40, 50)">🍛 Cơm thường (40 🪙) ➔ +50 No</button>
01053:                         <button class="food-shop-btn premium" onclick="PetInteractionManager.buyFood(100, 100)">🥩 Đồ ăn xịn (100 🪙) ➔ Đầy bụng</button>
01054:                     </div>
01055:                 </div>
01056:             `;
01057:             document.body.appendChild(modal);
01058:         }
01059:         this.updateHungerUI();
01060:         modal.classList.add('active');
```

### lines 1044-1061
```js
01044:                 <div class="modal-content form-container" style="max-width: 360px; text-align: center; border-top: 6px solid #f39c12;">
01045:                     <button class="close-btn" onclick="document.getElementById('foodShopModal').classList.remove('active')">✖</button>
01046:                     <h3 style="color: #f39c12; margin-bottom: 5px;">🍖 Cửa Hàng Thú Cưng</h3>
01047:                     <p style="margin-bottom: 20px; font-size: 0.95em; color: #666;">Độ no hiện tại: <strong id="shopHungerText" style="color: #2ecc71;">0</strong> / 100</p>
01048:                     
01049:                     <div style="display: flex; flex-direction: column; gap: 0;">
01050:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(10, 5)">🍰 Bánh (10 🪙) ➔ +5 No</button>
01051:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(20, 10)">🍪 Bánh quy (20 🪙) ➔ +10 No</button>
01052:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(40, 50)">🍛 Cơm thường (40 🪙) ➔ +50 No</button>
01053:                         <button class="food-shop-btn premium" onclick="PetInteractionManager.buyFood(100, 100)">🥩 Đồ ăn xịn (100 🪙) ➔ Đầy bụng</button>
01054:                     </div>
01055:                 </div>
01056:             `;
01057:             document.body.appendChild(modal);
01058:         }
01059:         this.updateHungerUI();
01060:         modal.classList.add('active');
01061:     }
```

### lines 1045-1062
```js
01045:                     <button class="close-btn" onclick="document.getElementById('foodShopModal').classList.remove('active')">✖</button>
01046:                     <h3 style="color: #f39c12; margin-bottom: 5px;">🍖 Cửa Hàng Thú Cưng</h3>
01047:                     <p style="margin-bottom: 20px; font-size: 0.95em; color: #666;">Độ no hiện tại: <strong id="shopHungerText" style="color: #2ecc71;">0</strong> / 100</p>
01048:                     
01049:                     <div style="display: flex; flex-direction: column; gap: 0;">
01050:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(10, 5)">🍰 Bánh (10 🪙) ➔ +5 No</button>
01051:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(20, 10)">🍪 Bánh quy (20 🪙) ➔ +10 No</button>
01052:                         <button class="food-shop-btn" onclick="PetInteractionManager.buyFood(40, 50)">🍛 Cơm thường (40 🪙) ➔ +50 No</button>
01053:                         <button class="food-shop-btn premium" onclick="PetInteractionManager.buyFood(100, 100)">🥩 Đồ ăn xịn (100 🪙) ➔ Đầy bụng</button>
01054:                     </div>
01055:                 </div>
01056:             `;
01057:             document.body.appendChild(modal);
01058:         }
01059:         this.updateHungerUI();
01060:         modal.classList.add('active');
01061:     }
01062: 
```

### lines 1055-1072
```js
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
```

## pattern `student_coins` — 4 hits

### lines 1061-1078
```js
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
```

### lines 1200-1217
```js
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
```

### lines 2245-2262
```js
02245:             `Dùng ${safePrice} Coin để mở khóa vĩnh viễn tương tác?`
02246:         );
02247: 
02248:         if (!accepted) return;
02249: 
02250:         this.purchaseInProgress = true;
02251: 
02252:         const coinRef = db.ref(
02253:             `student_coins/${user.username}`
02254:         );
02255: 
02256:         const unlockRef = db.ref(
02257:             `student_pet_interactions/${user.username}/${petId}`
02258:         );
02259: 
02260:         let coinWasDeducted = false;
02261: 
02262:         try {
```

### lines 3769-3786
```js
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
```

## pattern `unlock` — 38 hits

### lines 1-14
```js
00001: // js/pet-interactions.js
00002: 
00003: class PetInteractionManager {
00004:     static isEnabled = localStorage.getItem('petInteractionsEnabled') !== 'false';
00005:     static unlockedInteractions = [];
00006: 
00007:     static serverOffset = 0;
00008:     static getNow() {
00009:         return Date.now() + this.serverOffset;
00010:     }
00011: 
00012:     // --- CÁC CHỈ SỐ SINH TỒN ---
00013:     static hunger = 100;
00014:     static lastHungerUpdate = this.getNow();
```

### lines 76-93
```js
00076:             item => item.id === petId
00077:         );
00078: 
00079:         return Boolean(pet) &&
00080:             pet.usesHunger !== false;
00081:     }
00082: 
00083:     static isUnlocked(petId) {
00084:         return this.unlockedInteractions.includes(petId);
00085:     }
00086: 
00087:     static getPerPetInteractionStorageKey() {
00088:         const user = this.getCurrentUser();
00089:         const ownerKey = user?.username
00090:             ? String(user.username)
00091:             : 'guest';
00092: 
00093:         return `petInteractionEnabledByPet:${ownerKey}`;
```

### lines 228-245
```js
00228:             snapshot => {
00229:                 const data = snapshot.val() || {};
00230: 
00231:                 /*
00232:                  * Chỉ nhận những pet có giá trị true.
00233:                  * Không dùng Object.keys trực tiếp vì
00234:                  * dữ liệu false vẫn có thể bị tính là mở khóa.
00235:                  */
00236:                 this.unlockedInteractions =
00237:                     Object.keys(data).filter(
00238:                         petId => data[petId] === true
00239:                     );
00240: 
00241:                 const modal =
00242:                     document.getElementById(
00243:                         'petInteractionInfoModal'
00244:                     );
00245: 
```

### lines 1654-1671
```js
01654:             petId,
01655:             !this.isPetInteractionEnabled(petId)
01656:         );
01657:     }
01658: 
01659:     static setInteractionFilter(filter) {
01660:         const allowedFilters = [
01661:             'all',
01662:             'unlocked',
01663:             'locked',
01664:             'active'
01665:         ];
01666: 
01667:         this.interactionFilter =
01668:             allowedFilters.includes(filter)
01669:                 ? filter
01670:                 : 'all';
01671: 
```

### lines 1735-1752
```js
01735:         const activePetId =
01736:             localStorage.getItem(
01737:                 'active_pet'
01738:             );
01739: 
01740:         const totalPets =
01741:             this.interactivePets.length;
01742: 
01743:         const unlockedCount =
01744:             this.interactivePets.filter(
01745:                 pet => this.isUnlocked(pet.id)
01746:             ).length;
01747: 
01748:         const progress =
01749:             totalPets > 0
01750:                 ? Math.round(
01751:                     unlockedCount /
01752:                     totalPets *
```

### lines 1743-1760
```js
01743:         const unlockedCount =
01744:             this.interactivePets.filter(
01745:                 pet => this.isUnlocked(pet.id)
01746:             ).length;
01747: 
01748:         const progress =
01749:             totalPets > 0
01750:                 ? Math.round(
01751:                     unlockedCount /
01752:                     totalPets *
01753:                     100
01754:                 )
01755:                 : 0;
01756: 
01757:         const currentFilter =
01758:             this.interactionFilter ||
01759:             'all';
01760: 
```

### lines 1818-1835
```js
01818:                     'Lưu Ly Hoa Viên'
01819:                 ]
01820:             }
01821:         };
01822: 
01823:         const filteredPets =
01824:             this.interactivePets.filter(
01825:                 pet => {
01826:                     const unlocked =
01827:                         this.isUnlocked(
01828:                             pet.id
01829:                         );
01830: 
01831:                     const active =
01832:                         activePetId ===
01833:                         pet.id;
01834: 
01835:                     if (
```

### lines 1829-1846
```js
01829:                         );
01830: 
01831:                     const active =
01832:                         activePetId ===
01833:                         pet.id;
01834: 
01835:                     if (
01836:                         currentFilter ===
01837:                         'unlocked'
01838:                     ) {
01839:                         return unlocked;
01840:                     }
01841: 
01842:                     if (
01843:                         currentFilter ===
01844:                         'locked'
01845:                     ) {
01846:                         return !unlocked;
```

### lines 1831-1848
```js
01831:                     const active =
01832:                         activePetId ===
01833:                         pet.id;
01834: 
01835:                     if (
01836:                         currentFilter ===
01837:                         'unlocked'
01838:                     ) {
01839:                         return unlocked;
01840:                     }
01841: 
01842:                     if (
01843:                         currentFilter ===
01844:                         'locked'
01845:                     ) {
01846:                         return !unlocked;
01847:                     }
01848: 
```

### lines 1838-1855
```js
01838:                     ) {
01839:                         return unlocked;
01840:                     }
01841: 
01842:                     if (
01843:                         currentFilter ===
01844:                         'locked'
01845:                     ) {
01846:                         return !unlocked;
01847:                     }
01848: 
01849:                     if (
01850:                         currentFilter ===
01851:                         'active'
01852:                     ) {
01853:                         return active;
01854:                     }
01855: 
```

### lines 1911-1928
```js
01911:                 <span class="pet-overview-icon">🐾</span>
01912: 
01913:                 <div>
01914:                     <strong>${totalPets}</strong>
01915:                     <small>Tổng thú cưng</small>
01916:                 </div>
01917:             </div>
01918: 
01919:             <div class="pet-overview-card is-unlocked">
01920:                 <span class="pet-overview-icon">🔓</span>
01921: 
01922:                 <div>
01923:                     <strong>${unlockedCount}</strong>
01924:                     <small>Đã mở khóa</small>
01925:                 </div>
01926:             </div>
01927: 
01928:             <div class="pet-overview-card is-active">
```

### lines 1915-1932
```js
01915:                     <small>Tổng thú cưng</small>
01916:                 </div>
01917:             </div>
01918: 
01919:             <div class="pet-overview-card is-unlocked">
01920:                 <span class="pet-overview-icon">🔓</span>
01921: 
01922:                 <div>
01923:                     <strong>${unlockedCount}</strong>
01924:                     <small>Đã mở khóa</small>
01925:                 </div>
01926:             </div>
01927: 
01928:             <div class="pet-overview-card is-active">
01929:                 <span class="pet-overview-icon">✨</span>
01930: 
01931:                 <div>
01932:                     <strong>
```

### lines 1946-1963
```js
01946: 
01947:             <div class="pet-progress-track">
01948:                 <div class="pet-progress-fill"
01949:                      style="width: ${progress}%">
01950:                 </div>
01951:             </div>
01952: 
01953:             <small>
01954:                 Đã mở ${unlockedCount}/${totalPets}
01955:                 bộ tương tác
01956:             </small>
01957:         </div>
01958: 
01959:         <div class="pet-interaction-toolbar">
01960:             <div class="pet-filter-group">
01961:                 <button type="button"
01962:                         class="pet-filter-button ${currentFilter === 'all'
01963:                 ? 'is-active'
```

### lines 1964-1981
```js
01964:                 : ''
01965:             }"
01966:                         onclick="PetInteractionManager.setInteractionFilter('all')">
01967:                     Tất cả
01968:                     <span>${totalPets}</span>
01969:                 </button>
01970: 
01971:                 <button type="button"
01972:                         class="pet-filter-button ${currentFilter === 'unlocked'
01973:                 ? 'is-active'
01974:                 : ''
01975:             }"
01976:                         onclick="PetInteractionManager.setInteractionFilter('unlocked')">
01977:                     Đã mở
01978:                     <span>${unlockedCount}</span>
01979:                 </button>
01980: 
01981:                 <button type="button"
```

### lines 1968-1985
```js
01968:                     <span>${totalPets}</span>
01969:                 </button>
01970: 
01971:                 <button type="button"
01972:                         class="pet-filter-button ${currentFilter === 'unlocked'
01973:                 ? 'is-active'
01974:                 : ''
01975:             }"
01976:                         onclick="PetInteractionManager.setInteractionFilter('unlocked')">
01977:                     Đã mở
01978:                     <span>${unlockedCount}</span>
01979:                 </button>
01980: 
01981:                 <button type="button"
01982:                         class="pet-filter-button ${currentFilter === 'locked'
01983:                 ? 'is-active'
01984:                 : ''
01985:             }"
```

### lines 1970-1987
```js
01970: 
01971:                 <button type="button"
01972:                         class="pet-filter-button ${currentFilter === 'unlocked'
01973:                 ? 'is-active'
01974:                 : ''
01975:             }"
01976:                         onclick="PetInteractionManager.setInteractionFilter('unlocked')">
01977:                     Đã mở
01978:                     <span>${unlockedCount}</span>
01979:                 </button>
01980: 
01981:                 <button type="button"
01982:                         class="pet-filter-button ${currentFilter === 'locked'
01983:                 ? 'is-active'
01984:                 : ''
01985:             }"
01986:                         onclick="PetInteractionManager.setInteractionFilter('locked')">
01987:                     Chưa mở
```

### lines 1980-1997
```js
01980: 
01981:                 <button type="button"
01982:                         class="pet-filter-button ${currentFilter === 'locked'
01983:                 ? 'is-active'
01984:                 : ''
01985:             }"
01986:                         onclick="PetInteractionManager.setInteractionFilter('locked')">
01987:                     Chưa mở
01988:                     <span>${totalPets - unlockedCount}</span>
01989:                 </button>
01990: 
01991:                 <button type="button"
01992:                         class="pet-filter-button ${currentFilter === 'active'
01993:                 ? 'is-active'
01994:                 : ''
01995:             }"
01996:                         onclick="PetInteractionManager.setInteractionFilter('active')">
01997:                     Đang dùng
```

### lines 2028-2045
```js
02028:                                 rarity: 'Đồng hành',
02029:                                 className:
02030:                                     'theme-default',
02031:                                 skills: [
02032:                                     'Tương tác đặc biệt'
02033:                                 ]
02034:                             };
02035: 
02036:                         const unlocked =
02037:                             this.isUnlocked(
02038:                                 pet.id
02039:                             );
02040: 
02041:                         const active =
02042:                             activePetId ===
02043:                             pet.id;
02044: 
02045:                         const interactionEnabled =
```

### lines 2038-2055
```js
02038:                                 pet.id
02039:                             );
02040: 
02041:                         const active =
02042:                             activePetId ===
02043:                             pet.id;
02044: 
02045:                         const interactionEnabled =
02046:                             unlocked &&
02047:                             this.isPetInteractionEnabled(
02048:                                 pet.id
02049:                             );
02050: 
02051:                         const skillHTML =
02052:                             visual.skills.map(
02053:                                 skill => `
02054:                                 <span class="pet-skill-chip">
02055:                                     ✦ ${skill}
```

### lines 2053-2070
```js
02053:                                 skill => `
02054:                                 <span class="pet-skill-chip">
02055:                                     ✦ ${skill}
02056:                                 </span>
02057:                             `
02058:                             ).join('');
02059: 
02060:                         const actionHTML =
02061:                             unlocked
02062:                                 ? `
02063:                                 <div class="pet-interaction-owned-controls">
02064:                                     <button type="button"
02065:                                             class="pet-interaction-action is-unlocked"
02066:                                             disabled>
02067:                                         <span>✓</span>
02068:                                         Đã mở khóa vĩnh viễn
02069:                                     </button>
02070: 
```

### lines 2057-2074
```js
02057:                             `
02058:                             ).join('');
02059: 
02060:                         const actionHTML =
02061:                             unlocked
02062:                                 ? `
02063:                                 <div class="pet-interaction-owned-controls">
02064:                                     <button type="button"
02065:                                             class="pet-interaction-action is-unlocked"
02066:                                             disabled>
02067:                                         <span>✓</span>
02068:                                         Đã mở khóa vĩnh viễn
02069:                                     </button>
02070: 
02071:                                     <div class="pet-interaction-toggle-row">
02072:                                         <div class="pet-interaction-toggle-copy">
02073:                                             <strong>
02074:                                                 ${interactionEnabled
```

### lines 2101-2118
```js
02101:                                     Mở khóa với ${pet.price} Coin
02102:                                 </button>
02103:                             `;
02104: 
02105:                         return `
02106:                         <article class="
02107:                             pet-interaction-card
02108:                             ${visual.className}
02109:                             ${unlocked
02110:                                 ? 'is-unlocked'
02111:                                 : 'is-locked'}
02112:                             ${active
02113:                                 ? 'is-active-pet'
02114:                                 : ''}
02115:                             ${unlocked && !interactionEnabled
02116:                                 ? 'is-interaction-disabled'
02117:                                 : ''}
02118:                         "
```

### lines 2102-2119
```js
02102:                                 </button>
02103:                             `;
02104: 
02105:                         return `
02106:                         <article class="
02107:                             pet-interaction-card
02108:                             ${visual.className}
02109:                             ${unlocked
02110:                                 ? 'is-unlocked'
02111:                                 : 'is-locked'}
02112:                             ${active
02113:                                 ? 'is-active-pet'
02114:                                 : ''}
02115:                             ${unlocked && !interactionEnabled
02116:                                 ? 'is-interaction-disabled'
02117:                                 : ''}
02118:                         "
02119:                         style="--pet-card-index: ${index};">
```

### lines 2107-2124
```js
02107:                             pet-interaction-card
02108:                             ${visual.className}
02109:                             ${unlocked
02110:                                 ? 'is-unlocked'
02111:                                 : 'is-locked'}
02112:                             ${active
02113:                                 ? 'is-active-pet'
02114:                                 : ''}
02115:                             ${unlocked && !interactionEnabled
02116:                                 ? 'is-interaction-disabled'
02117:                                 : ''}
02118:                         "
02119:                         style="--pet-card-index: ${index};">
02120: 
02121:                             <div class="pet-card-background-symbol">
02122:                                 ${visual.icon}
02123:                             </div>
02124: 
```

### lines 2165-2182
```js
02165:                                 <div class="pet-skill-list">
02166:                                     ${skillHTML}
02167:                                 </div>
02168:                             </div>
02169: 
02170:                             <div class="pet-card-footer">
02171:                                 <div class="
02172:                                     pet-lock-status
02173:                                     ${unlocked
02174:                                 ? 'is-unlocked'
02175:                                 : 'is-locked'}
02176:                                 ">
02177:                                     <span>
02178:                                         ${unlocked ? '🔓' : '🔒'}
02179:                                     </span>
02180: 
02181:                                     <div>
02182:                                         <strong>
```

### lines 2166-2183
```js
02166:                                     ${skillHTML}
02167:                                 </div>
02168:                             </div>
02169: 
02170:                             <div class="pet-card-footer">
02171:                                 <div class="
02172:                                     pet-lock-status
02173:                                     ${unlocked
02174:                                 ? 'is-unlocked'
02175:                                 : 'is-locked'}
02176:                                 ">
02177:                                     <span>
02178:                                         ${unlocked ? '🔓' : '🔒'}
02179:                                     </span>
02180: 
02181:                                     <div>
02182:                                         <strong>
02183:                                             ${unlocked
```

### lines 2170-2187
```js
02170:                             <div class="pet-card-footer">
02171:                                 <div class="
02172:                                     pet-lock-status
02173:                                     ${unlocked
02174:                                 ? 'is-unlocked'
02175:                                 : 'is-locked'}
02176:                                 ">
02177:                                     <span>
02178:                                         ${unlocked ? '🔓' : '🔒'}
02179:                                     </span>
02180: 
02181:                                     <div>
02182:                                         <strong>
02183:                                             ${unlocked
02184:                                 ? 'Đã sở hữu'
02185:                                 : 'Chưa mở khóa'
02186:                             }
02187:                                         </strong>
```

### lines 2175-2192
```js
02175:                                 : 'is-locked'}
02176:                                 ">
02177:                                     <span>
02178:                                         ${unlocked ? '🔓' : '🔒'}
02179:                                     </span>
02180: 
02181:                                     <div>
02182:                                         <strong>
02183:                                             ${unlocked
02184:                                 ? 'Đã sở hữu'
02185:                                 : 'Chưa mở khóa'
02186:                             }
02187:                                         </strong>
02188: 
02189:                                         <small>
02190:                                             ${unlocked
02191:                                 ? (interactionEnabled
02192:                                     ? 'Đang cho phép tự động kích hoạt'
```

### lines 2182-2199
```js
02182:                                         <strong>
02183:                                             ${unlocked
02184:                                 ? 'Đã sở hữu'
02185:                                 : 'Chưa mở khóa'
02186:                             }
02187:                                         </strong>
02188: 
02189:                                         <small>
02190:                                             ${unlocked
02191:                                 ? (interactionEnabled
02192:                                     ? 'Đang cho phép tự động kích hoạt'
02193:                                     : 'Đã tắt tự động kích hoạt')
02194:                                 : 'Mua một lần, dùng vĩnh viễn'
02195:                             }
02196:                                         </small>
02197:                                     </div>
02198:                                 </div>
02199: 
```

### lines 2248-2265
```js
02248:         if (!accepted) return;
02249: 
02250:         this.purchaseInProgress = true;
02251: 
02252:         const coinRef = db.ref(
02253:             `student_coins/${user.username}`
02254:         );
02255: 
02256:         const unlockRef = db.ref(
02257:             `student_pet_interactions/${user.username}/${petId}`
02258:         );
02259: 
02260:         let coinWasDeducted = false;
02261: 
02262:         try {
02263:             const unlockSnapshot =
02264:                 await unlockRef.once('value');
02265: 
```

### lines 2255-2272
```js
02255: 
02256:         const unlockRef = db.ref(
02257:             `student_pet_interactions/${user.username}/${petId}`
02258:         );
02259: 
02260:         let coinWasDeducted = false;
02261: 
02262:         try {
02263:             const unlockSnapshot =
02264:                 await unlockRef.once('value');
02265: 
02266:             if (
02267:                 unlockSnapshot.val() === true
02268:             ) {
02269:                 this.unlockedInteractions = [
02270:                     ...new Set([
02271:                         ...this.unlockedInteractions,
02272:                         petId
```

### lines 2256-2273
```js
02256:         const unlockRef = db.ref(
02257:             `student_pet_interactions/${user.username}/${petId}`
02258:         );
02259: 
02260:         let coinWasDeducted = false;
02261: 
02262:         try {
02263:             const unlockSnapshot =
02264:                 await unlockRef.once('value');
02265: 
02266:             if (
02267:                 unlockSnapshot.val() === true
02268:             ) {
02269:                 this.unlockedInteractions = [
02270:                     ...new Set([
02271:                         ...this.unlockedInteractions,
02272:                         petId
02273:                     ])
```

### lines 2259-2276
```js
02259: 
02260:         let coinWasDeducted = false;
02261: 
02262:         try {
02263:             const unlockSnapshot =
02264:                 await unlockRef.once('value');
02265: 
02266:             if (
02267:                 unlockSnapshot.val() === true
02268:             ) {
02269:                 this.unlockedInteractions = [
02270:                     ...new Set([
02271:                         ...this.unlockedInteractions,
02272:                         petId
02273:                     ])
02274:                 ];
02275: 
02276:                 this.savePetInteractionPreference(
```

### lines 2261-2278
```js
02261: 
02262:         try {
02263:             const unlockSnapshot =
02264:                 await unlockRef.once('value');
02265: 
02266:             if (
02267:                 unlockSnapshot.val() === true
02268:             ) {
02269:                 this.unlockedInteractions = [
02270:                     ...new Set([
02271:                         ...this.unlockedInteractions,
02272:                         petId
02273:                     ])
02274:                 ];
02275: 
02276:                 this.savePetInteractionPreference(
02277:                     petId,
02278:                     true
```

### lines 2263-2280
```js
02263:             const unlockSnapshot =
02264:                 await unlockRef.once('value');
02265: 
02266:             if (
02267:                 unlockSnapshot.val() === true
02268:             ) {
02269:                 this.unlockedInteractions = [
02270:                     ...new Set([
02271:                         ...this.unlockedInteractions,
02272:                         petId
02273:                     ])
02274:                 ];
02275: 
02276:                 this.savePetInteractionPreference(
02277:                     petId,
02278:                     true
02279:                 );
02280: 
```

### lines 2304-2321
```js
02304: 
02305:             if (!coinTransaction.committed) {
02306:                 alert('❌ Bạn không đủ Coin.');
02307:                 return;
02308:             }
02309: 
02310:             coinWasDeducted = true;
02311: 
02312:             await unlockRef.set(true);
02313: 
02314:             this.unlockedInteractions = [
02315:                 ...new Set([
02316:                     ...this.unlockedInteractions,
02317:                     petId
02318:                 ])
02319:             ];
02320: 
02321:             this.savePetInteractionPreference(
```

### lines 2306-2323
```js
02306:                 alert('❌ Bạn không đủ Coin.');
02307:                 return;
02308:             }
02309: 
02310:             coinWasDeducted = true;
02311: 
02312:             await unlockRef.set(true);
02313: 
02314:             this.unlockedInteractions = [
02315:                 ...new Set([
02316:                     ...this.unlockedInteractions,
02317:                     petId
02318:                 ])
02319:             ];
02320: 
02321:             this.savePetInteractionPreference(
02322:                 petId,
02323:                 true
```

### lines 2308-2325
```js
02308:             }
02309: 
02310:             coinWasDeducted = true;
02311: 
02312:             await unlockRef.set(true);
02313: 
02314:             this.unlockedInteractions = [
02315:                 ...new Set([
02316:                     ...this.unlockedInteractions,
02317:                     petId
02318:                 ])
02319:             ];
02320: 
02321:             this.savePetInteractionPreference(
02322:                 petId,
02323:                 true
02324:             );
02325: 
```

# js/store-collections.js

## pattern `claimToken` — 6 hits

### lines 351-368
```js
00351:             );
00352:         const milestoneKey = String(milestone.count);
00353:         const claimPath = buildRewardClaimPath(
00354:             username,
00355:             collection.id,
00356:             milestone.count
00357:         );
00358:         const claimRef = database.ref(claimPath);
00359:         const claimToken = createClaimToken();
00360:         const now = Date.now();
00361:         const messageKey = buildRewardMessageKey(
00362:             collection.id,
00363:             milestone.count
00364:         );
00365: 
00366:         /*
00367:          * Bước 1: giữ chỗ mốc bằng transaction. Chỉ tab giữ đúng claimToken
00368:          * mới được đi tiếp, nên mở nhiều tab cũng không cộng trùng Coin.
```

### lines 359-376
```js
00359:         const claimToken = createClaimToken();
00360:         const now = Date.now();
00361:         const messageKey = buildRewardMessageKey(
00362:             collection.id,
00363:             milestone.count
00364:         );
00365: 
00366:         /*
00367:          * Bước 1: giữ chỗ mốc bằng transaction. Chỉ tab giữ đúng claimToken
00368:          * mới được đi tiếp, nên mở nhiều tab cũng không cộng trùng Coin.
00369:          */
00370:         const reservation = await claimRef.transaction(current => {
00371:             if (current?.status === 'sent') return;
00372: 
00373:             if (current?.status === 'reserved') {
00374:                 const age = now - Number(current.reservedAt || 0);
00375: 
00376:                 // Một tab khác vẫn đang xử lý; không tranh quyền trong 15 giây.
```

### lines 386-403
```js
00386:                     collectionId: current.collectionId,
00387:                     collectionLabel: current.collectionLabel,
00388:                     milestone: current.milestone,
00389:                     milestoneKey: current.milestoneKey,
00390:                     rewardCoins: current.rewardCoins,
00391:                     reservedAt: current.reservedAt,
00392:                     messageKey: current.messageKey,
00393:                     rewardVersion: current.rewardVersion,
00394:                     claimToken
00395:                 };
00396:             }
00397: 
00398:             return {
00399:                 status: 'reserved',
00400:                 collectionId: collection.id,
00401:                 collectionLabel: collection.label,
00402:                 milestone: milestone.count,
00403:                 milestoneKey,
```

### lines 400-417
```js
00400:                 collectionId: collection.id,
00401:                 collectionLabel: collection.label,
00402:                 milestone: milestone.count,
00403:                 milestoneKey,
00404:                 rewardCoins: rewardCoins,
00405:                 reservedAt: now,
00406:                 messageKey,
00407:                 rewardVersion: 1,
00408:                 claimToken
00409:             };
00410:         });
00411: 
00412:         const reserved = reservation.snapshot?.val?.() || null;
00413: 
00414:         if (
00415:             !reservation.committed ||
00416:             !reserved ||
00417:             reserved.status !== 'reserved' ||
```

### lines 410-427
```js
00410:         });
00411: 
00412:         const reserved = reservation.snapshot?.val?.() || null;
00413: 
00414:         if (
00415:             !reservation.committed ||
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
```

### lines 438-455
```js
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
```

## pattern `student_collection_rewards` — 2 hits

### lines 302-319
```js
00302:     }
00303: 
00304:     function buildRewardMessageKey(collectionId, milestoneCount) {
00305:         return `collection_reward_${collectionId}_${milestoneCount}`;
00306:     }
00307: 
00308:     function buildRewardClaimPath(username, collectionId, milestoneCount) {
00309:         return [
00310:             'student_collection_rewards',
00311:             username,
00312:             collectionId,
00313:             String(milestoneCount)
00314:         ].join('/');
00315:     }
00316: 
00317:     function getRewardClaim(collectionId, milestoneCount) {
00318:         return rewardClaims?.[collectionId]?.[String(milestoneCount)] || null;
00319:     }
```

### lines 571-588
```js
00571:                 );
00572:             }
00573:             return false;
00574:         }
00575: 
00576:         rewardClaimListenerInstalled = true;
00577: 
00578:         database
00579:             .ref(`student_collection_rewards/${username}`)
00580:             .on(
00581:                 'value',
00582:                 snapshot => {
00583:                     rewardClaims = snapshot.val() || {};
00584:                     renderCollection(activeCollectionId);
00585:                     queueCollectionRewardScan();
00586:                 },
00587:                 error => {
00588:                     console.warn(
```

## pattern `student_coins` — 1 hits

### lines 423-440
```js
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
```

# js/transaction-history.js

## pattern `undoing` — 14 hits

### lines 9-26
```js
00009: 
00010:     // Firebase đọc theo batch lớn hơn UI để giảm số request.
00011:     // UI vẫn chỉ mở thêm 5 giao dịch mỗi lần như trước.
00012:     const FIREBASE_LOG_BATCH_SIZE = 50;
00013: 
00014:     const state = {
00015:         logs: [],
00016:         loadingStudents: false,
00017:         undoing: new Set(),
00018: 
00019:         visibleLogCount:
00020:             LOG_PAGE_SIZE,
00021: 
00022:         lastLogFilterKey:
00023:             '',
00024: 
00025:         // Cursor phân trang Firebase cho nhật ký giáo viên.
00026:         firebaseCursor: null,
```

### lines 274-291
```js
00274:             ) {
00275:                 throw new Error(
00276:                     'Giao dịch này đã được hoàn tác trước đó.'
00277:                 );
00278:             }
00279: 
00280:             if (
00281:                 initialLog.status ===
00282:                 'undoing'
00283:             ) {
00284:                 throw new Error(
00285:                     'Giao dịch đang được hoàn tác ở tab hoặc thiết bị khác.'
00286:                 );
00287:             }
00288: 
00289:             if (
00290:                 initialLog.status !==
00291:                 'active'
```

### lines 317-334
```js
00317:              */
00318:             const tx =
00319:                 await statusRef.transaction(
00320:                     currentStatus => {
00321:                         if (
00322:                             currentStatus === null ||
00323:                             currentStatus === undefined
00324:                         ) {
00325:                             // SỬA Ở ĐÂY: Trả về 'undoing' thay vì return;
00326:                             // Việc này ép Firebase SDK gửi request lên server để đồng bộ giá trị thật.
00327:                             // Server sẽ không tạo bản ghi rác vì Firebase Rules của bạn đã chặn việc tạo log thiếu dữ liệu.
00328:                             return 'undoing';
00329:                         }
00330: 
00331:                         if (
00332:                             currentStatus ===
00333:                             'undone'
00334:                         ) {
```

### lines 320-337
```js
00320:                     currentStatus => {
00321:                         if (
00322:                             currentStatus === null ||
00323:                             currentStatus === undefined
00324:                         ) {
00325:                             // SỬA Ở ĐÂY: Trả về 'undoing' thay vì return;
00326:                             // Việc này ép Firebase SDK gửi request lên server để đồng bộ giá trị thật.
00327:                             // Server sẽ không tạo bản ghi rác vì Firebase Rules của bạn đã chặn việc tạo log thiếu dữ liệu.
00328:                             return 'undoing';
00329:                         }
00330: 
00331:                         if (
00332:                             currentStatus ===
00333:                             'undone'
00334:                         ) {
00335:                             transactionError =
00336:                                 'Giao dịch này đã được hoàn tác trước đó.';
00337: 
```

### lines 335-352
```js
00335:                             transactionError =
00336:                                 'Giao dịch này đã được hoàn tác trước đó.';
00337: 
00338:                             return;
00339:                         }
00340: 
00341:                         if (
00342:                             currentStatus ===
00343:                             'undoing'
00344:                         ) {
00345:                             transactionError =
00346:                                 'Giao dịch đang được hoàn tác ở nơi khác.';
00347: 
00348:                             return;
00349:                         }
00350: 
00351:                         if (
00352:                             currentStatus !==
```

### lines 354-371
```js
00354:                         ) {
00355:                             transactionError =
00356:                                 `Trạng thái giao dịch không hợp lệ: ` +
00357:                                 `${currentStatus}.`;
00358: 
00359:                             return;
00360:                         }
00361: 
00362:                         return 'undoing';
00363:                     }
00364:                 );
00365: 
00366:             if (tx.committed) {
00367:                 await logRef.update({
00368:                     undoStartedAt:
00369:                         firebase.database
00370:                             .ServerValue
00371:                             .TIMESTAMP,
```

### lines 424-441
```js
00424:                     .val();
00425: 
00426:             if (latestStatus === 'undone') {
00427:                 throw new Error(
00428:                     'Giao dịch này đã được hoàn tác trước đó.'
00429:                 );
00430:             }
00431: 
00432:             if (latestStatus === 'undoing') {
00433:                 throw new Error(
00434:                     'Giao dịch đang được hoàn tác ở nơi khác.'
00435:                 );
00436:             }
00437: 
00438:             throw new Error(
00439:                 transactionError
00440:             );
00441:         }
```

### lines 465-482
```js
00465:             logRef.child('status');
00466: 
00467:         try {
00468:             const statusSnapshot =
00469:                 await statusRef.once('value');
00470: 
00471:             /*
00472:              * Chỉ trả về active khi log thực sự
00473:              * đang ở trạng thái undoing.
00474:              */
00475:             if (
00476:                 statusSnapshot.val() !==
00477:                 'undoing'
00478:             ) {
00479:                 return;
00480:             }
00481: 
00482:             const tx =
```

### lines 469-486
```js
00469:                 await statusRef.once('value');
00470: 
00471:             /*
00472:              * Chỉ trả về active khi log thực sự
00473:              * đang ở trạng thái undoing.
00474:              */
00475:             if (
00476:                 statusSnapshot.val() !==
00477:                 'undoing'
00478:             ) {
00479:                 return;
00480:             }
00481: 
00482:             const tx =
00483:                 await statusRef.transaction(
00484:                     currentStatus => {
00485:                         if (
00486:                             currentStatus !==
```

### lines 479-496
```js
00479:                 return;
00480:             }
00481: 
00482:             const tx =
00483:                 await statusRef.transaction(
00484:                     currentStatus => {
00485:                         if (
00486:                             currentStatus !==
00487:                             'undoing'
00488:                         ) {
00489:                             return;
00490:                         }
00491: 
00492:                         return 'active';
00493:                     }
00494:                 );
00495: 
00496:             if (!tx.committed) {
```

### lines 1200-1217
```js
01200:         ) {
01201:             alert(
01202:                 '⛔ Chỉ giáo viên được hoàn tác.'
01203:             );
01204:             return;
01205:         }
01206: 
01207:         if (
01208:             state.undoing.has(
01209:                 logId
01210:             )
01211:         ) {
01212:             return;
01213:         }
01214: 
01215:         if (
01216:             !confirm(
01217:                 'Bạn chắc chắn muốn hoàn tác giao dịch này?'
```

### lines 1215-1232
```js
01215:         if (
01216:             !confirm(
01217:                 'Bạn chắc chắn muốn hoàn tác giao dịch này?'
01218:             )
01219:         ) {
01220:             return;
01221:         }
01222: 
01223:         state.undoing.add(
01224:             logId
01225:         );
01226: 
01227:         /*
01228:          * Chỉ phục hồi trạng thái active nếu
01229:          * bước lock đã thành công nhưng quá trình
01230:          * hoàn tác phía sau gặp lỗi.
01231:          */
01232:         let lockAcquired = false;
```

### lines 1311-1328
```js
01311:             await loadTeacherLogs()
01312:                 .catch(console.error);
01313: 
01314:             alert(
01315:                 `❌ Không thể hoàn tác: ${error.message}`
01316:             );
01317: 
01318:         } finally {
01319:             state.undoing.delete(
01320:                 logId
01321:             );
01322:         }
01323:     }
01324: 
01325:     const typeName = type => ({
01326:         coin_adjustment:
01327:             'Điều chỉnh Coin',
01328: 
```

### lines 1807-1824
```js
01807:             visibleLogs.map(log => {
01808:                 const canUndo =
01809:                     log.reversible === true &&
01810:                     log.status === 'active';
01811: 
01812:                 const statusText =
01813:                     log.status === 'undone'
01814:                         ? '↩️ Đã hoàn tác'
01815:                         : log.status === 'undoing'
01816:                             ? '⏳ Đang hoàn tác'
01817:                             : canUndo
01818:                                 ? '✅ Có thể hoàn tác'
01819:                                 : '🔒 Chỉ xem';
01820: 
01821:                 const timestamp =
01822:                     Number(
01823:                         log.createdAt ||
01824:                         log.createdAtClient ||
```

## pattern `undoConversion` — 2 hits

### lines 977-994
```js
00977:         ] =
00978:             actor();
00979: 
00980:         await db.ref().update(
00981:             updates
00982:         );
00983:     }
00984: 
00985:     async function undoConversion(
00986:         log
00987:     ) {
00988:         const d =
00989:             log.details || {};
00990: 
00991:         const coinPath =
00992:             String(
00993:                 d.coinPath ||
00994:                 ''
```

### lines 1264-1281
```js
01264:                 'store_purchase'
01265:             ) {
01266:                 await undoPurchase(log);
01267: 
01268:             } else if (
01269:                 log.type ===
01270:                 'coin_conversion'
01271:             ) {
01272:                 await undoConversion(log);
01273: 
01274:             } else if (
01275:                 log.type ===
01276:                 'gift_sent'
01277:             ) {
01278:                 await undoGiftSent(log);
01279: 
01280:             } else {
01281:                 throw new Error(
```

## pattern `leaderboard_reward` — 1 hits

### lines 1351-1368
```js
01351:             'Nhận quà qua thư',
01352: 
01353:         grade_ticket_reward:
01354:             'Nhận vé từ điểm',
01355: 
01356:         game_reward:
01357:             'Phần thưởng trò chơi',
01358: 
01359:         leaderboard_reward:
01360:             'Phần thưởng thi đua',
01361: 
01362:         daily_login_reward:
01363:             'Quà đăng nhập',
01364: 
01365:         profile_request_decision:
01366:             'Duyệt đổi thông tin'
01367:     }[type] || type || 'Khác');
01368: 
```

# js/mid-autumn-festival.js

## pattern `MidAutumnCalendar` — 5 hits

### lines 250-267
```js
00250:         for (let i = copy.length - 1; i > 0; i--) {
00251:             const j = Math.floor(Math.random() * (i + 1));
00252:             [copy[i], copy[j]] = [copy[j], copy[i]];
00253:         }
00254:         return copy;
00255:     }
00256: 
00257:     function getVietnamYear(timestamp = now()) {
00258:         if (window.MidAutumnCalendar?.getVietnamYear) {
00259:             return window.MidAutumnCalendar.getVietnamYear(timestamp);
00260:         }
00261:         return new Date(timestamp + 7 * 60 * 60 * 1000).getUTCFullYear();
00262:     }
00263: 
00264:     function formatFestivalDate(dateKey) {
00265:         if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey || ''))) return String(dateKey || '');
00266:         const [y, m, d] = dateKey.split('-');
00267:         return `${d}/${m}/${y}`;
```

### lines 251-268
```js
00251:             const j = Math.floor(Math.random() * (i + 1));
00252:             [copy[i], copy[j]] = [copy[j], copy[i]];
00253:         }
00254:         return copy;
00255:     }
00256: 
00257:     function getVietnamYear(timestamp = now()) {
00258:         if (window.MidAutumnCalendar?.getVietnamYear) {
00259:             return window.MidAutumnCalendar.getVietnamYear(timestamp);
00260:         }
00261:         return new Date(timestamp + 7 * 60 * 60 * 1000).getUTCFullYear();
00262:     }
00263: 
00264:     function formatFestivalDate(dateKey) {
00265:         if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey || ''))) return String(dateKey || '');
00266:         const [y, m, d] = dateKey.split('-');
00267:         return `${d}/${m}/${y}`;
00268:     }
```

### lines 289-306
```js
00289:             state.serverOffset = 0;
00290:         }
00291:     }
00292: 
00293:     async function loadCalendar(year) {
00294:         const database = getDatabase();
00295:         let localInfo = null;
00296:         try {
00297:             localInfo = window.MidAutumnCalendar?.getFestivalInfo?.(year) || null;
00298:         } catch (_) { }
00299: 
00300:         if (database) {
00301:             try {
00302:                 const snap = await database.ref(`mid_autumn_calendar/${year}`).once('value');
00303:                 const remote = snap.val();
00304:                 if (remote && Number(remote.festivalStartAt) > 0 && Number(remote.festivalEndAt) > 0) {
00305:                     state.calendar = {
00306:                         ...(localInfo || {}),
```

### lines 312-329
```js
00312:                 }
00313:             } catch (error) {
00314:                 console.warn('[Đại Hội Trung Thu] Không đọc được lịch Firebase:', error);
00315:             }
00316:         }
00317: 
00318:         /*
00319:          * Không hard-code ngày dương. Nếu lịch năm nay chưa tồn tại trên
00320:          * Firebase, dùng chính kết quả 15/8 âm lịch do MidAutumnCalendar tính.
00321:          * Từ D-5 đến hết ngày Trung Thu, thử đồng bộ bản ghi năm hiện tại để
00322:          * cả Đại Hội và cơ chế tự tặng Xu dùng chung một lịch server.
00323:          */
00324:         if (database && localInfo) {
00325:             const t = now();
00326:             const canBootstrap =
00327:                 t >= Number(localInfo.autoGrantStartAt) &&
00328:                 t <= Number(localInfo.autoGrantEndAt);
00329: 
```

### lines 380-397
```js
00380:         return state.calendar;
00381:     }
00382: 
00383:     async function getEventStatus() {
00384:         if (state.testMode) {
00385:             const year = getVietnamYear();
00386:             let localInfo = null;
00387:             try {
00388:                 localInfo = window.MidAutumnCalendar?.getFestivalInfo?.(year) || null;
00389:             } catch (_) { }
00390: 
00391:             const t = now();
00392:             const calendar = {
00393:                 ...(localInfo || {}),
00394:                 year,
00395:                 festivalDateKey:
00396:                     String(localInfo?.festivalDateKey || 'TEST'),
00397:                 festivalStartAt:
```

## pattern `student_coins` — 3 hits

### lines 963-980
```js
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
```

### lines 989-1006
```js
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
```

### lines 1133-1150
```js
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
```

## pattern `mid_autumn_wallets` — 1 hits

### lines 271-288
```js
00271:         return getDatabase().ref(`${CONFIG.stateRoot}/${username()}/${year}`);
00272:     }
00273: 
00274:     function claimRef(year, milestone) {
00275:         return getDatabase().ref(`${CONFIG.rewardRoot}/${username()}/mid_autumn/${year}/${milestone}`);
00276:     }
00277: 
00278:     function walletRef() {
00279:         return getDatabase().ref(`mid_autumn_wallets/${username()}`);
00280:     }
00281: 
00282:     async function syncServerTime() {
00283:         const database = getDatabase();
00284:         if (!database) return;
00285:         try {
00286:             const snap = await database.ref('.info/serverTimeOffset').once('value');
00287:             state.serverOffset = Number(snap.val() || 0);
00288:         } catch (_) {
```

# js/roadmap-startup-fix.js

## pattern `AppStartupLoader` — 1 hits

### lines 18-35
```js
00018:         try {
00019:             if (typeof db !== 'undefined' && db) return db;
00020:         } catch (_) {}
00021: 
00022:         return window.db || null;
00023:     }
00024: 
00025:     function getLoader() {
00026:         return window.AppStartupLoader || null;
00027:     }
00028: 
00029:     function normalizePassingGrade(value) {
00030:         const number = parseFloat(value);
00031:         return Number.isFinite(number)
00032:             ? number
00033:             : DEFAULT_PASSING_GRADE;
00034:     }
00035: 
```

## pattern `.fail` — 2 hits

### lines 80-97
```js
00080:                 grade
00081:             );
00082:         } catch (error) {
00083:             console.error(
00084:                 '[Roadmap Startup Fix] Không thể đọc cài đặt lộ trình:',
00085:                 error
00086:             );
00087: 
00088:             if (typeof loader.fail === 'function') {
00089:                 loader.fail(
00090:                     'Không tải được Cài đặt lộ trình.',
00091:                     error?.message || String(error),
00092:                     'roadmap-settings'
00093:                 );
00094:             }
00095:         }
00096:     }
00097: 
```

### lines 81-98
```js
00081:             );
00082:         } catch (error) {
00083:             console.error(
00084:                 '[Roadmap Startup Fix] Không thể đọc cài đặt lộ trình:',
00085:                 error
00086:             );
00087: 
00088:             if (typeof loader.fail === 'function') {
00089:                 loader.fail(
00090:                     'Không tải được Cài đặt lộ trình.',
00091:                     error?.message || String(error),
00092:                     'roadmap-settings'
00093:                 );
00094:             }
00095:         }
00096:     }
00097: 
00098:     run();
```
