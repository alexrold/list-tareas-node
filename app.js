require('colors');

const Tareas = require('./models/Tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
  inquirerMenu,
  pausaMenu,
  leerInput,
  listadoTareasEliminar,
  confirmarAccion,
  listadoTareasChechlist,
} = require('./helpers/inquirer');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasdDB = leerDB();

  if (tareasdDB) {
    //* Cargar tareas
    tareas.cargarTareasFromArray(tareasdDB);
  }

  do {
    //* Muestra el menu en consola
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;
      case '2': // Listar todas
        tareas.listarTareas();
        break;
      case '3': //Listar completadas
        tareas.listarTareasForEstadoTrueOrFalse(true);
        break;
      case '4': //listar pendientes
        tareas.listarTareasForEstadoTrueOrFalse(false);
        break;
      case '5': // Completar
        const ids = await listadoTareasChechlist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case '6': // Eliminar
        const id = await listadoTareasEliminar(tareas.listadoArr);
        if (id !== '0') {
          const resp = await confirmarAccion('¿Estas Seguro?');
          if (resp) {
            tareas.eliminarTareaid(id);
            console.log('\n\tTarea Eliminada correctamente.'.green);
          }
        }

        break;
    }
    guardarDB(tareas.listadoArr);
    await pausaMenu();
  } while (opt !== '0');
};
main();
