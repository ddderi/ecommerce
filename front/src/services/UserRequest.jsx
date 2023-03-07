import axios from "axios";

const axiosInstanceNode = axios.create({ baseURL: "http://localhost:1234" });

export async function SignUpUser(data) {
  try {
    const result = await axiosInstanceNode.post(
      "/signup",
      { data },
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    console.log(error);
    // setMessage(error.response.data.message);
  }
}
