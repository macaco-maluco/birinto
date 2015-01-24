# macaco maluco

Get the AMD module located at `macaco-maluco.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'MacacoMaluco': 'macaco-maluco'
  }
});

require(['react', 'MacacoMaluco'], function(React, MacacoMaluco) {

  React.render(React.createElement(MacacoMaluco), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
