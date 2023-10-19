# ZeroID Key Storage

## How to use

1. Install SDK
2. Display the widget for the end user
3. Use end users API keys in your project

### Install

Just add the script tag to your head section

```html
<head>
  ...
  
  <script src="https://zeroid.swipelux.com/sdk.js"></script>
  ...
</head>
```

### Display widget

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

### Use widget

When "My keys" button clicked for the first time click the Metamask signature request appears

<img width="500px" src="public/sigrequest.png">

It is being used to identify the user by wallet so then we can prepare a personal key bucket for him. <b>No fee is charged.</b>

Once signed, the key management pop-up is shown,

Where user can

- add
- update
- remove 

his <b>OpenAI API Key</b>

<img width="500px" src="public/storage_2.png">

### Use your keys in code

After key is saved it can be retreived in code by the application developer


```html
<body>
  ...
  <div id="widget-here"></div>
  
  <script>
    import {axios} from 'axios';

    const placeForWidget = document.getElementById("widget-here");

    const zeroID = ZeroIdSdk.initStorage(placeForWidget);

    // using you OpenAI key
    zeroID.openAIKey()
       .then(res => res.value)
       .then(
          key => generateTextFromPhrase(
            "Once upon a time...", 
            key
          )
        )
        .catch(console.err);
        

    function generateTextFromPhrase(phrase, apiKey) {
      // Configure your request headers with your API key
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      // Set up the data for the API request
      const data = {
        prompt: phrase,
        max_tokens: 50, // Adjust the desired length of generated text
        engine: 'davinci',
      };

      // Make a POST request to the OpenAI API
      axios.post('https://api.openai.com/v1/engines/davinci/completions', data, { headers })
        .then((response) => {
          const generatedText = response.data.choices[0].text;
          console.log('Generated Text:', generatedText);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }     
  </script>

</body>
```

### Why it's secure

Whilst the API-key are retrieved on client-side — user can see the exact code operating on it. 

Furthermore, instead of sharing users keys in public server environments you can now pass them unrevealed through the channel provided by authorized entity.

### Advanced 

The SDK can be used not only for OpenAI for the custom key-value pairs storing.

| Name            | Description               | Call example                        |
|-----------------|---------------------------|-------------------------------------|
| `credentials`   | Return all credentials    | `zeroID.credentials()`              |
| `credential`    | Return credential by name | `zeroID.credential(name)`           |
| `openAIKey`     | Return OpenAI key         | `zeroID.openAIKey()`                |
| `addCredential` | Add new credential        | `zeroID.addCredential(name, value)` |

```html
<body>
  ...
  <div id="widget-here"></div>
  
  <script>

    const placeForWidget = document.getElementById("widget-here");

    const zeroID = ZeroIdSdk.initStorage(placeForWidget);

    // using you OpenAI key
    await zeroID.addCredential(
      "AIRTABLE_KEY",
      "ww121490j304jjwq"
    );

    await zeroID
       .credential("AIRTABLE_KEY")
       .then(res => res.value)
       .then(console.log);
    
    // outputs: "ww121490j304jjwq"

    await zeroID
       .credentials()
       .then(console.log);

    /* {
        [ 
          {"AIRTABLE_KEY": "ww..jwq"},
          {"OPENAI_API_KEY": "sk-..."}, 
        ]
    } 
    
        
  </script>

</body>
```
