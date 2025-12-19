#!/usr/bin/env node

/**
 * Cross-platform port killer script
 * Works on Windows, macOS, and Linux
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const port = process.argv[2];

if (!port) {
  console.error('Usage: node killPort.js <port>');
  process.exit(1);
}

const portNum = parseInt(port, 10);
if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
  console.error(`Invalid port number: ${port}`);
  process.exit(1);
}

async function killPort(port) {
  const isWindows = process.platform === 'win32';
  
  try {
    let command;
    let pidExtractor;
    
    if (isWindows) {
      // Windows: Use netstat to find PIDs, then taskkill to kill them
      command = `netstat -ano | findstr :${port}`;
      pidExtractor = (output) => {
        const lines = output.trim().split('\n').filter(line => line.includes(`:${port}`));
        const pids = new Set();
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && /^\d+$/.test(pid)) {
            pids.add(pid);
          }
        });
        return Array.from(pids);
      };
    } else {
      // macOS/Linux: Use lsof to find PIDs, then kill to terminate them
      command = `lsof -ti :${port}`;
      pidExtractor = (output) => {
        const pids = output.trim().split('\n').filter(pid => /^\d+$/.test(pid));
        return pids;
      };
    }
    
    console.log(`Searching for processes listening on port ${port}...`);
    
    const { stdout } = await execAsync(command);
    const pids = pidExtractor(stdout);
    
    if (pids.length === 0) {
      console.log(`No process found listening on port ${port}`);
      return;
    }
    
    // Kill each process
    for (const pid of pids) {
      try {
        let killCommand;
        if (isWindows) {
          killCommand = `taskkill /PID ${pid} /F`;
        } else {
          killCommand = `kill -9 ${pid}`;
        }
        
        console.log(`Killing PID ${pid}...`);
        await execAsync(killCommand);
        console.log(`Killed PID ${pid}`);
      } catch (error) {
        console.warn(`Failed to kill PID ${pid}: ${error.message}`);
      }
    }
    
    console.log('Done.');
  } catch (error) {
    // If command fails, it might mean no process is using the port
    if (error.code === 1 || error.stderr?.includes('No such process') || error.stderr?.includes('not found')) {
      console.log(`No process found listening on port ${port}`);
      return;
    }
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

killPort(portNum).catch(error => {
  console.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});

