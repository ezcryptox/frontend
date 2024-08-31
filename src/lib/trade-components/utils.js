export const calculateTextHeight = (text, maxWidth) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = '16px Arial'; // Adjust font size and family as needed
    let height = 0;
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            line = words[i] + ' ';
            height += parseInt(context.font, 10); // Add line height
        } else {
            line = testLine;
        }
    }
    height += parseInt(context.font, 10); // Add height for the last line
    return height;
}
export const calculateTextWidth = (text, maxWidth) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = '16px Arial'; // Adjust font size and family as needed
    let width = 0;
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            line = words[i] + ' ';
            width = Math.max(width, context.measureText(line).width); // Update width for the current line
        } else {
            line = testLine;
        }
    }
    width = Math.max(width, context.measureText(line).width); // Update width for the last line
    return width;
}

export function findPos(obj) {
    var curleft = 0;
    var curtop = 0;
    const targetRect = obj.getBoundingClientRect();
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [curtop, curleft, curleft + targetWidth, curtop + targetHeight]; // Added right and bottom coordinates
    }
    else {
        const rect = obj.getBoundingClientRect();
        return [rect.top, rect.left, rect.right, rect.bottom]; // Added right and bottom coordinates
    }
}
 

export const vipLevels = {
    VIP0: {
        spotTradingVolume: 0,
        futuresTradingVolume: 0,
        totalBalance: 0,
        trxHtxBalance: 0,
        makerTaker: { maker: 0.002, taker: 0.002 },
        makerTakerTrxHtx: { maker: 0.0014, taker: 0.0014 },
        iconClass: '_6WngX'
    },
    VIP1: {
        spotTradingVolume: 10000,
        futuresTradingVolume: 100000,
        totalBalance: 2000,
        trxHtxBalance: 1000,
        makerTaker: { maker: 0.00115, taker: 0.00125 },
        makerTakerTrxHtx: { maker: 0.000805, taker: 0.000875 },
        iconClass: 'kWvLW'
    },
    VIP2: {
        spotTradingVolume: 80000,
        futuresTradingVolume: 2000000,
        totalBalance: 4000,
        trxHtxBalance: 2000,
        makerTaker: { maker: 0.00105, taker: 0.0012 },
        makerTakerTrxHtx: { maker: 0.000735, taker: 0.00084 },
        iconClass: 'cVCN3'
    },
    VIP3: {
        spotTradingVolume: 500000,
        futuresTradingVolume: 5000000,
        totalBalance: 10000,
        trxHtxBalance: 4000,
        makerTaker: { maker: 0.001, taker: 0.0012 },
        makerTakerTrxHtx: { maker: 0.0007, taker: 0.00084 },
        iconClass: '-jyfY'
    },
    VIP4: {
        spotTradingVolume: 1000000,
        futuresTradingVolume: 10000000,
        totalBalance: 200000,
        trxHtxBalance: 80000,
        makerTaker: { maker: 0.0009, taker: 0.0012 },
        makerTakerTrxHtx: { maker: 0.00063, taker: 0.00084 },
        iconClass: 'FeItC'
    },
    VIP5: {
        spotTradingVolume: 2000000,
        futuresTradingVolume: 20000000,
        totalBalance: 400000,
        trxHtxBalance: 120000,
        makerTaker: { maker: 0.0007, taker: 0.00115 },
        makerTakerTrxHtx: { maker: 0.00049, taker: 0.000805 },
        iconClass: 'ikuZe'
    },
    VIP6: {
        spotTradingVolume: 5000000,
        futuresTradingVolume: 50000000,
        totalBalance: 1000000,
        trxHtxBalance: 300000,
        makerTaker: { maker: 0.0006, taker: 0.00115 },
        makerTakerTrxHtx: { maker: 0.00042, taker: 0.000805 },
        iconClass: 'ohdC4'
    },
    VIP7: {
        spotTradingVolume: 10000000,
        futuresTradingVolume: 100000000,
        totalBalance: 8000000,
        trxHtxBalance: 2400000,
        makerTaker: { maker: 0.0005, taker: 0.0011 },
        makerTakerTrxHtx: { maker: 0.00035, taker: 0.00077 },
        iconClass: 'rrHf9'
    },
    VIP8: {
        spotTradingVolume: 20000000,
        futuresTradingVolume: 500000000,
        totalBalance: 16000000,
        trxHtxBalance: 4800000,
        makerTaker: { maker: 0.0, taker: 0.001 },
        makerTakerTrxHtx: { maker: 0.0, taker: 0.0007 },
        iconClass: '_7sEwi'
    },
    VIP9: {
        spotTradingVolume: 50000000,
        futuresTradingVolume: 1000000000,
        totalBalance: 30000000,
        trxHtxBalance: 9000000,
        makerTaker: { maker: -0.00005, taker: 0.001 },
        makerTakerTrxHtx: { maker: -0.00005, taker: 0.0007 },
        iconClass: '_8fU-2'
    }
};