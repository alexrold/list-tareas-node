require('colors');
const inquirer = require('inquirer');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`.white,
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tarea`.white,
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`.white,
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`.white,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`.white,
      },
      {
        value: '6',
        name: `${'6.'.green} Eliminar tarea`.white,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`.white,
      },
    ],
  },
];

const inquirerMenu = async () => {
  process.stdout.write('\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W');
  console.log('========================='.green);
  console.log('  Seleccione una opción  '.cyan);
  console.log('=========================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausaMenu = async () => {
  const quest = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} PARA CONTINUAR `,
    },
  ];
  console.log('\n');
  await inquirer.prompt(quest);
};

const leerInput = async (message) => {
  const quest = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese una descripción';
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(quest);
  return desc;
};

const listadoTareasEliminar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmarAccion = async (message) => {
  const quest = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(quest);
  return ok;
};

const listadoTareasChechlist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEm ? true : false,
    };
  });

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausaMenu,
  leerInput,
  listadoTareasEliminar,
  confirmarAccion,
  listadoTareasChechlist,
};
