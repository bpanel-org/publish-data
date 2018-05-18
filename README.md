# Publish Data
A simple plugin for publishing arbitrary data to the blockchain using OP_RETURN.
This plugin will automatically split up the scripts to abide by the OP_RETURN
data size limits. Raw scripts are printed below the input to display what is added
to your transactions output. Set the fee and choose the wallet to send and fund the tx with.
TX hash of published transaction will be printed on the screen if successful.

## Installation
Install the `Publish Data` plugin the same way you would with any other bPanel plugin:
add the name of the npm package to the `plugins` array in the pluginsConfig.js file:

```javascript
// webapp/config/pluginsConfig.js
export const localPlugins = [];

export const plugins = ['@bpanel/publish-data'];

export default { localPlugins, plugins };
```

More from the bPanel docs [here](https://bpanel.org/docs/install-plugins.html#with-npm).

## Planned Features
- Support wallets protected with passphrases
- Return entire raw transaction

![screenshot](https://raw.githubusercontent.com/bpanel-org/publish-data/master/preview.gif "publish data preview")