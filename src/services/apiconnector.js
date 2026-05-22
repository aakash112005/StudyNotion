// import axios from "axios";

// export const axiosInstance  = axios.create({
    
// });

// export const apiConnector = (method,url,bodyData,headers,params) =>{
//      console.log("Not Updated 3");
//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data : bodyData ? bodyData:null,
//         headers:headers ?headers:null,
//         params:params ?params :null,
//     });
     
// }


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const apiConnector = (
  method,
  url,
  bodyData,
  headers = {},
  params = {}
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};

