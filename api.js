const ts = new Date().getTime().toString();
const publicKey = 'b89d21e84f7950f457d35558cbb00426';
const privateKey = '625eb50d552ee07840c4f5db7ea28d6aa38d5795';
const hashVal = CryptoJS.MD5(ts + privateKey + publicKey).toString();

export { ts, publicKey, hashVal };
