var React = require("react");

require('./progress-bar.scss');

var ProgressBar = module.exports = React.createClass({
  render: function () {

    return <div className="progress-bar">
      <div className="current-progress" style={{width: (this.props.value * 100) + '%'}} />
    </div>;
  }
});
