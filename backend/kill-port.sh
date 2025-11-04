#!/bin/bash
# Kill process on port 5000

echo "Finding process on port 5000..."
PID=$(lsof -ti:5000)

if [ -z "$PID" ]; then
  echo "No process found on port 5000"
else
  echo "Killing process $PID on port 5000..."
  kill -9 $PID
  echo "Process killed successfully!"
fi

echo "Port 5000 is now free"
