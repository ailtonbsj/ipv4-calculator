let input = "200.10.150.1/25";

let [ip, cidr] = input.split("/");
let octets = ip.split(".");
let binaryMask = '1'.repeat(cidr).padEnd(32, '0');
let binaryOctet = octets.map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'));
let binaryIp = binaryOctet.join("");

function binaryToOctet(binInput) {
    return binInput.match(/.{1,8}/g).join(".");
}

function binaryToDecimalOctet(binInput) {
    return binInput.match(/.{1,8}/g)
        .map(octet => parseInt(octet, 2))
        .join(".");
}

function binaryToCIDR(binInput) {
    return binInput.replace(/[^1]/g, '').length;
}

function numberOfHosts(cidr) {
    return 2 ** (32 - cidr) - 2;
}

function getNetwork(binIp, binMask) {
    let ans = "";
    for (let i = 0; i < 32; i++) {
        ans += binMask[i] == '1' ? binIp[i] : '0';
    }
    return binaryToDecimalOctet(ans);
}

function getBroadcast(binIp, binMask) {
    let ans = "";
    for (let i = 0; i < 32; i++) {
        ans += binMask[i] == '1' ? binIp[i] : '1';
    }
    return binaryToDecimalOctet(ans);
}


console.log("IP:");
console.log(binaryToDecimalOctet(binaryIp) + '/' + binaryToCIDR(binaryMask));
console.log("MASK:");
console.log(binaryToDecimalOctet(binaryMask));
console.log("NUMBER OF HOSTS (WITHOUT NET AND BROAD):");
console.log(numberOfHosts(cidr));
console.log("NETWORK:");
console.log(getNetwork(binaryIp, binaryMask));
console.log("BROADCAST:");
console.log(getBroadcast(binaryIp, binaryMask));
console.log("IP AND MASK IN BINARY:");
console.log(binaryToOctet(binaryIp));
console.log(binaryToOctet(binaryMask));