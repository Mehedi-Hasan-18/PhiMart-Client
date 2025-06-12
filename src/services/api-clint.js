import axios from "axios";

const apiClint =  axios.create({
    // baseURL:"https://phi-mart-ten.vercel.app/api/v1"
    baseURL:"http://127.0.0.1:8000/api/v1/"
});

export default apiClint