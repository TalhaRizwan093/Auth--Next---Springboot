import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const getProtectedMessage = async (req, res) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    console.log("accessToken");
    res.status(200).json(accessToken);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default withApiAuthRequired(getProtectedMessage);
