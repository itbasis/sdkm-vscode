import * as vscode from 'vscode';
import { updateGoSettings } from './export';
import path from 'path';

const goFilesTriggers = ["go.mod", "go.work"];
export function activate(ctx: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "sdkm-vscode" is now active!');

	vscode.workspace.onDidSaveTextDocument((e: vscode.TextDocument) => {
		var fileName = path.basename(e.fileName);
		changeGoProject(fileName);
	});

	activateGoProject(ctx);

	ctx.subscriptions.push(vscode.commands.registerCommand("sdkm-vscode.updateGoSettings", () => {
		updateGoSettings();
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }

function activateGoProject(_: vscode.ExtensionContext) {
	var mask = "{" + goFilesTriggers.join(",") + "}";
	vscode.workspace.findFiles(mask).then((files: vscode.Uri[]) => {
		if (files.length > 0) {
			updateGoSettings();
		}
	});
}

function changeGoProject(fileName: string) {
	if (!goFilesTriggers.includes(fileName)) {
		return;
	}

	updateGoSettings();
}
