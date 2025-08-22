import { TIMEOUT_SEC } from './config.js';

const timeout = sec => {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    let data = await res.json();

    // let data;
    // const search = url.includes('search');

    // // if (data.results) {
    // if (search) {
    //   // localStorage.setItem('search', JSON.stringify(data));
    //   data = JSON.parse(localStorage.getItem('search'));
    // } else {
    //   // localStorage.setItem('recipe',JSON.stringify(data));
    //   data = JSON.parse(localStorage.getItem('recipe'));
    // }

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // if (!data) throw new Error(`Empty data (NOT FOUND!)`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    // const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // let data = await res.json();
    let data;
    const search = url.includes('search');

    // if (data.results) {
    if (search) {
      // localStorage.setItem('search', JSON.stringify(data));
      data = JSON.parse(localStorage.getItem('search'));

    }else{
      // localStorage.setItem('recipe',JSON.stringify(data));
      data = JSON.parse(localStorage.getItem('recipe'));
    }
    console.log(data);

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    if (!data) throw new Error(`Empty data (NOT FOUND!)`);
    return data;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {

    const sendReq = fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(uploadData)
    });

    const res = await Promise.race([sendReq, timeout(TIMEOUT_SEC)]);
    let data = await res.json();



    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // if (!data) throw new Error(`Empty data (NOT FOUND!)`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
