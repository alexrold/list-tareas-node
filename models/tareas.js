const Tarea = require('./tarea');

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listarTareas() {
    console.log(); // espacio
    if (!this.listadoArr.length) {
      return console.log('\tNo hay tareas para mostrar'.green);
    }
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEm } = tarea;
      const estado = completadoEm ? 'Completado'.green : 'Pendiente'.red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarTareasForEstadoTrueOrFalse(completadas = true) {
    let siHayCompletadas = false;
    let siHayPendientes = false;
    let indice = 0;
    console.log(); // espacio
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEm } = tarea;
      const estado = completadoEm ? 'Completado'.green : 'Pendiente'.red;
      if (completadas) {
        if (completadoEm) {
          siHayCompletadas = true;
          indice = 1;
          console.log(`${indice + '.'.green} ${desc} :: ${completadoEm.green}`);
        }
      } else {
        if (!completadoEm) {
          siHayPendientes = true;
          indice = 1;
          console.log(`${indice + '.'.green} ${desc} :: ${estado}`);
        }
      }
    });

    if (!siHayCompletadas && completadas) {
      console.log('\tNo hay tareas completadas'.green);
    }
    if (!siHayPendientes && !completadas) {
      console.log('\tNo hay tareas pendientes'.green);
    }
  }

  eliminarTareaid(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEm) {
        tarea.completadoEm = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEm = null;
      }
    });
  }
}
module.exports = Tareas;
