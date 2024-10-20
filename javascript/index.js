console.log("Bienvenido a Tu Cotizador Vehicular");

const TARIFASBASE = {

    soat: {
        moto : 414800,
        carro : 644300
    },

    seguro : {
        basico : 800000,
        completo : 1500000
    }
};

const CILINDRAJE = {

    moto: {
        bajo : 1.05,
        medio : 1.15,
        alto : 1.30
    },

    carro: {
        bajo : 1.00,
        medio : 1.15,
        alto : 1.30
    }
};

const ANTIGUEDAD = {

    nuevo : 1.0,
    medio : 1.1,
    viejo : 1.3

};

function calcularSoat (tipoVehiculo, cilindraje, antiguedad){
    const TARIFABASE = TARIFASBASE.soat[tipoVehiculo];
    const CILINDRAJEVEHICULO = CILINDRAJE[tipoVehiculo][cilindraje];
    const ANTIGUEDADVEHICULO = ANTIGUEDAD[antiguedad] ;
    const CALCULOFINAL = TARIFABASE * CILINDRAJEVEHICULO *  ANTIGUEDADVEHICULO;
    return CALCULOFINAL;
}

function calculoImpuestoVehicular (valorComercial) {
    let porcentaje;

    if(valorComercial < 52119000){
        porcentaje = 0.015;
    }else if(valorComercial >= 52119000 && valorComercial <= 116165000){
        porcentaje = 0.025;
    }else{
        porcentaje = 0.035;
    }

    return valorComercial * porcentaje;

}

function calculoSeguroVehicular (tipoSeguro) {
    return TARIFASBASE.seguro[tipoSeguro];
}

function seleccionar() {
    const OPCIONES = prompt("¿Que deseas comprar? 1. SEGURO VEHICULAR, 2. SOAT , 3. IMPUESTO VEHICULAR");

    switch(OPCIONES){
        case '1':
            const TIPOSEGURO = prompt("Ingrese el seguro que va a comprar (basico / completo)");
            const VALORSEGURO = calculoSeguroVehicular(TIPOSEGURO);
            console.log(`El seguro vehicular ${TIPOSEGURO} es: ${VALORSEGURO}`);
            break;
            
        case '2':
            const VEHICULOSOAT = prompt("Ingresa el tipo de vehiculo (moto /carro)");
            const CILINDRAJESOAT = prompt("Ingrese el cilindraje (bajo / medio / alto)");
            const ANTIGUEDADSOAT = prompt("Ingresa la antiguedad del vehiculo (nuevo / medio / viejo)");
            const VALORSOAT = calcularSoat(VEHICULOSOAT, CILINDRAJESOAT, ANTIGUEDADSOAT);
            console.log(`SOAT para un(a)  ${VEHICULOSOAT}, con cilindraje ${CILINDRAJESOAT}, con antigüedad de ${ANTIGUEDADSOAT} es de : ${VALORSOAT}`);
            break;
            
        case '3':
            const VALORCOMERCIALIMPUESTO = parseFloat(prompt("Ingresa el valor comercial de tu vehiculo:"));
            const   VALORIMPUESTO = calculoImpuestoVehicular(VALORCOMERCIALIMPUESTO);
            console.log(`El impuesto vehicular para tu vehiculo de valor comercial ${VALORCOMERCIALIMPUESTO} es: ${VALORIMPUESTO}`);
            break;

        default:
            console.log("Opción invalida por favor ingrese 1, 2, 3");
            break;
    }
}

seleccionar();