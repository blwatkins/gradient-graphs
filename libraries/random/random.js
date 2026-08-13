/* 
This code and its output are licensed under the
Creative Commons Attribution-NonCommercial-NoDerivatives 
4.0 International (CC BY-NC-ND 4.0) License.
https://creativecommons.org/licenses/by-nc-nd/4.0/
*/

// Random Library
// Author: Brittni Watkins
// Created: February 13, 2022

function randomFloat(min, max) {
    let r = (Math.random() * (max - min)) + min;
    return r;
}

function randomInt(min, max) {
    let r = randomFloat(min, max);
    let rInt = Math.floor(r);
    return rInt;
}

function randomBoolean() {
    let r = randomInt(0, 2);
    let boolean = true;

    if (r % 2 == 0) {
        boolean = false;
    }

    return boolean;
}

function randomBooleanChance(chanceOfTrue) {
    let r = randomFloat(0, 1);
    let boolean = true;

    if (r > chanceOfTrue) {
        boolean = false;
    }

    return boolean;
}
