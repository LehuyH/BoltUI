#include "boltui.hpp"

EM_ASYNC_JS(char *, getInput, (), {
        const res = await getInput();
        return stringToNewUTF8(res);
});

EM_ASYNC_JS(double, getDouble, (), {
    const res = await getNumber();
    return res;
});

EM_ASYNC_JS(char, getChar, (), {
    const res = await getChar();
    return res;
});

//Custom IO manipulator
UI& UI::setw(int width) {
    MAIN_THREAD_EM_ASM({
        setContainerStyles("setW",$0);
    },width);
    return *this;
}

UI& UI::setfill(const std::string& input) {
    MAIN_THREAD_EM_ASM({
        setGlobalStyles("setFill",$0,true);
    },input.c_str());
    return *this;
}

UI& UI::setfill(char input) {
    MAIN_THREAD_EM_ASM({
        setGlobalStyles("setFill",String.fromCharCode($0),false);
    },input);
    return *this;
}

UI& UI::getline(std::string& input) {
    input = getInput();
    return *this;
}

UI& UI::markdown(std::string input) {
    MAIN_THREAD_EM_ASM({
        buildMarkdown($0);
    }, input.c_str());
    return *this;
}

UI& UI::image(std::string input) {
    MAIN_THREAD_EM_ASM({
        buildImage($0);
    }, input.c_str());
    return *this;
}

UI& UI::font(std::string input){
    MAIN_THREAD_EM_ASM({
        setGlobalStyles("font",$0,true);
    }, input.c_str());
    return *this;
}

UI& UI::operator<<(const std::string& input) {
    MAIN_THREAD_EM_ASM({
        buildText($0);
    }, input.c_str());
    return *this;
}

UI& UI::operator<<(const char* input) {
    MAIN_THREAD_EM_ASM({
        buildText($0);
    }, input);
    return *this;
}

UI& UI::operator<<(int input) {
    MAIN_THREAD_EM_ASM({
        buildNumber($0);
    }, input);
    return *this;
}

UI& UI::operator<<(double input) {
    MAIN_THREAD_EM_ASM({
        buildNumber($0);
    }, input);
    return *this;
}

UI& UI::operator<<(float input) {
    MAIN_THREAD_EM_ASM({
        buildNumber($0);
    }, input);
    return *this;
}

UI& UI::operator<<(bool input) {
    MAIN_THREAD_EM_ASM({
        buildNumber($0);
    }, input);
    return *this;
}


UI& UI::operator<<(UI& ui) {
    return *this;
}

UI& UI::operator>>(double& num) {
    num = getDouble();
    return *this;
}

UI& UI::operator>>(int& num) {
    num = getDouble();
    return *this;
}

UI& UI::operator>>(float& num) {
    num = getDouble();
    return *this;
}

UI& UI::operator>>(bool& num) {
    num = getDouble();
    return *this;
}

UI& UI::operator>> (char& num) {
    num = getChar();
    return *this;
}

//Return type, func name/pointer, input type
UI& UI::operator<<(std::ios_base& (func)(std::ios_base&)) {
    if (func == std::right) {
        MAIN_THREAD_EM_ASM({
            setGlobalStyles("textAlign","right");
        });
    }

    if (func == std::left){
        MAIN_THREAD_EM_ASM({
            setGlobalStyles("textAlign","left");
        });
    }

    return *this;
}

UI& UI::operator<<(std::ostream& (*func)(std::ostream&)) {
    MAIN_THREAD_EM_ASM({
        newLine();
    });
    return *this;
    }


