import * as sdkm from './sdkm/update-settings';

export function updateGoSettings() {
	console.info("start update Go settings...");

	sdkm.updateGoSettings();

	console.info("complete update Go settings.");
}
