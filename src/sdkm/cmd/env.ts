import { ConfigurationTarget, workspace } from 'vscode';
import cp from 'child_process';

export function getEnv(): void {
    console.debug('detect Go environment');

    var envMap = new Map<string, string>();

    if (workspace.workspaceFolders === undefined) {
        return;
    }

    var result = cp.spawn(
        'sdkm',
        [
            'env',
            'go'
        ],
        {
            cwd: workspace.workspaceFolders[0].uri.fsPath,
        },
    );

    result.stdout.forEach(function (data) {
        var rows = data.toString().split(/\n/);
        rows.forEach((_el: any) => {
            var kv = _el.split(/=/);
            envMap.set(kv[0], kv[1]);
        });

        var cfg = workspace.getConfiguration("go");

        cfg.update("gopath", envMap.get('GOPATH'), ConfigurationTarget.WorkspaceFolder, true);
        cfg.update("goroot", envMap.get('GOROOT'), ConfigurationTarget.WorkspaceFolder, true);

        console.debug(envMap);
    });

}