// Data
import { MEDIA_DATA_TYPE, ELEMENT_NAME } from './typedef.js';

/* Option Structures */

export interface Option {
	label: string,
	value?: string,
}
export interface OptionList extends Array<Option>{}

export interface OptionGroup {
	label: string,
	options?: OptionList,
}
export interface OptionGroupList extends Array<OptionGroup>{}

export type Options = OptionList|OptionGroupList;

/* Card Properties */

export interface IdentityProps {
	name: string,
	shape: string,
	desc: string,
	element: string,
}
export interface AttributeProps {
	power: number,
	speed: number,
	defense: number,
}

/* Card Data */

export type ElementName = ELEMENT_NAME;

/* Media Data */

export type MediaDataType = MEDIA_DATA_TYPE;
export type MediaDataIdent = Boolean|String|Number;

export interface MediaData {
	ident: MediaDataIdent,
	type: MediaDataType,
	source: string,
}
export interface MediaDataList extends Array<MediaData>{}

/* Common Function Definitions */

export interface ChangeFunc {
	( event: Event ): void;
}
