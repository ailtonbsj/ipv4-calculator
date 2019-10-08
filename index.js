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

function getRange(binIp, binMask) {
    let compMask = binMask.replace(/[^1]/g, 'X').replace(/1/g, '0').replace(/X/g, '1');
    let lastFrag = (parseInt(compMask, 2) - 1).toString(2).padStart(32, '0');
    let ans = "";
    for (let i = 0; i < 32; i++) {
        ans += binMask[i] == '1' ? binIp[i] : lastFrag[i];
    }
    let range1 = ans;
    ans = "";
    let firstFrag = '1'.padStart(32, '0');
    for (let i = 0; i < 32; i++) {
        ans += binMask[i] == '1' ? binIp[i] : firstFrag[i];
    }
    let range0 = ans;
    return [binaryToDecimalOctet(range0), binaryToDecimalOctet(range1)];
}

function octectToBinary(octets) {
    octets = octets.split(".");
    let binaryOctet = octets.map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'));
    return binaryOctet.join("");
}

function onpressed() {
    let ip = document.querySelector("#ip").value;
    let cidr = document.querySelector("#cidr").value;
    let mask = document.querySelector("#mask");
    let bmask = document.querySelector("#bmask");
    let net = document.querySelector("#net");
    let bnet = document.querySelector("#bnet");
    let broad = document.querySelector("#broad");
    let bbroad = document.querySelector("#bbroad");
    let initial = document.querySelector("#initial");
    let binitial = document.querySelector("#binitial");
    let final = document.querySelector("#final");
    let bfinal = document.querySelector("#bfinal");
    let ipc = document.querySelector("#ipcomum");
    let bipc = document.querySelector("#bipcomum");
    let numhost = document.querySelector("#numhost");

    let binaryMask = '1'.repeat(cidr).padEnd(32, '0');
    let binaryIp = octectToBinary(ip);
    let range = getRange(binaryIp, binaryMask);

    mask.value = binaryToDecimalOctet(binaryMask);
    bmask.value = binaryToOctet(binaryMask);
    net.value = getNetwork(binaryIp, binaryMask);
    bnet.value = binaryToOctet(octectToBinary(getNetwork(binaryIp, binaryMask)));
    broad.value = getBroadcast(binaryIp, binaryMask);
    bbroad.value = binaryToOctet(octectToBinary(getBroadcast(binaryIp, binaryMask)));
    initial.value = range[0];
    final.value = range[1];
    binitial.value = binaryToOctet(octectToBinary(range[0]));
    bfinal.value = binaryToOctet(octectToBinary(range[1]));
    ipc.value = ip;
    bipc.value = binaryToOctet(binaryIp);
    numhost.value = numberOfHosts(cidr);
}

function main() {
    document.querySelector("#ip").onkeyup = onpressed;
    document.querySelector("#cidr").onkeyup = onpressed;
}
window.onload = main;