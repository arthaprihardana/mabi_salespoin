/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 14:56:16 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 14:56:44
 */
export const GreetingTime = (m) => {
	var g = null; //return g
	
	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
	
	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));
	
	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = "Selamat Sore";
	} else if(currentHour >= split_evening) {
		g = "Selamat Malam";
	} else {
		g = "Selamat Pagi";
	}
	return g;
}