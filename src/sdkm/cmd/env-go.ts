import { workspace } from 'vscode';
import cp from 'child_process';
import path from 'path';

export function getEnv(): Map<string, string> {
	console.debug('detect Go environment...');

	var envMap = new Map<string, string>();

	if (workspace.workspaceFolders === undefined) {
		return envMap;
	}

	var result = cp.spawnSync(
		'sdkm',
		[
			'env',
			'go'
		],
		{
			cwd: workspace.workspaceFolders[0].uri.fsPath,
		},
	);

	result.stdout.toString().split(/\n/).forEach((_el: any) => {
		if (_el && _el.length > 0) {
			var kv = _el.split(/=/);
			envMap.set(kv[0], path.normalize(kv[1]));
		}
	});

	console.debug(envMap);

	return envMap;
}
