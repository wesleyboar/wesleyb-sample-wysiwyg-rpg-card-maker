// Data
import { MEDIA_DATA_TYPE } from './typedef.js';

/* Option Structures */

interface Option {
	label: string,
	value?: string,
}
interface OptionList extends Array<Option>{}

interface OptionGroup {
	label: string,
	options?: OptionList,
}
interface OptionGroupList extends Array<OptionGroup>{}

type Options = OptionList|OptionGroupList;

/* Card Properties */

interface IdentityProps {
	name: string,
	shape: string,
	desc: string,
	element: string,
}
interface AttributeProps {
	power: number,
	speed: number,
	defense: number,
}

/* Miscellaneous */

type MediaDataType = MEDIA_DATA_TYPE;
type MediaDataIdent = Boolean|String|Number;

interface MediaData {
	ident: MediaDataIdent,
	type: MediaDataType,
	source: string,
}
interface MediaDataList extends Array<MediaData>{}
