/**
 * Clase que representa una aplicación de lista de tareas (To-Do list).
 * Permite almacenar una lista de tareas, mostrarlas, agregarlas, 
 * modificarlas y eliminarlas.
 */
class ToDo {
  /**
   * Crea una instancia de la lista de tareas.
   * Inicializa un arreglo vacío para almacenar las tareas.
   */
  constructor() {
    /**
     * Arreglo que almacena las tareas.
     * @type {Array<{tarea: string, completada: boolean}>}
     */
    this.tareas = [];
  }

  /**
   * Muestra el menú principal al usuario y maneja la navegación.
   * 
   * @returns {boolean} Retorna `true` si el programa debe seguir ejecutándose, 
   * o `false` si el usuario elige cerrar el programa.
   */
  menu() {
    let opcion = this.pedir_numero(`Ingrese un numero de la lista
      1. Mostrar tareas  
      2. Agregar tarea
      3. Editar tareas
      4. Eliminar tarea
      5. Cerrar programa
    `);

    if (opcion == 1) {
      this.mostrar_tareas();
    } else if (opcion == 2) {
      this.agregar_tarea();
    } else if (opcion == 3) {
      this.editar_tareas();
    } else if (opcion == 4) {
      this.eliminar_tarea();
    } else if (opcion == 5) {
      return false;
    }
    return true;
  }

  /**
   * Muestra en la consola todas las tareas almacenadas junto con su estado 
   * (completada o no completada). Si no hay tareas, muestra un mensaje indicándolo.
   * 
   * @returns {void}
   */
  mostrar_tareas() {
    if (this.tareas.length > 0) {
      this.tareas.forEach(
        (tarea, index) => console.log(`${index + 1}. ${tarea.tarea} ${tarea.completada ? "completada" : "no completada"}`)
      );
    } else {
      console.log(`No hay tareas de momento`);
    }
  }

  /**
   * Solicita al usuario ingresar el nombre de una nueva tarea a través de un prompt 
   * y la agrega al arreglo de tareas con el estado "completada" en false.
   * 
   * @returns {void}
   */
  agregar_tarea() {
    let tarea = prompt(`Ingrese la tarea`);
    this.tareas.push({
      tarea,
      completada: false
    });
    console.log(`Tarea agregada`);
  }

  /**
   * Solicita al usuario el ID de una tarea existente, un nuevo nombre y si desea 
   * marcarla como completada. Luego, actualiza la tarea correspondiente.
   * 
   * @returns {void}
   */
  editar_tareas() {
    let idTarea = this.pedir_numero() - 1;
    let tarea = prompt(`Ingresa la tarea`);
    let completada = confirm(`¿Desea marcar la tarea como completada?`);

    this.tareas[idTarea] = {
      tarea,
      completada
    };
    console.log(`Tarea modificada`);
  }

  /**
   * Solicita al usuario el ID de una tarea para eliminarla. 
   * Si el ID es válido, la tarea es removida del arreglo; de lo contrario, 
   * muestra un mensaje de error.
   * 
   * @returns {void}
   */
  eliminar_tarea() {
    let idTarea = this.pedir_numero(`Ingresa el id de la tarea que deseas eliminar`) - 1;

    if (this.tareas[idTarea]) {
      this.tareas.splice(idTarea, 1);
      console.log(`Tarea eliminada`);
    } else {
      console.log(`No hay ningun elemento con ese ID`);
    }
  }

  /**
   * Función auxiliar para solicitar un número al usuario validando que 
   * la entrada no sea un valor NaN (Not a Number).
   * 
   * @param {string} [mensaje="Ingresa el ID de la tarea que deseas modificar"] - El mensaje que se le mostrará al usuario en el prompt.
   * @returns {number} El número entero ingresado por el usuario.
   */
  pedir_numero(mensaje = `Ingresa el ID de la tarea que deseas modificar`) {
    let idTarea;
    do {
      idTarea = parseInt(prompt(mensaje));
    } while (isNaN(idTarea));

    return idTarea;
  }
}

// Inicialización del programa
let toDo = new ToDo();

while (toDo.menu()) {
  // El bucle se mantiene vivo mientras menu() retorne true
}