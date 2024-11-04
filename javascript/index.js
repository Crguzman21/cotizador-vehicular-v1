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

document.getElementById('tipoServicio').addEventListener('change', mostrarForm);
document.getElementById('botonCalcular').addEventListener('click', cotizar);


function mostrarForm(){
    const TIPOSERVICIO = document.getElementById('tipoServicio').value;
    const FORM = document.getElementById('form');

    let info = `

    <label for= "placa"> Placa: </label>
    <input type="text" id="placa" placeholder = "Ingrese la placa de su vehiculo" required>

    <label for = "matricula">Matricula: </label>
    <input type="text" id="matricula" placeholder = "Ingrese la matricula de su vehiculo" required>

    <label for = "documentoPropietario"> Número de Documento: </label>
    <input type="text" id="documentoPropietario" placeholder = "Ingrese el número de documento del propietario" required>

    `;

    if(TIPOSERVICIO === 'seguro'){
        info += `
        <label for = "tipoSeguro">Tipo de Seguro: </label>
        <select id = "tipoSeguro">
            <option value = "basico">Básico</option>
            <option value = "completo">COmpleto</option>
        </select>`;
    }else if(TIPOSERVICIO === 'soat'){

        info += `
        <label for = "tipoVehiculo">Tipo de Vehiculo: </label>
        <select id="tipoVehiculo">
            <option value = "moto">Moto</option>
            <option value = "carro">Carro</option>
        </select>

        <label for = "cilindraje">Cilindraje: </label>
        <select id="cilindraje">
            <option value = "bajo">Bajo</option>
            <option value = "medio">Medio</option>
            <option value = "alto">Alto</option>
        </select>

        <label for = "antiguedad">Antigüedad</label>
        <select id="antiguedad">
            <option value = "nuevo">Nuevo</option>
            <option value = "medio">Medio</option>
            <option value = "viejo">Viejo</option>
        </select>`;
    }else if(TIPOSERVICIO === 'impuesto'){
        info += `
        <laber for = "valorComercial">Valor Comercial: </label>
        <input type = "number" id="valorComercial" placeholder = "Ingrese el Valor Comercial" required>`;
    }

    FORM.innerHTML = info;
}

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

function cotizar() {
    const TIPOSERVICIO = document.getElementById('tipoServicio').value;
    const PLACA = document.getElementById('placa').value;
    const MATRICULA = document.getElementById('matricula').value;
    const DOCUMENTOPROPIETARIO = document.getElementById('documentoPropietario').value;
    let resultado = '';

    switch (TIPOSERVICIO) {
        case 'soat':
            const TIPOVEHICULO = document.getElementById('tipoVehiculo').value;
            const CILINDRAJE = document.getElementById('cilindraje').value;
            const ANTIGUEDAD = document.getElementById('antiguedad').value;
            const VALORSOAT = calcularSoat(TIPOVEHICULO, CILINDRAJE, ANTIGUEDAD);
            resultado = `El SOAT para un(a) ${TIPOVEHICULO} con placa ${PLACA}, matrícula ${MATRICULA}, con número de documento del propietario ${DOCUMENTOPROPIETARIO} es: $ ${VALORSOAT.toFixed(2)}`;
            break;
        case 'seguro':
            const TIPOSEGURO = document.getElementById('tipoSeguro').value;
            const VALORSEGURO = calculoSeguroVehicular(TIPOSEGURO);
            resultado = `El seguro vehicular ${TIPOSEGURO} para la matrícula ${MATRICULA}, con número de documento del propietario ${DOCUMENTOPROPIETARIO} es: S/ ${VALORSEGURO.toFixed(2)}`;
            break;
        case 'impuesto':
            const VALORCOMERCIAL = parseFloat(document.getElementById('valorComercial').value);
            const VALORIMPUESTO = calculoImpuestoVehicular(VALORCOMERCIAL);
            resultado = `El impuesto vehicular para su vehículo con matrícula ${MATRICULA}, con número de documento del propietario ${DOCUMENTOPROPIETARIO} de valor comercial S/ ${VALORCOMERCIAL} es: S/ ${VALORIMPUESTO.toFixed(2)}`;
            break;
        default:
            resultado = "Opción inválida. Por favor, selecciona un servicio.";
            break;
    }

    document.getElementById('resultado').innerText = resultado;

    let cotizacion = { TIPOSERVICIO, resultado, PLACA, MATRICULA, DOCUMENTOPROPIETARIO };
    localStorage.setItem('ultimaCotizacion', JSON.stringify(cotizacion));
}

document.addEventListener('DOMContentLoaded', () => {
    let ultimaCotizacion = JSON.parse(localStorage.getItem('ultimaCotizacion'));
    if (ultimaCotizacion) {
        document.getElementById('resultado').innerText = `Última cotización: ${ultimaCotizacion.resultado}`;
    }
});
