import dotenv from "dotenv";
export const templateEmail = (data) => {
  dotenv.config();
  const domain = process.env.DOMAIN_SERVER;

  return ` <div>
  <p>Thân chào quý ${data.gender === "male" ? "ông" : "bà"} ${
    data.fullName
  }.</p><p>FMP hy vọng sẽ gặp quý ${data.gender === "male" ? "ông" : "bà"} ${
    data.fullName
  }.</p> <p>Cảm ơn quý ${
    data.gender === "male" ? "ông" : "bà"
  } đã đăng ký tham dự cùng chúng tôi vào lúc 08:00 ngày 10/8/2023 tại Số 5 Nguyễn Tất Thành, Quận 4, Thành Phố Hồ Chí Minh.</br>Quý mến và hân hạnh được đồng hành cùng quý vị !</p><p> "FMP nở hoa - nuôi dưỡng cộng đồng"</p>
  <img src='${domain}/images/${data._id}/invitation.png' />
</div>
    `;
};
