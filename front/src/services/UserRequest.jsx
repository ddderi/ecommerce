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

export async function addCart(data) {
  try {
    const token = window.localStorage.getItem("tokenEcom");
    const result = await axiosInstanceNode.post(
      `/addCart`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getCart(id) {
  try {
    const token = window.localStorage.getItem("tokenEcom");
    const result = await axiosInstanceNode.get(
      `/cart/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id,
        },
      },
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const result = await axiosInstanceNode.get("/products");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(id) {
  try {
    const result = await axiosInstanceNode.get(`/products/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
