let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasContext = imageCanvas.getContext("2d");
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit, value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters();
  });
  return div;
}

function createFilters() {
  Object.keys(filters).forEach((keys) => {
    const filterElement = createFilterElement(
      keys,
      filters[keys].unit,
      filters[keys].value,
      filters[keys].min,
      filters[keys].max
    );
    filtersContainer.appendChild(filterElement);
  });
}

createFilters();

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";
  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasContext.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  if (!image) return;

  canvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasContext.filter = `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.saturation.value}%)
    hue-rotate(${filters.hueRotation.value}deg)
    blur(${filters.blur.value}px)
    grayscale(${filters.grayscale.value}%)
    sepia(${filters.sepia.value}%)
    opacity(${filters.opacity.value}%)
    invert(${filters.invert.value}%)
  `.trim();

  canvasContext.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();

  filtersContainer.innerHTML = "";
  createFilters();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  drama: {
    brightness: 95,
    contrast: 140,
    saturation: 130,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 90,
    saturation: 80,
    hueRotation: 10,
    blur: 0,
    grayscale: 10,
    sepia: 35,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 110,
    contrast: 85,
    saturation: 70,
    hueRotation: 15,
    blur: 1,
    grayscale: 20,
    sepia: 50,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 110,
    saturation: 125,
    hueRotation: -10,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 90,
    hueRotation: 15,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  blackAndWhite: {
    brightness: 100,
    contrast: 130,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturation: 85,
    hueRotation: 0,
    blur: 0,
    grayscale: 5,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },
  cinematic: {
    brightness: 95,
    contrast: 135,
    saturation: 110,
    hueRotation: -5,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  moody: {
    brightness: 85,
    contrast: 150,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  pastel: {
    brightness: 115,
    contrast: 85,
    saturation: 120,
    hueRotation: 5,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  matte: {
    brightness: 105,
    contrast: 75,
    saturation: 95,
    hueRotation: 0,
    blur: 0,
    grayscale: 5,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  noir: {
    brightness: 90,
    contrast: 160,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  sepiaTone: {
    brightness: 105,
    contrast: 95,
    saturation: 85,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 70,
    opacity: 100,
    invert: 0,
  },

  washed: {
    brightness: 120,
    contrast: 70,
    saturation: 80,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vibrant: {
    brightness: 105,
    contrast: 125,
    saturation: 150,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  coldNight: {
    brightness: 90,
    contrast: 120,
    saturation: 85,
    hueRotation: 20,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  dreamy: {
    brightness: 110,
    contrast: 90,
    saturation: 115,
    hueRotation: 0,
    blur: 2,
    grayscale: 0,
    sepia: 10,
    opacity: 95,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetBtn = document.createElement("button");
  presetBtn.classList.add("btn");
  presetBtn.innerText = presetName;
  presetsContainer.appendChild(presetBtn);

  presetBtn.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
  });
});
