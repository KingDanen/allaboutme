// Logika untuk Mobile Menu (tetap sama)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- Logika Kalkulator Bangun Datar ---

const shapeSelector = document.getElementById('shape-selector');
const inputsContainer = document.getElementById('inputs-container');
const rumusDisplay = document.getElementById('rumus-display');
const resultDisplay = document.getElementById('result-display');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

// Objek yang menyimpan data untuk setiap bangun datar
const shapes = {
    'persegi': {
        rumus: 'Luas = Sisi x Sisi',
        inputs: ['Sisi']
    },
    'persegi-panjang': {
        rumus: 'Luas = Panjang x Lebar',
        inputs: ['Panjang', 'Lebar']
    },
    'segitiga': {
        rumus: 'Luas = 0.5 x Alas x Tinggi',
        inputs: ['Alas', 'Tinggi']
    },
    'lingkaran': {
        rumus: 'Luas = &pi; x Jari-jari&sup2;',
        inputs: ['Jari-jari']
    }
};

// Fungsi untuk memperbarui input dan rumus saat pilihan berubah
function updateCalculator() {
    const selectedShape = shapeSelector.value;
    inputsContainer.innerHTML = '';
    resultDisplay.textContent = '0';

    if (selectedShape) {
        const shapeData = shapes[selectedShape];
        rumusDisplay.innerHTML = `Rumus: ${shapeData.rumus}`;

        shapeData.inputs.forEach(inputName => {
            const inputGroup = document.createElement('div');
            inputGroup.innerHTML = `
                <label for="${inputName.toLowerCase()}" class="block text-neutral-400 font-semibold mb-2">${inputName}</label>
                <input type="number" id="${inputName.toLowerCase()}" class="w-full px-4 py-3 rounded-lg bg-stone-900 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-stone-400">
            `;
            inputsContainer.appendChild(inputGroup);
        });
    } else {
        rumusDisplay.innerHTML = 'Pilih bangun datar di bawah ini.';
    }
}

// Fungsi untuk menghitung hasil
function calculateResult() {
    const selectedShape = shapeSelector.value;
    let result = 0;

    if (selectedShape === 'persegi') {
        const sisi = parseFloat(document.getElementById('sisi').value);
        result = sisi * sisi;
    } else if (selectedShape === 'persegi-panjang') {
        const panjang = parseFloat(document.getElementById('panjang').value);
        const lebar = parseFloat(document.getElementById('lebar').value);
        result = panjang * lebar;
    } else if (selectedShape === 'segitiga') {
        const alas = parseFloat(document.getElementById('alas').value);
        const tinggi = parseFloat(document.getElementById('tinggi').value);
        result = 0.5 * alas * tinggi;
    } else if (selectedShape === 'lingkaran') {
        const jariJari = parseFloat(document.getElementById('jari-jari').value);
        result = Math.PI * jariJari * jariJari;
    }

    if (!isNaN(result)) {
        resultDisplay.textContent = result.toFixed(2); // Membulatkan hasil
    } else {
        resultDisplay.textContent = 'Invalid Input';
    }
}

// Fungsi untuk mereset kalkulator
function resetCalculator() {
    shapeSelector.value = '';
    updateCalculator();
    resultDisplay.textContent = '0';
}

// Event Listeners
shapeSelector.addEventListener('change', updateCalculator);
calculateBtn.addEventListener('click', calculateResult);
resetBtn.addEventListener('click', resetCalculator);

// Inisialisasi tampilan awal
updateCalculator();
