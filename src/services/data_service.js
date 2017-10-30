export async function getUserList() {

  return new Promise((fulfill) => {

    setTimeout(() => {

      const data = ['Juan', 'Sam', 'John'];
      fulfill(data);

    }, 200);

  });

}
