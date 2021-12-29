const outsideAreaShapes = ["border"];
const generateField = (targetElement, fields) => {
    targetElement.innerHTML = "";
    const wrapper = document.createElement("section");
    wrapper.classList.add("gamefield");

    const playable = document.createElement("section");
    playable.classList.add("playable-area");
    wrapper.appendChild(playable);
    
    const outside = document.createElement("section");
    outside.classList.add("outside-area");
    wrapper.appendChild(outside);
    
    targetElement.appendChild(wrapper);
    targetElement.classList.add("initialized");

    fields.filter(field => !outsideAreaShapes.includes(field.shape)).forEach(field => {
        playable.appendChild(generators[field.shape](field));
    });
    fields.filter(field => outsideAreaShapes.includes(field.shape)).forEach(field => {
        outside.appendChild(generators[field.shape](field));
    });
};
const generators = {};
generators["square"] = (field) => {
    const fieldElement = document.createElement("div");
    fieldElement.classList.add("field");
    fieldElement.classList.add("color-"+field.color);
    fieldElement.style.position = "absolute";
    fieldElement.style.top = `${field.coverage.y[0] * 100}%`;
    fieldElement.style.left = `${field.coverage.x[0] * 100}%`;
    fieldElement.style.width = `${(field.coverage.x[1] - field.coverage.x[0]) * 100}%`;
    fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
    return fieldElement;
};

generators["border"] = (field) => {
    const wrapperElement = document.createElement("div");
    const fieldElement = document.createElement("div");
    fieldElement.classList.add("field", "color-"+field.color);

    wrapperElement.appendChild(fieldElement);

    if (field.icon)
    {
        const fieldElement = document.createElement("div");
        fieldElement.classList.add("field", "color-"+field.color, "icon");
        fieldElement.style.display = "flex";
        fieldElement.style.justifyContent = "center";
        fieldElement.style.alignItems = "center";

        const iconElement = document.createElement("img");
        iconElement.src = `icon/${field.icon}.png`;
        iconElement.style.width = "35px";
        fieldElement.appendChild(iconElement);
        
        fieldElement.style.top = `auto`;
        fieldElement.style.left = `auto`;
        fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
        
        if ((field.coverage.y[0] == field.coverage.y[1]) && (field.coverage.y[0] == 0))
        {
            fieldElement.style.left = `${(field.coverage.x[0]) * 100}%`;
            fieldElement.style.top = "-10px";
            fieldElement.style.width = `${(field.coverage.x[1] - field.coverage.x[0]) * 100}%`;
            fieldElement.style.height = "50px";
            fieldElement.style.transform = "translateY(-100%)";
        }
        if ((field.coverage.y[0] == field.coverage.y[1]) && (field.coverage.y[0] == 1))
        {
            fieldElement.style.left = `${(field.coverage.x[0]) * 100}%`;
            fieldElement.style.bottom = "-60px";
            fieldElement.style.width = `${(field.coverage.x[1] - field.coverage.x[0]) * 100}%`;
            fieldElement.style.height = "50px";
        }
        if ((field.coverage.x[0] == field.coverage.x[1]) && (field.coverage.x[0] == 0))
        {
            fieldElement.style.left = "-10px";
            fieldElement.style.top = `${(field.coverage.y[0]) * 100}%`;
            fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
            fieldElement.style.width = "50px";
            fieldElement.style.transform = "translateX(-100%)";
        }
        if ((field.coverage.x[0] == field.coverage.x[1]) && (field.coverage.x[0] == 1))
        {
            fieldElement.style.right = "-60px";
            fieldElement.style.top = `${(field.coverage.y[0]) * 100}%`;
            fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
            fieldElement.style.width = "50px";
        }
        wrapperElement.appendChild(fieldElement);
    }

    fieldElement.style.top = `${field.coverage.y[0] * 100}%`;
    fieldElement.style.left = `${field.coverage.x[0] * 100}%`;
    fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
    
    if ((field.coverage.y[0] == field.coverage.y[1]) && (field.coverage.y[0] == 0))
    {
        fieldElement.style.left = `${(field.coverage.x[0]) * 100}%`;
        fieldElement.style.top = 0;
        fieldElement.style.width = `${(field.coverage.x[1] - field.coverage.x[0]) * 100}%`;
        fieldElement.style.height = "5px";
        fieldElement.style.transform = "translateY(-100%)";
    }
    if ((field.coverage.y[0] == field.coverage.y[1]) && (field.coverage.y[0] == 1))
    {
        fieldElement.style.left = `${(field.coverage.x[0]) * 100}%`;
        fieldElement.style.bottom = 0;
        fieldElement.style.width = `${(field.coverage.x[1] - field.coverage.x[0]) * 100}%`;
        fieldElement.style.height = "5px";
    }
    if ((field.coverage.x[0] == field.coverage.x[1]) && (field.coverage.x[0] == 0))
    {
        fieldElement.style.left = `${(field.coverage.y[0]) * 100}%`;
        fieldElement.style.top = 0;
        fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
        fieldElement.style.width = "5px";
        fieldElement.style.transform = "translateX(-100%)";
    }
    if ((field.coverage.x[0] == field.coverage.x[1]) && (field.coverage.x[0] == 1))
    {
        fieldElement.style.right = `${(field.coverage.y[0]) * 100}%`;
        fieldElement.style.top = 0;
        fieldElement.style.height = `${(field.coverage.y[1] - field.coverage.y[0]) * 100}%`;
        fieldElement.style.width = "5px";
    }
    return wrapperElement;
};

generators["triangle"] = (field) => {
	const lerp = ( a, b, alpha ) => {
		a[0] += ( b[0] - a[0] ) * alpha;
		a[1] += ( b[1] - a[1] ) * alpha;
		return a;
	}

    const fieldElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    fieldElement.style.position = `absolute`;
    fieldElement.style.left = `${field.start[0] * 100}%`;
    fieldElement.style.top = `${field.start[1] * 100}%`;
    fieldElement.style.width = `${field.size[0] * 100}%`;
    fieldElement.style.height = `${field.size[1] * 100}%`;
    fieldElement.style.transform = `translate(0%, 0)rotateZ(${field.rotation+45}deg)`;
    fieldElement.style.transformOrigin = "left top";
    fieldElement.style.overflow = "visible";
    fieldElement.setAttribute("height", field.size[0]*100);
    fieldElement.setAttribute("width", field.size[1]*100);
    fieldElement.setAttribute("viewBox", `1.25 1.25 ${field.size[0]*(100-1.25*2)} ${field.size[1]*(100-1.25*2)}`);
    const left = lerp([50, 50], [98.5, 1.25], field.angle/90);
    const right = lerp([50, 50], [1.25, 98.5], field.angle/90);
    fieldElement.innerHTML = `<polygon stroke-linejoin="round" points="${1.25*field.size[0]},${1.25*field.size[1]} ${left[0]*field.size[0]},${left[1]*field.size[1]} ${right[0]*field.size[0]},${right[1]*field.size[1]}" class="field color-${field.color}" style="stroke-width:2.5"></polygon>`;
    return fieldElement;
};

generators["circle"] = (field) => {
    const normalizedSize = field.size * 2;

    const fieldElement = document.createElement("div");
    fieldElement.classList.add("field");
    fieldElement.classList.add("color-"+field.color);
    fieldElement.style.position = `absolute`;
    fieldElement.style.left = `${field.anchor[0] * 100}%`;
    fieldElement.style.top = `${field.anchor[1] * 100}%`;
    fieldElement.style.width = `${normalizedSize * 100}%`;
    fieldElement.style.height = `${normalizedSize * 100}%`;
    fieldElement.style.transform = `translate(-50%, -50%)`;
    fieldElement.style.boxSizing = `border-box`;
    fieldElement.style.borderRadius = `100%`;
    return fieldElement;
};

generators["semicircle"] = (field) => {
    const normalizedSize = field.size * 2;
    const outlineSize = 5*normalizedSize;

    const fieldElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    fieldElement.style.position = `absolute`;
    fieldElement.style.left = `${field.anchor[0] * 100}%`;
    fieldElement.style.top = `${field.anchor[1] * 100}%`;
    fieldElement.style.width = `${normalizedSize*100}%`;
    fieldElement.style.height = `${normalizedSize*50}%`;
    fieldElement.style.transform = `translate(-50%, 0)rotateZ(${field.rotation}deg)`;
    fieldElement.style.transformOrigin = "center top";
    fieldElement.setAttribute("height", normalizedSize*((100-outlineSize)/2));
    fieldElement.setAttribute("width", normalizedSize*(100-outlineSize));
    fieldElement.setAttribute("viewBox", `0 0 ${normalizedSize*100} ${normalizedSize*100}`);
    fieldElement.innerHTML = `<circle cx="${normalizedSize*50}" cy="0" r="${normalizedSize*(100-(outlineSize/2))}%" stroke-linejoin="round" class="field color-${field.color}" style="stroke-width:${outlineSize}"></polygon>`;
    return fieldElement;
};

generators["donut"] = (field) => {
    const lerp = ( a, b, alpha ) => {
        return a + ( b - a ) * alpha;
    };
    const normalizedSize = field.size;
    const outlineSize = 2.5;

    const widthSize = field.width * 100;

    const fieldElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    fieldElement.style.position = `absolute`;
    fieldElement.style.left = `${field.anchor[0] * 100}%`;
    fieldElement.style.top = `${field.anchor[1] * 100}%`;
    fieldElement.style.width = `100%`;
    fieldElement.style.height = `100%`;
    fieldElement.style.transform = `translate(-50%, -50%)`;
    fieldElement.style.transformOrigin = "center center";
    fieldElement.setAttribute("height", normalizedSize*((100-outlineSize)/2));
    fieldElement.setAttribute("width", normalizedSize*(100-outlineSize));
    fieldElement.setAttribute("viewBox", `0 0 100 100`);
    fieldElement.innerHTML = 
      `<circle cx="50" cy="50" r="${(50*normalizedSize)-widthSize/2}%" stroke-linejoin="round" class="field fill-color-${field.color}" style="stroke-width:${widthSize}"></circle>` // fill
    + `<circle cx="50" cy="50" r="${(50*normalizedSize)-outlineSize/2}%" stroke-linejoin="round" class="field border-color-${field.color}" style="stroke-width:${outlineSize}"></circle>` // outer outline
    + `<circle cx="50" cy="50" r="${(50*normalizedSize)-widthSize+outlineSize/2}%" stroke-linejoin="round" class="field border-color-${field.color}" style="stroke-width:${outlineSize}"></circle>` // outer outline
    + `<circle cx="50" cy="50" r="${(50*normalizedSize)-widthSize}%" stroke-linejoin="round" class="field border-color-${field.color}" style="stroke-width:${outlineSize}" data-ignoreClick></circle>` // ignore area
    return fieldElement;
};