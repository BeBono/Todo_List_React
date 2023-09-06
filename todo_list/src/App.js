import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    if (todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");

    } else {

        alert("Enter Valid Task");
        setTodo("");
    }
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

    return (
        <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit">Add Todo</button>
          </form>
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}

                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    };

export default App;


// *************************Explicación de las expresiones en este lab**************:

// Funcionalidad del código: Aplición de lista de tareas, por lo tanto se puede:
// 1. Crear tareas.
// 2. Editar tareas.
// 3. Marcar como completadas.
// 4. Eliminar.
// 5. Mantener guardadas aquellas tareas ("localmente") que no se hayan borrado, aún si el servidor de React se reinicia. 

// Pasos:

// 1. Clonar el repositotio: git clone https://github.com/BeBono/uqwxd-react_labs.git
// 2. Al abrirlo en Visual Studio Code, luego de instalar los módulos dependientes con 'npm install', se debe ejecutar 'npm audit fix --force' ya que al parecer hay algunos paquetes que no están soportados/actualizados.
// 3. Ejecutar 'npm start'



// * const [todos, setTodos] = React.useState([]);
// Aquí se define un estado llamado todos utilizando el Hook useState. todos es una variable que almacenará un array de elementos. Inicialmente, se inicializa con un array vacío [].

// * const [todo, setTodo] = React.useState("");
// Se define otro estado llamado todo, también utilizando el Hook useState. todo es una variable que almacenará una cadena de texto. Inicialmente, se inicializa con una cadena vacía "".

// A continuación, el código continúa con las siguientes líneas:

// * setTodos([...todos].concat(newTodo));
// Esta línea agrega un nuevo elemento a la lista todos utilizando el método concat(). La función concat() se utiliza para unir arrays, en este caso, crea un nuevo array copiando los elementos del array todos existente y luego añade un nuevo elemento al final del nuevo array. El nuevo elemento se proporciona en la variable newTodo.

// * setTodo("");
// Esta línea establece el estado todo a una cadena vacía, lo que significa que después de agregar un nuevo elemento a todos, se borra el contenido de todo, dejándolo vacío.
// * En resumen, este código está diseñado para agregar un nuevo elemento a la lista todos, utilizando el estado todo como el nuevo elemento a añadir. Luego de agregar el elemento, se reinicia el estado todo para que el campo donde el usuario ingresa el nuevo elemento quede vacío y esté listo para recibir otro valor.


// * .preventDefault();
// Cuando un formulario se envía, el comportamiento predeterminado del navegador es enviar los datos del formulario a una URL o recargar la página. Al llamar a e.preventDefault();, se detiene este comportamiento predeterminado, lo que significa que los datos del formulario no se envían automáticamente y la página no se recarga. Esto es útil cuando deseas manejar los datos ingresados por el usuario de forma personalizada en lugar de dejar que el navegador realice la acción predeterminada.


// * <h1>Todo List</h1>
// Esta línea simplemente muestra un encabezado en el documento que dice "Todo List". Es un título que indica el propósito de la página o componente.

// * <form onSubmit={handleSubmit}>
// Aquí se define un formulario HTML. La propiedad onSubmit se establece con el valor handleSubmit, que es una función que se ejecutará cuando se envíe el formulario. Es decir, cuando el usuario presione el botón "Add Todo" o presione Enter mientras está enfocado en el campo de entrada de texto, la función handleSubmit se activará para manejar el envío del formulario.

// * <input ... />
// Esta es una etiqueta de entrada de texto (<input>) que permite al usuario ingresar tareas para agregar a la lista. Las propiedades utilizadas en esta etiqueta son las siguientes:

// *type="text": Define el tipo de entrada como texto.
// *onChange={(e) => setTodo(e.target.value)}: Establece un controlador de eventos onChange que se activa cuando el contenido del campo cambia. Cada vez que el usuario escribe o borra algo en el campo de entrada, la función de flecha se ejecuta, captura el valor del campo usando e.target.value y luego actualiza el estado todo con el nuevo valor usando setTodo.
// La expresión onChange={(e) => setTodo(e.target.value)} actualiza el estado 'todo' cada vez que se escribe texto en el campo de entrada de texto (<input>), independientemente de si se hace clic en el botón de submit o no.

// *placeholder="Add a new task": Muestra un texto de ayuda dentro del campo de entrada antes de que el usuario ingrese algo.
// *value={todo}: Establece el valor del campo de entrada con el estado todo. Esto significa que el campo siempre mostrará el contenido actual del estado 'todo' (cada vez que React renderiza el componente). Es decir, lo que se haya ingresado, seguirá presente en el campo de entrada, recordando que para este caso React renderiza componentes con cualquier cambio en el campo de entrada, aún cuando no lo notemos. En otra instancia, cuando se hace click en el botón submit el estado 'todo' se borra y deja de aparecer texto en el campo de entrada.
// si no se utiliza la expresión value={todo} en el campo de entrada, el campo se borraría cada vez que React renderice el componente. Sin esta expresión, el campo de entrada se comportaría como un campo de entrada de texto normal y no estaría vinculado al estado todo.


// *<button type="submit">Add Todo</button> Este es un botón de tipo "submit" que se utilizará para enviar el formulario. Cuando el usuario hace clic en este botón o presiona Enter mientras está enfocado en el campo de entrada de texto, se activará la función handleSubmit.
// El botón de submit tiene un propósito separado de enviar el formulario, pero no afecta directamente al estado todo.

// *</form>
// Aquí se cierra la etiqueta del formulario, indicando que todo lo que está dentro de esta etiqueta forma parte del formulario.

// *{todos.map((todo) => <div>{todo.text}</div>)}
// Esta línea es una expresión de mapeo que recorre el array 'todos' y muestra el contenido de cada elemento en una serie de elementos <div>. Suponiendo que cada elemento del array 'todos' tiene una propiedad text, se muestra el contenido de esa propiedad en cada <div>. Por ejemplo, si todos es un array de objetos con la propiedad text, esto mostrará cada texto correspondiente a cada tarea en la lista.

// *En resumen, este código crea un formulario con un campo de entrada de texto y un botón "Add Todo" que permite al usuario agregar tareas a la lista. Cuando el usuario envía el formulario, la función handleSubmit se activa y maneja la tarea de agregar la nueva tarea ingresada en el campo de texto a la lista todos. Luego, se muestra la lista de tareas en elementos <div>.

// * El método new Date().getTime() se utiliza para obtener la marca de tiempo actual en milisegundos. La función new Date() crea un objeto de fecha que representa la fecha y hora actuales, y luego el método .getTime() se llama en ese objeto para obtener el tiempo en milisegundos.
//  Por ejemplo, si se crea una nueva tarea en este momento, el valor de id podría ser algo como 1667896562334, pero si se crea otra tarea un segundo después, el valor de id podría ser 1667896563455. Cada número es único en el contexto de la ejecución del código y evita colisiones en el id de las tareas.

// * En la expresión .map((todo) => { ... }), el criterio 'todo' es solo un nombre que se le da a cada elemento del array todos mientras se recorre el array utilizando el método map(). Es simplemente un nombre que se utiliza para representar cada elemento individual del array durante la iteración.

// El nombre todo puede ser cualquier nombre válido de variable en JavaScript. Es comúnmente utilizado en este contexto debido a la semántica del código; como estamos trabajando con una lista de tareas (todos), el nombre todo tiene sentido porque cada elemento representa una tarea individual dentro del array.
// Sin embargo, podrías usar cualquier otro nombre que desees para representar los elementos del array. Por ejemplo, podrías usar item, task, element, o cualquier otro nombre que te resulte más claro o significativo para tu código. La elección del nombre no afecta el funcionamiento del código ni cambia cómo se recorre el array.
// Entonces, sí, el nombre todo es solo un nombre de variable que se utiliza para representar cada elemento del array todos mientras se ejecuta la función de mapeo en la expresión .map((todo) => { ... }). Puedes utilizar cualquier otro nombre válido de variable si lo prefieres y el código seguirá funcionando correctamente.

// * El componente renderiza una casilla de verificación para cada tarea en el array todos utilizando la función map.
// Para cada casilla de verificación, se define un evento onChange. Cuando el usuario interactúa con la casilla de verificación (marcando o desmarcando la casilla), se dispara el evento onChange.
// La expresión onChange={() => toggleComplete(todo.id)} define una función flecha anónima que se ejecutará cuando se active el evento onChange. Esta función flecha tiene acceso al id de la tarea (todo.id) correspondiente a la casilla de verificación en la que se hizo clic.

// * La propiedad id="completed" en la expresión <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} /> no es necesaria para el funcionamiento del código en sí mismo, pero es útil para mejorar la accesibilidad y la usabilidad de la interfaz de usuario.
