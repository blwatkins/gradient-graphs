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

import { DownloadIndicator } from '../genart-utils/download-indicator';
import { DrawableGraphics } from './drawable-graphics';
import {GraphicsHandler} from "./graphics-handler";
import p5 from "p5";
import {ContextHandlerConfig} from "../genart-utils/context-handler";

export abstract class GraphicsDownloadIndicator extends DownloadIndicator implements DrawableGraphics {
    #graphicsHandler: GraphicsHandler;
    #isActive: boolean;
    #isDownloading: boolean;
    #downloadSuccess: boolean;
    #activeTimeoutMillis: number = 5_000;

    constructor(config: ContextHandlerConfig, ctx: p5) {
        super();
        this.#graphicsHandler = new GraphicsHandler(config, ctx);
        this.#isActive = false;
        this.#isDownloading = false;
        this.#downloadSuccess = false;
    }

    downloadStart(): void {
        this.#isActive = true;
        this.#isDownloading = true;
    }

    downloadComplete(): void {
        this.#isDownloading = false;
        this.#downloadSuccess = true;
        this.#activeTimeout();
    }

    downloadFailure(): void {
        this.#isDownloading = false;
        this.#downloadSuccess = false;
        this.#activeTimeout();
    }

    #activeTimeout(): void {
        new Promise<void>(resolve => {
            setTimeout(resolve, this.#activeTimeoutMillis);
        }).then((): void => {
            this.#isActive = false;
        });
    }
}
