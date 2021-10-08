from random import randbytes, randint
from prng import PRNG
from binascii import hexlify, unhexlify
from sys import argv

def rbits(n):
    return randint(2**(n-1), 2**n-1)

def genKey():
    m = rbits(32)
    a = rbits(16)
    c = rbits(24)
    s = rbits(16)
    k = [ b for b in m.to_bytes(4, 'big') ]
    k.extend([b for b in a.to_bytes(2, 'big')])
    k.extend([b for b in c.to_bytes(3, 'big')])
    k.extend([b for b in s.to_bytes(2, 'big')])
    k = bytes(k).hex()
    return k

def decodeKey(key):
    m = [key[0], key[1], key[2], key[3]]
    a = [key[4], key[5]]
    c = [key[6], key[7], key[8]]
    s = [key[9], key[10]]
    m = int.from_bytes(bytes(m), 'big')
    a = int.from_bytes(bytes(a), 'big')
    c = int.from_bytes(bytes(c), 'big')
    s = int.from_bytes(bytes(s), 'big')
    return [m, a, c, s]

def splitString(string, blocksize=1):
    return [ string[i : i+blocksize] for i in range(0, len(string), blocksize) ]

def encrypt(m, a, c, s, message):
    prng = PRNG(m, a, c, s)
    message = splitString(message, 4)
    if len(message[-1]) == 4:
        message.append('')
    message[-1] += '\n'
    while len(message[-1]) < 4:
        message[-1] += chr(0)
    cypher = []
    for i in range(len(message)):
        msg = message[i]
        msg = bytes(msg, 'utf-8')
        msg = int.from_bytes(msg, 'big')
        msg = msg ^ prng.random(0, 2**32-1, True)
        cypher.append(msg)
    for i in range(len(cypher)):
        cypher[i] = cypher[i].to_bytes(4, 'big').hex()
    return ''.join(cypher)

def decrypt(m, a, c, s, message):
    if len(message) % 8 != 0:
        raise ValueError("Invalid Message")
    message = splitString(message, 8)
    prng = PRNG(m, a, c, s)
    for i in range(len(message)):
        message[i] = int.from_bytes(bytes.fromhex(message[i]), 'big')
        message[i] = message[i] ^ prng.random(0, 2**32-1, True)
        message[i] = [ b for b in int.to_bytes(message[i], 4, 'big')]
        for b in range(len(message[i])):
            message[i][b] = chr(message[i][b])
        message[i] = ''.join(message[i])
    message = ''.join(message)
    message = [b for b in bytes(message, 'utf-8')]
    while message[-1] == 0:
        message.pop(-1)
    message.pop(-1)
    for i in range(len(message)):
        message[i] = chr(message[i])
    message = ''.join(message)
    return message

if __name__ == '__main__':
    argv.pop(0)
    i = 0
    key = ''
    message = ''
    f_keySet = False
    f_encrypt = False
    f_decrypt = False
    while i < len(argv):
        if argv[i] == '-n' or argv[i] == '--new':
            print("ENCRYPTION KEY: " + genKey())
        elif argv[i] == '-k' or argv[i] == '--key':
            i += 1
            key = argv[i]
            if key == '-n' or key == '--new':
                key = genKey()
                print("ENCRYPTION KEY: " + genKey())
            f_keySet = True
        elif argv[i] == '-e' or argv[i] == '--encrypt':
            i += 1
            message = argv[i]
            f_encrypt = True
        elif argv[i] == '-d' or argv[i] == '--decrypt':
            i += 1
            message = argv[i]
            f_decrypt = True
        i += 1
    if f_encrypt and f_decrypt:
        raise Exception("Cannot encrypt and decrypt at the same time")
    if (f_encrypt or f_decrypt) and not f_keySet:
        raise Exception("Cannot encrypt or decrypt without a key")
    if f_keySet:
        key = bytes.fromhex(key)
        key = [ b for b in key ]
        [m, a, c, s] = decodeKey(key)
        if f_encrypt:
            print(encrypt(m, a, c, s, message))
        if f_decrypt:
            print(decrypt(m, a, c, s, message))