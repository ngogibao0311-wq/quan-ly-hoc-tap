# Bản vá nộp bài/làm lại bị treo — 19/11/2026

## Vấn đề xác nhận từ Firebase
- Pending `submission_submit` đã hủy, không có receipt, `operationId=76b497a5-f7f4-45b9-a1d5-c1c0c769a423`, được tạo trước lượt làm lại tiếp theo.
- Bài nộp hiện có `autoGradeAuthority.operationId` khác với pending và `submittedAt` từ lượt cũ; không được tự suy luận đã nộp thành công.
- Khóa thi `active` quá thời hạn và `mc_workspace_sessions` là `submitted`. Cần đối soát riêng lượt thi, không sửa bằng giao dịch receipt.

## Thay đổi đã thực hiện
1. `js/student.js`: nộp thủ công, tự động và do vi phạm đi chung hàng đợi từng bài. Lần tự động được xếp sau thao tác trước đó, kể cả khi thao tác trước thất bại; không chạy nhiều `submission_submit` song song trong một tab.
2. Worker `registerSessionOperation`: tra `economy_receipts` trước; kết quả đã chốt được replay mà không tái tạo pending. Khi chưa có receipt, preflight kiểm tra khóa bài và `redoStartedAt` trước khi đăng ký. Pending `cancelled=true` không được thử tiếp.
3. Worker `teacher_session_reconcile_operation`: nếu `submission_submit` đã cancelled, trên 10 phút, không còn phiên nguồn hoạt động, không activeRequests/transition và không khóa thi còn hiệu lực, kiểm tra lại pending + receipt ETag và ghi **biên nhận HỦY có điều kiện** chỉ khi receipt trống. Sau đó xác thực hash và loại bản ghi pending khớp trong ETag CAS. Không có bằng chứng đủ: trả `unconfirmed`.
4. Giao diện giáo viên cập nhật mô tả, không tự tạo lệnh hủy dữ liệu. Các nhãn file JS được tăng phiên bản để trình duyệt nhận mã mới.

## Bảo đảm
- Không xóa hoặc sửa bài nộp, điểm, Coin, lịch sử, file, giao dịch quà.
- Receipt của `submission_submit` được ghi trong cùng batch nguyên tử với nội dung bài nộp; vì thế receipt thiếu không được xem là giao dịch đã ghi thành công.
- Giao dịch đã `cancelled=true` là hàng rào: Worker hiện tại kiểm tra cancelled trước xử lý và `economy_commands` kiểm tra trường pending ở lúc ghi; yêu cầu đến muộn không thể chốt bằng trạng thái cũ.
- Giáo viên không có quyền ghi trực tiếp receipt từ trình duyệt; chỉ Worker sau kiểm tra xác thực và lý do 10–240 ký tự.
- Ngăn làm lại khi dữ liệu `redoStartedAt` đổi trong lúc nộp.

## Kiểm tra đã chạy
- 10 tình huống mock cho API đối soát (trong đó thiếu receipt, giao dịch chưa hủy, phiên đang sống, có activeRequests, ETag thiếu, receipt mismatch).
- 7 tình huống mock đăng ký giao dịch: receipt replay, receipt mismatch, khóa bài, lệch redo, pending cancelled, lần đầu, retry idempotent.
- JavaScript thử manual + auto + cheat cùng bài, xác nhận queue chạy lần lượt.
- Cloudflare đã chấp nhận bản test và bản chính; bản test được triển khai để kiểm tra.

## Còn lại
- E2E thực tế với tài khoản học sinh thử nghiệm: mạng mất phản hồi ngay sau commit, phục hồi, giáo viên thu hồi, cho làm lại, khóa bài, phiên primary vs read-only, Rules và race giữa requests.
- Đối soát khôi phục khóa thi quá hạn là hạng mục độc lập, không sửa trong patch này.
- Không sửa Firebase production data, đặc biệt không chạy lại script PowerShell của lượt thi cũ.
- Rollback Worker production về `d8573f84-774a-442b-b5a8-62597917f212`, Worker test về `af3930f5-ba4d-467c-a7ee-d9a65a18dbff`. Rollback không phục hồi dữ liệu đã ghi.
