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

import { NumberUtility } from '@blwatkins/utils';

import { HTMLElementUtility } from '../utils/html-element-utility';

import { DownloadIndicator } from './download-indicator';

// TODO - remove forced waits after testing download indicator

export class DownloadHandler {
    static #downloadTimeoutMillis: number = 30_000;
    static #lastDownloadMillis: number = 0;

    public static get downloadTimeoutMillis(): number {
        return DownloadHandler.#downloadTimeoutMillis;
    }

    public static set downloadTimeoutMillis(millis: number) {
        NumberUtility.assertPositiveInteger(millis);
        DownloadHandler.#downloadTimeoutMillis = millis;
    }

    public static downloadImage(canvas: HTMLCanvasElement, downloadIndicator?: DownloadIndicator): void {
        DownloadHandler.#assertDownloadTimeout();
        HTMLElementUtility.assertHTMLCanvasElement(canvas);
        downloadIndicator?.downloadStart();

        DownloadHandler.canvasToBlob(canvas)
            .then((blob: Blob): void => {
                console.log('Start wait 2');
                new Promise<void>(resolve => {
                    setTimeout(resolve, 2500);
                }).then(() => {
                    const url: string = URL.createObjectURL(blob);
                    const link: HTMLAnchorElement = document.createElement('a');
                    link.download = `${canvas.id}.png`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                    downloadIndicator?.downloadComplete();
                });
            })
            .catch((error): void => {
                console.error(error);
                downloadIndicator?.downloadFailure();
            })
            .finally(() => {
                DownloadHandler.#lastDownloadMillis = Date.now();
            });
    }

    public static async canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
        console.log('Start wait 1');
        await new Promise(resolve => {
            setTimeout(resolve, 2500);
        });

        return new Promise<Blob>((resolve, reject) => {
            if (!HTMLElementUtility.isHTMLCanvasElement(canvas)) {
                reject('Input must be an HTMLCanvasElement.');
            }

            canvas.toBlob((blob: Blob | null): void => {
                if (blob) {
                    console.log('BLOB!')
                    resolve(blob);
                } else {
                    reject('Canvas blob is null.');
                }
            });
        })
    }

    static #assertDownloadTimeout(): void {
        const now: number = Date.now();

        if (now < (DownloadHandler.#lastDownloadMillis + DownloadHandler.downloadTimeoutMillis)) {
            throw new Error(`Must wait ${DownloadHandler.#downloadTimeoutMillis} milliseconds between consecutive downloads.`);
        }
    }
}
