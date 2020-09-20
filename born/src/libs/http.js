export default class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      const req = await fetch(url);
      const json = await req.json();
      return json;
    } catch (error) {
      console.log('http get method error: ', error);
      throw Error(error);
    }
  }

  post = async (url, body) => {
    try {
      const req = await fetch(url, {
        method: 'POST',
        body,
      });
      const json = await req.json();
      return json;
    } catch (error) {
      console.log('http get method error: ', error);
      throw Error(error);
    }
  }
}