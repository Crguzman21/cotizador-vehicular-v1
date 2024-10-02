console.log("Bienvenido a Tu Cotizador Vehicular")

function seleccionar() {
    let opciones = parseInt(prompt("Escoge una opción: " + "1. Impuesto Vehicular " + " " + "2. SOAT" + " " + "3. Seguro Vehicular"));
    
    switch (opciones) {
        case 1:
            console.log("Has elegido Impuesto Vehicular");
            break;
        case 2:
            console.log("Has elegido SOAT");
            break;
        case 3:
            console.log("Has elegido Seguro Vehicular");
            break;
        default:
            console.log("Opción Invalida, escoge entre 1, 2 o 3");
    }
}


seleccionar();