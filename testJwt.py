import base64
import json
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from cryptography.hazmat.primitives import serialization
from cryptography.exceptions import InvalidSignature

# JWT Base64URL 解码
def base64url_decode(input):
    padding = '=' * (4 - len(input) % 4)
    return base64.urlsafe_b64decode(input + padding)

# 解析 JWT
def parse_jwt(jwt_token):
    encoded_header, encoded_payload, encoded_signature = jwt_token.split('.')
    header = json.loads(base64url_decode(encoded_header))
    payload = json.loads(base64url_decode(encoded_payload))
    signature = base64url_decode(encoded_signature)
    return header, payload, signature, f"{encoded_header}.{encoded_payload}".encode()

# 验证 JWT 签名
def verify_jwt(jwt_token, public_key_path):
    # 解析 JWT
    header, payload, signature, data_to_sign = parse_jwt(jwt_token)

    # 加载公钥
    with open(public_key_path, "rb") as key_file:
        public_key = serialization.load_pem_public_key(key_file.read())

    # 确保公钥是 Ed25519 类型
    if not isinstance(public_key, Ed25519PublicKey):
        raise ValueError("Public key is not of type Ed25519")

    # 验证签名
    try:
        public_key.verify(signature, data_to_sign)
        print("✅ JWT 签名验证成功")
    except InvalidSignature:
        print("❌ JWT 签名验证失败")

# 使用示例
jwt_token = "eyJhbGciOiJFZERTQSIsImtpZCI6IkNLQjMyQTRCOFgifQ.eyJzdWIiOiIyRTg4MkZWNTJYIiwiaWF0IjoxNzMxNDc4MzI5LCJleHAiOjE3MzE1NjQ3NTl9.lHED7Lojq8iQ_5HsRgRoXjO7Ibv3ZZl0csUKJuncG5NnTBi8-L28Y0xLIFcKc371l0AC_yGfZjtc09GZgrkeBg"
public_key_path = "ed25519-public.pem"  # 替换为你的公钥路径

verify_jwt(jwt_token, public_key_path)
