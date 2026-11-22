import urllib.request
import json
import base64

# Let's inspect what create-order route does by making a direct call
url = 'https://swpamerch.uk/api/paypal/create-order'
data = {
    'items': [{
        'productId': 15975639318912,
        'variantId': 60011090215296,
        'quantity': 1
    }],
    'customer': {
        'name': 'Jack',
        'email': 'test@example.com',
        'shippingAddress': {
            'address1': '10 Test Road',
            'city': 'London',
            'postcode': 'SW1A 1AA'
        }
    }
}

req = urllib.request.Request(
    url,
    headers={'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json'},
    data=json.dumps(data).encode('utf-8')
)

try:
    with urllib.request.urlopen(req) as resp:
        print('Status:', resp.status)
        print('Body:', resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTP Error:', e.code)
    print('Error Body:', e.read().decode('utf-8'))
