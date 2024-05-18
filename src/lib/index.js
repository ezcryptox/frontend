import { handleisLoggin } from "$lib/store/profile";
import axios from "axios"
import { ServerURl } from "$lib/backendUrl"
const URL = ServerURl()

export  const UserProfileEl = (auth) => {
const handleprofile = async (auth) => {
  let is_loading = true
  let error = ""
  let response = ""
  await axios.get(`${URL}/api/profile`,{
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${auth}`
      }
  })
  .then((res)=>{
      response = res.data
      handleisLoggin.set(true)
      is_loading = false
  })
  .catch((err)=>{
      error = err.message
      handleisLoggin.set(false)
      is_loading = false
  })
  return { is_loading, error, response }
};


const handlePPDwallet = async () => {
    const response =
      (await fetch(`${URL}/api/wallet/ppd-wallet`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }));
    const json = await response.json();
    if (response.ok) {
      return json[0];
    }
  };

  const handlePPLwallet = async () => {
    const response = await fetch(`${URL}/api/wallet/ppl-wallet`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      return json[0];
    }
  };

  const handlePPFwallet = async () => {
    const response = await fetch(`${URL}/api/wallet/ppf-wallet`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      return json[0];
    }
  };
  const handleUSDTwallet = async () => {
    const response = await fetch(`${URL}/api/wallet/usdt-wallet`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      return json[0];
    }
  };

const handleTransaction = (async(auth, route)=>{
  let responcse = ""
  let is_loading = true
  let error = ''
  if(auth){
      await axios.get(`${ServerURl()}/api/transaction/${route}`,{
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth}`,
        }
      })
      .then((response)=>{
          responcse = response.data
          is_loading = false
      })
      .catch((err)=>{
          error = err
          is_loading = false
      })
  }else{
      error = "No user"
      is_loading = false
  }
  return {responcse, is_loading, error}
})

  return {
    handleprofile,
    handleUSDTwallet,
    handlePPFwallet,
    handlePPLwallet,
    handlePPDwallet,
    handleTransaction
  };
};