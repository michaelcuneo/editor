import React from 'react';
import PropTypes from 'prop-types';

import { Storage, Logger } from 'aws-amplify';

import FLLoadingIndicator from 'components/LoadingIndicator';

const transparent1X1 =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const logger = new Logger('Storage.S3Image');

class S3Image extends React.Component {
  constructor(props) {
    super(props);

    const initSrc = this.props.src || transparent1X1;

    this.state = {
      src: initSrc,
      hover: null,
    };
  }

  changeHover = () => {
    this.setState(prevState => ({
      hover: !prevState.hover,
    }));
  };

  getImageSource(key, newLevel, track, identityId) {
    Storage.get(key, { level: newLevel || 'public', track, identityId })
      .then(url => {
        this.setState({
          src: url,
        });
      })
      .catch(err => logger.debug(err));
  }

  load() {
    const { s3key, level, track, identityId } = this.props;
    if (!s3key) {
      logger.debug('empty s3Key and path');
      return;
    }
    logger.debug(`loading ${s3key} ...`);
    this.getImageSource(s3key, level, track, identityId);
  }

  componentDidMount() {
    this.load();
  }

  imageEl(src) {
    return (
      <div
        key={src}
        role="button"
        tabIndex={0}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        onMouseOver={this.changeHover}
        onMouseOut={this.changeHover}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <img src={src} alt="" />
      </div>
    );
  }

  render() {
    const { src } = this.state;
    if (!src) {
      return null;
    }

    return (
      [this.imageEl(src)] || <FLLoadingIndicator key="ImageLoadingIndicator" />
    );
  }
}

S3Image.propTypes = {
  identityId: PropTypes.any,
  src: PropTypes.any,
  s3key: PropTypes.string,
  level: PropTypes.any,
  track: PropTypes.any,
};

export default S3Image;
