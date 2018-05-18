# Publish Data
A simple plugin for publishing arbitrary data to the blockchain using OP_RETURN.
This plugin will automatically split up the scripts to abide by the OP_RETURN
data size limits. Raw scripts are printed below the input to display what is added
to your transactions output. Set the fee and choose the wallet to send and fund the tx with.
TX hash of published transaction will be printed on the screen if successful.

Feature Requests:
- Support wallets protected with passphrases
- Return entire raw transaction

![screenshot](https://raw.githubusercontent.com/bpanel-org/publish-data/master/preview.gif "publish data preview")