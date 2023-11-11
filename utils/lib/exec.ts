/**
 * Runs a command and returns its output.
 * @since 0.1.1
 * @param command The command to run.
 * @param options The options to pass to `Deno.run`. */
export async function exec(
  command: string[],
  options?: Deno.CommandOptions,
): Promise<{ stdout: Uint8Array; stderr: Uint8Array }> {
  const process = new Deno.Command(Deno.execPath(), {
    args: command,
    stdout: "piped",
    stderr: "piped",
    ...options,
  }).spawn();

  const [status, stdout, stderr] = await Promise.all([
    process.status,
    (await process.output()).stdout,
    (await process.output()).stderr,
  ]);

  process.kill();

  if (!status.success) {
    throw new Error(`Command failed: ${status.code}`);
  }

  return { stdout, stderr };
}
