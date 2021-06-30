const { v4: uuidv4 } = require('uuid');
class Tarea {
  id = '';
  desc = '';
  completadoEm = null;

  constructor(desc) {
    this.desc = desc;
    this.id = uuidv4();
    this.completadoEm = null;
  }
}
module.exports = Tarea;
