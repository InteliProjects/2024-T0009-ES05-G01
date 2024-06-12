import { Tag } from 'antd';
import { PropTypes } from 'prop-types';

export default function Label({ children, color = 'default' }) {
  return <Tag color={color}>{children}</Tag>;
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
