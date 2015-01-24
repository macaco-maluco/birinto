var React = require('react');
var TestUtils = React.addons.TestUtils;
var MacacoMaluco = require('../lib/macaco-maluco.jsx');


describe("MacacoMaluco", function() {
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <MacacoMaluco name="Jonh"/>
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('macaco-maluco');
  });
});
