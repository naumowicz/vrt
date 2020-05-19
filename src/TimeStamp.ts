import dateformat from 'dateformat';

class TimeStamp {
	static getTimeStamp(): string {
		return dateformat(new Date(), 'yyyy-mm-dd H-MM-ss');
	}
}

export default TimeStamp;
