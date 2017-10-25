// https://stackoverflow.com/questions/15587424/canvas-click-event-on-line
class DrawingHelper {
    defineLineAsRect (x1, y1, x2, y2, lineWidth){
        var dx=x2-x1; // deltaX used in length and angle calculations 
        var dy=y2-y1; // deltaY used in length and angle calculations
        var lineLength= Math.sqrt(dx*dx+dy*dy);
        var lineRadianAngle=Math.atan2(dy,dx);

        return({
            translateX:x1,
            translateY:y1,
            rotation:lineRadianAngle,
            rectX:0,
            rectY:-lineWidth/2,
            rectWidth:lineLength,
            rectHeight:lineWidth
        });
    }

    drawLineAsRect (ctx, lineAsRect){
        var r=lineAsRect;
        ctx.save();
        ctx.beginPath();
        ctx.translate(r.translateX,r.translateY);
        ctx.rotate(r.rotation);
        ctx.rect(r.rectX,r.rectY,r.rectWidth,r.rectHeight);
        ctx.translate(-r.translateX,-r.translateY);
        ctx.rotate(-r.rotation);
        ctx.strokeStyle="rgba(0, 0, 0, 0)";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

}