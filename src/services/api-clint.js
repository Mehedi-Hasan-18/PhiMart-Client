import axios from "axios";

const apiClint =  axios.create({
    baseURL:"https://phi-mart-ten.vercel.app/api/v1"
});

export default apiClint