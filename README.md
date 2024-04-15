#  BoltUI ⚡
[![Run on Replit](https://replit.com/badge)](https://replit.com/@LehuyH/BoltUI-Starter)

BoltUI simplifies the creation of graphical user interfaces (GUIs) in C++ by redirecting program output to a web-based interface. This package aims to provide a seamless experience for new C++ developers by replacing `iostream` functionalities like `cout` and `cin` with web-based UI components.

## Why Use BoltUI?

 
-  **Simplified UI Creation:** Easily redirect C++ output to a web interface.

- **Cross-Platform:** With WebAssembly, your BoltUI program can run across all modern browsers.

-  **Developer-Friendly:** Reduce friction for new C++ developers entering the realm of GUI development.

-  **Rich Outputs:** Incorporate images, markdown formatting, and user interactions within the C++ program output.

  

## 🛠️ Installation

  

### Prerequisites

1.  **Emscripten:** Install [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) to compile C++ to WebAssembly.

  

### Steps

  

1.  **Clone the Repository:**  `git clone https://github.com/LehuyH/boltui.git`

2.  **Include `boltui.hpp`:** Add `#include "boltui.hpp"` in your C++ project.

  
## 🚀 Quick Start Example

```cpp
#include "boltui.hpp"

using namespace std;

int main(){
  UI ui;

  ui << ui.markdown("# Hello, welcome to the Cat Shop!");

  ui << ui.markdown("## Who do you want to adopt ?");

  ui.font("monospace");
  ui << ui.setw(20) << "Whiskers" << ui.setw(20) <<
  ui.image("http://placekitten.com/300/200") 
  << endl;

  ui << endl << endl << endl;

  ui << ui.setw(20) << "Meowtastic" << ui.setw(20) <<
  ui.image("http://placekitten.com/200/200") 
  << endl;

  ui << endl << endl << endl;
  ui.font("sans");

  return 0;

}
```

Outputs the following:
![Quick Start Example](/.github/quickstart.png)

## 🧰 Usage

BoltUI provides a set of functionalities to streamline C++ console output and interaction. 
First create a new instance of the `UI` class like so:
```cpp
UI ui;
```

Now, you can use all of BoltUI's feature. Here are some common functions and their usage:

### Output Functions

- `UI& operator<<(const std::string& input)`: Outputs a string to the UI.
  ```cpp
  ui << "Hello, World!";
  ```

- `UI& operator<<(int input)`: Outputs an integer to the UI.
  ```cpp
  int num = 42;
  ui << num;
  ```

- `UI& operator<<(float input)`: Outputs a float number to the UI.
  ```cpp
  float value = 3.14f;
  ui << value;
  ```

- `UI& operator<<(bool input)`: Outputs a boolean value to the UI.
  ```cpp
  bool status = true;
  ui << status;
  ```

### Input Functions

- `UI& operator>>(std::string& input)`: Reads a line of text from the UI.
  ```cpp
  string userInput;
  ui >> userInput;
  ```

- `UI& operator>>(int& num)`: Reads an integer value from the UI.
  ```cpp
  int number;
  ui >> number;
  ```

- `UI& operator>>(float& num)`: Reads a float value from the UI.
  ```cpp
  float value;
  ui >> value;
  ```

- `UI& operator>>(bool& num)`: Reads a boolean value from the UI.
  ```cpp
  bool status;
  ui >> status;
  ```

### Formatting Functions

- `UI& setw(int width)`: Sets the field width for the next output.
  ```cpp
  ui.setw(10) << "Field Width";
  ```

- `UI& setfill(const std::string& input)`: Sets the fill character for the next output.
  ```cpp
  ui.setfill('*') << "Filled Text";
  ```

- `UI& getline(std::string& input)`: Reads a line of text from the UI and stores it in the given string.
  ```cpp
  string userInput;
  ui.getline(userInput);
  ```
  
### Special Functions

- `UI& markdown(std::string input)`: Renders a Markdown-formatted string in the UI.
  ```cpp
  ui.markdown("# Title\n## Subtitle\n- Bullet point 1\n- Bullet point 2");
  ```

- `UI& image(std::string input)`: Displays an image in the UI using its URL.
  ```cpp
  ui.image("https://example.com/image.png");
  ```

## 🔨 Build

To compile and build your C++ code with BoltUI, follow these steps:

1. Run the following command in your terminal:

```sh
em++ boltui.cpp (ADD OTHER SOURCE FILES HERE) -s WASM=1 -o ./dist/main.js -s EXPORTED_RUNTIME_METHODS=getValue -s NO_EXIT_RUNTIME=1 -s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE='$stringToNewUTF8' -s ASYNCIFY
```

Replace `(ADD OTHER SOURCE FILES HERE)` with any additional source files your project requires.

2. This command will generate the necessary output in the `./dist` directory.

3. You can then upload the contents of the `./dist` folder to any static hosting service to run your application.

## 📜 License

BoltUI is licensed under the [MIT License](LICENSE).
