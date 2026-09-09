/*
 * Copyright (c) 2026 Brittni Watkins.
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

import { StringUtility } from '@blwatkins/utils';

// TODO - new custom error type InstanceTypeError - extends TypeError

export class HTMLElementUtility {
    public static assertHTMLCanvasElement(input: unknown, message?: string): asserts input is HTMLCanvasElement {
        if (!HTMLElementUtility.isHTMLCanvasElement(input)) {
            if (StringUtility.isSingleLineTrimmedString(message)) {
                throw new Error(message);
            }

            throw new Error('Input must be an HTMLCanvasElement.');
        }
    }

    public static isHTMLCanvasElement(input: unknown): input is HTMLCanvasElement {
        return input instanceof HTMLCanvasElement;
    }
}
