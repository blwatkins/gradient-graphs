/*
 * Copyright (c) 2022-2026 Brittni Watkins.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

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
