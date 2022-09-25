export const _fetchData = async (url, formData, headers = undefined) => {
  let result;
  try {
    const res = await fetch(`https://gateway.lizhi.io/demo/login.php?${url}`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });
    result = res.json();
  }
  catch (err) {
    result = { status: 40001 };
  }
  return result;
};
