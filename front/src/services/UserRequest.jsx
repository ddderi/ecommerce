import axios from "axios";

const axiosInstanceNode = axios.create({ baseURL: "http://localhost:1234" });

export async function SignUpUser(data, dispatchDataError) {
  try {
    const result = await axiosInstanceNode.post(
      "/signup",
      { data },
      { withCredentials: true }
    );
    if (result.code) {
      dispatchDataError(result.response.data.message);
    } else {
      dispatchDataError(result.data.message);
    }
    return result;
  } catch (error) {
    dispatchDataError(error.response.data.message);
  }
}
