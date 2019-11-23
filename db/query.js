module.exports = async (con, q) => new Promise((resolve, reject) => {
  const handler = (error, result) => {
    if (error) {
      console.log(error)
      reject(erorr);
    }
    resolve(result);
  };
  con.query(q, handler);
});