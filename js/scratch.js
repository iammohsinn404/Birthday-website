// ================================
// SCRATCH CARD
// ================================

const scratchCanvas =
    document.getElementById("scratchCanvas");

const scratchCard =
    document.getElementById("scratchCard");

if (scratchCanvas && scratchCard) {

    const ctx =
        scratchCanvas.getContext("2d");

    let scratching = false;

    // Setup canvas
    function setupScratchCanvas() {

        const rect =
            scratchCard.getBoundingClientRect();

        const dpr =
            window.devicePixelRatio || 1;

        scratchCanvas.width =
            rect.width * dpr;

        scratchCanvas.height =
            rect.height * dpr;

        scratchCanvas.style.width =
            rect.width + "px";

        scratchCanvas.style.height =
            rect.height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        // Scratch cover
        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                rect.width,
                rect.height
            );

        gradient.addColorStop(
            0,
            "#d94f75"
        );

        gradient.addColorStop(
            0.5,
            "#ef7895"
        );

        gradient.addColorStop(
            1,
            "#d94f75"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            rect.width,
            rect.height
        );

        // Text
        ctx.fillStyle =
            "rgba(255,255,255,0.95)";

        ctx.font =
            "bold 22px Arial";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            "✨ Scratch Me ✨",
            rect.width / 2,
            rect.height / 2
        );
    }

    // Scratch
    function scratch(x, y) {

        const rect =
            scratchCanvas.getBoundingClientRect();

        const canvasX =
            x - rect.left;

        const canvasY =
            y - rect.top;

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.beginPath();

        ctx.arc(
            canvasX,
            canvasY,
            28,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    // Mouse
    scratchCanvas.addEventListener(
        "mousedown",
        () => {
            scratching = true;
        }
    );

    scratchCanvas.addEventListener(
        "mouseup",
        () => {
            scratching = false;
        }
    );

    scratchCanvas.addEventListener(
        "mouseleave",
        () => {
            scratching = false;
        }
    );

    scratchCanvas.addEventListener(
        "mousemove",
        (event) => {

            if (!scratching) return;

            scratch(
                event.clientX,
                event.clientY
            );
        }
    );

    // Touch
    scratchCanvas.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            scratching = true;

            const touch =
                event.touches[0];

            scratch(
                touch.clientX,
                touch.clientY
            );
        },
        { passive: false }
    );

    scratchCanvas.addEventListener(
        "touchmove",
        (event) => {

            event.preventDefault();

            if (!scratching) return;

            const touch =
                event.touches[0];

            scratch(
                touch.clientX,
                touch.clientY
            );
        },
        { passive: false }
    );

    scratchCanvas.addEventListener(
        "touchend",
        () => {
            scratching = false;
        }
    );

    // Resize
    window.addEventListener(
        "resize",
        () => {
            setupScratchCanvas();
        }
    );

    // Start
    setupScratchCanvas();
}