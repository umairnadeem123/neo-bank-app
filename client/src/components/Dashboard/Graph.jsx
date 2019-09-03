/* eslint-disable no-underscore-dangle */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LineGraph from 'react-line-graph';
import { dashboardActions } from '../../_actions';

const actions = {
  changeNode: dashboardActions.changeNode,
};

const Graph = ({ trans }) => {
  console.log(trans);
  let {
    data: {
      BTC: { data },
    },
  } = trans;
  data = data.map((point) => {
    const y = point.date.replace(/\D/g, '');
    const x = point.price_close;
    return [x, y];
  });

  const props = {
    data,
    strokeWidth: 1,
    hover: true,
    smoothing: 0.5,
    compression: 0.5,
  };
  return (
    <div>
      <p>Here is your data:</p>
      <LineGraph {...props} />
    </div>
  );
};

Graph.propTypes = {
  trans: PropTypes.objectOf(PropTypes.any),
  changeNode: PropTypes.func.isRequired,
};

Graph.defaultProps = {
  trans: {},
};

export default connect(
  null,
  actions,
)(Graph);

/* eslint-enable */
