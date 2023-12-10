#include "boltui.hpp"

using namespace std;

int main(){
    UI ui;
    
    ui << ui.markdown("# Rockstar Games") << endl;

    ui << ui.markdown("## Purchase A Game");
    
    ui << ui.markdown("### Grand Theft Auto VI");
    ui << ui.image("https://preview.redd.it/so-i-made-a-concept-art-cover-for-gta-6-v0-muchwbzgqs4c1.png?auto=webp&s=9ccc373127a67dbc499ed7ea57d2c63331ed6966")
    << ui.markdown("#### $59.99") << endl;

    ui << ui.markdown("### Red Dead Redemption 2");
    ui << ui.image("https://m.media-amazon.com/images/M/MV5BMjMyZDY5NTctMzQ0Ny00ZTU0LWE1ZDYtNDYzMjAxYjA1ZGYxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg")
    << ui.markdown("#### $59.99") << endl;
    
     ui << ui.markdown("### Table Tennis 2");
     ui << ui.image("https://upload.wikimedia.org/wikipedia/en/3/33/Rockstar_Table_Tennis_Game_Cover.jpg")
     << ui.markdown("#### $59.99") << endl;

    string name;
    ui << ui.markdown("### What Game Would You Like To Purchase?");
    ui.getline(name);

    ui << ui.markdown("## 🛒 Your Cart");
    ui << ui.setw(20) << name << ui.setw(20) << "$59.99" << endl << endl;

    ui  << "Please Enter Your Credit Card Number: ";
    string cc;
    ui.getline(cc);


    ui << "Thank You For Your Purchase Of " << name << "!" << endl;
    ui << "Please Find Your Download Code Below:" << endl;
    ui << ui.font("monospace") << "XJH-2J3-4K5" << endl;

    return 0;
}