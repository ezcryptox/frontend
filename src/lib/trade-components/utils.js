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
 