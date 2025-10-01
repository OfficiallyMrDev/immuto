function celebrateSuccess() {
    var end = Date.now() + (5 * 1000);
    var colors = ['#00ff88', '#ffffff', '#203a43'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

window.onload = celebrateSuccess;