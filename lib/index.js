// Entry point for your plugin
// This should expose your plugin's modules/* START IMPORTS */
import modules from './plugins';

import PublishData from './PublishData';
/* END IMPORTS */

const plugins = Object.keys(modules).map(name => modules[name]);

/* START EXPORTS */

export const metadata = {
  name: '@bpanel/publish-data',
  pathName: 'publish-data',
  displayName: 'Publish Data',
  author: 'bpanel-org',
  description:
    'A simple bPanel plugin for publishing data on the blockchain using OP_RETURN',
  version: require('../package.json').version,
  icon: 'inbox',
  sidebar: true
};

export const pluginConfig = { plugins };

// a decorator for the Panel container component in our app
// here we're extending the Panel's children by adding
// our plugin's component (`MyComponent` below)
// You'll want to make sure to import an actual component
// This is what you need if you're making a new view/route
export const decoratePanel = (Panel, { React, PropTypes }) => {
  return class extends React.Component {
    static displayName() {
      return metadata.name;
    }

    static get propTypes() {
      return {
        customChildren: PropTypes.array
      };
    }

    render() {
      const { customChildren = [] } = this.props;
      const routeData = {
        metadata,
        Component: PublishData
      };
      return (
        <Panel
          {...this.props}
          customChildren={customChildren.concat(routeData)}
        />
      );
    }
  };
};

/* END EXPORTS */
