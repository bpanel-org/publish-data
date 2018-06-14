import React from 'react';
import { Output } from 'bcoin';
import { Header, Button, Text } from '@bpanel/bpanel-ui';
import { scriptsFromString } from './helpers';
import { bwalletClient } from '@bpanel/bpanel-utils';

class PublishData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { scripts: [], tx: '', wallets: [], wallet: '', rate: 1000 };
    this.client = bwalletClient();
  }

  async componentDidMount() {
    const wallets = await this.client.getWallets();
    this.setState({ wallets, wallet: wallets[0] });
  }

  onChange(e) {
    const input = e.target.value;
    const scripts = scriptsFromString(input);
    this.setState({ scripts });
  }

  onSelect(e) {
    this.setState({ wallet: e.target.value });
  }

  setFee(e) {
    this.setState({ rate: e.target.value });
  }

  async onClick() {
    const { scripts, wallet, rate } = this.state;
    const outputs = scripts.map(script => Output.fromScript(script, 0));
    const options = {
      rate: parseInt(rate),
      sort: false,
      outputs
    };
    try {
      const tx = await this.client.send(wallet, options);
      this.setState({ tx });
    } catch (e) {
      // eslint-disable-next-line
      console.error('There was an error sending the tx: ', e);
    }
  }

  render() {
    const { wallets, tx, scripts, rate } = this.state;
    return (
      <div className="publish-data-container">
        <Header type="h3">Publish Arbitrary Data to the Blockchain</Header>
        <Text type="p">Select a wallet to send from: </Text>
        <select name="wallets" onChange={e => this.onSelect(e)}>
          {wallets.map(id => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <div>
          <Text>Rate (satoshis/kb): </Text>
          <input
            type="number"
            step="100"
            value={rate}
            onChange={e => this.setFee(e)}
          />
        </div>
        <textarea
          placeholder="Enter the data to be published here."
          style={{ width: '100%' }}
          onChange={e => this.onChange(e)}
        />

        <Header type="h4">Scripts:</Header>
        {scripts.map((script, index) => (
          <Text key={index} type="p" style={{ wordWrap: 'break-word' }}>
            {index + 1}: {script.toString()}
          </Text>
        ))}
        <Button onClick={() => this.onClick()}>Submit</Button>
        {tx && (
          <div>
            <Header type="h3">TX Sent:</Header>
            <Text type="p" style={{ wordWrap: 'break-all' }}>
              {tx.hash}{' '}
            </Text>
          </div>
        )}
      </div>
    );
  }
}

export default PublishData;
