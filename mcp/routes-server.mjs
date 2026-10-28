#!/usr/bin/env node
// Minimal zero-dependency MCP server (stdio, JSON-RPC 2.0) exposing Laravel's route list.
import { execFile } from 'node:child_process';
import { createInterface } from 'node:readline';

const tools = [
  {
    name: 'list_routes',
    description: "List the current Laravel app's routes (php artisan route:list --json), optionally filtered.",
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Only routes whose URI contains this text' },
        name: { type: 'string', description: 'Only routes whose name contains this text' },
        method: { type: 'string', description: 'HTTP method, e.g. GET or POST' },
      },
    },
  },
];

function listRoutes({ path, name, method } = {}) {
  const args = ['artisan', 'route:list', '--json', '--except-vendor'];
  if (path) args.push(`--path=${path}`);
  if (name) args.push(`--name=${name}`);
  if (method) args.push(`--method=${method}`);

  return new Promise((resolve) => {
    execFile('php', args, { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ isError: true, content: [{ type: 'text', text: stderr || error.message }] });
        return;
      }
      resolve({ content: [{ type: 'text', text: stdout.trim() || '[]' }] });
    });
  });
}

const send = (message) => process.stdout.write(JSON.stringify({ jsonrpc: '2.0', ...message }) + '\n');

async function handle(request) {
  const { id, method, params } = request;

  switch (method) {
    case 'initialize':
      return send({
        id,
        result: {
          protocolVersion: params?.protocolVersion ?? '2025-06-18',
          capabilities: { tools: {} },
          serverInfo: { name: 'laravel-routes', version: '0.1.0' },
        },
      });
    case 'tools/list':
      return send({ id, result: { tools } });
    case 'tools/call':
      if (params?.name !== 'list_routes') {
        return send({ id, error: { code: -32602, message: `Unknown tool: ${params?.name}` } });
      }
      return send({ id, result: await listRoutes(params.arguments) });
    case 'ping':
      return send({ id, result: {} });
    default:
      if (id !== undefined) {
        send({ id, error: { code: -32601, message: `Method not found: ${method}` } });
      }
  }
}

createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  try {
    handle(JSON.parse(line));
  } catch {
    send({ id: null, error: { code: -32700, message: 'Parse error' } });
  }
});
