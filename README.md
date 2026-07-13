# HSK Chinese Studio

Web tĩnh học tiếng Trung theo HSK 1-6.

## Cách mở

Mở file `index.html` trong trình duyệt:

```text
C:\Users\duong.tran\Documents\Codex-Project\hsk-learning-web\index.html
```

## Tính năng

- Chia riêng HSK 1 đến HSK 6.
- Từ vựng chia riêng theo từng HSK, không lặp lại từ của level trước. Mốc tổng HSK vẫn là HSK1 150, HSK2 300, HSK3 600, HSK4 1200, HSK5 2500, HSK6 5000.
- Từ vựng có chữ Hán, pinyin, nghĩa tiếng Việt và câu luyện tập dịch tiếng Việt.
- Đánh dấu từ đã nhớ, lưu bằng `localStorage`.
- Flashcard theo từng HSK, có lật thẻ, trộn thẻ và ghi nhớ.
- Tập viết chữ Hán:
  - Online: tự tải Hanzi Writer từ CDN để chạy thứ tự nét.
  - Offline: vẫn có chữ mẫu và ô canvas để luyện tay.
- Hội thoại theo từng HSK, có bộ lọc chủ đề: Cuộc sống, Khách hàng, Nhà máy.
- Mỗi chủ đề có 12 hội thoại cho từng HSK, kèm tiếng Trung, pinyin, nghĩa tiếng Việt, nút nghe và link tìm thêm trên YouTube.
- Video theo từng HSK, lấy danh sách công khai từ Corodomo/YouTube, có thumbnail, player nhúng YouTube, bộ lọc tag và khung câu luyện nghe tiếng Trung-pinyin-Việt.
- Ngữ pháp theo từng HSK, gồm cấu trúc, ví dụ tiếng Trung-pinyin-Việt và quiz kiểm tra. Bộ mở rộng lấy khung chủ điểm từ PrepEdu và được viết lại bằng ví dụ riêng cho app.
- Dịch tự phát hiện ngôn ngữ theo kiểu Google Dịch, hỗ trợ Trung/Việt/Anh hai chiều và OCR ảnh bằng Tesseract.js khi có mạng.
- Từ vựng có phân trang 15 từ/trang; hội thoại có phân trang 5 hội thoại/trang.
- Đăng nhập bằng tài khoản mặc định `admin/123456`, `guest/123456`, `user/123456`; cùng một username đang hoạt động sẽ bị chặn đăng nhập lại, phiên đóng đột ngột tự hết hạn sau khoảng 15 giây.

## Mở rộng dữ liệu

Nội dung nền nằm trong `hsk-data.js`. Full word list được sinh từ `source-data/*.txt` qua `build-official-hsk-data.mjs` thành `hsk-official-2012.js`.

Nguồn word list: HSK Official With Definitions 2012 via https://hskhsk.com/word-lists.html.

Nguồn tham khảo ngữ pháp mở rộng: https://prepedu.com/vi/blog/ngu-phap-tieng-trung.
