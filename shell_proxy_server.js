const net = require('net');
const { spawn } = require('child_process');

const HOST = '0.0.0.0';
const PORT = 9999;

const server = net.createServer();

server.listen(PORT, HOST);

server.on('connection', sock => {
    sock.on('data', data => {
        try {
            const cmd = JSON.parse(data);
            const exec = spawn(cmd.command[0], cmd.command.slice(1), cmd.options);

            let out = null;
            exec.stdout.on('data', data => {
                if (out === null) {
                    out = '';
                }

                out += data;
            });

            let err = null;
            exec.stderr.on('data', data => {
                if (err === null) {
                    err = '';
                }

                err += data;
            });

            exec.on('close', code => {
                let result = {err, out, code};
                sock.write(JSON.stringify(result));
            });
        } catch (error) {
            console.log(error);
        }
    });
});

console.log(`[SHELL_PROXY] ${HOST}:${PORT}`);
