import nacl from 'tweetnacl';

// 获取环境变量
const sub = import.meta.env.VITE_API_PROJECT_ID;
const kid = import.meta.env.VITE_API_KID;
const expiresIn = parseInt(import.meta.env.VITE_API_EXPIRES_IN) || 300; // 默认 300 秒

// 将 Base64 私钥解码为 Uint8Array
function decodeBase64(base64String) {
    const binaryString = typeof atob !== 'undefined'
        ? atob(base64String)
        : Buffer.from(base64String, 'base64').toString('binary');
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// 获取私钥的 Uint8Array（确保此处私钥为 64 字节）
const privateKeyUint8Array = decodeBase64(import.meta.env.VITE_API_PRIVATE_KEY);

// Base64URL 编码函数
function base64UrlEncode(arrayBuffer) {
    const base64String = typeof btoa !== 'undefined'
        ? btoa(String.fromCharCode(...arrayBuffer))
        : Buffer.from(arrayBuffer).toString('base64');
    return base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// 生成 JWT 函数
async function generateJWT() {
    const header = {
        alg: "EdDSA",
        kid: kid
    };

    const now = Math.floor(new Date().getTime() / 1000);

    const iat = now - 30;
    const exp = now + expiresIn;

    const payload = {
        sub: sub,
        iat: iat,
        exp: exp
    };

    const encodedHeader = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
    const encodedPayload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
    const dataToSign = `${encodedHeader}.${encodedPayload}`;

    // 使用 TweetNaCl 库进行 Ed25519 签名
    const signature = nacl.sign.detached(new TextEncoder().encode(dataToSign), privateKeyUint8Array);

    const encodedSignature = base64UrlEncode(signature);

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export default generateJWT;
