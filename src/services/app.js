import { baseUrl } from "../config";

export const getData = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

 return fetch(`${baseUrl}/rejalar/`, requestOptions)
    .then((response) => response.json())
    .then((result) => ()=>{
      
        return result;
    })
    .catch((error) => ()=>{
        console.error(error)
        return [];
    });
};
 