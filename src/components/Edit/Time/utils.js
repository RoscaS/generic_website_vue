import {DateTime} from 'luxon';

function getTime(h, m) {
	return DateTime.local(2000, 1, 1, h, m)
}

export {getTime}
