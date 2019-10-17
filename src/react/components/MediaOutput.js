import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './MediaOutput.css';

// Data
import CustomTypes from '../services/custom-types.js';
import { MEDIA_DATA_TYPE } from '../../_shared/typedef.js';

/**
 * Get JavaScript style object based on given media data
 * @param {MediaData} mediaData - Information about the media
 */
function getStyle( mediaData ) {
	let style = {};

	switch ( mediaData.type ) {
		case MEDIA_DATA_TYPE.IMAGE:
		default:
			style = { backgroundImage: `url("${mediaData.source})"` };
	};

	return style;
}

/**
 * A media field whose content is dependent on external input
 * @param {Object} props
 * @param {MediaData} props.mediaData - Information about the associated media
 * @param {String} [props.htmlFor] - Markup `for` attribute i.e. the `id` of the input field(s)
 * @param {*} [props.__ATTRIBUTE__] - Undocumented properties are applied as attributes on the markup of the root element
 * @return {React.Component}
 */
function MediaOutput( props ) {
	const { htmlFor, mediaData, className, ...markupAttrs } = props;
	const initialStyle = getStyle( mediaData );
	const [ style, setStyle ] = React.useState( initialStyle );

	React.useEffect(() => {
		const newStyle = getStyle( mediaData );

		console.info('MediaOutput', { mediaData, newStyle });

		setStyle( newStyle );
	}, [ mediaData ]);

	return (
		<output {...markupAttrs} className={`c-media-output ${className}`} data-ident={mediaData.ident} data-type={mediaData.type} style={style}></output>
	);
}
MediaOutput.propTypes = {
	mediaData: CustomTypes.MediaData.isRequired,

	htmlFor: PropTypes.string,
}

export default MediaOutput;
