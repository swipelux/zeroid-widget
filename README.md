# ZeroID

## How to use

To install the ZeroID SDK into your project, you should add our script.

```html
<head>
  ...
  <script src="https://zeroid.swipelux.com/sdk.js"></script>
</head>
```

After this, the ZeroIdSdk object is available in the Window.

To initialize it:

```html
<body>
  <div id="root"></div>
  <script>
    const zeroID = ZeroIdSdk.initStorage(document.getElementById('root'));
  </script>
</body>
```

Example:

<img src="public/storage_1.png">
<img src="public/storage_2.png">

## API

After initialization, you can use the SDK methods. For example:

Example:
```html
<script>
    const zeroID = ZeroIdSdk.initStorage(document.getElementById('root'));
    zeroID.openAIKey().then(res => {
        const openAIKey = res.value;
        // You can now use your openAIKey to call 3rd party services
        console.log(openAIKey);
    });
</script>
```

| Name            | Description               | Call example                        |
|-----------------|---------------------------|-------------------------------------|
| `credentials`   | Return all credentials    | `zeroID.credentials()`              |
| `credential`    | Return credential by name | `zeroID.credential(name)`           |
| `openAIKey`     | Return OpenAI key         | `zeroID.openAIKey()`                |
| `addCredential` | Add new credential        | `zeroID.addCredential(name, value)` |

