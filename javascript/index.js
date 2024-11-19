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

const ITEMSCARRITO = document.getElementById('items-carrito');
const TOTALCOMPRA = document.getElementById('total-compra');
const CANTIDADCARRITO = document.getElementById('cantidad-carrito');
const SECCIONCARRITO = document.getElementById('carrito'); 



document.getElementById('tipoServicio').addEventListener('change', function(){
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
            <option value = "completo">Completo</option>
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
});


document.getElementById('botonCalcular').addEventListener('click', function() {
    const RESULTADO = cotizar();
    if (RESULTADO.nombre) {
        Swal.fire('Cotización', `${RESULTADO.nombre}: $${RESULTADO.precio}`, 'info');
    } else {
        Swal.fire('Error', 'Selecciona un tipo de servicio', 'error');
    }
});

document.getElementById('boton-comprar-todo').addEventListener('click', function() {
    if (carrito.length === 0) {
        Swal.fire('Carrito Vacío', 'No hay productos en el carrito', 'error');
    } else {
        Swal.fire('Compra Exitosa', `Total: $${carrito.reduce((suma, item) => suma + item.precio, 0)}`, 'success');
        carrito = [];
        localStorage.removeItem('carrito');
        actualizarCarrito();
    }
});

document.getElementById('botonAnadirCarrito').addEventListener('click', function() {
    let producto = cotizar();
    if (producto.nombre && producto.precio > 0) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        Swal.fire('Añadido al Carrito', `${producto.nombre}: $${producto.precio}`, 'success');
        actualizarCarrito();
    }else{
        Swal.fire('Error', 'Selecciona un tipo de servicio y realiza una cotización válida', 'error');
    }
});


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
    
    let resultado = {nombre: '', precio: 0}; 
    
    if (!TIPOSERVICIO) {
        return {
            nombre: 'Error',
            precio: 0
        };
    }

    switch (TIPOSERVICIO) {
        case 'soat':
            const TIPOVEHICULO = document.getElementById('tipoVehiculo').value;
            const CILINDRAJE = document.getElementById('cilindraje').value;
            const ANTIGUEDAD = document.getElementById('antiguedad').value;
            
            if (!TIPOVEHICULO || !CILINDRAJE || !ANTIGUEDAD) {
                return {
                    nombre: 'Error',
                    precio: 0
                };
            }

            const VALORSOAT = calcularSoat(TIPOVEHICULO, CILINDRAJE, ANTIGUEDAD);
            resultado = {
                nombre: `SOAT para un(a) ${TIPOVEHICULO}`,
                precio: VALORSOAT
            };
            break;

        case 'seguro':
            const TIPOSEGURO = document.getElementById('tipoSeguro').value;
            
            if (!TIPOSEGURO) {
                return {
                    nombre: 'Error',
                    precio: 0
                };
            }

            const VALORSEGURO = calculoSeguroVehicular(TIPOSEGURO);
            resultado = {
                nombre: `Seguro ${TIPOSEGURO}`,
                precio: VALORSEGURO
            };
            break;

        case 'impuesto':
            const VALORCOMERCIAL = parseFloat(document.getElementById('valorComercial').value);
            
            if (isNaN(VALORCOMERCIAL) || VALORCOMERCIAL <= 0) {
                return {
                    nombre: 'Error',
                    precio: 0
                };
            }

            const VALORIMPUESTO = calculoImpuestoVehicular(VALORCOMERCIAL);
            resultado = {
                nombre: `Impuesto Vehicular para matrícula ${MATRICULA}`,
                precio: VALORIMPUESTO
            };
            break;

        default:
            resultado = {
                nombre: 'Error',
                precio: 0
            };
            break;
    }

    return resultado;
}




let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarCarrito() {
    let cantidadCarrito = document.getElementById('cantidad-carrito');
    let listaCarrito = document.getElementById('items-carrito');
    let totalCompra = document.getElementById('total-compra');

    if (cantidadCarrito) {
        cantidadCarrito.textContent = carrito.length;
    }

    if (listaCarrito) {
        listaCarrito.innerHTML = '';
        carrito.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            listaCarrito.appendChild(li);
        });
    }

    if (totalCompra) {
        const total = carrito.reduce((suma, item) => suma + item.precio, 0);
        totalCompra.textContent = total.toFixed(2);
    }

    mostrarTotalCompra();
}

function mostrarTotalCompra() {
    let totalCompra = carrito.reduce((suma, item) => suma + item.precio, 0);
    const totalElement = document.getElementById('total-compra');
    if (totalElement) {
        totalElement.textContent = `Total: $${totalCompra.toFixed(2)}`;
    } else {
        console.error('Elemento total-compra no encontrado');
    }
}


actualizarCarrito();