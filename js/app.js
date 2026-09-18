// ==========================================
// 1. CONFIGURACIÓN DEL EVENTO & VARIABLES
// ==========================================
const configuracionEvento = {
    fecha: "Lunes 21 de septiembre",
    año: "2026",
    hora: "7:00 PM",
    horaDetalle: "7:00 de la noche",
    lugar: "Mi residencia",
    lat: 10.410916338642544,
    lng: -75.45787621584036,
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=10.410916338642544,-75.45787621584036",
    streetViewUrl: "https://www.google.com/maps/@10.4109318,-75.4578974,3a,75y,57.83h,84.66t/data=!3m7!1e1!3m5!1sMq3YuDWlXfq2pm5djMQsQw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D5.341556406466125%26panoid%3DMq3YuDWlXfq2pm5djMQsQw%26yaw%3D57.83259701595769!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
    rutaMusica: "assets/musica.mp3"
};

const ubicacion = {
    lat: 10.410916338642544,
    lng: -75.45787621584036,
    mapsUrl: configuracionEvento.mapsUrl
};

// ==========================================
// 2. LISTA EXACTA DE INVITADOS
// ==========================================
/**
 * tipo: 'femenino' -> "Estás cordialmente invitada"
 * tipo: 'masculino' -> "Estás cordialmente invitado"
 * tipo: 'grupal' -> "Están cordialmente invitados" / "Están cordialmente invitadas"
 */
const listaInvitados = [
    { nombre: "Delvis", displayName: "Delvis", tipo: "femenino" },
    { nombre: "Yareidys", displayName: "Yareidys", tipo: "femenino" },
    { nombre: "Yolis", displayName: "Yolis", tipo: "femenino" },
    { nombre: "Sandra", displayName: "Sandra", tipo: "femenino" },
    { nombre: "Maria Perez", displayName: "María Pérez", tipo: "femenino" },
    { nombre: "Lilieth", displayName: "Lilieth", tipo: "femenino" },
    { nombre: "Hija del señor Jose", displayName: "Hija del señor José", tipo: "femenino" },
    { nombre: "Lisbeth", displayName: "Lisbeth", tipo: "femenino" },
    { nombre: "Mariela", displayName: "Mariela", tipo: "femenino" },
    { nombre: "Emmis", displayName: "Emmis", tipo: "femenino" },
    { nombre: "Nuris Arrieta", displayName: "Nuris Arrieta", tipo: "femenino" },
    { nombre: "Nevys Jhojanis", displayName: "Nevys Jhojanis", tipo: "femenino" },
    { nombre: "Tia Norelys", displayName: "Tía Norelys", tipo: "femenino" },
    { nombre: "Yurenis y Michel", displayName: "Yurenis y Michel", tipo: "grupal-femenino" },
    { nombre: "Jheiner y Familia", displayName: "Jheiner y Familia", tipo: "grupal-mixto" },
    { nombre: "Adalner", displayName: "Adalner", tipo: "masculino" },
    { nombre: "Juan Carlos", displayName: "Juan Carlos", tipo: "masculino" },
    { nombre: "Misael", displayName: "Misael", tipo: "masculino" },
    { nombre: "Yennys Rico", displayName: "Yennys Rico", tipo: "femenino" },
    { nombre: "Jenny Rico", displayName: "Jenny Rico", tipo: "femenino" },
    { nombre: "Kevin Cardenas", displayName: "Kevin Cárdenas", tipo: "masculino" },
    { nombre: "Darlinson Diaz Martinez", displayName: "Darlinson Díaz Martínez", tipo: "masculino" },
    { nombre: "Nayaring Fontalvo Martinez", displayName: "Nayaring Fontalvo Martínez", tipo: "femenino" },
    { nombre: "Luis Alfonso (Tio)", displayName: "Luis Alfonso (Tío)", tipo: "masculino" },
    { nombre: "Jeremias", displayName: "Jeremías", tipo: "masculino" },
    { nombre: "Onel Rico", displayName: "Onel Rico", tipo: "masculino" },
    { nombre: "Mayra y Familia", displayName: "Mayra y familia", tipo: "grupal" },
    { nombre: "Yesica", displayName: "Yésica", tipo: "femenino" },
    { nombre: "Ingrid", displayName: "Ingrid", tipo: "femenino" },
    { nombre: "Ana", displayName: "Ana", tipo: "femenino" },
    { nombre: "Rosa", displayName: "Rosa", tipo: "femenino" },
    { nombre: "Alejandro", displayName: "Alejandro", tipo: "masculino" },
    { nombre: "Deiris", displayName: "Deiris", tipo: "femenino" },
    { nombre: "Abi", displayName: "Abi", tipo: "femenino" },
    { nombre: "Mañe y Familia", displayName: "Mañe y familia", tipo: "grupal" },
    { nombre: "Marledis y Familia", displayName: "Marledis y familia", tipo: "grupal" },
    { nombre: "Marelbis Ramos", displayName: "Marelbis Ramos", tipo: "femenino" },
    { nombre: "Orlando Ramos", displayName: "Orlando Ramos", tipo: "masculino" },
    { nombre: "Consuelo", displayName: "Consuelo", tipo: "femenino" },
    { nombre: "Kevin Yesith", displayName: "Kevin Yesith", tipo: "masculino" }
];

// ==========================================
// 3. NORMALIZACIÓN Y BÚSQUEDA INTELIGENTE
// ==========================================

/**
 * Normaliza cadenas removiendo tildes, signos, mayúsculas y espacios extra.
 */
function normalizarTexto(texto) {
    if (!texto) return "";
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos/diacríticos
        .replace(/[^\w\s]/gi, " ")       // Quitar puntuación
        .replace(/\s+/g, " ")            // Múltiples espacios a 1
        .trim();
}

/**
 * Distancia de Levenshtein para medir similitud tipográfica
 */
function distanciaLevenshtein(a, b) {
    const matrix = [];
    const aLen = a.length;
    const bLen = b.length;

    for (let i = 0; i <= bLen; i++) matrix[i] = [i];
    for (let j = 0; j <= aLen; j++) matrix[0][j] = j;

    for (let i = 1; i <= bLen; i++) {
        for (let j = 1; j <= aLen; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // sustitución
                    matrix[i][j - 1] + 1,     // inserción
                    matrix[i - 1][j] + 1      // eliminación
                );
            }
        }
    }
    return matrix[bLen][aLen];
}

/**
 * Busca al invitado evaluando:
 * 1. Coincidencia exacta normalizada
 * 2. Coincidencia por palabras clave / alias (ej. "Norelys" -> "Tia Norelys", "Luis Alfonso" -> "Luis Alfonso (Tio)")
 * 3. Tolerancia de Levenshtein (ej. "Yareidis" -> "Yareidys", "Nevis" -> "Nevys")
 */
function buscarInvitado(nombreIngresado) {
    const inputNorm = normalizarTexto(nombreIngresado);
    if (!inputNorm || inputNorm.length < 2) return null;

    // 1. Coincidencia exacta
    for (const inv of listaInvitados) {
        const invNorm = normalizarTexto(inv.nombre);
        if (invNorm === inputNorm) {
            return inv;
        }
    }

    // 2. Coincidencia de subcadena o tokens importantes
    const tokensInput = inputNorm.split(" ").filter(t => t.length > 2);
    for (const inv of listaInvitados) {
        const invNorm = normalizarTexto(inv.nombre);
        const tokensInv = invNorm.split(" ").filter(t => t.length > 2);

        // Si el usuario escribió un nombre compuesto y coincide completamente
        if (invNorm.includes(inputNorm) || inputNorm.includes(invNorm)) {
            // Prevenir falsos positivos comunes como "Maria" vs "Mariela"
            if (Math.abs(invNorm.length - inputNorm.length) <= 6) {
                return inv;
            }
        }

        // Si coincide la palabra principal relevante (ej: "Mishell" en "Yurenis y Mishell", "Jhojanis" en "Nevys Jhojanis")
        for (const token of tokensInput) {
            if (tokensInv.includes(token) && token.length >= 4) {
                return inv;
            }
        }
    }

    // 3. Similitud con tolerancia Levenshtein (controlada)
    let mejorMatch = null;
    let menorDistancia = Infinity;

    for (const inv of listaInvitados) {
        const invNorm = normalizarTexto(inv.nombre);
        const dist = distanciaLevenshtein(inputNorm, invNorm);

        // Umbral según longitud
        const maxTol = invNorm.length <= 5 ? 1 : 2;
        if (dist <= maxTol && dist < menorDistancia) {
            menorDistancia = dist;
            mejorMatch = inv;
        }

        // También comparar contra primer nombre individual del invitado
        const primerNombre = invNorm.split(" ")[0];
        if (primerNombre.length >= 4) {
            const distPrimer = distanciaLevenshtein(inputNorm, primerNombre);
            if (distPrimer <= 1 && distPrimer < menorDistancia) {
                menorDistancia = distPrimer;
                mejorMatch = inv;
            }
        }
    }

    return mejorMatch;
}

// ==========================================
// 4. CONTROL DE AUDIO
// ==========================================
const audioEl = document.getElementById("bg-audio");
const musicBtn = document.getElementById("music-btn");
let isAudioPlaying = false;

function toggleMusica() {
    if (!audioEl) return;

    if (isAudioPlaying) {
        audioEl.pause();
        isAudioPlaying = false;
        musicBtn.classList.remove("playing");
    } else {
        audioEl.play().then(() => {
            isAudioPlaying = true;
            musicBtn.classList.add("playing");
        }).catch(() => {
            // Manejar bloqueo de autoplay si ocurre
            isAudioPlaying = false;
            musicBtn.classList.remove("playing");
        });
    }
}

if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusica);
}

// ==========================================
// 5. EFECTOS PARTICULAS FLOTANTES Y CONFETI
// ==========================================

// Canvas de ambiente con corazones sutiles, partículas rojas y destellos dorados
const canvas = document.getElementById("ambient-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let ambientParticles = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class AmbientParticle {
    constructor() {
        this.reset();
    }
    reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1.2;
        this.speedY = Math.random() * 0.45 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        // Tipo: corazón pequeño, destello dorado o partícula roja suave
        const rand = Math.random();
        if (rand < 0.25) {
            this.type = "heart";
        } else if (rand < 0.6) {
            this.type = "gold";
        } else {
            this.type = "red";
        }
        this.pulse = Math.random() * 0.02 + 0.01;
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity += Math.sin(Date.now() * this.pulse) * 0.006;

        if (this.y < -15 || this.x < -15 || this.x > (canvas ? canvas.width + 15 : 1000)) {
            this.reset();
            this.y = canvas ? canvas.height + 10 : 800;
        }
    }
    draw() {
        if (!ctx) return;
        ctx.save();
        const currentOpacity = Math.max(0.12, Math.min(0.75, this.opacity));

        if (this.type === "heart") {
            ctx.font = `${this.size * 2.8}px serif`;
            ctx.fillStyle = `rgba(230, 57, 70, ${currentOpacity})`;
            ctx.fillText("❤", this.x, this.y);
        } else if (this.type === "gold") {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240, 213, 126, ${currentOpacity})`;
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(217, 4, 41, ${currentOpacity})`;
            ctx.fill();
        }
        ctx.restore();
    }
}

function initAmbient() {
    if (!canvas) return;
    ambientParticles = [];
    const count = window.innerWidth < 600 ? 25 : 45;
    for (let i = 0; i < count; i++) {
        ambientParticles.push(new AmbientParticle());
    }
}

function animateAmbient() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of ambientParticles) {
        p.update();
        p.draw();
    }
    requestAnimationFrame(animateAmbient);
}

initAmbient();
animateAmbient();

/**
 * Explosión de confeti y corazones de celebración
 * Rojo intenso, Rojo clásico, Rosa suave, Blanco y Dorado
 */
function lanzarConfetiCelebracion() {
    const total = 55;
    const colores = ["#d90429", "#c1121f", "#e63946", "#fce8ea", "#ffffff", "#c9a227", "#f0d57e"];
    const formas = ["circle", "rect", "heart"];

    for (let i = 0; i < total; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";

        const forma = formas[Math.floor(Math.random() * formas.length)];
        const color = colores[Math.floor(Math.random() * colores.length)];
        const size = Math.random() * 8 + 6;

        piece.style.backgroundColor = forma === "heart" ? "transparent" : color;
        piece.style.width = `${size}px`;
        piece.style.height = `${size}px`;
        if (forma === "circle") piece.style.borderRadius = "50%";
        if (forma === "heart") {
            piece.innerHTML = `<span style="color:${color}; font-size:${size * 1.6}px;">❤</span>`;
        }

        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.top = `-20px`;

        document.body.appendChild(piece);

        const duration = Math.random() * 2200 + 2000;
        const drift = (Math.random() - 0.5) * 220;
        const rotate = Math.random() * 720 - 360;

        piece.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${drift}px, ${window.innerHeight + 50}px) rotate(${rotate}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }).onfinish = () => piece.remove();
    }
}

// ==========================================
// 6. INTERACCIÓN DE LA INTERFAZ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Rellenar información del evento desde la configuración
    const elFecha = document.getElementById("event-date");
    const elHora = document.getElementById("event-time");
    const elLugar = document.getElementById("event-location");
    const elDireccion = document.getElementById("event-address");
    const elMaps = document.getElementById("maps-link");

    if (elFecha) elFecha.textContent = configuracionEvento.fecha;
    if (elHora) elHora.textContent = configuracionEvento.hora;
    if (elLugar) elLugar.textContent = configuracionEvento.lugar;
    if (elDireccion) elDireccion.textContent = configuracionEvento.direccion;
    if (elMaps) elMaps.href = configuracionEvento.enlaceMaps;

    // Transición de pantalla inicial a carta principal
    const btnOpen = document.getElementById("btn-open-invitation");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");

    if (btnOpen) {
        btnOpen.addEventListener("click", () => {
            // Intentar iniciar audio suavemente tras interacción del usuario si aún no está sonando
            if (audioEl && !isAudioPlaying) {
                audioEl.play().then(() => {
                    isAudioPlaying = true;
                    if (musicBtn) musicBtn.classList.add("playing");
                }).catch(() => { });
            }

            welcomeScreen.classList.add("fade-out");
            setTimeout(() => {
                welcomeScreen.style.display = "none";
                mainContent.classList.remove("hidden");

                // Scroll suave hacia la carta
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 750);
        });
    }

    // Manejo de búsqueda de invitados
    const searchForm = document.getElementById("search-form");
    const guestInput = document.getElementById("guest-name-input");
    const btnClear = document.getElementById("btn-clear-search");
    const searchError = document.getElementById("search-error");
    const guestResultSection = document.getElementById("guest-result");
    const guestDisplayName = document.getElementById("guest-display-name");
    const guestGreeting = document.getElementById("guest-greeting");

    // Limpiar input
    if (guestInput && btnClear) {
        guestInput.addEventListener("input", () => {
            if (guestInput.value.length > 0) {
                btnClear.classList.remove("hidden");
            } else {
                btnClear.classList.add("hidden");
            }
            if (searchError) searchError.classList.add("hidden");
        });

        btnClear.addEventListener("click", () => {
            guestInput.value = "";
            btnClear.classList.add("hidden");
            guestInput.focus();
            if (searchError) searchError.classList.add("hidden");
        });
    }

    function procesarBusqueda() {
        const query = guestInput ? guestInput.value : "";
        if (!query.trim()) {
            if (guestInput) guestInput.focus();
            return;
        }

        const invitado = buscarInvitado(query);

        if (invitado) {
            // Ocultar mensaje de error
            if (searchError) searchError.classList.add("hidden");

            // Configurar mensaje según tipo de invitado
            if (guestDisplayName) guestDisplayName.textContent = invitado.displayName;

            if (guestGreeting) {
                if (invitado.tipo === "femenino") {
                    guestGreeting.textContent = "Estás cordialmente invitada";
                } else if (invitado.tipo === "masculino") {
                    guestGreeting.textContent = "Estás cordialmente invitado";
                } else if (invitado.tipo === "grupal-femenino") {
                    guestGreeting.textContent = "Están cordialmente invitadas";
                } else {
                    // grupal o grupal-mixto
                    guestGreeting.textContent = "Están cordialmente invitados";
                }
            }

            // Mostrar resultado con animación
            guestResultSection.classList.remove("hidden");

            // Lanzar confeti festivo
            lanzarConfetiCelebracion();

            // Desplazar vista a la tarjeta personalizada
            setTimeout(() => {
                guestResultSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 250);

        } else {
            // Mostrar mensaje amable de no encontrado
            if (searchError) searchError.classList.remove("hidden");
            if (guestResultSection) guestResultSection.classList.add("hidden");
        }
    }

    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            procesarBusqueda();
        });
    }
});
