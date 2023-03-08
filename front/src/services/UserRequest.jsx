import axios from "axios";

const axiosInstanceNode = axios.create({
  baseURL: "http://localhost:8081/api/v1",
});

export async function SignUpUser(
  data,
  dispatchDataError,
  changeLinkStateError
) {
  try {
    console.log(data);
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
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    dispatchDataError(error.response.data.message);
    if (error.response.data.error) {
      changeLinkStateError(true);
    }
  }
}

export async function resendEmailVerification(data, dispatchDataError) {
  try {
    const result = await axiosInstanceNode.post(
      "/verification-email",
      { data },
      { withCredentials: true }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
