import axios from 'axios';
import { toast } from 'react-toastify';

let baseURl = import.meta.env.VITE_APP_REACT_BASE_API;

const usePostApi = async (url, data) => {
  try {
    const res = await axios.post(baseURl + url, data);
    return { response: res.data, error: null, loading: false };
  } catch (error) {
    console.error("Error:", error);

    let errorMessage = 'An error occurred. Please try again later.';

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    return { response: null, error: error, loading: false };
  }
};

export default usePostApi;
