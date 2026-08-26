const tiposDeSaludos = ["Los que vamos a morir te saludan", "Prepárense a morir", "Ave César"];

class Personaje {
  constructor(nombre, vida, danho, defensa, velocidad, clase) {
    this.nombre = nombre;
    this.vidaMax = vida;
    this.vida = vida;
    this.danho = danho;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.clase = clase;// esto es para poder saber la clase del luchador 
  }

  saludar() {

    const saludoAleatorio = tiposDeSaludos[Math.floor(Math.random() * tiposDeSaludos.length)];
    console.log(` ${this.clase.toUpperCase()}: Mi nombre es  ${this.nombre.toUpperCase()}: ${saludoAleatorio}`);
  }

  atacar(objetivo, esAtaqueFurtivo = false) {
    console.log(`${this.nombre.toUpperCase()} ataca con sus puños a ${objetivo.nombre.toUpperCase()}.`);
    this.calcularResultadoCombate(objetivo, this.danho, esAtaqueFurtivo);
  }

  calcularResultadoCombate(objetivo, danhoAtaque, esAtaqueFurtivo = false) {
    if (esAtaqueFurtivo) {
      console.log(` ¡Ataque Furtivo Exitoso! Se ignora la defensa.`);
      objetivo.vida = objetivo.vida - danhoAtaque < 0 ? 0 : objetivo.vida - danhoAtaque;
      console.log(` ¡Éxito! ${objetivo.nombre.toUpperCase()} recibe ${danhoAtaque} de daño. (Vida restante: ${objetivo.vida})`);
      return;
    }

    const numeroAleatorioDefensa = Math.floor(Math.random() * objetivo.defensa) + 1;

    if (numeroAleatorioDefensa > danhoAtaque) {
      console.log(`  ¡Ataque Fallido! ${objetivo.nombre.toUpperCase()} se defendió con éxito (Dado defensa: ${numeroAleatorioDefensa} vs Daño: ${danhoAtaque}).`);
    } else {
      objetivo.vida = objetivo.vida - danhoAtaque < 0 ? 0 : objetivo.vida - danhoAtaque;
      console.log(` El ataque fue exitoso. ${objetivo.nombre.toUpperCase()} recibe ${danhoAtaque} de daño. (Vida restante: ${objetivo.vida})`);
    }
  }

  generarIniciativaRonda() {
    return Math.floor(Math.random() * this.velocidad) + 1;
  }
}

class Guerrero extends Personaje {
  constructor(nombre, vida, danho, defensa, velocidad) {
    super(nombre, vida, danho, defensa, velocidad, "Gerrero");
    this.array_de_armas = [
      { nombre: "Espada Scalibur", potencia: 8 },
      { nombre: "Hacha de Batalla F18", potencia: 12 },
      { nombre: "Martillo de Guerra", potencia: 10 }
    ];
  }

  atacar_con_arma(objetivo) {
    const arma = this.array_de_armas[Math.floor(Math.random() * this.array_de_armas.length)];
    const danhoTotal = this.danho + arma.potencia;
    console.log(`  ${this.nombre.toUpperCase()} ataca usando su ${arma.nombre.toUpperCase()} (Potencia: +${arma.potencia}) a ${objetivo.nombre.toUpperCase()}.`);
    this.calcularResultadoCombate(objetivo, danhoTotal);
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, danho, defensa, velocidad) {
    super(nombre, vida, danho, defensa, velocidad, "Mago");
    this.array_de_hechizos = [
      { nombre: "Bola de Fuego", potencia: 15 },
      { nombre: "Rayo de Escarcha", potencia: 6 },
      { nombre: "Agujero Negro invertido", potencia: 10 }
    ];
  }

  atacar_con_hechizo(objetivo) {
    const hechizo = this.array_de_hechizos[Math.floor(Math.random() * this.array_de_hechizos.length)];
    const danhoTotal = this.danho + hechizo.potencia;
    console.log(` ${this.nombre.toUpperCase()} lanza el hechizo ${hechizo.nombre.toUpperCase()} (Potencia: +${hechizo.potencia}) contra ${objetivo.nombre.toUpperCase()}.`);
    this.calcularResultadoCombate(objetivo, danhoTotal);
  }
}

class Arquero extends Personaje {
  constructor(nombre, vida, danho, defensa, velocidad) {
    super(nombre, vida, danho, defensa, velocidad, "Arquero");
    this.array_de_flechas = [
      { nombre: "Flecha Perforante", potencia: 8, cantidadFlechas: 5 },
      { nombre: "Flecha de Fuego", potencia: 12, cantidadFlechas: 2 },
      { nombre: "Flecha Envenenada", potencia: 10, cantidadFlechas: 4 }
    ];
  }

  disparar(objetivo) {

    const flechasDisponibles = [];
    // Filtramos para saber cuáles flechas tiene disponible

    for (let i = 0; i < this.array_de_flechas.length; i++) {
      let flechaActual = this.array_de_flechas[i];

      if (flechaActual.cantidadFlechas > 0) {
        flechasDisponibles.push(flechaActual);
      }
    }
    //console.log("Flechas listas para disparar:", flechasDisponibles);
    // Si ya no quedan flechas , se ve obligado a atacar con los puños
    if (flechasDisponibles.length === 0) {
      console.log(` ${this.nombre.toUpperCase()} intenta disparar, ¡pero se ha quedado sin flechas!`);
      this.atacar(objetivo);
      return;
    }

    const flecha = flechasDisponibles[Math.floor(Math.random() * flechasDisponibles.length)];
    flecha.cantidadFlechas--;

    const danhoTotal = this.danho + flecha.potencia;
    console.log(` ${this.nombre.toUpperCase()} dispara una ${flecha.nombre.toUpperCase()} (Potencia: +${flecha.potencia}, Quedan: ${flecha.cantidadFlechas}) a ${objetivo.nombre.toUpperCase()}.`);
    this.calcularResultadoCombate(objetivo, danhoTotal);
  }
}

class Clerigo extends Personaje {
  constructor(nombre, vida, danho, defensa, velocidad) {
    super(nombre, vida, danho, defensa, velocidad, "Clerico");
    this.array_de_plegarias = [
      { nombre: "Rezo sagrado", potencia: 5 },
      { nombre: "Ira Divina", potencia: 14 },
      { nombre: "Rezo de luz", potencia: 8 }
    ];
  }

  atacar_con_plegaria(objetivo) {
    const plegaria = this.array_de_plegarias[Math.floor(Math.random() * this.array_de_plegarias.length)];
    const danhoTotal = this.danho + plegaria.potencia;
    console.log(` ${this.nombre.toUpperCase()} invoca la plegaria ${plegaria.nombre.toUpperCase()} (Potencia: +${plegaria.potencia}) sobre ${objetivo.nombre.toUpperCase()}.`);
    this.calcularResultadoCombate(objetivo, danhoTotal);
  }

  curar() {
    const topeMaximoCuracion = Math.floor(this.vidaMax * 1 / 4);
    const puntosCurados = Math.floor(Math.random() * topeMaximoCuracion) + 1;
    this.vida = this.vida + puntosCurados > this.vidaMax ? this.vidaMax : this.vida + puntosCurados;
    console.log(` CURACIÓN: ${this.nombre.toUpperCase()} usa su turno para rezar y se cura ${puntosCurados} puntos. (Vida actual: ${this.vida}/${this.vidaMax})`);
  }
}

class Picaro extends Personaje {
  constructor(nombre, vida, danho, defensa, velocidad) {
    super(nombre, vida, danho, defensa, velocidad, "Picaro");
    this.array_de_dagas = [
      { nombre: "Daga de las Sombras", potencia: 7 },
      { nombre: "Daga de Acero", potencia: 9 },
      { nombre: "Daga Rompe escudo", potencia: 6 }
    ];
  }

  atacar_con_daga(objetivo, esAtaqueFurtivo = false) {
    const daga = this.array_de_dagas[Math.floor(Math.random() * this.array_de_dagas.length)];
    const danhoTotal = this.danho + daga.potencia;
    console.log(`  ${this.nombre.toUpperCase()} apuñala con su ${daga.nombre.toUpperCase()} (Potencia: +${daga.potencia}) a ${objetivo.nombre.toUpperCase()}.`);
    this.calcularResultadoCombate(objetivo, danhoTotal, esAtaqueFurtivo);
  }
}

class Juego {
  constructor(personajes) {
    this.personajes = personajes;
  }

  iniciar() {

    console.log("*************      INICIANDO COMBATE       ************\n");

    this.personajes.forEach(personaje => personaje.saludar());
    console.log("\n====================     ========================\n");

    let numeroRonda = 1;

    while (this.personajes.length > 1) {

      console.log(`Ronda Nro: ${numeroRonda}`);
      let ordenRonda = this.personajes.map(function (personaje) {
        return {
          luchador: personaje,
          iniciativa: personaje.generarIniciativaRonda()
        };
      });

      ordenRonda.sort((turno1, turno2) => turno2.iniciativa - turno1.iniciativa);

      console.log("[Orden de Ataque en la Ronda]:");
      ordenRonda.forEach(t => console.log(`   - ${t.luchador.nombre.toUpperCase()} sacó iniciativa ${t.iniciativa}`));
      console.log("");

      for (let turno of ordenRonda) {
        let atacante = turno.luchador;

        if (atacante.vida <= 0) continue;

        console.log(`Turno de: ${atacante.nombre.toUpperCase()}`);

        if (atacante instanceof Clerigo && atacante.vida < atacante.vidaMax && Math.random() < 0.5) {
          atacante.curar();
          console.log("");
          continue;
        }

        let enemigosDisponibles = this.personajes.filter(p => p !== atacante && p.vida > 0);
        if (enemigosDisponibles.length === 0) break;

        let objetivo = enemigosDisponibles[Math.floor(Math.random() * enemigosDisponibles.length)];
        const esAtaqueBasico = Math.random() < 1 / 3;
        let esAtaqueFurtivo = atacante instanceof Picaro && Math.random() < 0.05;

        if (esAtaqueBasico) {
          atacante.atacar(objetivo, esAtaqueFurtivo);
        } else {
          if (atacante instanceof Guerrero) atacante.atacar_con_arma(objetivo);
          else if (atacante instanceof Mago) atacante.atacar_con_hechizo(objetivo);
          else if (atacante instanceof Arquero) atacante.disparar(objetivo);
          else if (atacante instanceof Clerigo) atacante.atacar_con_plegaria(objetivo);
          else if (atacante instanceof Picaro) atacante.atacar_con_daga(objetivo, esAtaqueFurtivo);
        }

        if (objetivo.vida <= 0) {
          console.log(`${objetivo.nombre.toUpperCase()} ha muerto ****`);
          this.personajes = this.personajes.filter(p => p.vida > 0);
        }
        console.log("");
      }

      numeroRonda = numeroRonda + 1;
    }

    console.log(` ******************  EL GANADOR DEL TORNEO ES EL: ${this.personajes[0].clase} ${this.personajes[0].nombre.toUpperCase()}   ********************`);
  }
}


const guerrero1 = new Guerrero("Aquiles", 120, 10, 14, 10);
const guerrero2 = new Guerrero("Jason", 115, 11, 15, 9);
const mago1 = new Mago("MagodeOz", 90, 15, 8, 12);
const mago2 = new Mago("Merlin", 85, 16, 7, 14);
const arquero1 = new Arquero("RobinHood", 100, 12, 11, 18);
const clerico1 = new Clerigo("MartinLutero", 130, 8, 12, 8);
const clerico2 = new Clerigo("Fray Santo Tomas", 105, 7, 9, 6);
const picaro1 = new Picaro("Loki", 95, 10, 10, 20);

const torneo = new Juego([guerrero1, guerrero2, mago1, mago2, arquero1, clerico1, picaro1]);
torneo.iniciar();