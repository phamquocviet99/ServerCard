import dotenv from "dotenv";
export const templateEmail = (data) => {
  dotenv.config();
  const domain = process.env.DOMAIN_SERVER;

  return ` <div>
  <img src='${domain}/images/${data._id}/invitation.png' />
</div>
    `;
};
