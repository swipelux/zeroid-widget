# ZeroID

## How to use

### Install

Just add the script tag to your head section

```html
<head>
  ...
  
  <script src="https://zeroid.swipelux.com/sdk.js"></script>
  ...
</head>
```

### Use

In the body section, add an HTML element for the widget to get placed to.

```html
<body>
  ...
  <!-- div with sample id for the widget placement in further -->
  <div id="widget-here"></div>
  ...
</body>
```

Now you can make the widget shown

```html
<body>
  ...
  <div id="widget-here"></div>
  
  <script>

    const placeForWidget = document.getElementById("widget-here");

    const zeroID = ZeroIdSdk.initStorage(placeForWidget);

  </script>

</body>
```

<img width="500px" src="public/storage_1.png">



<img width="500px" src="public/storage_2.png">

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
    }).catch(err => {
        console.log(err);
    });
</script>
```

| Name            | Description               | Call example                        |
|-----------------|---------------------------|-------------------------------------|
| `credentials`   | Return all credentials    | `zeroID.credentials()`              |
| `credential`    | Return credential by name | `zeroID.credential(name)`           |
| `openAIKey`     | Return OpenAI key         | `zeroID.openAIKey()`                |
| `addCredential` | Add new credential        | `zeroID.addCredential(name, value)` |

