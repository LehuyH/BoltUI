#ifndef BOLTUI_HPP
#define BOLTUI_HPP

#include <iomanip>
#include<iostream>
#include <emscripten/emscripten.h>

#include <string>

//m++ main.cpp boltui.cpp -s WASM=1 -o ./dist/main.js -s EXPORTED_RUNTIME_METHODS=getValue -s NO_EXIT_RUNTIME=1 -s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE='$stringToNewUTF8' -sASYNCIFY


class UI {
public:
    UI& setw(int width);
    UI& setfill(const std::string& input);
    UI& setfill(char input);
    UI& getline(std::string& input);
    UI& markdown(std::string input);
    UI& image(std::string input);
    UI& font(std::string input);
    UI& operator<<(const std::string& input);
    UI& operator<<(const char* input);
    UI& operator<<(int input);
    UI& operator<<(double input);
    UI& operator<<(char input);
    UI& operator<<(float input);
    UI& operator<<(bool input);
    UI& operator<<(UI& ui);
    UI& operator>>(double& num);
    UI& operator>>(int& num);
    UI& operator>>(float& num);
    UI& operator>>(bool& num);
    UI& operator>> (char& num);

    UI& operator<<(std::ios_base& (func)(std::ios_base&));
    UI& operator<<(std::ostream& (*func)(std::ostream&));
};

#endif