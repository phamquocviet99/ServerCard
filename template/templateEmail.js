import dotenv from "dotenv";
export const templateEmail = (data) => {
  dotenv.config();
  const domain = process.env.DOMAIN_SERVER;

  return ` <div>
 <p>Cảm ơn quý ${userData.gender === "male" ? "ông" : "bà"} ${
    userData.fullName
  } đã đăng kí tham gia sự kiện lễ ra mắt Sàn Hoa FMP !</p>
  <img src='${domain}/images/${data._id}/invitation.png' />
</div>
    `;
};
