import dotenv from "dotenv";
export const templateEmail = (data) => {
  dotenv.config();
  const domain = process.env.DOMAIN_SERVER;

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- <script src="https://cdn.tailwindcss.com"></script> -->
      <title>Document</title>
      <style>
        .container {
          padding: 1.25rem;
          width: 60rem;
          max-height: 90rem;
          background-image: linear-gradient(to right, var(--tw-gradient-stops));
          background-color: #1d4ed8;
        }
  
        .wrapper {
          display: flex;
          width: 100%;
          min-height: 100%;
          background-color: #ffffff;
        }
  
        .left-page {
          padding-bottom: 2.5rem;
          flex: 1 1 0%;
          border-right-width: 2px;
          border-right: 2px solid #1e40af;
        }
  
        .top-left-page {
          display: flex;
          margin: 0.5rem;
          justify-content: space-between;
        }
  
        .h-20 {
          height: 3rem;
        }
  
        .title-top {
          font-size: 1.25rem;
          /* Equivalent to text-4xl */
          text-align: right;
          color: transparent;
          background-clip: text;
          background-image: linear-gradient(to left, #1e40af, #1e90ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          /* Equivalent to font-semibold */
        }
  
        .title-desc {
          font-size: 0.75rem;
          /* Equivalent to text-xs */
          text-align: right;
          color: transparent;
          background-clip: text;
          background-image: linear-gradient(to left, #1e40af, #1e90ff);
  
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
  
        .company-name {
          font-size: 0.5rem;
          /* Equivalent to text-xs */
          text-align: right;
          color: transparent;
          background-clip: text;
          background-image: linear-gradient(to left, #1e40af, #1e90ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 300;
          /* Equivalent to font-light */
        }
  
        .text-center {
          text-align: center;
        }
  
        .mt-1 {
          margin-top: 0.25rem;
        }
  
        .title {
          font-size: 1rem;
          line-height: 2rem;
          font-weight: 600;
          color: #1e40af;
        }
  
        .small-title {
          margin-top: 0.75rem;
  
          font-size: 1rem;
          line-height: 2rem;
          font-weight: 300;
          color: #1e40af;
        }
  
        .dot-orange {
          font-size: 1.5rem;
          /* Equivalent to text-2xl */
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          line-height: 2rem;
          font-style: italic;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
  
        }
  
        .dot-blue {
          font-size: 1.2rem;
          /* Equivalent to text-2xl */
          padding-bottom: 1.25rem;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
  
          /* Equivalent to pb-5 */
        }
  
        /* Custom CSS classes */
        .text-custom-lg {
          margin-top: 0.5rem;
          font-size: 1rem;
          line-height: 1.75rem;
          font-weight: 300;
          color: #1e40af;
        }
  
        .text-custom-2xl {
  
          font-size: 1.25rem;
          line-height: 2rem;
          font-weight: 600;
        }
  
        .text-custom-orange {
          font-weight: 600;
          /* Equivalent to font-semibold */
          font-family: serif;
          /* Equivalent to font-serif */
  
          /* Equivalent to mt-3 */
        }
  
        .text-custom-base {
          font-size: 0.75rem;
          /* Equivalent to text-base */
          color: #1e40af;
          /* Equivalent to text-blue-800 */
          font-weight: 100;
          /* Equivalent to font-thin */
          font-family: serif;
          /* Equivalent to font-serif */
          margin-top: 1.5rem;
          /* Equivalent to mt-3 */
        }
  
        .text-yellow-4 {
          color: #ffd700;
          /* Equivalent to text-yellow-400 */
        }
  
        .text-orange-5 {
          color: #ffa500;
          /* Equivalent to text-orange-500 */
        }
  
        .qr-container {
          display: flex;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          justify-content: center;
        }
  
        .qr-wrapper {
          width: 8rem;
          height: 8rem;
        }
  
        .qr-code {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
  
        .text-custom-lg-bottom {
          font-size: 1rem;
          /* Equivalent to text-lg */
          color: #1e40af;
          /* Equivalent to text-blue-800 */
          font-weight: 600;
          /* Equivalent to font-semibold */
          font-family: serif;
          /* Equivalent to font-serif */
          margin-top: 1rem;
          /* Equivalent to my-3 */
          margin-bottom: 1rem;
          /* Equivalent to my-3 */
        }
  
        .grid-sponsor {
          /* Custom CSS class */
  
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          /* Equivalent to grid-cols-7 */
          gap: 0.5rem;
          /* Equivalent to gap-2 */
          font-size: 0.5rem;
          /* Equivalent to text-sm */
          color: #1e40af;
          /* Equivalent to text-blue-800 */
          font-weight: 500;
          padding-left: 1rem;
          padding-right: 1rem;
          /* Equivalent to font-medium */
        }
  
        .benefit {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          grid-column: span 3 / span 3;
          border: 1.5px solid #1e40af;
        }
  
        .typo {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
  
          border: 1.5px solid #1e40af;
        }
  
        .x-mark {
          font-size: 1rem;
          line-height: 2rem;
          font-weight: 300;
        }
  
        .benefit-col {
          display: flex;
          grid-column: span 3 / span 3;
          justify-content: center;
          align-items: center;
          font-size: 0.6rem;
          line-height: 1rem;
          font-style: italic;
        }
  
        .right-page {
          position: relative;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          flex: 1 1 0%;
        }
  
        .title-right {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          font-size: 1rem;
          line-height: 2.25rem;
          font-weight: 600;
          text-align: center;
          color: #1e40af;
        }
  
        .part {
          font-weight: 600;
          font-size: 0.75rem;
  
          color: #1e40af;
        }
  
        .text-right {
          text-align: right;
        }
  
        .flex-col-items-center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        /* Additional class for z-index and margin-top */
        .mt-negative-10 {
          z-index: -10;
        }
  
        .figure-logo {
          position: absolute;
          opacity: 0.3;
          height: 400px;
        }
  
        .z-20 {
          z-index: 20;
        }
  
        .text-lg {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
  
        .time {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .month {
          font-size: 1rem;
          line-height: 1.75rem;
          text-align: center;
          color: #1e40af;
        }
  
        .time-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
  
        .date {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          border-top: 2px solid #1e40af;
          border-bottom: 2px solid #1e40af;
          font-size: 1rem;
          line-height: 1.75rem;
          color: #1e40af;
        }
  
        .day {
          font-size: 2rem;
          line-height: 1;
          text-align: center;
          color: #1e40af;
        }
  
        .year {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          text-align: center;
          color: #1e40af;
        }
  
        .flex-box-sign {
          display: flex;
          z-index: 20;
          justify-content: space-between;
        }
  
        .date-time {
          font-weight: 600;
          text-align: center;
          color: #1e40af;
          font-size: 1rem;
  
        }
  
        .italic {
          font-style: italic;
        }
  
        .signature {
          display: flex;
          justify-content: flex-end;
          height: 5rem;
        }
  
        .h-full {
          height: 100%;
        }
  
        .grid-sponsor-logo {
          display: grid;
          margin-top: 2.5rem;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0.5rem;
          vertical-align: middle;
        }
  
        .flex-box {
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        .contact {
          position: absolute;
          bottom: 0.5rem;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
          font-weight: 300;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="wrapper">
          <div class="left-page">
            <div class="top-left-page">
              <img
                src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/fmp.png"
                alt=""
                class="h-20"
              />
              <div class="">
                <div class="title-top">sanhoa.vn</div>
                <div class="title-desc">Lướt nhẹ mua nhanh</div>
                <div class="company-name">
                  CÔNG TY CỔ PHẦN FLOWERMARKETPLACE - FMP
                </div>
              </div>
            </div>
            <div class="text-center mt-1">
              <p class="title">TRÂN TRỌNG KÍNH MỜI</p>
              <p class="small-title">DOANH NHÂN</p>
              <div class="dot-orange">Ông/bà: ${data.fullName}</div>
              <div class="dot-blue">${data?.position}</div>
              <div class="text-custom-lg">đến tham dự</div>
              <div class="text-custom-2xl text-yellow-4">LỄ RA MẮT SÀN FMP</div>
              <div class="text-custom-2xl text-orange-5">
                Sàn giao dịch số hoa đầu tiên tại Việt Nam
              </div>
              <div class="text-custom-base">
                &quot; FMP NỞ HOA - NUÔI DƯỠNG CỘNG ĐỒNG &quot;
              </div>
              <div class="qr-container">
                <figure class="qr-wrapper">
                  <img
                  src="${domain}/images/${data._id}/QRcode.png"
                    alt=""
                    class="qr-code"
                  />
                </figure>
              </div>
              <p class="text-custom-lg-bottom">QUYỀN LỢI NHÀ TÀI TRỢ</p>
              <div class="grid-sponsor">
                <div class="benefit">QUYỀN LỢI</div>
                <div class="typo">KIM CƯƠNG</div>
                <div class="typo">VÀNG</div>
                <div class="typo">BẠC</div>
                <div class="typo">ĐỒNG</div>
                <div class="typo benefit-col">
                  Được trình chiếu video giới thiệu trong chương trình
                </div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo benefit-col">
                  In logo nhà tài trợ trên các ấn phẩm (thư mời, quà tặng, POSM
                  buổi họp báo, thông cáo báo chí,...)
                </div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark"></div>
                <div class="typo benefit-col">Phát biểu trong buổi hội thảo</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark"></div>
                <div class="typo x-mark"></div>
                <div class="typo benefit-col">
                  Hướng dẫn kết nối giao thương kết nối ngay tại lễ
                </div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark"></div>
                <div class="typo x-mark"></div>
                <div class="typo benefit-col">
                  Đăng bài PR doanh nghiệp trên báo
                </div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark"></div>
                <div class="typo x-mark"></div>
                <div class="typo benefit-col">
                  Tham gia với vai trò thành viên BTC đóng góp cho các nội dung,
                  hoạt động của sự kiện
                </div>
                <div class="typo x-mark">x</div>
                <div class="typo x-mark"></div>
                <div class="typo x-mark"></div>
                <div class="typo x-mark"></div>
              </div>
            </div>
          </div>
          <div class="right-page">
            <div class="title-right">NỘI DUNG CHƯƠNG TRÌNH</div>
            <p class="part">Phần 1: Lễ ra mắt sàn hoa tươi FMP</p>
            <p class="part">Phần 2: Chia sẻ trải nghiệm</p>
            <p class="part">Phần 3: Tọa đàm và hỏi đáp</p>
            <div class="flex-col-items-center mt-negative-10">
              <figure class="figure-logo">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/logo.png"
                  alt=""
                  class="w-full h-full"
                />
              </figure>
              <div class="z-20">
                <p class="title-right">ĐỊA ĐIỂM & THỜI GIAN</p>
                <p class="text-blue-800 text-center font-light">
                  Chương trình được long trọng tổ chức tại:
                </p>
                <p class="text-lg part text-center">TÀU INDOCHINA QUEEN</p>
                <p class="text-lg part text-center">
                  SỐ 5, ĐƯỜNG NGUYỄN TẤT THÀNH, P.12, QUẬN 4, TPHCM
                </p>
                <div class="time">
                  <div class="">
                    <div class="month">Tháng 8</div>
                    <div class="time-grid">
                      <div class="date">Thứ năm</div>
                      <div class="day">10</div>
                      <div class="date">07h30</div>
                    </div>
                    <p class="year">2023</p>
                  </div>
                </div>
                <div class="flex-box-sign">
                  <div class=""></div>
                  <div class="date-time">
                    <p class="italic">TPHCM, ngày 30 tháng 7 năm 2023</p>
                    <p class="">Tổng giám đốc</p>
                    <figure class="signature">
                      <img
                        src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/daumoc.png"
                        alt=""
                        class="h-full"
                      />
                    </figure>
                    <p class="">Trần Thị Hữu Ái</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid-sponsor-logo">
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/cls.jpg"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/black_tulip.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/FC_RGB_UOB.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/vide.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/tq.jpg"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/greentech.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/dalanhoa.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/mocnhien.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/lansium.png"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
              <div class="flex-box">
                <img
                  src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/minhanh.jpg"
                  alt=""
                  class=""
                  style="width: 75px"
                />
              </div>
            </div>
            <div class="contact">Thông tin liên hệ: 0983 227 941</div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
  //   return `<!DOCTYPE html>
  // <html lang="en">

  // <head>
  //   <meta charset="UTF-8" />
  //   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //   <!-- <script src="https://cdn.tailwindcss.com"></script> -->
  //   <title>Document</title>
  //   <style>
  //     .container {
  //       padding: 1.25rem;
  //       width: 1000px;
  //       min-height: 1300px;
  //       background-image: linear-gradient(to right, var(--tw-gradient-stops));
  //       background-color: #1d4ed8;
  //     }

  //     .wrapper {
  //       display: grid;
  //       grid-template-columns: repeat(1, minmax(0, 1fr));

  //       width: 100%;
  //       min-height: 100%;
  //       background-color: #ffffff;

  //       @media (min-width: 768px) {
  //         grid-template-columns: repeat(2, minmax(0, 1fr));
  //       }
  //     }

  //     .left-page {
  //       padding-bottom: 2.5rem;
  //       border-right-width: 2px;
  //       border-right: 2px solid #1e40af;
  //     }

  //     .top-left-page {
  //       display: flex;
  //       margin: 0.5rem;
  //       justify-content: space-between;
  //     }

  //     .h-20 {
  //       height: 5rem;
  //     }

  //     .title-top {
  //       font-size: 2.25rem;
  //       /* Equivalent to text-4xl */
  //       text-align: right;
  //       color: transparent;
  //       background-clip: text;
  //       background-image: linear-gradient(to left, #1e40af, #1e90ff);
  //       -webkit-background-clip: text;
  //       -webkit-text-fill-color: transparent;
  //       font-weight: 600;
  //       /* Equivalent to font-semibold */
  //     }

  //     .title-desc {
  //       font-size: 0.75rem;
  //       /* Equivalent to text-xs */
  //       text-align: right;
  //       color: transparent;
  //       background-clip: text;
  //       background-image: linear-gradient(to left, #1e40af, #1e90ff);

  //       -webkit-background-clip: text;
  //       -webkit-text-fill-color: transparent;
  //       font-weight: 600;
  //     }

  //     .company-name {
  //       font-size: 0.75rem;
  //       /* Equivalent to text-xs */
  //       text-align: right;
  //       color: transparent;
  //       background-clip: text;
  //       background-image: linear-gradient(to left, #1e40af, #1e90ff);
  //       -webkit-background-clip: text;
  //       -webkit-text-fill-color: transparent;
  //       font-weight: 300;
  //       /* Equivalent to font-light */
  //     }

  //     .text-center {
  //       text-align: center;
  //     }

  //     .mt-1 {
  //       margin-top: 0.25rem;
  //     }

  //     .title {

  //       font-size: 1.5rem;
  //       line-height: 2rem;
  //       font-weight: 600;
  //       color: #1e40af;
  //     }

  //     .small-title {
  //       margin-top: 0.75rem;

  //       font-size: 1.5rem;
  //       line-height: 2rem;
  //       font-weight: 300;
  //       color: #1e40af;
  //     }

  //     .dot-orange {
  //       font-size: 1.5rem;
  //       /* Equivalent to text-2xl */
  //       margin-top: 0.5rem;
  //       margin-bottom: 0.5rem;
  //       color: #ffa500;
  //       line-height: 2rem;
  //     }

  //     .dot-blue {
  //       font-size: 1.5rem;
  //       /* Equivalent to text-2xl */
  //       padding-bottom: 1.25rem;
  //       /* Equivalent to pb-5 */
  //       color: #1e40af;
  //     }

  //     /* Custom CSS classes */
  //     .text-custom-lg {
  //       margin-top: 0.5rem;
  //       font-size: 1.125rem;
  //       line-height: 1.75rem;
  //       font-weight: 300;
  //       color: #1e40af;
  //     }

  //     .text-custom-2xl {
  //       margin-top: 0.75rem;
  //       font-size: 2rem;
  //       line-height: 2rem;
  //       font-weight: 600;
  //     }

  //     .text-custom-orange {
  //       font-weight: 600;
  //       /* Equivalent to font-semibold */
  //       font-family: serif;
  //       /* Equivalent to font-serif */
  //       margin-top: 1.5rem;
  //       /* Equivalent to mt-3 */
  //     }

  //     .text-custom-base {
  //       font-size: 1.3rem;
  //       /* Equivalent to text-base */
  //       color: #1e40af;
  //       /* Equivalent to text-blue-800 */
  //       font-weight: 100;
  //       /* Equivalent to font-thin */
  //       font-family: serif;
  //       /* Equivalent to font-serif */
  //       margin-top: 1.5rem;
  //       /* Equivalent to mt-3 */
  //     }

  //     .text-yellow-4 {
  //       color: #ffd700;
  //       /* Equivalent to text-yellow-400 */
  //     }

  //     .text-orange-5 {
  //       color: #ffa500;
  //       /* Equivalent to text-orange-500 */
  //     }

  //     .qr-container {
  //       display: flex;
  //       margin-top: 0.75rem;
  //       margin-bottom: 0.75rem;
  //       justify-content: center;
  //     }

  //     .qr-wrapper {
  //       width: 13rem;
  //       height: 13rem;
  //     }

  //     .qr-code {
  //       object-fit: cover;
  //       width: 100%;
  //       height: 100%;
  //     }

  //     .text-custom-lg-bottom {
  //       font-size: 1.125rem;
  //       /* Equivalent to text-lg */
  //       color: #1e40af;
  //       /* Equivalent to text-blue-800 */
  //       font-weight: 600;
  //       /* Equivalent to font-semibold */
  //       font-family: serif;
  //       /* Equivalent to font-serif */
  //       margin-top: 1rem;
  //       /* Equivalent to my-3 */
  //       margin-bottom: 1rem;
  //       /* Equivalent to my-3 */
  //     }

  //     .grid-sponsor {
  //       /* Custom CSS class */

  //       display: grid;
  //       grid-template-columns: repeat(7,
  //           minmax(0, 1fr));
  //       /* Equivalent to grid-cols-7 */
  //       gap: 0.5rem;
  //       /* Equivalent to gap-2 */
  //       font-size: 0.875rem;
  //       /* Equivalent to text-sm */
  //       color: #1e40af;
  //       /* Equivalent to text-blue-800 */
  //       font-weight: 500;
  //       padding-left: 1rem;
  //       padding-right: 1rem;
  //       /* Equivalent to font-medium */
  //     }

  //     .benefit {
  //       padding-top: 0.5rem;
  //       padding-bottom: 0.5rem;
  //       grid-column: span 3 / span 3;

  //       border: 2px solid #1e40af;
  //     }

  //     .typo {
  //       padding-top: 0.5rem;
  //       padding-bottom: 0.5rem;

  //       border: 2px solid #1e40af;
  //     }

  //     .x-mark {
  //       font-size: 1.5rem;
  //       line-height: 2rem;
  //       font-weight: 300;
  //     }

  //     .benefit-col {
  //       display: flex;
  //       grid-column: span 3 / span 3;
  //       justify-content: center;
  //       align-items: center;
  //       font-size: 0.75rem;
  //       line-height: 1rem;
  //       font-style: italic;
  //     }

  //     .right-page {
  //       position: relative;
  //       padding-left: 0.75rem;
  //       padding-right: 0.75rem;
  //     }

  //     .title-right {
  //       padding-top: 0.75rem;
  //       padding-bottom: 0.75rem;

  //       font-size: 1.875rem;
  //       line-height: 2.25rem;
  //       font-weight: 600;
  //       text-align: center;
  //       color: #1e40af;
  //     }

  //     .part {

  //       font-weight: 600;
  //       color: #1e40af;
  //     }

  //     .text-right {
  //       text-align: right;
  //     }

  //     .flex-col-items-center {
  //       padding-top: 50px;
  //       padding-top: 50px;
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //     }

  //     /* Additional class for z-index and margin-top */
  //     .mt-negative-10 {
  //       margin-top: -10px;
  //       z-index: -10;
  //     }

  //     .figure-logo {
  //       position: absolute;
  //       opacity: 0.3;
  //       height: 500px;
  //     }

  //     .z-20 {
  //       z-index: 20;
  //     }

  //     .text-lg {
  //       font-size: 1.125rem;
  //       line-height: 1.75rem;
  //     }

  //     .time {
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //     }

  //     .month {
  //       font-size: 1.25rem;
  //       line-height: 1.75rem;
  //       text-align: center;
  //       color: #1e40af;
  //     }

  //     .time-grid {
  //       display: grid;
  //       grid-template-columns: repeat(3, minmax(0, 1fr));
  //     }

  //     .date {
  //       padding-top: 0.25rem;
  //       padding-bottom: 0.25rem;
  //       padding-left: 1.25rem;
  //       padding-right: 1.25rem;
  //       border-top: 2px solid #1e40af;
  //       border-bottom: 2px solid #1e40af;
  //       font-size: 1.25rem;
  //       line-height: 1.75rem;
  //       color: #1e40af;
  //     }

  //     .day {
  //       font-size: 3rem;
  //       line-height: 1;
  //       text-align: center;
  //       color: #1e40af;
  //     }

  //     .year {
  //       margin-top: 0.5rem;
  //       margin-bottom: 0.5rem;
  //       font-size: 1.25rem;
  //       line-height: 1.75rem;
  //       text-align: center;
  //       color: #1e40af;
  //     }

  //     .flex-box-sign {
  //       display: flex;
  //       z-index: 20;
  //       justify-content: space-between;
  //     }

  //     .date-time {
  //       font-weight: 600;
  //       text-align: center;
  //       color: #1e40af;
  //     }

  //     .italic {
  //       font-style: italic;
  //     }

  //     .signature {
  //       display: flex;
  //       justify-content: flex-end;
  //       height: 8rem;
  //     }

  //     .h-full {
  //       height: 100%;
  //     }

  //     .grid-sponsor-logo {
  //       display: grid;
  //       margin-top: 2.5rem;
  //       grid-template-columns: repeat(5, minmax(0, 1fr));
  //       gap: 0.5rem;
  //       vertical-align: middle;
  //     }

  //     .flex-box {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //     }

  //     .contact {
  //       position: absolute;
  //       bottom: 0.5rem;
  //       font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
  //         Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
  //         "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  //         "Noto Color Emoji";
  //       font-weight: 300;
  //     }
  //   </style>
  // </head>

  // <body>
  //   <div class="container">
  //     <div class="wrapper">
  //       <div class="left-page">
  //         <div class="top-left-page">
  //           <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/fmp.png" alt="" class="h-20" />
  //           <div class="">
  //             <div class="title-top">sanhoa.vn</div>
  //             <div class="title-desc">Lướt nhẹ mua nhanh</div>
  //             <div class="company-name">
  //               CÔNG TY CỔ PHẦN FLOWERMARKETPLACE - FMP
  //             </div>
  //           </div>
  //         </div>
  //         <div class="text-center mt-1">
  //           <p class="title">TRÂN TRỌNG KÍNH MỜI</p>
  //           <p class="small-title">DOANH NHÂN</p>
  //           <div class="dot-orange">
  //             Ông/Bà
  //           </div>
  //           <div class="dot-blue">
  //             ${data.fullName}
  //           </div>
  //           <div class="text-custom-lg">đến tham dự</div>
  //           <p class="text-custom-2xl text-yellow-4">LỄ RA MẮT SÀN FMP</p>
  //           <p class="text-custom-2xl text-orange-5">
  //             Sàn giao dịch số hoa đầu tiên tại Việt Nam
  //           </p>
  //           <p class="text-custom-base">
  //             &quot; FMP NỞ HOA - NUÔI DƯỠNG CỘNG ĐỒNG &quot;
  //           </p>
  //           <div class="qr-container">
  //             <figure class="qr-wrapper">
  //               <img
  //               src="${domain}/images/${data._id}/QRcode.png"
  //                 alt="" class="qr-code" />
  //             </figure>
  //           </div>
  //           <p class="text-custom-lg-bottom">QUYỀN LỢI NHÀ TÀI TRỢ</p>
  //           <div class="grid-sponsor">
  //             <div class="benefit">QUYỀN LỢI</div>
  //             <div class="typo">KIM CƯƠNG</div>
  //             <div class="typo">VÀNG</div>
  //             <div class="typo">BẠC</div>
  //             <div class="typo">ĐỒNG</div>
  //             <div class="typo benefit-col">
  //               Được trình chiếu video giới thiệu trong chương trình
  //             </div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo benefit-col">
  //               In logo nhà tài trợ trên các ấn phẩm (thư mời, quà tặng, POSM
  //               buổi họp báo, thông cáo báo chí,...)
  //             </div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo benefit-col">Phát biểu trong buổi hội thảo</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo benefit-col">
  //               Hướng dẫn kết nối giao thương kết nối ngay tại lễ
  //             </div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo benefit-col">
  //               Đăng bài PR doanh nghiệp trên báo
  //             </div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo benefit-col">
  //               Tham gia với vai trò thành viên BTC đóng góp cho các nội dung,
  //               hoạt động của sự kiện
  //             </div>
  //             <div class="typo x-mark">x</div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo x-mark"></div>
  //             <div class="typo x-mark"></div>
  //           </div>
  //         </div>
  //       </div>
  //       <div class="right-page">
  //         <p class="title-right">NỘI DUNG CHƯƠNG TRÌNH</p>
  //         <p class="part">Phần 1: Lễ ra mắt sàn hoa tươi FMP</p>
  //         <p class="part">Phần 2: Chia sẻ trải nghiệm</p>
  //         <p class="part">Phần 3: Tọa đàm và hỏi đáp</p>
  //         <div class="flex-col-items-center mt-negative-10">
  //           <figure class="figure-logo">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/logo.png" alt=""
  //               class="w-full h-full" />
  //           </figure>
  //           <div class="z-20">
  //             <p class="title-right">ĐỊA ĐIỂM & THỜI GIAN</p>
  //             <p class="text-blue-800 text-center font-light">
  //               Chương trình được long trọng tổ chức tại:
  //             </p>
  //             <p class="text-lg part text-center">TÀU INDOCHINA QUEEN</p>
  //             <p class="text-lg part text-center">
  //               SỐ 5, ĐƯỜNG NGUYỄN TẤT THÀNH, P.12, QUẬN 4, TPHCM
  //             </p>
  //             <div class="time">
  //               <div class="">
  //                 <div class="month">Tháng 8</div>
  //                 <div class="time-grid">
  //                   <div class="date">Thứ năm</div>
  //                   <div class="day">10</div>
  //                   <div class="date">07h30</div>
  //                 </div>
  //                 <p class="year">2023</p>
  //               </div>
  //             </div>
  //             <div class="flex-box-sign">
  //              <div class=""></div>
  //               <div class="date-time">
  //                 <p class="italic">TPHCM, ngày 30 tháng 7 năm 2023</p>
  //                 <p class="">Tổng giám đốc</p>
  //                 <figure class="signature">
  //                   <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/daumoc.png" alt=""
  //                     class="h-full" />
  //                 </figure>
  //                 <p class="">Trần Thị Hữu Ái</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div class="grid-sponsor-logo">
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/cls.jpg" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/black_tulip.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/FC_RGB_UOB.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/vide.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/tq.jpg" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/greentech.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/dalanhoa.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/mocnhien.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/lansium.png" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //           <div class="flex-box">
  //             <img src="https://s3-north1.viettelidc.com.vn/fmp-dev/landingpage-event/minhanh.jpg" alt="" class=""
  //               style="width: 100px" />
  //           </div>
  //         </div>
  //         <div class="contact">Thông tin liên hệ: 0983 227 941</div>
  //       </div>
  //     </div>
  //   </div>
  // </body>

  // </html>`;

  // <html
  //   xmlns="http://www.w3.org/1999/xhtml"
  //   xmlns:o="urn:schemas-microsoft-com:office:office"
  // >
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta content="width=device-width, initial-scale=1" name="viewport" />
  //     <meta name="x-apple-disable-message-reformatting" />
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //     <meta content="telephone=no" name="format-detection" />
  //     <title>New email template 2023-07-31</title>

  //     <style type="text/css">
  //       .rollover:hover .rollover-first {
  //         max-height: 0px !important;
  //         display: none !important;
  //       }
  //       .rollover:hover .rollover-second {
  //         max-height: none !important;
  //         display: block !important;
  //       }
  //       .rollover div {
  //         font-size: 0px;
  //       }
  //       u ~ div img + div > div {
  //         display: none;
  //       }
  //       #outlook a {
  //         padding: 0;
  //       }
  //       span.MsoHyperlink,
  //       span.MsoHyperlinkFollowed {
  //         color: inherit;
  //         mso-style-priority: 99;
  //       }
  //       a.es-button {
  //         mso-style-priority: 100 !important;
  //         text-decoration: none !important;
  //       }
  //       a[x-apple-data-detectors] {
  //         color: inherit !important;
  //         text-decoration: none !important;
  //         font-size: inherit !important;
  //         font-family: inherit !important;
  //         font-weight: inherit !important;
  //         line-height: inherit !important;
  //       }
  //       .es-desk-hidden {
  //         display: none;
  //         float: left;
  //         overflow: hidden;
  //         width: 0;
  //         max-height: 0;
  //         line-height: 0;
  //         mso-hide: all;
  //       }
  //       .es-header-body a:hover {
  //         color: #1376c8 !important;
  //       }
  //       .es-content-body a:hover {
  //         color: #2cb543 !important;
  //       }
  //       .es-footer-body a:hover {
  //         color: #ffffff !important;
  //       }
  //       .es-infoblock a:hover {
  //         color: #ffffff !important;
  //       }
  //       .es-button-border:hover {
  //         border-color: #42d159 #42d159 #42d159 #42d159 !important;
  //         background: #0b317e !important;
  //       }
  //       .es-button-border:hover a.es-button,
  //       .es-button-border:hover button.es-button {
  //         background: #0b317e !important;
  //       }
  //       @media only screen and (max-width: 600px) {
  //         .es-m-p10t {
  //           padding-top: 10px !important;
  //         }
  //         .es-m-p10r {
  //           padding-right: 10px !important;
  //         }
  //         .es-m-p0b {
  //           padding-bottom: 0px !important;
  //         }
  //         .es-m-p10l {
  //           padding-left: 10px !important;
  //         }
  //         .es-m-p40t {
  //           padding-top: 40px !important;
  //         }
  //         .es-m-p20r {
  //           padding-right: 20px !important;
  //         }
  //         .es-m-p40b {
  //           padding-bottom: 40px !important;
  //         }
  //         .es-m-p20l {
  //           padding-left: 20px !important;
  //         }
  //         *[class="gmail-fix"] {
  //           display: none !important;
  //         }
  //         p,
  //         a {
  //           line-height: 150% !important;
  //         }
  //         h1,
  //         h1 a {
  //           line-height: 120% !important;
  //         }
  //         h2,
  //         h2 a {
  //           line-height: 120% !important;
  //         }
  //         h3,
  //         h3 a {
  //           line-height: 120% !important;
  //         }
  //         h4,
  //         h4 a {
  //           line-height: 120% !important;
  //         }
  //         h5,
  //         h5 a {
  //           line-height: 120% !important;
  //         }
  //         h6,
  //         h6 a {
  //           line-height: 120% !important;
  //         }
  //         h1 {
  //           font-size: 30px !important;
  //           text-align: center;
  //         }
  //         h2 {
  //           font-size: 26px !important;
  //           text-align: center;
  //         }
  //         h3 {
  //           font-size: 20px !important;
  //           text-align: center;
  //         }
  //         h4 {
  //           font-size: 24px !important;
  //           text-align: left;
  //         }
  //         h5 {
  //           font-size: 20px !important;
  //           text-align: left;
  //         }
  //         h6 {
  //           font-size: 16px !important;
  //           text-align: left;
  //         }
  //         .es-header-body h1 a,
  //         .es-content-body h1 a,
  //         .es-footer-body h1 a {
  //           font-size: 30px !important;
  //         }
  //         .es-header-body h2 a,
  //         .es-content-body h2 a,
  //         .es-footer-body h2 a {
  //           font-size: 26px !important;
  //         }
  //         .es-header-body h3 a,
  //         .es-content-body h3 a,
  //         .es-footer-body h3 a {
  //           font-size: 20px !important;
  //         }
  //         .es-header-body h4 a,
  //         .es-content-body h4 a,
  //         .es-footer-body h4 a {
  //           font-size: 24px !important;
  //         }
  //         .es-header-body h5 a,
  //         .es-content-body h5 a,
  //         .es-footer-body h5 a {
  //           font-size: 20px !important;
  //         }
  //         .es-header-body h6 a,
  //         .es-content-body h6 a,
  //         .es-footer-body h6 a {
  //           font-size: 16px !important;
  //         }
  //         .es-menu td a {
  //           font-size: 14px !important;
  //         }
  //         .es-header-body p,
  //         .es-header-body a {
  //           font-size: 16px !important;
  //         }
  //         .es-content-body p,
  //         .es-content-body a {
  //           font-size: 16px !important;
  //         }
  //         .es-footer-body p,
  //         .es-footer-body a {
  //           font-size: 14px !important;
  //         }
  //         .es-infoblock p,
  //         .es-infoblock a {
  //           font-size: 12px !important;
  //         }
  //         .es-m-txt-c,
  //         .es-m-txt-c h1,
  //         .es-m-txt-c h2,
  //         .es-m-txt-c h3,
  //         .es-m-txt-c h4,
  //         .es-m-txt-c h5,
  //         .es-m-txt-c h6 {
  //           text-align: center !important;
  //         }
  //         .es-m-txt-r,
  //         .es-m-txt-r h1,
  //         .es-m-txt-r h2,
  //         .es-m-txt-r h3,
  //         .es-m-txt-r h4,
  //         .es-m-txt-r h5,
  //         .es-m-txt-r h6 {
  //           text-align: right !important;
  //         }
  //         .es-m-txt-j,
  //         .es-m-txt-j h1,
  //         .es-m-txt-j h2,
  //         .es-m-txt-j h3,
  //         .es-m-txt-j h4,
  //         .es-m-txt-j h5,
  //         .es-m-txt-j h6 {
  //           text-align: justify !important;
  //         }
  //         .es-m-txt-l,
  //         .es-m-txt-l h1,
  //         .es-m-txt-l h2,
  //         .es-m-txt-l h3,
  //         .es-m-txt-l h4,
  //         .es-m-txt-l h5,
  //         .es-m-txt-l h6 {
  //           text-align: left !important;
  //         }
  //         .es-m-txt-r img,
  //         .es-m-txt-c img,
  //         .es-m-txt-l img,
  //         .es-m-txt-r .rollover:hover .rollover-second,
  //         .es-m-txt-c .rollover:hover .rollover-second,
  //         .es-m-txt-l .rollover:hover .rollover-second {
  //           display: inline !important;
  //         }
  //         .es-m-txt-r .rollover div,
  //         .es-m-txt-c .rollover div,
  //         .es-m-txt-l .rollover div {
  //           line-height: 0 !important;
  //           font-size: 0 !important;
  //         }
  //         .es-spacer {
  //           display: inline-table;
  //         }
  //         a.es-button,
  //         button.es-button {
  //           font-size: 16px !important;
  //         }
  //         .es-m-fw,
  //         .es-m-fw.es-fw,
  //         .es-m-fw .es-button {
  //           display: block !important;
  //         }
  //         .es-m-il,
  //         .es-m-il .es-button,
  //         .es-social,
  //         .es-social td,
  //         .es-menu {
  //           display: inline-block !important;
  //         }
  //         .es-adaptive table,
  //         .es-left,
  //         .es-right {
  //           width: 100% !important;
  //         }
  //         .es-content table,
  //         .es-header table,
  //         .es-footer table,
  //         .es-content,
  //         .es-footer,
  //         .es-header {
  //           width: 100% !important;
  //           max-width: 600px !important;
  //         }
  //         .adapt-img {
  //           width: 100% !important;
  //           height: auto !important;
  //         }
  //         .es-mobile-hidden,
  //         .es-hidden {
  //           display: none !important;
  //         }
  //         .es-desk-hidden {
  //           width: auto !important;
  //           overflow: visible !important;
  //           float: none !important;
  //           max-height: inherit !important;
  //           line-height: inherit !important;
  //         }
  //         tr.es-desk-hidden {
  //           display: table-row !important;
  //         }
  //         table.es-desk-hidden {
  //           display: table !important;
  //         }
  //         td.es-desk-menu-hidden {
  //           display: table-cell !important;
  //         }
  //         .es-menu td {
  //           width: 1% !important;
  //         }
  //         table.es-table-not-adapt,
  //         .esd-block-html table {
  //           width: auto !important;
  //         }
  //         .es-social td {
  //           padding-bottom: 10px;
  //         }
  //         .h-auto {
  //           height: auto !important;
  //         }
  //         .st-br {
  //           padding-left: 10px !important;
  //           padding-right: 10px !important;
  //         }
  //         h1 a {
  //           text-align: center;
  //         }
  //         h2 a {
  //           text-align: center;
  //         }
  //         h3 a {
  //           text-align: center;
  //         }
  //         a.es-button,
  //         button.es-button {
  //           display: block !important;
  //         }
  //         .es-button-border {
  //           display: block !important;
  //         }
  //       }
  //     </style>
  //   </head>
  //   <body style="width: 100%; height: 100%; padding: 0; margin: 0">
  //     <div class="es-wrapper-color" style="background-color: #f8f9fd">
  //       <!--[if gte mso 9]>
  //         <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
  //           <v:fill type="tile" color="#f8f9fd"></v:fill>
  //         </v:background>
  //       <![endif]-->
  //       <table
  //         class="es-wrapper"
  //         width="100%"
  //         cellspacing="0"
  //         cellpadding="0"
  //         style="
  //           mso-table-lspace: 0pt;
  //           mso-table-rspace: 0pt;
  //           border-collapse: collapse;
  //           border-spacing: 0px;
  //           padding: 0;
  //           margin: 0;
  //           width: 100%;
  //           height: 100%;
  //           background-repeat: repeat;
  //           background-position: center top;
  //           background-color: #f8f9fd;
  //         "
  //       >
  //         <tr>
  //           <td valign="top" style="padding: 0; margin: 0">
  //             <table
  //               cellpadding="0"
  //               cellspacing="0"
  //               class="es-header"
  //               align="center"
  //               style="
  //                 mso-table-lspace: 0pt;
  //                 mso-table-rspace: 0pt;
  //                 border-collapse: collapse;
  //                 border-spacing: 0px;
  //                 width: 100%;
  //                 table-layout: fixed !important;
  //                 background-color: transparent;
  //                 background-repeat: repeat;
  //                 background-position: center top;
  //               "
  //             >
  //               <tr>
  //                 <td align="center" style="padding: 0; margin: 0">
  //                   <table
  //                     bgcolor="#ffffff"
  //                     class="es-header-body"
  //                     align="center"
  //                     cellpadding="0"
  //                     cellspacing="0"
  //                     style="
  //                       mso-table-lspace: 0pt;
  //                       mso-table-rspace: 0pt;
  //                       border-collapse: collapse;
  //                       border-spacing: 0px;
  //                       background-color: transparent;
  //                       width: 600px;
  //                     "
  //                   >
  //                     <tr>
  //                       <td
  //                         align="left"
  //                         style="
  //                           margin: 0;
  //                           padding-top: 10px;
  //                           padding-right: 30px;
  //                           padding-bottom: 15px;
  //                           padding-left: 30px;
  //                         "
  //                       >
  //                         <table
  //                           cellpadding="0"
  //                           cellspacing="0"
  //                           width="100%"
  //                           style="
  //                             mso-table-lspace: 0pt;
  //                             mso-table-rspace: 0pt;
  //                             border-collapse: collapse;
  //                             border-spacing: 0px;
  //                           "
  //                         >
  //                           <tr>
  //                             <td
  //                               align="center"
  //                               valign="top"
  //                               style="padding: 0; margin: 0; width: 540px"
  //                             >
  //                               <table
  //                                 cellpadding="0"
  //                                 cellspacing="0"
  //                                 width="100%"
  //                                 role="presentation"
  //                                 style="
  //                                   mso-table-lspace: 0pt;
  //                                   mso-table-rspace: 0pt;
  //                                   border-collapse: collapse;
  //                                   border-spacing: 0px;
  //                                 "
  //                               >
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     style="
  //                                       padding: 0;
  //                                       margin: 0;
  //                                       font-size: 0px;
  //                                     "
  //                                   >
  //                                     <a
  //                                       target="_blank"
  //                                       href="https://fmp.sanhoa.vn"
  //                                       style="
  //                                         mso-line-height-rule: exactly;
  //                                         text-decoration: underline;
  //                                         color: #1376c8;
  //                                         font-size: 14px;
  //                                       "
  //                                       ><img
  //                                         src="https://xrsvkp.stripocdn.email/content/guids/CABINET_06446e4b14d276b112fd101fce16c0c589365e2ff8011a6f55ede6a3d135c3f9/images/fmp.png"
  //                                         alt=""
  //                                         style="
  //                                           display: block;
  //                                           font-size: 16px;
  //                                           border: 0;
  //                                           outline: none;
  //                                           text-decoration: none;
  //                                         "
  //                                         width="130"
  //                                     /></a>
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                             <img src="{}" id="image_url" alt="" class="" />
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </td>
  //               </tr>
  //             </table>
  //             <table
  //               cellpadding="0"
  //               cellspacing="0"
  //               class="es-content"
  //               align="center"
  //               style="
  //                 mso-table-lspace: 0pt;
  //                 mso-table-rspace: 0pt;
  //                 border-collapse: collapse;
  //                 border-spacing: 0px;
  //                 width: 100%;
  //                 table-layout: fixed !important;
  //               "
  //             >
  //               <tr>
  //                 <td
  //                   align="center"
  //                   bgcolor="#f8f9fd"
  //                   style="padding: 0; margin: 0; background-color: #f8f9fd"
  //                 >
  //                   <table
  //                     bgcolor="transparent"
  //                     class="es-content-body"
  //                     align="center"
  //                     cellpadding="0"
  //                     cellspacing="0"
  //                     style="
  //                       mso-table-lspace: 0pt;
  //                       mso-table-rspace: 0pt;
  //                       border-collapse: collapse;
  //                       border-spacing: 0px;
  //                       background-color: transparent;
  //                       width: 600px;
  //                     "
  //                   >
  //                     <tr>
  //                       <td
  //                         align="left"
  //                         style="
  //                           margin: 0;
  //                           padding-top: 20px;
  //                           padding-right: 20px;
  //                           padding-bottom: 10px;
  //                           padding-left: 20px;
  //                         "
  //                       >
  //                         <table
  //                           cellpadding="0"
  //                           cellspacing="0"
  //                           width="100%"
  //                           style="
  //                             mso-table-lspace: 0pt;
  //                             mso-table-rspace: 0pt;
  //                             border-collapse: collapse;
  //                             border-spacing: 0px;
  //                           "
  //                         >
  //                           <tr>
  //                             <td
  //                               align="center"
  //                               valign="top"
  //                               style="padding: 0; margin: 0; width: 560px"
  //                             >
  //                               <table
  //                                 cellpadding="0"
  //                                 cellspacing="0"
  //                                 width="100%"
  //                                 role="presentation"
  //                                 style="
  //                                   mso-table-lspace: 0pt;
  //                                   mso-table-rspace: 0pt;
  //                                   border-collapse: collapse;
  //                                   border-spacing: 0px;
  //                                 "
  //                               >
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     style="
  //                                       padding: 0;
  //                                       margin: 0;
  //                                       padding-bottom: 10px;
  //                                     "
  //                                   >
  //                                     <h1
  //                                       style="
  //                                         margin: 0;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         mso-line-height-rule: exactly;
  //                                         letter-spacing: 0;
  //                                         font-size: 30px;
  //                                         font-style: normal;
  //                                         font-weight: bold;
  //                                         line-height: 36px;
  //                                         color: #212121;
  //                                       "
  //                                     >
  //                                       Cảm ơn bạn đã đăng ký tham gia vào buổi lễ
  //                                       ra mắt Sàn Hoa FMP
  //                                     </h1>
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </td>
  //               </tr>
  //             </table>
  //             <table
  //               cellpadding="0"
  //               cellspacing="0"
  //               class="es-content"
  //               align="center"
  //               style="
  //                 mso-table-lspace: 0pt;
  //                 mso-table-rspace: 0pt;
  //                 border-collapse: collapse;
  //                 border-spacing: 0px;
  //                 width: 100%;
  //                 table-layout: fixed !important;
  //               "
  //             >
  //               <tr>
  //                 <td
  //                   align="center"
  //                   bgcolor="#35A5F1 "
  //                   style="
  //                     padding: 0;
  //                     margin: 0;
  //                     background-color: #35a5f1;
  //                     background-image: url(https://xrsvkp.stripocdn.email/content/guids/CABINET_1ce849b9d6fc2f13978e163ad3c663df/images/10801592857268437.png);
  //                     background-repeat: no-repeat;
  //                     background-position: center top;
  //                     background-size: contain;
  //                   "
  //                   background="https://xrsvkp.stripocdn.email/content/guids/CABINET_1ce849b9d6fc2f13978e163ad3c663df/images/10801592857268437.png"
  //                 >
  //                   <table
  //                     bgcolor="#ffffff"
  //                     class="es-content-body"
  //                     align="center"
  //                     cellpadding="0"
  //                     cellspacing="0"
  //                     style="
  //                       mso-table-lspace: 0pt;
  //                       mso-table-rspace: 0pt;
  //                       border-collapse: collapse;
  //                       border-spacing: 0px;
  //                       background-color: transparent;
  //                       width: 600px;
  //                     "
  //                   >
  //                     <tr>
  //                       <td
  //                         align="left"
  //                         style="
  //                           margin: 0;
  //                           padding-right: 30px;
  //                           padding-left: 30px;
  //                           padding-top: 40px;
  //                           padding-bottom: 40px;
  //                         "
  //                       >
  //                         <table
  //                           cellpadding="0"
  //                           cellspacing="0"
  //                           width="100%"
  //                           style="
  //                             mso-table-lspace: 0pt;
  //                             mso-table-rspace: 0pt;
  //                             border-collapse: collapse;
  //                             border-spacing: 0px;
  //                           "
  //                         >
  //                           <tr>
  //                             <td
  //                               align="center"
  //                               valign="top"
  //                               style="padding: 0; margin: 0; width: 540px"
  //                             >
  //                               <table
  //                                 cellpadding="0"
  //                                 cellspacing="0"
  //                                 width="100%"
  //                                 role="presentation"
  //                                 style="
  //                                   mso-table-lspace: 0pt;
  //                                   mso-table-rspace: 0pt;
  //                                   border-collapse: collapse;
  //                                   border-spacing: 0px;
  //                                 "
  //                               >
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     height="20"
  //                                     style="padding: 0; margin: 0"
  //                                   ></td>
  //                                 </tr>
  //                                 <tr>
  //                                   <td
  //                                     align="left"
  //                                     style="
  //                                       padding: 0;
  //                                       margin: 0;
  //                                       padding-bottom: 10px;
  //                                     "
  //                                   >
  //                                     <h1
  //                                       style="
  //                                         margin: 0;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         mso-line-height-rule: exactly;
  //                                         letter-spacing: 0;
  //                                         font-size: 30px;
  //                                         font-style: normal;
  //                                         font-weight: bold;
  //                                         line-height: 36px;
  //                                         color: #ffffff;
  //                                         text-align: center;
  //                                       "
  //                                     >
  //                                       FMP - Sàn hoa số
  //                                     </h1>
  //                                   </td>
  //                                 </tr>
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     style="
  //                                       padding: 0;
  //                                       margin: 0;
  //                                       padding-top: 10px;
  //                                       padding-bottom: 10px;
  //                                     "
  //                                   >
  //                                     <p
  //                                       style="
  //                                         margin: 0;
  //                                         mso-line-height-rule: exactly;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         line-height: 24px;
  //                                         letter-spacing: 0;
  //                                         color: #ffffff;
  //                                         font-size: 16px;
  //                                       "
  //                                     >
  //                                       Cảm ơn ông/bà ${data.fullName} , đã dành thời gian quý báo
  //                                       tham dự sự kiện "Ra mắt sàn hoa FMP"
  //                                     </p>
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </td>
  //               </tr>
  //             </table>
  //             <table
  //               cellpadding="0"
  //               cellspacing="0"
  //               class="es-content"
  //               align="center"
  //               style="
  //                 mso-table-lspace: 0pt;
  //                 mso-table-rspace: 0pt;
  //                 border-collapse: collapse;
  //                 border-spacing: 0px;
  //                 width: 100%;
  //                 table-layout: fixed !important;
  //               "
  //             >
  //               <tr>
  //                 <td
  //                   align="center"
  //                   bgcolor="#f6f6f6"
  //                   style="padding: 0; margin: 0; background-color: #f6f6f6"
  //                 >
  //                   <table
  //                     bgcolor="transparent"
  //                     class="es-content-body"
  //                     align="center"
  //                     cellpadding="0"
  //                     cellspacing="0"
  //                     style="
  //                       mso-table-lspace: 0pt;
  //                       mso-table-rspace: 0pt;
  //                       border-collapse: collapse;
  //                       border-spacing: 0px;
  //                       background-color: transparent;
  //                       width: 600px;
  //                     "
  //                   >
  //                     <tr>
  //                       <td
  //                         align="left"
  //                         style="
  //                           padding: 0;
  //                           margin: 0;
  //                           padding-right: 20px;
  //                           padding-left: 20px;
  //                           padding-top: 40px;
  //                         "
  //                       >
  //                         <table
  //                           cellpadding="0"
  //                           cellspacing="0"
  //                           width="100%"
  //                           style="
  //                             mso-table-lspace: 0pt;
  //                             mso-table-rspace: 0pt;
  //                             border-collapse: collapse;
  //                             border-spacing: 0px;
  //                           "
  //                         >
  //                           <tr>
  //                             <td
  //                               align="center"
  //                               valign="top"
  //                               style="padding: 0; margin: 0; width: 560px"
  //                             >
  //                               <table
  //                                 cellpadding="0"
  //                                 cellspacing="0"
  //                                 width="100%"
  //                                 role="presentation"
  //                                 style="
  //                                   mso-table-lspace: 0pt;
  //                                   mso-table-rspace: 0pt;
  //                                   border-collapse: collapse;
  //                                   border-spacing: 0px;
  //                                 "
  //                               >
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     class="es-m-txt-c"
  //                                     style="
  //                                       padding: 0;
  //                                       margin: 0;
  //                                       padding-bottom: 10px;
  //                                     "
  //                                   >
  //                                     <h1
  //                                       style="
  //                                         margin: 0;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         mso-line-height-rule: exactly;
  //                                         letter-spacing: 0;
  //                                         font-size: 30px;
  //                                         font-style: normal;
  //                                         font-weight: bold;
  //                                         line-height: 36px;
  //                                         color: #212121;
  //                                       "
  //                                     >
  //                                       Đây là QR check-in của sự kiện
  //                                     </h1>
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                     <tr>
  //                       <td
  //                         class="es-m-p10t es-m-p0b es-m-p10r es-m-p10l"
  //                         align="left"
  //                         style="padding: 0; margin: 0; padding-top: 10px"
  //                       >
  //                         <table
  //                           cellpadding="0"
  //                           cellspacing="0"
  //                           width="100%"
  //                           style="
  //                             mso-table-lspace: 0pt;
  //                             mso-table-rspace: 0pt;
  //                             border-collapse: collapse;
  //                             border-spacing: 0px;
  //                           "
  //                         >
  //                           <tr>
  //                             <td
  //                               align="center"
  //                               valign="top"
  //                               style="padding: 0; margin: 0; width: 600px"
  //                             >
  //                               <table
  //                                 cellpadding="0"
  //                                 cellspacing="0"
  //                                 width="100%"
  //                                 style="
  //                                   mso-table-lspace: 0pt;
  //                                   mso-table-rspace: 0pt;
  //                                   border-collapse: collapse;
  //                                   border-spacing: 0px;
  //                                 "
  //                               >
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     style="padding: 0; margin: 0; display: none"
  //                                   ></td>
  //                                 </tr>
  //                               </table>
  //                               <img src="${domain}/images/${data._id}/QRcode.png" width="200" height="200" alt="alt_text" border="0" />

  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </td>
  //               </tr>
  //             </table>
  //             <table
  //               cellpadding="0"
  //               cellspacing="0"
  //               class="es-footer"
  //               align="center"
  //               style="
  //                 mso-table-lspace: 0pt;
  //                 mso-table-rspace: 0pt;
  //                 border-collapse: collapse;
  //                 border-spacing: 0px;
  //                 width: 100%;
  //                 table-layout: fixed !important;
  //                 background-color: #0a2b6e;
  //                 background-image: url(https://xrsvkp.stripocdn.email/content/guids/CABINET_9bfedeeeb9eeabe76f8ff794c5e228f9/images/2191625641866113.png);
  //                 background-repeat: repeat;
  //                 background-position: center center;
  //               "
  //               background="https://xrsvkp.stripocdn.email/content/guids/CABINET_9bfedeeeb9eeabe76f8ff794c5e228f9/images/2191625641866113.png"
  //             >
  //               <tr>
  //                 <td
  //                   align="center"
  //                   bgcolor="#FA8921"
  //                   style="padding: 0; margin: 0; background-color: #fa8921"
  //                 >
  //                   <table
  //                     bgcolor="#FFFFFF"
  //                     class="es-footer-body"
  //                     align="center"
  //                     cellpadding="0"
  //                     cellspacing="0"
  //                     style="
  //                       mso-table-lspace: 0pt;
  //                       mso-table-rspace: 0pt;
  //                       border-collapse: collapse;
  //                       border-spacing: 0px;
  //                       background-color: transparent;
  //                       width: 600px;
  //                     "
  //                   >
  //                     <tr>
  //                       <td
  //                         class="es-m-p40t es-m-p40b es-m-p20r es-m-p20l"
  //                         align="left"
  //                         style="
  //                           padding: 0;
  //                           margin: 0;
  //                           padding-top: 40px;
  //                           padding-bottom: 40px;
  //                         "
  //                       >
  //                         <table
  //                           cellpadding="0"
  //                           cellspacing="0"
  //                           width="100%"
  //                           style="
  //                             mso-table-lspace: 0pt;
  //                             mso-table-rspace: 0pt;
  //                             border-collapse: collapse;
  //                             border-spacing: 0px;
  //                           "
  //                         >
  //                           <tr>
  //                             <td
  //                               align="center"
  //                               valign="top"
  //                               style="padding: 0; margin: 0; width: 600px"
  //                             >
  //                               <table
  //                                 cellpadding="0"
  //                                 cellspacing="0"
  //                                 width="100%"
  //                                 style="
  //                                   mso-table-lspace: 0pt;
  //                                   mso-table-rspace: 0pt;
  //                                   border-collapse: separate;
  //                                   border-spacing: 0px;
  //                                   border-radius: 20px;
  //                                   background-color: #f0f3fe;
  //                                 "
  //                                 bgcolor="#f0f3fe"
  //                                 role="presentation"
  //                               >
  //                                 <tr>
  //                                   <td
  //                                     align="center"
  //                                     style="padding: 0; margin: 0"
  //                                   >
  //                                     <p
  //                                       style="
  //                                         margin: 0;
  //                                         mso-line-height-rule: exactly;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         line-height: 24px;
  //                                         letter-spacing: 0;
  //                                         color: #212121;
  //                                         font-size: 16px;
  //                                       "
  //                                     >
  //                                       Công ty Cổ phần Flower Marketplace - FMP
  //                                     </p>
  //                                     <p
  //                                       style="
  //                                         margin: 0;
  //                                         mso-line-height-rule: exactly;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         line-height: 24px;
  //                                         letter-spacing: 0;
  //                                         color: #212121;
  //                                         font-size: 16px;
  //                                       "
  //                                     >
  //                                       &nbsp;
  //                                     </p>
  //                                     <p
  //                                       style="
  //                                         margin: 0;
  //                                         mso-line-height-rule: exactly;
  //                                         font-family: roboto, 'helvetica neue',
  //                                           helvetica, arial, sans-serif;
  //                                         line-height: 24px;
  //                                         letter-spacing: 0;
  //                                         color: #212121;
  //                                         font-size: 16px;
  //                                       "
  //                                     >
  //                                       All Copyrights Reserved (c) 2023
  //                                     </p>
  //                                   </td>
  //                                 </tr>
  //                               </table>
  //                             </td>
  //                           </tr>
  //                         </table>
  //                       </td>
  //                     </tr>
  //                   </table>
  //                 </td>
  //               </tr>
  //             </table>
  //           </td>
  //         </tr>
  //       </table>
  //     </div>
  //   </body>
  // </html>
  // `;
};
