import * as onFinished from 'on-finished';

function getIp(req): String {
    let ip: String;
    // Get the ip from the headers
    if (req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) {
        let first = req.headers['cf-connecting-ip'].split(', ');
        ip = first[0];
    } else {
        ip = req.headers['x-forwarded-for']
            || req.headers['x-real-ip']
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;
    }
    return (ip);
}

// Log request informations
// Format: {ClientIP} {Request Method} {Request URL} {Response code} {Treatment duration}
export default function (req: any, res, next) {
    // get the start time of the request
    let startTime = process.hrtime();
    // get the request url
    let url = req.url;
    // wait for the response to be sent
    onFinished(res, (err) => {
        // on error, do nothing
        if (err) {
            return;
        }
        let endTime = process.hrtime();
        let ip = getIp(req);

        // calculate exec time
        let duration = (endTime[0] - startTime[0]) * 1e3 +
            (endTime[1] - startTime[1]) * 1e-6;
        console.log(ip, req.method, url, String(res.statusCode), duration.toFixed(3));
    });
    next();
}