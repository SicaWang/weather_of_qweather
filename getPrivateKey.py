from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
import base64

def convert_pem_to_64byte_base64(pem_file_path):
    # 读取并加载 PEM 格式的私钥
    with open(pem_file_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

    # 提取 32 字节的私钥部分
    private_key_raw = private_key.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )

    # 从私钥生成公钥，并提取 32 字节的公钥部分
    public_key = private_key.public_key()
    public_key_raw = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    # 合并私钥和公钥，得到 64 字节的密钥
    combined_key = private_key_raw + public_key_raw

    # 将 64 字节的密钥编码为 Base64 字符串
    combined_key_base64 = base64.b64encode(combined_key).decode('utf-8')
    
    return combined_key_base64

# 使用示例
pem_file_path = "ed25519-private.pem"  # 替换为你的 PEM 文件路径
raw_64byte_base64_key = convert_pem_to_64byte_base64(pem_file_path)
print("64-byte Ed25519 private + public key in Base64:", raw_64byte_base64_key)
