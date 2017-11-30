const process = require('process');
const exec = require('child_process').exec;
const net = require('net');

const HOST = '0.0.0.0';
const PORT = 9999;

const client = new net.Socket();
if (process.argv.length <= 2) {
    console.error('error');
    process.exit(-1);
}

client.connect(PORT, HOST, () => {
    cmd = {
        command: process.argv.slice(2),
        options: {
            cwd: process.cwd()
        },
    };

    client.write(JSON.stringify(cmd));
});

client.on('data', data => {
    let result = JSON.parse(data);

    result.err !== null && process.stderr.write(result.err);
    result.out !== null && process.stdout.write(result.out);

    client.destroy();

    process.exit(result.code);
});
