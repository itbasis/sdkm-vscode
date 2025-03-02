import * as vscode from 'vscode';
import { getEnv } from './sdkm/cmd/env';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "sdkm-vscode" is now active!');

	getEnv();
}

// This method is called when your extension is deactivated
export function deactivate() { }

