import { workspace } from "vscode";
import { getEnv } from "./cmd/env-go";

export function updateGoSettings(): void {
	const keyToolsEnvVars = "toolsEnvVars";

	var env = getEnv();

	var cfg = workspace.getConfiguration("go");

	cfg.update("gopath", env.get('GOPATH'));
	cfg.update("goroot", env.get('GOROOT'));

	var tools = cfg.get(keyToolsEnvVars) as NodeJS.Dict<string>;
	tools.GOBIN = env.get('GOBIN');

	cfg.update("toolsEnvVars", tools);
}
