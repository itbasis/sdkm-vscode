import { workspace } from "vscode";
import { getEnv } from "./cmd/env-go";

export function updateGoSettings(): void {
	var env = getEnv();

	var cfg = workspace.getConfiguration("go");

	cfg.update("gopath", env.get('GOPATH'));
	cfg.update("goroot", env.get('GOROOT'));
}
